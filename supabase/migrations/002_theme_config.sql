-- =============================================================================
-- PORTIVA: Theme Configuration Column Migration
-- =============================================================================
-- Adds a theme_config JSONB column to the profiles table to store
-- per-user theme customizations. The JSON schema matches the ThemeConfig
-- TypeScript interface:
--
--   {
--     "primary": "#DC2626",
--     "primaryHover": "#EF4444",
--     "background": "#FFFFFF",
--     "surface": "#FAFAFA",
--     "surfaceHover": "#F5F5F4",
--     "foreground": "#0A0A0A",
--     "muted": "#71717A",
--     "border": "rgba(0, 0, 0, 0.1)",
--     "accent": "#DC2626",
--     "accentHover": "#B91C1C"
--   }
--
-- Empty object {} means "use the template's default theme preset".
-- Partial objects are merged with defaults on the application side
-- via the resolveTheme() utility function.
-- =============================================================================

ALTER TABLE public.profiles
ADD COLUMN theme_config JSONB NOT NULL DEFAULT '{}'::jsonb;

COMMENT ON COLUMN public.profiles.theme_config IS
  'Per-user theme customization. Stores hex color overrides as JSONB. '
  'Empty object {} means use template defaults. Partial objects are '
  'merged with DEFAULT_THEME on the application side.';
