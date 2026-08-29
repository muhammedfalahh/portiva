/**
 * =============================================================================
 * PORTIVA: Template Platform Contract
 * =============================================================================
 *
 * Single source of truth for the template module contract shared by:
 *   - the Template Platform (registry / loaders / resolver)
 *   - premium template modules (manifest + definition + renderer)
 *   - the legacy premium renderer during the strangler migration
 *
 * Ownership model:
 *   - TemplateManifest  : lightweight module metadata (gallery, routing, seeds)
 *   - PremiumTemplate*  : the data model of a premium site's content
 *   - PremiumTemplateModule : one lazily loadable premium implementation
 *
 * This module must never import React components or registry/loader files.
 * Dependency direction: templates -> contract <- platform. No cycles possible.
 */

import type { ThemeConfig } from '@/lib/theme.types';

// ─── Premium Content Data Model ─────────────────────────────────────────────
// Moved verbatim from PremiumMultipageTemplate.tsx so the data model is owned
// at the contract level instead of inside a specific renderer implementation.

export type PremiumTemplateSection =
  | {
      type: 'hero';
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      stats?: Array<{ id: string; label: string; value: string }>;
      primaryAction?: PremiumTemplateAction;
      secondaryAction?: PremiumTemplateAction;
      media?: PremiumTemplateMedia;
    }
  | {
      type: 'cards';
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      columns?: 2 | 3 | 4;
      style?: 'project' | 'product' | 'menu' | 'vehicle' | 'beauty' | 'fitness' | 'property' | 'course' | 'agency' | 'creator' | 'explore-work';
      items: PremiumTemplateCard[];
      primaryAction?: PremiumTemplateAction;
      secondaryAction?: PremiumTemplateAction;
    }
  | {
      type: 'story';
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      body: Array<{ id: string; text: string }>;
      points?: Array<{ id: string; text: string }>;
      media?: PremiumTemplateMedia;
      stats?: Array<{ id: string; label: string; value: string }>;
      primaryAction?: PremiumTemplateAction;
      secondaryAction?: PremiumTemplateAction;
    }
  | {
      type: 'detail';
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      specs?: Array<{ id: string; label: string; value: string }>;
      media?: PremiumTemplateMedia;
      primaryAction?: PremiumTemplateAction;
      secondaryAction?: PremiumTemplateAction;
      /**
       * Optional extra product views for detail-page galleries. Additive and
       * optional: templates that never read it are unaffected, so existing
       * definitions stay valid without a schema bump.
       */
      gallery?: PremiumTemplateMedia[];
      /** Optional product option groups (e.g. colour / size variants). */
      options?: Array<{
        id: string;
        label: string;
        values: Array<{ id: string; value: string }>;
      }>;
      /** Short feature bullets rendered beside the buy panel. */
      highlights?: Array<{ id: string; text: string }>;
      /**
       * Commerce metadata for detail pages that double as product pages.
       * All strings stay editor-editable at render time.
       */
      productMeta?: {
        price: string;
        compareAt?: string;
        badge?: string;
        rating?: string;
        reviewCount?: string;
      };
    }
  | {
      type: 'testimonials';
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      milestonesEyebrow?: string;
      communityBadge?: string;
      communityLine1?: string;
      communityLine2?: string;
      stats?: Array<{ id: string; label: string; value: string; suffix?: string }>;
      items: Array<{
        id: string;
        quote: string;
        name: string;
        role: string;
        tag?: string;
        year?: string;
        image?: PremiumTemplateMedia;
      }>;
    }
  | {
      type: 'gallery';
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      communityBadge?: string;
      items: Array<{
        id: string;
        title?: string;
        meta?: string;
        image?: PremiumTemplateMedia;
      }>;
    }
  | {
      type: 'pricing';
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      tagline?: string;
      ratingValue?: string;
      ratingSource?: string;
      socialProofLine1?: string;
      socialProofLine2?: string;
      billingToggleMonthly?: string;
      billingToggleYearly?: string;
      yearlyDiscountBadge?: string;
      plans: Array<{
        id: string;
        name: string;
        price: string;
        billing: string;
        code?: string;
        yearlyPrice?: string;
        yearlyBilling?: string;
        popular?: boolean;
        featured?: boolean;
        highlight?: string;
        subtitle?: string;
        featuresHeader?: string;
        features: Array<{ id: string; text: string }>;
        action: PremiumTemplateAction;
      }>;
    }
  | {
      type: 'faq';
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      items: Array<{ id: string; question: string; answer: string }>;
    }
  | {
      type: 'contact';
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      tagline?: string;
      brandWordmark?: string;
      copyright?: string;
      address?: string;
      hours?: string;
      email?: string;
      media?: PremiumTemplateMedia;
      navColumns?: Array<{
        id: string;
        title: string;
        links: Array<{ id: string; label: string; href?: string; targetPageId?: string }>;
      }>;
      legalLinks?: Array<{ id: string; label: string; href?: string }>;
      details: Array<{ id: string; label: string; value: string }>;
      formFields?: Array<{ id: string; label: string; placeholder: string; hint?: string }>;
      primaryAction?: PremiumTemplateAction;
      secondaryAction?: PremiumTemplateAction;
    }
  | {
      type: 'cta';
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      primaryAction?: PremiumTemplateAction;
      secondaryAction?: PremiumTemplateAction;
      media?: PremiumTemplateMedia;
    };

export interface PremiumTemplateMedia {
  key: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface PremiumTemplateAction {
  id: string;
  label: string;
  targetPageId?: string;
  href?: string;
  openInNewTab?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface PremiumTemplateCard {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  meta?: string;
  status?: string;
  price?: string;
  image?: PremiumTemplateMedia;
  secondaryImage?: PremiumTemplateMedia;
  bulletPoints?: Array<{ id: string; text: string }>;
  action?: PremiumTemplateAction;
  secondaryAction?: PremiumTemplateAction;
  client?: string;
  year?: string;
  category?: string;
  tags?: Array<{ id: string; text: string }>;
  metrics?: Array<{ id: string; label: string; value: string }>;
  layout?: 'feature' | 'landscape' | 'portrait' | 'stacked' | 'stat';
}

export interface PremiumTemplatePage {
  id: string;
  label: string;
  slug: string;
  description: string;
  sections: PremiumTemplateSection[];
}

export interface PremiumTemplateDefinition {
  brandName: string;
  categoryLabel: string;
  navTagline: string;
  footerHeadline: string;
  footerDescription: string;
  footerLinks: Array<{ id: string; label: string; targetPageId?: string; href?: string }>;
  pages: PremiumTemplatePage[];
}

// ─── Renderer Props Contract ────────────────────────────────────────────────

export type PremiumRenderMode = 'builder' | 'public';

/**
 * Props every premium template renderer receives. Identical to the props the
 * legacy monolith accepted, so the legacy renderer satisfies this contract
 * verbatim during the strangler migration.
 */
export interface PremiumRendererProps {
  definition: PremiumTemplateDefinition;
  activePageId: string;
  mode: PremiumRenderMode;
  handle?: string;
  templateId?: string;
  onNavigate?: (pageId: string) => void;
}

// ─── Manifest ───────────────────────────────────────────────────────────────

/** Summary of a page used for synchronous page switchers and routing checks. */
export interface TemplateManifestPage {
  id: string;
  label: string;
  slug: string;
}

/**
 * Lightweight, eagerly available module metadata.
 *
 * The manifest describes the MODULE (identity, gallery presentation, seed
 * values, supported pages). It deliberately does NOT contain section content —
 * content lives in the module's definition and loads lazily with it.
 */
export interface TemplateManifest {
  id: string;
  name: string;
  shortName: string;
  category: string;
  categoryLabel: string;
  tier: 'free' | 'premium';
  kind: 'premium-module' | 'legacy-free';
  description: string;
  previewImage: string;
  pageCount: number;
  tags: string[];
  capabilities: string[];
  /** Handle used for demo/public route resolution (/&lt;handle&gt;). */
  profileHandle: string;
  /** Display name seeded into new project data. */
  profileName: string;
  /** Default theme seeded into new project data. */
  theme: ThemeConfig;
  /**
   * Page summaries for premium multi-page templates. Enables the builder page
   * switcher without loading a template module. The definition remains the
   * source of truth for page CONTENT; these summaries cover id/label/slug only.
   */
  pages?: TemplateManifestPage[];
  /** Module implementation version. */
  version: string;
  /** Content schema version of the definition. Bump on structural changes. */
  schemaVersion: number;
}

// ─── Module Contract ────────────────────────────────────────────────────────

/**
 * A lazily loadable premium template implementation.
 * Default export of a template module entry file (index.tsx).
 */
export interface PremiumTemplateModule {
  manifest: TemplateManifest;
  definition: PremiumTemplateDefinition;
  Renderer: React.ComponentType<PremiumRendererProps>;
}

/** Extra render context handed to legacy free-template prop adapters. */
export interface FreeRenderContext {
  navbarBg?: string;
  hoverStyle?: string;
  onNavigate?: (pageId: string) => void;
}

/**
 * A wrapped, untouched legacy free template component.
 * renderFree() maps platform seed data + render context to the component's
 * historical props and returns the ready-to-mount element. Keeping the
 * element production inside the loader avoids leaking per-template prop
 * types through the platform boundary.
 */
export interface LegacyFreeTemplateModule {
  kind: 'legacy-free';
  manifestId: string;
  renderFree: (data: FreeSeedData, ctx: FreeRenderContext, activePageId?: string) => React.ReactElement;
}

/** Minimal seed shape derived synchronously from a manifest. */
export interface FreeSeedData {
  templateId?: string;
  profileName: string;
  profileHandle: string;
}
