-- =============================================================================
-- PORTIVA: Content Compliance & Auto-Moderation Triggers
-- =============================================================================
-- Description: Implements the "Amanah" compliance framework — an automated
--              content scanning system that detects prohibited content patterns
--              and instantly quarantines violating profiles by setting the
--              is_moderated flag, which prevents public page resolution.
--
-- This runs as a BEFORE INSERT OR UPDATE trigger, meaning violations are
-- caught BEFORE the data is committed, and the profile is flagged in the
-- same transaction for atomic consistency.
--
-- Target: Supabase (PostgreSQL 16+)
-- Author: Portiva Engineering
-- =============================================================================

CREATE OR REPLACE FUNCTION public.check_content_compliance()
RETURNS TRIGGER AS $$
DECLARE
    -- Dictionary of prohibited terms targeting common scam patterns,
    -- illicit services, and regulatory violations in the Indian market.
    -- This list should be maintained and expanded by the compliance team.
    malicious_dictionary TEXT[];
    term TEXT;
    parsed_compilation_text TEXT;
BEGIN
    malicious_dictionary := ARRAY[
        -- Financial fraud patterns
        'loan shark', 'guaranteed returns', 'chitscheme', 'ponzi',
        'usury', 'pyramid scheme',
        -- Gambling & betting
        'lottery prize', 'matka', 'casino', 'betting tips', 'fix match',
        -- Adult content & illegal services
        'escort service', ' adult ', ' porn',
        -- Cybercrime
        'hack account', 'premium escape'
    ];

    -- Build the searchable text blob based on which table triggered this.
    -- We concatenate all user-editable text fields and normalize to lowercase.
    IF TG_TABLE_NAME = 'bento_blocks' THEN
        parsed_compilation_text := LOWER(
            COALESCE(new.content->>'title', '') || ' ' ||
            COALESCE(new.content->>'description', '')
        );
    ELSIF TG_TABLE_NAME = 'profiles' THEN
        parsed_compilation_text := LOWER(
            COALESCE(new.full_name, '') || ' ' ||
            COALESCE(new.handle, '')
        );
    ELSE
        -- Safety fallback: if triggered on an unexpected table, pass through
        parsed_compilation_text := '';
    END IF;

    -- Scan the compiled text against every term in the malicious dictionary.
    -- On first match, flag the profile and exit the loop early.
    FOREACH term IN ARRAY malicious_dictionary
    LOOP
        IF position(term IN parsed_compilation_text) > 0 THEN
            -- Flag the owning profile as moderated.
            -- For bento_blocks, use the profile_id foreign key.
            -- For profiles, the row IS the profile.
            IF TG_TABLE_NAME = 'bento_blocks' THEN
                UPDATE public.profiles
                SET is_moderated = true
                WHERE public.profiles.id = new.profile_id;
            END IF;

            -- If this IS the profiles table, set the flag directly on the
            -- NEW record so it takes effect in the same transaction.
            IF TG_TABLE_NAME = 'profiles' THEN
                new.is_moderated := true;
            END IF;

            RAISE NOTICE 'Portiva Compliance Interceptor: Violating entity isolated. Term: "%", Table: "%"', term, TG_TABLE_NAME;
            EXIT; -- Stop scanning after first violation (one is enough)
        END IF;
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.check_content_compliance() IS 'Amanah compliance scanner. Checks user content against prohibited term dictionary and auto-moderates on violation.';

-- Wire triggers on both content-bearing tables.
-- BEFORE triggers allow us to modify the NEW record before it is committed.
CREATE OR REPLACE TRIGGER trg_compliance_blocks_audit
    BEFORE INSERT OR UPDATE ON public.bento_blocks
    FOR EACH ROW EXECUTE FUNCTION public.check_content_compliance();

CREATE OR REPLACE TRIGGER trg_compliance_profiles_audit
    BEFORE INSERT OR UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.check_content_compliance();
