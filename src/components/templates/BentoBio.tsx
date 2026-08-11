'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChevronDown,
  ExternalLink,
  FormInput,
  Globe,
  GripVertical,
  Images,
  LayoutTemplate,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  MoreHorizontal,
  Phone,
  Pin,
  Play,
  Quote,
  RefreshCcw,
  ShoppingBag,
  Sparkles,
  Ticket,
  Timer,
  Trash2,
  Copy,
  EyeOff,
  ChevronUp,
  Check,
} from 'lucide-react';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { useOptionalVisualBuilder } from '@/components/engine/VisualBuilderContext';
import {
  BENTO_BIO_PRESETS,
  BENTO_GAP,
  BENTO_GRID_COLUMNS,
  BENTO_ROW_HEIGHT,
  CATEGORY_LABELS,
  DEFAULT_BENTO_BOXES,
  DEFAULT_BENTO_CONFIG,
  SOCIAL_PLATFORMS,
  computeBentoPlacements,
  duplicateWidget,
  moveWidget,
  moveWidgetByStep,
  normalizeBentoConfig,
  removeWidget,
  toggleWidgetVisibility,
  type BentoBioConfig,
  type BentoBioWidget,
  type SocialPlatformId,
  type BentoPlacement,
} from '@/lib/bentobio';

export type { BentoBioBox, BentoBioConfig, BentoBioPresetId } from '@/lib/bentobio';
export { DEFAULT_BENTO_BOXES, DEFAULT_BENTO_CONFIG, BENTO_BIO_PRESETS } from '@/lib/bentobio';

export interface BentoBioProps {
  name?: string;
  bio?: string;
  avatar?: string;
  config?: BentoBioConfig;
}

type IconProps = { className?: string };

type DragState = {
  draggedId: string;
  targetId: string | null;
  position: 'before' | 'after';
};

type DropPreview = BentoPlacement | null;

const iconClass = 'h-4 w-4';

const InstagramMark = ({ className = iconClass }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4.1" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInMark = ({ className = iconClass }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.94 6.5a1.94 1.94 0 1 1 0-3.88 1.94 1.94 0 0 1 0 3.88ZM5.5 20.5h2.88V9.25H5.5V20.5Zm5.1-11.25h2.76v1.54h.04c.38-.72 1.3-1.48 2.68-1.48 2.87 0 3.4 1.89 3.4 4.34v6.85h-2.88v-6.07c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21v6.18H10.6V9.25Z" />
  </svg>
);

const GithubMark = ({ className = iconClass }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.25a9.75 9.75 0 0 0-3.08 19.01c.49.09.67-.21.67-.47 0-.23-.01-1-.01-1.81-2.43.45-3.06-.59-3.25-1.13-.1-.28-.55-1.13-.94-1.36-.32-.17-.78-.59-.01-.6.73-.01 1.25.68 1.42.96.83 1.4 2.16 1.01 2.69.77.08-.61.32-1.01.58-1.24-2.02-.23-4.13-1.02-4.13-4.53 0-1 .35-1.82.94-2.46-.1-.23-.41-1.17.09-2.43 0 0 .77-.25 2.52.94a8.7 8.7 0 0 1 4.58 0c1.75-1.19 2.52-.94 2.52-.94.5 1.26.19 2.2.09 2.43.59.64.94 1.46.94 2.46 0 3.52-2.11 4.3-4.14 4.53.33.29.62.85.62 1.72 0 1.24-.01 2.24-.01 2.54 0 .26.18.56.68.47A9.75 9.75 0 0 0 12 2.25Z" />
  </svg>
);

const YouTubeMark = ({ className = iconClass }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.6 7.2a3 3 0 0 0-2.11-2.12C17.62 4.65 12 4.65 12 4.65s-5.62 0-7.49.43A3 3 0 0 0 2.4 7.2C2 9.03 2 12 2 12s0 2.97.4 4.8a3 3 0 0 0 2.11 2.12c1.87.43 7.49.43 7.49.43s5.62 0 7.49-.43a3 3 0 0 0 2.11-2.12c.4-1.83.4-4.8.4-4.8s0-2.97-.4-4.8Zm-7.43 4.8-4.7 2.7V9.3l4.7 2.7Z" />
  </svg>
);

const TikTokMark = ({ className = iconClass }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-1.38V9.07a6.34 6.34 0 0 0-5.11 2.48 6.34 6.34 0 0 0 .8 8.87 6.34 6.34 0 0 0 9.04-1.63 6.27 6.27 0 0 0 1.63-4.57V9.66a8.28 8.28 0 0 0 4.84 1.55V7.76a4.86 4.86 0 0 1-1.46-1.07Z" />
  </svg>
);

const SpotifyMark = ({ className = iconClass }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm4.586 14.424a.625.625 0 0 1-.861.207c-2.357-1.44-5.326-1.766-8.822-.967a.626.626 0 0 1-.275-1.222c3.827-.874 7.126-.497 9.751 1.121a.625.625 0 0 1 .207.861Zm1.226-2.727a.78.78 0 0 1-1.074.257c-2.696-1.658-6.807-2.136-9.996-1.168a.781.781 0 0 1-.462-1.492c3.642-1.104 8.188-.574 11.275 1.329a.781.781 0 0 1 .257 1.074Zm.135-2.836C14.714 9.017 9.07 8.83 5.795 9.824a.937.937 0 1 1-.546-1.792c3.766-1.144 10.007-.93 13.8 1.323a.937.937 0 1 1-1.102 1.512Z" />
  </svg>
);

const XMark = ({ className = iconClass }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2H22l-6.78 7.75L23 22h-6.1l-4.77-6.24L6.67 22H3.56l7.24-8.28L1 2h6.25l4.3 5.67L18.9 2Zm-1.07 18.17h1.72L6.32 3.74H4.47l13.36 16.43Z" />
  </svg>
);

const DribbbleMark = ({ className = iconClass }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <circle cx="12" cy="12" r="9" />
    <path d="M7 4.8c3.1 3.8 5.5 8 7 12.6" />
    <path d="M4.1 10.1c4.3 0 8.4-.8 12.2-2.3" />
    <path d="M9.9 20.7c1-3.4 3.6-6 7.1-7.1" />
  </svg>
);

const BehanceMark = ({ className = iconClass }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 6.75h6.15c2.82 0 4.65 1.33 4.65 3.65 0 1.57-.83 2.62-2.2 3.1v.05c1.85.28 2.95 1.63 2.95 3.63 0 2.52-2.08 4.07-5.18 4.07H3V6.75Zm5.6 5.78c1.25 0 2.05-.55 2.05-1.63s-.8-1.55-2.05-1.55H5.95v3.18H8.6Zm.33 5.97c1.52 0 2.4-.58 2.4-1.82 0-1.2-.88-1.75-2.4-1.75H5.95v3.57h2.98ZM16.44 8.14h4.78V6.75h-4.78v1.39Zm5.13 7.8c-.27 1.95-1.9 3.63-4.87 3.63-3.15 0-5.15-2.1-5.15-5.43 0-3.2 2.07-5.47 5.02-5.47 3.3 0 5 2.35 5 5.93v.45h-6.98c.1 1.62 1.03 2.52 2.35 2.52 1.12 0 1.77-.42 2.08-1.2h2.55Zm-2.56-2.8c-.08-1.45-.88-2.23-2.1-2.23-1.2 0-2.03.83-2.2 2.22h4.3Z" />
  </svg>
);

const iconMap: Record<string, React.ComponentType<IconProps>> = {
  instagram: InstagramMark,
  tiktok: TikTokMark,
  youtube: YouTubeMark,
  x: XMark,
  facebook: Globe,
  linkedin: LinkedInMark,
  pinterest: Pin,
  snapchat: MessageCircle,
  threads: Menu,
  reddit: MessageCircle,
  discord: MessageCircle,
  telegram: MessageCircle,
  whatsapp: MessageCircle,
  twitch: Play,
  github: GithubMark,
  behance: BehanceMark,
  dribbble: DribbbleMark,
  medium: Mic2,
  spotify: SpotifyMark,
  link: Link2,
  collection: Menu,
  product: ShoppingBag,
  form: FormInput,
  gallery: Images,
  email: Mail,
  phone: Phone,
  booking: CalendarDays,
  location: MapPin,
  event: Ticket,
  heading: Sparkles,
  announcement: Sparkles,
  quote: Quote,
};

function useActiveBentoConfig(config?: BentoBioConfig) {
  const builderCtx = useOptionalVisualBuilder();
  return normalizeBentoConfig((builderCtx?.templateData as { bentoBioConfig?: unknown } | undefined)?.bentoBioConfig || config || DEFAULT_BENTO_CONFIG);
}

function getPresetSurface(config: BentoBioConfig) {
  const preset = BENTO_BIO_PRESETS.find((item) => item.id === config.presetGradient) || BENTO_BIO_PRESETS[0];
  const dark = preset.id === 'influencer';
  const background = dark
    ? 'radial-gradient(circle at top, rgba(244,63,94,0.14), transparent 32%), linear-gradient(180deg, rgba(15,16,22,1) 0%, rgba(12,13,18,1) 100%)'
    : 'radial-gradient(circle at top, rgba(37,99,235,0.12), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 100%)';
  return { preset, dark, background };
}

function getWidgetIconKey(widget: BentoBioWidget) {
  return widget.platform || widget.kind || widget.type;
}

function getPlatformLabel(platform?: SocialPlatformId) {
  return SOCIAL_PLATFORMS.find((item) => item.id === platform)?.label || 'Social';
}

function getSelectableWidgetId(widgetId: string) {
  return `${widgetId}-card`;
}

function getWidgetIdFromSelection(id?: string | null) {
  if (!id) return null;
  return id.endsWith('-card') ? id.slice(0, -5) : id.split('-').slice(0, -1).join('-') || id;
}

function ProfileHeader({ name, bio, avatar, config, isEditing }: { name: string; bio: string; avatar: string; config: BentoBioConfig; isEditing: boolean }) {
  const { dark } = getPresetSurface(config);
  const websiteLabel = config.websiteLabel || 'portiva.in';
  const socialEntries = SOCIAL_PLATFORMS.filter((platform) => Boolean(config.socials[platform.id]));

  return (
    <section className={`relative overflow-hidden rounded-[28px] border px-5 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] ${dark ? 'border-white/10 bg-white/6 text-white' : 'border-black/6 bg-white/92 text-zinc-950'}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_70%)]" />
      <div className="relative flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[24px] border border-white/40 bg-theme-surface shadow-sm">
            <EditableImage
              imageKey="bento-avatar"
              defaultSrc={avatar}
              defaultAlt={name}
              className="h-full w-full object-cover"
              containerClassName="h-full w-full"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <EditableElement
                as="h1"
                id="bento-name"
                field="name"
                value={name}
                type="heading"
                className="text-[1.35rem] font-semibold tracking-[-0.03em] leading-none"
              />
              {config.showVerified ? <BadgeCheck className="h-4.5 w-4.5 text-theme-primary" /> : null}
            </div>
            <EditableElement
              as="p"
              id="bento-bio"
              field="bio"
              value={bio}
              type="text"
              className={`mt-2 text-sm leading-5 ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}
            />
            <div className={`mt-3 flex flex-wrap items-center gap-2 text-[11px] font-medium ${dark ? 'text-zinc-300' : 'text-zinc-500'}`}>
              {config.showLocation && config.location ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-black/6 bg-black/4 px-2.5 py-1 dark:border-white/8 dark:bg-white/6">
                  <MapPin className="h-3 w-3 text-theme-primary" />
                  <EditableElement as="span" id="bento-location" field="location" value={config.location} type="text" className="" />
                </span>
              ) : null}
              {config.showWebsite && config.websiteUrl ? (
                <EditableButton
                  buttonKey="bento-website"
                  defaultText={websiteLabel}
                  defaultHref={config.websiteUrl}
                  defaultOpenInNewTab
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${dark ? 'border-white/8 bg-white/6 text-zinc-200' : 'border-black/6 bg-black/4 text-zinc-600'}`}
                >
                  <Globe className="h-3 w-3 text-theme-primary" />
                  <span>{websiteLabel}</span>
                </EditableButton>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <EditableButton
            buttonKey="bento-primary-cta"
            defaultText={config.primaryActionLabel || 'Open portfolio'}
            defaultHref={config.primaryActionHref || '#'}
            defaultOpenInNewTab
            className="inline-flex items-center gap-2 rounded-full bg-theme-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(37,99,235,0.25)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{config.primaryActionLabel || 'Open portfolio'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </EditableButton>

          <div className="flex items-center gap-1.5">
            {socialEntries.map((platform) => {
              const Icon = iconMap[platform.iconKey] || Globe;
              return (
                <EditableButton
                  key={platform.id}
                  buttonKey={`bento-social-${platform.id}`}
                  defaultText={platform.label}
                  defaultHref={config.socials[platform.id]}
                  defaultOpenInNewTab
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all ${dark ? 'border-white/10 bg-white/6 text-zinc-100 hover:bg-white/12' : 'border-black/6 bg-black/4 text-zinc-700 hover:bg-black/7'}`}
                >
                  <Icon className="h-4 w-4" />
                </EditableButton>
              );
            })}
            {isEditing && socialEntries.length === 0 ? (
              <div className={`rounded-full border px-3 py-2 text-[11px] ${dark ? 'border-white/10 bg-white/6 text-zinc-400' : 'border-black/6 bg-black/4 text-zinc-500'}`}>Add social links</div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function WidgetActions({
  widget,
  isEditing,
  isSelected,
  isOpen,
  onToggle,
  onReplace,
  onDuplicate,
  onHide,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  widget: BentoBioWidget;
  isEditing: boolean;
  isSelected: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onReplace: () => void;
  onDuplicate: () => void;
  onHide: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  if (!isEditing || !isSelected) return null;

  return (
    <div className="pointer-events-none absolute inset-x-3 top-3 z-30 flex items-start justify-between gap-2">
      <div className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-black/6 bg-white/95 p-1 shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onReplace();
          }}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          <span>Replace</span>
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onMoveUp();
          }}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          <LayoutTemplate className="h-3.5 w-3.5" />
          <span>Layout</span>
        </button>
      </div>
      <div className="pointer-events-auto relative">
        <button
          type="button"
          aria-label={`Open menu for ${widget.title || widget.type}`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onToggle();
          }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/6 bg-white/95 text-zinc-500 shadow-sm transition hover:text-zinc-900"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
        {isOpen ? (
          <div className="absolute right-0 mt-2 min-w-40 rounded-2xl border border-black/6 bg-white p-1.5 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
            {[
              { icon: Copy, label: 'Duplicate', action: onDuplicate },
              { icon: ChevronUp, label: 'Move up', action: onMoveUp },
              { icon: ChevronDown, label: 'Move down', action: onMoveDown },
              { icon: EyeOff, label: widget.visible ? 'Hide' : 'Show', action: onHide },
              { icon: Trash2, label: 'Delete', action: onDelete },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  item.action();
                  onToggle();
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[11px] font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                <item.icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function WidgetDragHandle({ widgetId, onStart }: { widgetId: string; onStart: (widgetId: string) => void }) {
  return (
    <button
      type="button"
      aria-label="Drag widget"
      onPointerDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onStart(widgetId);
      }}
      className="pointer-events-auto absolute left-3 top-3 z-30 inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/6 bg-white/92 text-zinc-500 shadow-sm transition hover:text-zinc-900"
    >
      <GripVertical className="h-4 w-4" />
    </button>
  );
}

function EmptyState({ isEditing, onAdd }: { isEditing: boolean; onAdd?: () => void }) {
  return (
    <div className="rounded-[32px] border border-dashed border-black/10 bg-white/92 px-6 py-12 text-center shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-theme-primary/10 text-theme-primary">
        <Sparkles className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-zinc-950">Build your Bento</h2>
      <p className="mx-auto mt-2 max-w-[260px] text-sm leading-6 text-zinc-500">
        Add few strong cards. Portiva handles spacing, hierarchy, and stable composition.
      </p>
      {isEditing ? (
        <button type="button" onClick={onAdd} className="mt-5 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white">
          <span>Add content</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  );
}

function LinkWidget({ widget, dark }: { widget: BentoBioWidget; dark: boolean }) {
  const showMeta = widget.size !== '2x1';
  return (
    <EditableButton
      buttonKey={`${widget.id}-button`}
      defaultText={widget.title || 'Link'}
      defaultHref={widget.url || '#'}
      defaultOpenInNewTab
      className={`group flex h-full w-full flex-col justify-between text-left ${dark ? 'text-white' : 'text-zinc-950'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          {widget.badge ? <span className="mb-2 inline-flex rounded-full bg-theme-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-theme-primary">{widget.badge}</span> : null}
          <EditableElement as="div" id={`${widget.id}-title`} field="title" value={widget.title || 'Link'} type="text" className="text-base font-semibold tracking-[-0.02em] line-clamp-2" />
          {widget.subtitle ? <EditableElement as="p" id={`${widget.id}-subtitle`} field="subtitle" value={widget.subtitle} type="text" className={`mt-1 text-[12px] leading-5 line-clamp-2 ${dark ? 'text-zinc-300' : 'text-zinc-500'}`} /> : null}
        </div>
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-theme-primary/10 text-theme-primary transition group-hover:scale-105">
          <Link2 className="h-4 w-4" />
        </div>
      </div>
      {showMeta ? (
        <div className={`mt-4 flex items-center justify-between border-t pt-3 text-[11px] ${dark ? 'border-white/10 text-zinc-300' : 'border-black/6 text-zinc-500'}`}>
          <span>{widget.ctaLabel || 'Open'}</span>
          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
        </div>
      ) : null}
    </EditableButton>
  );
}

function SocialWidget({ widget, dark }: { widget: BentoBioWidget; dark: boolean }) {
  const iconKey = getWidgetIconKey(widget);
  const platformLabel = getPlatformLabel(widget.platform);
  const iconOnly = widget.presentation === 'icon' && widget.size === '1x1';

  return (
    <EditableButton
      buttonKey={`${widget.id}-button`}
      defaultText={widget.title || platformLabel}
      defaultHref={widget.url || '#'}
      defaultOpenInNewTab
      className={`group flex h-full w-full ${iconOnly ? 'items-center justify-center' : 'items-center gap-3'} ${dark ? 'text-white' : 'text-zinc-950'}`}
    >
        <div className={`inline-flex ${iconOnly ? 'h-12 w-12 rounded-[20px]' : 'h-11 w-11 rounded-[18px]'} items-center justify-center bg-theme-primary/10 text-theme-primary transition group-hover:scale-105`}>
          {React.createElement(iconMap[iconKey] || Globe, { className: iconOnly ? 'h-5 w-5' : 'h-4.5 w-4.5' })}
        </div>

      {iconOnly ? null : (
        <div className="min-w-0 flex-1">
          <EditableElement as="div" id={`${widget.id}-title`} field="title" value={widget.title || platformLabel} type="text" className="truncate text-sm font-semibold tracking-[-0.02em]" />
          <EditableElement as="p" id={`${widget.id}-username`} field="username" value={widget.username || `@${platformLabel.toLowerCase()}`} type="text" className={`truncate text-[11px] ${dark ? 'text-zinc-300' : 'text-zinc-500'}`} />
        </div>
      )}
    </EditableButton>
  );
}

function YouTubeWidget({ widget, dark }: { widget: BentoBioWidget; dark: boolean }) {
  const feature = widget.size === '4x2';
  const compact = widget.size === '2x2';
  const thumbnail = widget.thumbnailUrl || widget.imageUrl || DEFAULT_BENTO_BOXES.find((item) => item.type === 'youtube')?.thumbnailUrl || '';

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="relative overflow-hidden rounded-[22px] border border-black/6 bg-black/5">
        <EditableImage
          imageKey={`${widget.id}-thumbnail`}
          defaultSrc={thumbnail}
          defaultAlt={widget.alt || widget.title || 'YouTube preview'}
          className={`${feature ? 'h-40' : compact ? 'h-28' : 'h-24'} w-full object-cover transition duration-500 group-hover:scale-[1.03]`}
          containerClassName={`${feature ? 'h-40' : compact ? 'h-28' : 'h-24'} w-full`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/18 text-white backdrop-blur-sm">
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-3">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-theme-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-theme-primary">
            <YouTubeMark className="h-3.5 w-3.5" />
            <span>{widget.kind === 'channel' ? 'Channel' : widget.kind === 'playlist' ? 'Playlist' : 'Video'}</span>
          </div>
          <EditableElement as="div" id={`${widget.id}-title`} field="title" value={widget.title || 'YouTube'} type="text" className="text-base font-semibold tracking-[-0.02em] line-clamp-2" />
          {widget.subtitle ? <EditableElement as="p" id={`${widget.id}-subtitle`} field="subtitle" value={widget.subtitle} type="text" className={`mt-1 text-[12px] leading-5 line-clamp-2 ${dark ? 'text-zinc-300' : 'text-zinc-500'}`} /> : null}
        </div>
        <EditableButton
          buttonKey={`${widget.id}-button`}
          defaultText={widget.ctaLabel || 'Watch'}
          defaultHref={widget.url || '#'}
          defaultOpenInNewTab
          className="inline-flex items-center gap-2 self-start rounded-full bg-theme-primary px-3.5 py-2 text-[11px] font-semibold text-white transition hover:scale-[1.02]"
        >
          <span>{widget.ctaLabel || 'Watch'}</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </EditableButton>
      </div>
    </div>
  );
}

function SpotifyWidget({ widget, dark }: { widget: BentoBioWidget; dark: boolean }) {
  const art = widget.imageUrl || DEFAULT_BENTO_BOXES.find((item) => item.type === 'product')?.imageUrl || '';
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="h-16 w-16 overflow-hidden rounded-[20px] border border-black/6 bg-black/5">
          <EditableImage
            imageKey={`${widget.id}-cover`}
            defaultSrc={art}
            defaultAlt={widget.alt || widget.title || 'Spotify art'}
            className="h-full w-full object-cover"
            containerClassName="h-full w-full"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-theme-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-theme-primary">
            <SpotifyMark className="h-3.5 w-3.5" />
            <span>{widget.kind === 'playlist' ? 'Playlist' : widget.kind === 'artist' ? 'Artist' : 'Song'}</span>
          </div>
          <EditableElement as="div" id={`${widget.id}-title`} field="title" value={widget.title || 'Spotify'} type="text" className="line-clamp-2 text-sm font-semibold tracking-[-0.02em]" />
          {widget.subtitle ? <EditableElement as="p" id={`${widget.id}-subtitle`} field="subtitle" value={widget.subtitle} type="text" className={`mt-1 line-clamp-2 text-[12px] ${dark ? 'text-zinc-300' : 'text-zinc-500'}`} /> : null}
        </div>
      </div>
      <EditableButton
        buttonKey={`${widget.id}-button`}
        defaultText={widget.ctaLabel || 'Listen'}
        defaultHref={widget.url || '#'}
        defaultOpenInNewTab
        className="mt-auto inline-flex items-center gap-2 self-start rounded-full border border-black/6 bg-black/4 px-3.5 py-2 text-[11px] font-semibold text-theme-primary transition hover:bg-theme-primary hover:text-white dark:border-white/10 dark:bg-white/6"
      >
        <Play className="h-3.5 w-3.5 fill-current" />
        <span>{widget.ctaLabel || 'Listen'}</span>
      </EditableButton>
    </div>
  );
}

function GalleryWidget({ widget, dark }: { widget: BentoBioWidget; dark: boolean }) {
  const fallbackItems = DEFAULT_BENTO_BOXES.find((item) => item.type === 'gallery')?.items || [];
  const image = widget.imageUrl || widget.items?.[0] || fallbackItems[0] || '';

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[22px] border border-black/6 bg-black/5">
        <EditableImage
          imageKey={`${widget.id}-image-0`}
          defaultSrc={image}
          defaultAlt={widget.alt || widget.title || 'Image'}
          className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
          containerClassName="h-full w-full min-h-[10rem]"
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <EditableElement as="div" id={`${widget.id}-title`} field="title" value={widget.title || 'Image'} type="text" className="text-sm font-semibold tracking-[-0.02em] line-clamp-1" />
        <span className={`text-[11px] ${dark ? 'text-zinc-300' : 'text-zinc-500'}`}>Image</span>
      </div>
    </div>
  );
}

function ProductWidget({ widget, dark }: { widget: BentoBioWidget; dark: boolean }) {
  const image = widget.imageUrl || DEFAULT_BENTO_BOXES.find((item) => item.type === 'product')?.imageUrl || '';
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="relative overflow-hidden rounded-[22px] border border-black/6 bg-black/5">
        <EditableImage
          imageKey={`${widget.id}-image`}
          defaultSrc={image}
          defaultAlt={widget.alt || widget.title || 'Product image'}
          className="h-32 w-full object-cover transition duration-500 hover:scale-[1.03]"
          containerClassName="h-32 w-full"
        />
        {widget.badge ? <span className="absolute left-3 top-3 rounded-full bg-zinc-950 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">{widget.badge}</span> : null}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-3">
        <div>
          <EditableElement as="div" id={`${widget.id}-title`} field="title" value={widget.title || 'Product'} type="text" className="text-base font-semibold tracking-[-0.02em] line-clamp-2" />
          {widget.subtitle ? <EditableElement as="p" id={`${widget.id}-subtitle`} field="subtitle" value={widget.subtitle} type="text" className={`mt-1 text-[12px] leading-5 line-clamp-2 ${dark ? 'text-zinc-300' : 'text-zinc-500'}`} /> : null}
          {widget.price ? <EditableElement as="div" id={`${widget.id}-price`} field="price" value={widget.price} type="text" className="mt-3 text-base font-semibold tracking-[-0.03em] text-theme-primary" /> : null}
        </div>
        <EditableButton
          buttonKey={`${widget.id}-button`}
          defaultText={widget.ctaLabel || 'View product'}
          defaultHref={widget.url || '#'}
          defaultOpenInNewTab
          className="inline-flex items-center gap-2 self-start rounded-full bg-theme-primary px-3.5 py-2 text-[11px] font-semibold text-white transition hover:scale-[1.02]"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>{widget.ctaLabel || 'View product'}</span>
        </EditableButton>
      </div>
    </div>
  );
}

function CollectionWidget({ widget, dark }: { widget: BentoBioWidget; dark: boolean }) {
  const items = widget.items || [];
  const showAll = widget.size === '4x2';
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <EditableElement as="div" id={`${widget.id}-title`} field="title" value={widget.title || 'Collection'} type="text" className="text-sm font-semibold tracking-[-0.02em]" />
        <div className="rounded-full bg-theme-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-theme-primary">Collection</div>
      </div>
      {widget.subtitle ? <EditableElement as="p" id={`${widget.id}-subtitle`} field="subtitle" value={widget.subtitle} type="text" className={`text-[12px] leading-5 ${dark ? 'text-zinc-300' : 'text-zinc-500'}`} /> : null}
      <div className="grid gap-2">
        {(showAll ? items : items.slice(0, 4)).map((item, index) => (
          <div key={`${widget.id}-item-${index}`} className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-[12px] ${dark ? 'border-white/10 bg-white/6 text-zinc-100' : 'border-black/6 bg-black/4 text-zinc-700'}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-theme-primary" />
            <span className="truncate">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormWidget({ widget, dark }: { widget: BentoBioWidget; dark: boolean }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <div>
        <EditableElement as="div" id={`${widget.id}-title`} field="title" value={widget.title || 'Form'} type="text" className="text-sm font-semibold tracking-[-0.02em]" />
        {widget.subtitle ? <EditableElement as="p" id={`${widget.id}-subtitle`} field="subtitle" value={widget.subtitle} type="text" className={`mt-1 text-[12px] leading-5 ${dark ? 'text-zinc-300' : 'text-zinc-500'}`} /> : null}
      </div>
      <div className="grid gap-2">
        <div className={`rounded-2xl border px-3 py-2 text-[12px] ${dark ? 'border-white/10 bg-white/6 text-zinc-400' : 'border-black/6 bg-black/4 text-zinc-400'}`}>Email address</div>
        <div className={`rounded-2xl border px-3 py-2 text-[12px] ${dark ? 'border-white/10 bg-white/6 text-zinc-400' : 'border-black/6 bg-black/4 text-zinc-400'}`}>Optional note</div>
      </div>
      <EditableButton
        buttonKey={`${widget.id}-button`}
        defaultText={widget.ctaLabel || 'Open form'}
        defaultHref={widget.url || '#'}
        defaultOpenInNewTab
        className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-theme-primary px-3.5 py-2 text-[11px] font-semibold text-white transition hover:scale-[1.02]"
      >
        <FormInput className="h-3.5 w-3.5" />
        <span>{widget.ctaLabel || 'Open form'}</span>
      </EditableButton>
    </div>
  );
}

function ContactWidget({ widget, dark }: { widget: BentoBioWidget; dark: boolean }) {
  const iconKey = getWidgetIconKey(widget);
  return (
    <EditableButton
      buttonKey={`${widget.id}-button`}
      defaultText={widget.title || 'Contact'}
      defaultHref={widget.url || '#'}
      defaultOpenInNewTab
      className={`group flex h-full w-full items-center gap-3 ${dark ? 'text-white' : 'text-zinc-950'}`}
    >
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-[18px] bg-theme-primary/10 text-theme-primary transition group-hover:scale-105">
        {React.createElement(iconMap[iconKey] || Globe, { className: 'h-4.5 w-4.5' })}
      </div>
      <div className="min-w-0 flex-1">
        <EditableElement as="div" id={`${widget.id}-title`} field="title" value={widget.title || 'Contact'} type="text" className="truncate text-sm font-semibold tracking-[-0.02em]" />
        {widget.subtitle ? <EditableElement as="p" id={`${widget.id}-subtitle`} field="subtitle" value={widget.subtitle} type="text" className={`truncate text-[11px] ${dark ? 'text-zinc-300' : 'text-zinc-500'}`} /> : null}
      </div>
      <ArrowRight className="h-3.5 w-3.5 text-zinc-400 transition group-hover:translate-x-1" />
    </EditableButton>
  );
}

function EventWidget({ widget, dark }: { widget: BentoBioWidget; dark: boolean }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-theme-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-theme-primary">Event</div>
        <Timer className="h-4 w-4 text-theme-primary" />
      </div>
      <EditableElement as="div" id={`${widget.id}-title`} field="title" value={widget.title || 'Event'} type="text" className="text-sm font-semibold tracking-[-0.02em]" />
      <div className={`grid gap-2 text-[12px] ${dark ? 'text-zinc-300' : 'text-zinc-500'}`}>
        {widget.eventDate ? <div className="inline-flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-theme-primary" /><EditableElement as="span" id={`${widget.id}-eventDate`} field="eventDate" value={widget.eventDate} type="text" className="" /></div> : null}
        {widget.eventTime ? <div className="inline-flex items-center gap-2"><Timer className="h-3.5 w-3.5 text-theme-primary" /><EditableElement as="span" id={`${widget.id}-eventTime`} field="eventTime" value={widget.eventTime} type="text" className="" /></div> : null}
        {widget.eventLocation ? <div className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-theme-primary" /><EditableElement as="span" id={`${widget.id}-eventLocation`} field="eventLocation" value={widget.eventLocation} type="text" className="" /></div> : null}
      </div>
      <EditableButton
        buttonKey={`${widget.id}-button`}
        defaultText={widget.ctaLabel || 'RSVP'}
        defaultHref={widget.url || '#'}
        defaultOpenInNewTab
        className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-theme-primary px-3.5 py-2 text-[11px] font-semibold text-white transition hover:scale-[1.02]"
      >
        <Ticket className="h-3.5 w-3.5" />
        <span>{widget.ctaLabel || 'RSVP'}</span>
      </EditableButton>
    </div>
  );
}

function TextWidget({ widget, dark }: { widget: BentoBioWidget; dark: boolean }) {
  if (widget.kind === 'quote') {
    return (
      <div className="flex h-full flex-col justify-between gap-4">
        <Quote className="h-5 w-5 text-theme-primary" />
        <EditableElement as="div" id={`${widget.id}-title`} field="title" value={widget.title || 'Quote'} type="text" className="text-sm leading-6 font-medium italic tracking-[-0.02em]" />
        {widget.subtitle ? <EditableElement as="div" id={`${widget.id}-subtitle`} field="subtitle" value={widget.subtitle} type="text" className={`text-[11px] uppercase tracking-[0.16em] ${dark ? 'text-zinc-300' : 'text-zinc-500'}`} /> : null}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-between gap-3">
      <div>
        {widget.badge ? <div className="mb-2 inline-flex rounded-full bg-theme-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-theme-primary">{widget.badge}</div> : null}
        <EditableElement as="div" id={`${widget.id}-title`} field="title" value={widget.title || 'Text'} type="text" className="text-sm font-semibold tracking-[-0.02em]" />
        {widget.subtitle ? <EditableElement as="p" id={`${widget.id}-subtitle`} field="subtitle" value={widget.subtitle} type="text" className={`mt-1 text-[12px] leading-5 ${dark ? 'text-zinc-300' : 'text-zinc-500'}`} /> : null}
      </div>
      {widget.url ? (
        <EditableButton
          buttonKey={`${widget.id}-button`}
          defaultText={widget.ctaLabel || 'Open'}
          defaultHref={widget.url}
          defaultOpenInNewTab
          className="inline-flex items-center gap-2 self-start rounded-full border border-black/6 bg-black/4 px-3.5 py-2 text-[11px] font-semibold text-theme-primary transition hover:bg-theme-primary hover:text-white dark:border-white/10 dark:bg-white/6"
        >
          <span>{widget.ctaLabel || 'Open'}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </EditableButton>
      ) : null}
    </div>
  );
}

function SocialGroupWidget({ config, dark }: { config: BentoBioConfig; dark: boolean }) {
  const socials = SOCIAL_PLATFORMS.filter((platform) => Boolean(config.socials[platform.id]));
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold tracking-[-0.02em]">Social</div>
        <div className={`text-[11px] ${dark ? 'text-zinc-300' : 'text-zinc-500'}`}>{socials.length} profiles</div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {socials.map((platform) => {
          const Icon = iconMap[platform.iconKey] || Globe;
          return (
            <EditableButton
              key={platform.id}
              buttonKey={`bento-social-group-${platform.id}`}
              defaultText={platform.label}
              defaultHref={config.socials[platform.id]}
              defaultOpenInNewTab
              className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-left text-[12px] font-medium transition ${dark ? 'border-white/10 bg-white/6 text-zinc-100 hover:bg-white/10' : 'border-black/6 bg-black/4 text-zinc-700 hover:bg-black/7'}`}
            >
              <Icon className="h-3.5 w-3.5 text-theme-primary" />
              <span className="truncate">{platform.label}</span>
            </EditableButton>
          );
        })}
      </div>
    </div>
  );
}

function WidgetContent({ widget, config, dark }: { widget: BentoBioWidget; config: BentoBioConfig; dark: boolean }) {
  switch (widget.type) {
    case 'link':
      return <LinkWidget widget={widget} dark={dark} />;
    case 'social':
      return <SocialWidget widget={widget} dark={dark} />;
    case 'youtube':
      return <YouTubeWidget widget={widget} dark={dark} />;
    case 'spotify':
      return <SpotifyWidget widget={widget} dark={dark} />;
    case 'gallery':
      return <GalleryWidget widget={widget} dark={dark} />;
    case 'product':
      return <ProductWidget widget={widget} dark={dark} />;
    case 'collection':
      return <CollectionWidget widget={widget} dark={dark} />;
    case 'form':
      return <FormWidget widget={widget} dark={dark} />;
    case 'contact':
      return <ContactWidget widget={widget} dark={dark} />;
    case 'event':
      return <EventWidget widget={widget} dark={dark} />;
    case 'social_group':
      return <SocialGroupWidget config={config} dark={dark} />;
    case 'text':
    default:
      return <TextWidget widget={widget} dark={dark} />;
  }
}

function BentoGrid({
  config,
  widgets,
  isEditing,
  selectedWidgetId,
  onReplace,
  onDuplicate,
  onDelete,
  onToggleVisibility,
  onMoveUp,
  onMoveDown,
  onPointerDragStart,
}: {
  config: BentoBioConfig;
  widgets: BentoBioWidget[];
  isEditing: boolean;
  selectedWidgetId: string | null;
  onReplace: (widgetId: string) => void;
  onDuplicate: (widgetId: string) => void;
  onDelete: (widgetId: string) => void;
  onToggleVisibility: (widgetId: string) => void;
  onMoveUp: (widgetId: string) => void;
  onMoveDown: (widgetId: string) => void;
  onPointerDragStart: (widgetId: string) => void;
}) {
  const [menuWidgetId, setMenuWidgetId] = useState<string | null>(null);
  const { dark } = getPresetSurface(config);
  const layout = useMemo(() => computeBentoPlacements(widgets, config.composition.slotAssignments), [config.composition.slotAssignments, widgets]);
  const { placements, rowCount } = layout;
  const placementMap = useMemo(() => new Map(placements.map((placement) => [placement.id, placement])), [placements]);

  if (!widgets.length) {
    return <EmptyState isEditing={isEditing} />;
  }

  return (
    <main
      className="grid w-full"
      style={{
        gridTemplateColumns: `repeat(${BENTO_GRID_COLUMNS}, minmax(0, 1fr))`,
        gap: `${BENTO_GAP}px`,
        gridAutoRows: `${BENTO_ROW_HEIGHT}px`,
        minHeight: `${rowCount * BENTO_ROW_HEIGHT + (rowCount - 1) * BENTO_GAP}px`,
      }}
    >
      {widgets.filter((widget) => widget.visible).map((widget) => {
        const placement = placementMap.get(widget.id);
        if (!placement) return null;
        const selected = selectedWidgetId === widget.id;
        return (
            <EditableElement
              key={widget.id}
              as="div"
              id={getSelectableWidgetId(widget.id)}
              field="container"
              value={widget.title || widget.type}
              type="box"
              className={`group relative min-h-0 overflow-visible rounded-[32px] border p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-[transform,box-shadow,border-color,grid-column,grid-row] duration-200 ${dark ? 'border-white/10 bg-white/7 text-white' : 'border-black/6 bg-white/94 text-zinc-950'} ${selected ? 'ring-1 ring-theme-primary/45' : ''}`}
              style={{
                gridColumn: `${placement.colStart} / span ${placement.colSpan}`,
                gridRow: `${placement.rowStart} / span ${placement.rowSpan}`,
                minHeight: 0,
              }}
              data-bento-drop={widget.id}
            >
              <div className={`absolute inset-0 rounded-[32px] transition ${selected ? 'shadow-[0_0_0_1px_rgba(37,99,235,0.22)]' : ''}`} />
              <WidgetActions
                widget={widget}
                isEditing={isEditing}
                isSelected={selected}
                isOpen={menuWidgetId === widget.id}
                onToggle={() => setMenuWidgetId((current) => (current === widget.id ? null : widget.id))}
                onReplace={() => onReplace(widget.id)}
                onDuplicate={() => onDuplicate(widget.id)}
                onHide={() => onToggleVisibility(widget.id)}
                onDelete={() => onDelete(widget.id)}
                onMoveUp={() => onMoveUp(widget.id)}
                onMoveDown={() => onMoveDown(widget.id)}
              />
              {isEditing ? <WidgetDragHandle widgetId={widget.id} onStart={onPointerDragStart} /> : null}
              <WidgetContent widget={widget} config={config} dark={dark} />
            </EditableElement>
        );
      })}
    </main>
  );
}

export const BentoBio: React.FC<BentoBioProps> = ({
  name = '@yourlinkupaccount',
  bio = 'Premium creator page for links, launches, media, and selected work.',
  avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  config,
}) => {
  const builder = useOptionalVisualBuilder();

  const activeConfig = useActiveBentoConfig(config);
  const widgets = activeConfig.boxes.filter((widget) => widget.visible);
  const { dark, background } = getPresetSurface(activeConfig);
  const isEditing = builder?.mode === 'EDITING';
  const selectedWidgetId = getWidgetIdFromSelection(builder?.selectedElement?.id || null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [contentLibraryState, setContentLibraryState] = useState<{ widgetId: string | null; nonce: number }>({ widgetId: null, nonce: 0 });
  const dragStateRef = useRef<DragState | null>(null);

  const updateConfig = useCallback(
    (updater: (current: BentoBioConfig) => BentoBioConfig) => {
      if (!builder) return;
      builder.setTemplateData((previous) => {
        const previousRecord = previous as typeof previous & { bentoBioConfig?: unknown };
        const currentConfig = normalizeBentoConfig(previousRecord.bentoBioConfig || DEFAULT_BENTO_CONFIG);
        return {
          ...previous,
          bentoBioConfig: updater(currentConfig),
        };
      });
    },
    [builder],
  );

  const handleDuplicate = useCallback((widgetId: string) => {
    updateConfig((current) => {
      const result = duplicateWidget(current.boxes, widgetId, current.composition.slotAssignments);
      return {
        ...current,
        boxes: result.widgets,
        composition: {
          ...current.composition,
          slotAssignments: result.slotAssignments,
        },
      };
    });
  }, [updateConfig]);

  const handleDelete = useCallback((widgetId: string) => {
    updateConfig((current) => {
      const result = removeWidget(current.boxes, widgetId, current.composition.slotAssignments);
      return {
        ...current,
        boxes: result.widgets,
        composition: {
          ...current.composition,
          slotAssignments: result.slotAssignments,
        },
      };
    });
  }, [updateConfig]);

  const handleToggleVisibility = useCallback((widgetId: string) => {
    updateConfig((current) => {
      const result = toggleWidgetVisibility(current.boxes, widgetId, current.composition.slotAssignments);
      return {
        ...current,
        boxes: result.widgets,
        composition: {
          ...current.composition,
          slotAssignments: result.slotAssignments,
        },
      };
    });
  }, [updateConfig]);

  const handleMoveByStep = useCallback((widgetId: string, direction: -1 | 1) => {
    updateConfig((current) => {
      const result = moveWidgetByStep(current.boxes, widgetId, direction, current.composition.slotAssignments);
      return {
        ...current,
        boxes: result.widgets,
        composition: {
          ...current.composition,
          slotAssignments: result.slotAssignments,
        },
      };
    });
  }, [updateConfig]);

  const handlePointerDragStart = useCallback((widgetId: string) => {
    if (!isEditing) return;
    const nextState: DragState = { draggedId: widgetId, targetId: null, position: 'after' };
    dragStateRef.current = nextState;
    setDragState(nextState);
  }, [isEditing]);

  useEffect(() => {
    if (!dragState) return undefined;

    const handleMove = (event: PointerEvent) => {
      const element = document.elementFromPoint(event.clientX, event.clientY);
      const target = element?.closest('[data-bento-drop]') as HTMLElement | null;
      if (!target) {
        const cleared: DragState = { ...dragStateRef.current!, targetId: null, position: 'after' };
        dragStateRef.current = cleared;
        setDragState(cleared);
        return;
      }
      const targetId = target.dataset.bentoDrop;
      if (!targetId || targetId === dragStateRef.current?.draggedId) return;
      const rect = target.getBoundingClientRect();
      const position = event.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
      const updated: DragState = { draggedId: dragStateRef.current!.draggedId, targetId, position };
      dragStateRef.current = updated;
      setDragState(updated);
    };

      const handleUp = () => {
      const current = dragStateRef.current;
      if (current?.targetId && current.targetId !== current.draggedId) {
        updateConfig((state) => {
          const result = moveWidget(state.boxes, current.draggedId, current.targetId!, current.position, state.composition.slotAssignments);
          return {
            ...state,
            boxes: result.widgets,
            composition: {
              ...state.composition,
              slotAssignments: result.slotAssignments,
            },
          };
        });
      }
      dragStateRef.current = null;
      setDragState(null);
    };


    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp, { once: true });

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [dragState, updateConfig]);

  const dropPreview = useMemo<DropPreview>(() => {
    if (!dragState?.targetId) return null;
    const previewResult = moveWidget(
      activeConfig.boxes,
      dragState.draggedId,
      dragState.targetId,
      dragState.position,
      activeConfig.composition.slotAssignments,
    );
    const currentPlacements = new Map(
      computeBentoPlacements(activeConfig.boxes, activeConfig.composition.slotAssignments).placements.map((placement) => [placement.id, placement]),
    );
    const previewPlacements = new Map(
      computeBentoPlacements(previewResult.widgets, previewResult.slotAssignments).placements.map((placement) => [placement.id, placement]),
    );
    const targetPlacement = previewPlacements.get(dragState.draggedId) || previewPlacements.get(dragState.targetId);
    const currentPlacement = currentPlacements.get(dragState.draggedId);
    if (!targetPlacement || !currentPlacement || (targetPlacement.colStart === currentPlacement.colStart && targetPlacement.rowStart === currentPlacement.rowStart)) {
      return null;
    }
    return targetPlacement;
  }, [activeConfig.boxes, activeConfig.composition.slotAssignments, dragState]);

  const presetLabel = CATEGORY_LABELS.view_all;

  useEffect(() => {
    if (!builder || !contentLibraryState.widgetId) return;
    const event = new CustomEvent('portiva:bento-open-library', {
      detail: {
        widgetId: contentLibraryState.widgetId,
        nonce: contentLibraryState.nonce,
      },
    });
    window.dispatchEvent(event);
  }, [builder, contentLibraryState]);

  return (
    <div
      className={`relative flex min-h-screen w-full justify-center px-3 py-6 sm:px-4 sm:py-10 ${dark ? 'text-white' : 'text-zinc-950'}`}
      style={{ background: `linear-gradient(180deg, var(--theme-background) 0%, var(--theme-background) 100%), ${background}` }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-80" style={{ background }} />
      <div className="relative z-10 w-full max-w-[430px]">
        <div className="mb-3 flex items-center justify-between px-1">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${dark ? 'border-white/10 bg-white/6 text-zinc-200' : 'border-black/6 bg-white/70 text-zinc-500'}`}>
            <Sparkles className="h-3.5 w-3.5 text-theme-primary" />
            <span>Portiva Bento</span>
          </div>
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-medium ${dark ? 'border-white/10 bg-white/6 text-zinc-300' : 'border-black/6 bg-white/70 text-zinc-500'}`}>
            <span>{presetLabel}</span>
            <Check className="h-3 w-3 text-theme-primary" />
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          <ProfileHeader name={name} bio={bio} avatar={avatar} config={activeConfig} isEditing={Boolean(isEditing)} />
          <div className="relative">
            <BentoGrid
              config={activeConfig}
              widgets={activeConfig.boxes}
              isEditing={Boolean(isEditing)}
              selectedWidgetId={selectedWidgetId}
              onReplace={(widgetId) => setContentLibraryState({ widgetId, nonce: Date.now() })}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
              onToggleVisibility={handleToggleVisibility}
              onMoveUp={(widgetId) => handleMoveByStep(widgetId, -1)}
              onMoveDown={(widgetId) => handleMoveByStep(widgetId, 1)}
              onPointerDragStart={handlePointerDragStart}
            />
            {dropPreview ? (
              <div
                className="pointer-events-none absolute rounded-[28px] border border-dashed border-theme-primary bg-theme-primary/6 shadow-[0_0_0_1px_rgba(37,99,235,0.18)] transition-all duration-200"
                style={{
                  left: `calc(((100% - ${(BENTO_GRID_COLUMNS - 1) * BENTO_GAP}px) / ${BENTO_GRID_COLUMNS}) * ${dropPreview.colStart - 1} + ${BENTO_GAP * (dropPreview.colStart - 1)}px)`,
                  top: `calc(${(dropPreview.rowStart - 1) * (BENTO_ROW_HEIGHT + BENTO_GAP)}px)`,
                  width: `calc(((100% - ${(BENTO_GRID_COLUMNS - 1) * BENTO_GAP}px) / ${BENTO_GRID_COLUMNS}) * ${dropPreview.colSpan} + ${BENTO_GAP * (dropPreview.colSpan - 1)}px)`,
                  height: `${dropPreview.rowSpan * BENTO_ROW_HEIGHT + (dropPreview.rowSpan - 1) * BENTO_GAP}px`,
                }}
              />
            ) : null}
          </div>
          {!widgets.length ? <EmptyState isEditing={Boolean(isEditing)} onAdd={() => setContentLibraryState({ widgetId: null, nonce: Date.now() })} /> : null}
        </div>
      </div>
    </div>
  );
};
