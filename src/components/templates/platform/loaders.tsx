/**
 * =============================================================================
 * PORTIVA: Template Platform — Lazy Loaders
 * =============================================================================
 *
 * Every template implementation is reached exclusively through these dynamic
 * import() expressions. Bundlers turn each entry into an independent chunk, so
 * opening Template A never downloads the implementation of Templates B..N.
 *
 * NOTE: imports are always inside the loader functions (no top-level await),
 * keeping this module cheap and preserving per-template chunk boundaries.
 */

import type {
  FreeRenderContext,
  FreeSeedData,
  LegacyFreeTemplateModule,
  PremiumTemplateModule,
} from '@/lib/template-contract';

// ─── Premium Module Loaders ─────────────────────────────────────────────────

export const PREMIUM_TEMPLATE_LOADERS: Record<string, () => Promise<PremiumTemplateModule>> = {
  premium_auto_inventory: () =>
    import('@/components/templates/premium/auto-inventory').then((m) => m.default),
  premium_creative_portfolio: () =>
    import('@/components/templates/premium/creative-portfolio').then((m) => m.default),
  premium_social_ecommerce: () =>
    import('@/components/templates/premium/social-ecommerce').then((m) => m.default),
  premium_cafe_cloud_kitchen: () =>
    import('@/components/templates/premium/saffron-cloud-kitchen').then((m) => m.default),
  premium_bridal_salon: () =>
    import('@/components/templates/premium/bridal-salon').then((m) => m.default),
  premium_fitness_coach: () =>
    import('@/components/templates/premium/fitness-coach').then((m) => m.default),
  premium_real_estate_agent: () =>
    import('@/components/templates/premium/real-estate-agent').then((m) => m.default),
  premium_skill_educator: () =>
    import('@/components/templates/premium/skill-educator').then((m) => m.default),
  premium_boutique_agency: () =>
    import('@/components/templates/premium/boutique-agency').then((m) => m.default),
  premium_personal_brand: () =>
    import('@/components/templates/premium/personal-brand').then((m) => m.default),
};

// ─── Legacy Free Template Loaders ───────────────────────────────────────────

const LUXE_NAVBAR_BG_VALUES = ['transparent', 'surface', 'glass'] as const;
type LuxeNavbarBg = (typeof LUXE_NAVBAR_BG_VALUES)[number];
const LUXE_HOVER_STYLES = ['color', 'underline', 'pill', 'border-bottom'] as const;
type LuxeHoverStyle = (typeof LUXE_HOVER_STYLES)[number];

function toLuxeNavbarBg(value: string | undefined): LuxeNavbarBg {
  return (LUXE_NAVBAR_BG_VALUES as readonly string[]).includes(value ?? '')
    ? (value as LuxeNavbarBg)
    : 'transparent';
}

function toLuxeHoverStyle(value: string | undefined): LuxeHoverStyle {
  return (LUXE_HOVER_STYLES as readonly string[]).includes(value ?? '')
    ? (value as LuxeHoverStyle)
    : 'color';
}

/**
 * Free template adapters wrap the untouched hand-written components.
 * Prop values mirror the exact call sites of the previous dispatch chains in
 * WorkspaceContainer.VisualCanvas and app/[username]/route-renderer.tsx, so
 * rendering behaviour is byte-for-byte unchanged.
 */
export const FREE_TEMPLATE_LOADERS: Record<
  string,
  () => Promise<LegacyFreeTemplateModule>
> = {
  aurik: () =>
    import('@/components/templates/Aurik').then(
      (m): LegacyFreeTemplateModule => ({
        kind: 'legacy-free',
        manifestId: 'aurik',
        renderFree: (data, ctx) => (
          <m.Aurik
            brandName={data.profileName || 'AURIK'}
            navbarBg={ctx.navbarBg}
            hoverStyle={ctx.hoverStyle}
          />
        ),
      }),
    ),
  nitec: () =>
    import('@/components/templates/Nitec').then(
      (m): LegacyFreeTemplateModule => ({
        kind: 'legacy-free',
        manifestId: 'nitec',
        renderFree: (data) => <m.Nitec brandName={data.profileName || 'nitec.'} />,
      }),
    ),
  portfolio: () =>
    import('@/components/templates/SnapMaster').then(
      (m): LegacyFreeTemplateModule => ({
        kind: 'legacy-free',
        manifestId: 'portfolio',
        renderFree: (data, ctx) => (
          <m.SnapMaster
            fullName={data.profileName || 'Bruno Erdison'}
            handle={data.profileHandle || 'bruno'}
            navbarBg={ctx.navbarBg}
            hoverStyle={ctx.hoverStyle}
          />
        ),
      }),
    ),
  luxe_universal: () =>
    import('@/components/templates/LuxeUniversal').then(
      (m): LegacyFreeTemplateModule => ({
        kind: 'legacy-free',
        manifestId: 'luxe_universal',
        renderFree: (data, ctx) => (
          <m.LuxeUniversal
            brandName={data.profileName || 'VALKYRIE'}
            navbarBg={toLuxeNavbarBg(ctx.navbarBg)}
            hoverStyle={toLuxeHoverStyle(ctx.hoverStyle)}
          />
        ),
      }),
    ),
  cafe_cloud: () =>
    import('@/components/templates/CafeCloud').then(
      (m): LegacyFreeTemplateModule => ({
        kind: 'legacy-free',
        manifestId: 'cafe_cloud',
        renderFree: (data) => <m.CafeCloud brandName={data.profileName || 'THE ARTISAN KITCHEN'} />,
      }),
    ),
  auto_drive: () =>
    import('@/components/templates/AutoDrive').then(
      (m): LegacyFreeTemplateModule => ({
        kind: 'legacy-free',
        manifestId: 'auto_drive',
        renderFree: (data, ctx, activePageId) => <m.AutoDrive dealershipName={data.profileName || 'AUTOBAHN PRO'} activePageId={activePageId} onNavigate={ctx.onNavigate} />,
      }),
    ),
  aura_salon: () =>
    import('@/components/templates/AuraSalon').then(
      (m): LegacyFreeTemplateModule => ({
        kind: 'legacy-free',
        manifestId: 'aura_salon',
        renderFree: (data) => <m.AuraSalon artistName={data.profileName || 'Ananya Sharma'} />,
      }),
    ),
  apex_fit: () =>
    import('@/components/templates/ApexFit').then(
      (m): LegacyFreeTemplateModule => ({
        kind: 'legacy-free',
        manifestId: 'apex_fit',
        renderFree: (data) => <m.ApexFit trainerName={data.profileName || 'Coach Marcus'} />,
      }),
    ),
  estate_prime: () =>
    import('@/components/templates/EstatePrime').then(
      (m): LegacyFreeTemplateModule => ({
        kind: 'legacy-free',
        manifestId: 'estate_prime',
        renderFree: (data) => <m.EstatePrime brandName={data.profileName || 'Vance Private Estates'} />,
      }),
    ),
  mentor_x: () =>
    import('@/components/templates/MentorX').then(
      (m): LegacyFreeTemplateModule => ({
        kind: 'legacy-free',
        manifestId: 'mentor_x',
        renderFree: (data) => <m.MentorX instructorName={data.profileName || 'Dr. Alex Rivera'} />,
      }),
    ),
  studio_nova: () =>
    import('@/components/templates/StudioNova').then(
      (m): LegacyFreeTemplateModule => ({
        kind: 'legacy-free',
        manifestId: 'studio_nova',
        renderFree: (data) => <m.StudioNova studioName={data.profileName || 'Studio Nova'} />,
      }),
    ),
  bento_bio: () =>
    import('@/components/templates/BentoBio').then(
      (m): LegacyFreeTemplateModule => ({
        kind: 'legacy-free',
        manifestId: 'bento_bio',
        renderFree: (data) => <m.BentoBio name={data.profileName || 'Avery Stone'} />,
      }),
    ),
};
