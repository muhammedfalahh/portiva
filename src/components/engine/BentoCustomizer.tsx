'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Check,
  Copy,
  EyeOff,
  GripVertical,
  Images,
  LayoutTemplate,
  Link2,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Plus,
  RefreshCcw,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  Type,
  X,
  Play,
} from 'lucide-react';
import { useVisualBuilder } from './VisualBuilderContext';
import {
  BENTO_BIO_PRESETS,
  BENTO_LAYOUT_PRESETS,
  BENTO_WIDGET_DEFINITIONS,
  CATEGORY_LABELS,
  DEFAULT_BENTO_CONFIG,
  SOCIAL_PLATFORMS,
  applyPresetToWidgets,
  createWidgetFromDefinition,
  detectWidgetDefinitionFromInput,
  duplicateWidget,
  getDefinitionForWidget,
  getWidgetDefinition,
  insertWidget,
  moveWidgetByStep,
  normalizeBentoConfig,
  removeWidget,
  replaceWidget,
  searchWidgetDefinitions,
  toggleWidgetVisibility,
  updateWidget,
  type BentoBioConfig,
  type BentoBioWidget,
  type BentoWidgetCategory,
  type BentoWidgetDefinition,
  type BentoWidgetSize,
} from '@/lib/bentobio';
import { AssetPipeline } from '@/utils/AssetPipeline';

const categoryIcons: Record<BentoWidgetCategory | 'view_all', React.ComponentType<{ className?: string }>> = {
  suggested: Sparkles,
  commerce: ShoppingBag,
  social: MessageCircle,
  media: Images,
  contact: Mail,
  events: CalendarDays,
  text: Type,
  view_all: Briefcase,
};

const sizeVisuals: Record<BentoWidgetSize, string> = {
  '1x1': 'grid-cols-2 grid-rows-1',
  '2x1': 'grid-cols-2 grid-rows-1',
  '1x2': 'grid-cols-2 grid-rows-3',
  '2x2': 'grid-cols-2 grid-rows-2',
  '4x1': 'grid-cols-4 grid-rows-1',
  '4x2': 'grid-cols-4 grid-rows-2',
};

const sizeLabels: Record<BentoWidgetSize, string> = {
  '1x1': 'Compact',
  '2x1': 'Medium',
  '1x2': 'Tall',
  '2x2': 'Large',
  '4x1': 'Wide',
  '4x2': 'Feature',
};

const quickAddIds = ['youtube-video', 'image-upload', 'social-instagram', 'spotify-playlist', 'link', 'product', 'whatsapp-contact', 'text-announcement'];

function iconForDefinition(definition: BentoWidgetDefinition) {
  const platform = definition.platform ? SOCIAL_PLATFORMS.find((item) => item.id === definition.platform) : null;
  if (platform?.iconKey === 'instagram') return Sparkles;
  if (platform?.iconKey === 'youtube') return Play;
  if (platform?.iconKey === 'spotify') return MessageCircle;
  if (platform?.iconKey === 'linkedin') return Briefcase;
  if (platform?.iconKey === 'whatsapp') return MessageCircle;
  if (definition.iconKey === 'collection') return GripVertical;
  if (definition.iconKey === 'product') return Package;
  if (definition.iconKey === 'form') return Briefcase;
  if (definition.iconKey === 'gallery') return Images;
  if (definition.iconKey === 'email') return Mail;
  if (definition.iconKey === 'phone') return Phone;
  if (definition.iconKey === 'booking') return CalendarDays;
  if (definition.iconKey === 'location') return MapPin;
  if (definition.iconKey === 'heading') return Type;
  if (definition.iconKey === 'announcement') return Sparkles;
  return Link2;
}

function getWidgetIdFromSelection(id?: string | null) {
  if (!id) return null;
  if (id.endsWith('-card')) return id.slice(0, -5);
  const parts = id.split('-');
  if (parts.length > 2) {
    return parts.slice(0, -1).join('-');
  }
  return id;
}

function FileUploadButton({
  label,
  accept,
  onFile,
  disabled,
}: {
  label: string;
  accept: string;
  onFile: (file: File) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onFile(file);
          event.target.value = '';
        }}
      />
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-3 py-2 text-[11px] font-medium text-text-secondary transition hover:bg-bg-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Images className="h-3.5 w-3.5" />
        <span>{label}</span>
      </button>
    </>
  );
}

function SizeSelector({
  value,
  sizes,
  onChange,
}: {
  value: BentoWidgetSize;
  sizes: BentoWidgetSize[];
  onChange: (size: BentoWidgetSize) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => onChange(size)}
          className={`rounded-[20px] border px-3 py-3 text-left transition ${value === size ? 'border-theme-primary bg-theme-primary/8 text-theme-primary' : 'border-border-subtle bg-bg-primary text-text-secondary hover:bg-bg-hover'}`}
        >
          <div className={`grid ${sizeVisuals[size]} h-10 gap-1`}>
            {Array.from({ length: size === '4x2' ? 8 : size === '4x1' ? 4 : size === '2x2' ? 4 : size === '1x2' ? 6 : 2 }).map((_, index) => (
              <span key={index} className={`rounded-sm ${value === size ? 'bg-theme-primary/75' : 'bg-text-quaternary/25'}`} />
            ))}
          </div>
          <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em]">{sizeLabels[size]}</div>
        </button>
      ))}
    </div>
  );
}

function WidgetTile({ definition, onSelect }: { definition: BentoWidgetDefinition; onSelect: () => void }) {
  const Icon = iconForDefinition(definition);
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-start gap-3 rounded-[24px] border border-border-subtle bg-bg-secondary px-4 py-4 text-left transition hover:border-border-default hover:bg-bg-hover"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-theme-primary/10 text-theme-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold text-text-primary">{definition.label}</div>
        <div className="mt-1 text-[11px] leading-5 text-text-quaternary">{definition.description}</div>
      </div>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-text-quaternary" />
    </button>
  );
}

function AddWidgetModal({
  isOpen,
  mode,
  selectedWidget,
  onClose,
  onCreate,
  onReplace,
}: {
  isOpen: boolean;
  mode: 'add' | 'replace';
  selectedWidget: BentoBioWidget | null;
  onClose: () => void;
  onCreate: (definition: BentoWidgetDefinition, values: Partial<Record<keyof BentoBioWidget | 'itemsText', string>>) => void;
  onReplace: (widgetId: string, definition: BentoWidgetDefinition, values: Partial<Record<keyof BentoBioWidget | 'itemsText', string>>) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<BentoWidgetCategory | 'view_all'>('suggested');
  const [query, setQuery] = useState('');
  const [selectedDefinitionId, setSelectedDefinitionId] = useState<string | null>(null);
  const [values, setValues] = useState<Partial<Record<keyof BentoBioWidget | 'itemsText', string>>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const detectedDefinition = useMemo(() => detectWidgetDefinitionFromInput(query), [query]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setActiveCategory('suggested');
      setQuery('');
      setSelectedDefinitionId(null);
      setValues({});
      setUploadError(null);
      setUploading(false);
      return;
    }

    const fallbackDefinition = selectedWidget ? getDefinitionForWidget(selectedWidget) : null;
    setSelectedDefinitionId(fallbackDefinition?.id || null);
    if (selectedWidget) {
      setValues({
        title: selectedWidget.title || '',
        subtitle: selectedWidget.subtitle || '',
        url: selectedWidget.url || '',
        username: selectedWidget.username || '',
        price: selectedWidget.price || '',
        imageUrl: selectedWidget.imageUrl || selectedWidget.thumbnailUrl || selectedWidget.items?.[0] || '',
        thumbnailUrl: selectedWidget.thumbnailUrl || selectedWidget.imageUrl || '',
        badge: selectedWidget.badge || '',
        ctaLabel: selectedWidget.ctaLabel || '',
        itemsText: selectedWidget.items?.join('\n') || '',
        eventDate: selectedWidget.eventDate || '',
        eventTime: selectedWidget.eventTime || '',
        eventLocation: selectedWidget.eventLocation || '',
      });
    } else {
      setValues({});
    }
  }, [isOpen, selectedWidget]);

  useEffect(() => {
    if (detectedDefinition && query.trim()) {
      setSelectedDefinitionId(detectedDefinition.id);
      setValues((current) => ({ ...current, url: query.trim() }));
    }
  }, [detectedDefinition, query]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = searchWidgetDefinitions(query, activeCategory);
  const selectedDefinition = selectedDefinitionId ? getWidgetDefinition(selectedDefinitionId) : null;
  const quickAdds = quickAddIds.map((id) => getWidgetDefinition(id)).filter((item): item is BentoWidgetDefinition => Boolean(item));
  const detectedSuggestions = useMemo(() => {
    if (!detectedDefinition) return [] as BentoWidgetDefinition[];
    const relatedYouTube = detectedDefinition.type === 'youtube'
      ? ['youtube-video', 'youtube-channel', 'youtube-playlist']
          .map((id) => getWidgetDefinition(id))
          .filter((item): item is BentoWidgetDefinition => item !== null)
          .filter((item) => item.id !== detectedDefinition.id)
      : [];
    const relatedSpotify = detectedDefinition.type === 'spotify'
      ? ['spotify-song', 'spotify-playlist', 'spotify-artist']
          .map((id) => getWidgetDefinition(id))
          .filter((item): item is BentoWidgetDefinition => item !== null)
          .filter((item) => item.id !== detectedDefinition.id)
      : [];
    return [detectedDefinition, ...relatedYouTube, ...relatedSpotify];
  }, [detectedDefinition]);

  const handleImageUpload = async (file: File) => {
    try {
      setUploadError(null);
      setUploading(true);
      const blob = await AssetPipeline.processAndCompressImage(file, 1400, 220);
      const filename = await AssetPipeline.uploadToCloudflareR2(blob);
      const publicBase = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
      const publicUrl = publicBase ? `${publicBase.replace(/\/$/, '')}/${filename}` : filename;
      setSelectedDefinitionId('image-upload');
      setValues((current) => ({
        ...current,
        title: current.title || file.name.replace(/\.[^.]+$/, ''),
        imageUrl: publicUrl,
      }));
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen || !isMounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/35 px-4 py-8 backdrop-blur-[2px]">
      <div className="flex max-h-[88vh] w-full max-w-[1040px] overflow-hidden rounded-[32px] border border-border-subtle bg-white shadow-[0_40px_120px_rgba(15,23,42,0.28)]">
        <div className="hidden w-[220px] shrink-0 border-r border-black/6 bg-[#fbfbfa] p-4 md:flex md:flex-col">
          <div className="px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">{mode === 'replace' ? 'Replace' : 'Add'}</div>
          <div className="mt-4 grid gap-1.5">
            {(['suggested', 'commerce', 'social', 'media', 'contact', 'events', 'text', 'view_all'] as const).map((category) => {
              const Icon = categoryIcons[category];
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-left text-sm transition ${activeCategory === category ? 'bg-theme-primary/10 text-theme-primary' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950'}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{CATEGORY_LABELS[category]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-black/6 bg-white px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">{mode === 'replace' ? 'Replace content' : 'Add'}</div>
                <div className="text-[12px] text-zinc-500">Search, paste link, or upload media. Slot stays stable.</div>
              </div>
              <button type="button" onClick={onClose} aria-label="Close add modal" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/6 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 rounded-[22px] border border-black/6 bg-[#fafaf9] px-4 py-3">
              <div className="flex items-center gap-3">
                <Search className="h-4 w-4 text-zinc-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Paste or search a link"
                  className="w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                />
              </div>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            <div className="min-w-0 flex-1 overflow-y-auto px-5 py-5">
              <div className="md:hidden">
                <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                  {(['suggested', 'commerce', 'social', 'media', 'contact', 'events', 'text', 'view_all'] as const).map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-medium ${activeCategory === category ? 'border-theme-primary bg-theme-primary/10 text-theme-primary' : 'border-black/8 text-zinc-600'}`}
                    >
                      {CATEGORY_LABELS[category]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">Suggested</div>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {quickAdds.map((definition) => {
                    const Icon = iconForDefinition(definition);
                    return (
                      <button
                        key={definition.id}
                        type="button"
                        onClick={() => setSelectedDefinitionId(definition.id)}
                        className={`rounded-[22px] border px-3 py-3 text-left transition ${selectedDefinitionId === definition.id ? 'border-theme-primary bg-theme-primary/8' : 'border-black/6 bg-[#fafaf9] hover:bg-zinc-100'}`}
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-theme-primary/10 text-theme-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="mt-3 text-[12px] font-semibold text-zinc-950">{definition.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <FileUploadButton label={uploading ? 'Uploading…' : 'Upload image'} accept="image/*" onFile={handleImageUpload} disabled={uploading} />
                {uploading ? <LoaderCircle className="h-4 w-4 animate-spin text-theme-primary" /> : null}
                {uploadError ? <span className="text-[11px] text-red-600">{uploadError}</span> : null}
              </div>

              {detectedDefinition ? (
                <div className="mt-5 rounded-[24px] border border-theme-primary/20 bg-theme-primary/8 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-theme-primary">Detected from link</div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {detectedSuggestions.map((definition) => (
                      <WidgetTile key={definition.id} definition={definition} onSelect={() => setSelectedDefinitionId(definition.id)} />
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">{CATEGORY_LABELS[activeCategory]}</div>
                <div className="mt-3 grid gap-2">
                  {results.map((definition) => (
                    <WidgetTile key={definition.id} definition={definition} onSelect={() => setSelectedDefinitionId(definition.id)} />
                  ))}
                  {results.length === 0 ? (
                    <div className="rounded-[22px] border border-dashed border-black/10 px-4 py-5 text-sm text-zinc-500">
                      No content match. Try platform name, URL, or media type.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="w-full shrink-0 border-t border-black/6 bg-[#fbfbfa] p-4 lg:w-[340px] lg:border-l lg:border-t-0">
              {selectedDefinition ? (
                <div className="flex h-full flex-col gap-4">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">{mode === 'replace' ? 'Replace with' : 'Create card'}</div>
                    <div className="mt-1 text-base font-semibold tracking-[-0.03em] text-zinc-950">{selectedDefinition.label}</div>
                    <div className="mt-1 text-[12px] leading-5 text-zinc-500">{selectedDefinition.description}</div>
                  </div>

                  <div className="grid gap-3">
                    {selectedDefinition.fields.map((field) => (
                      <label key={field.key} className="grid gap-1.5">
                        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">{field.label}</span>
                        {field.type === 'textarea' ? (
                          <textarea
                            rows={4}
                            value={values[field.key] || ''}
                            onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
                            placeholder={field.placeholder}
                            className="rounded-[20px] border border-black/6 bg-white px-3 py-2 text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                          />
                        ) : (
                          <input
                            value={values[field.key] || ''}
                            onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
                            placeholder={field.placeholder}
                            className="rounded-[20px] border border-black/6 bg-white px-3 py-2 text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                          />
                        )}
                      </label>
                    ))}

                    {selectedDefinition.id === 'image-upload' ? (
                      <label className="grid gap-1.5">
                        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Image URL</span>
                        <input
                          value={values.imageUrl || ''}
                          onChange={(event) => setValues((current) => ({ ...current, imageUrl: event.target.value }))}
                          placeholder="Upload image or paste image URL"
                          className="rounded-[20px] border border-black/6 bg-white px-3 py-2 text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                        />
                      </label>
                    ) : null}
                  </div>

                  <div className="mt-auto flex items-center gap-2 pt-2">
                    <button type="button" onClick={onClose} className="flex-1 rounded-full border border-black/6 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100">Cancel</button>
                    <button
                      type="button"
                      onClick={() => {
                        if (mode === 'replace' && selectedWidget) {
                          onReplace(selectedWidget.id, selectedDefinition, values);
                        } else {
                          onCreate(selectedDefinition, values);
                        }
                        onClose();
                      }}
                      className="flex-1 rounded-full bg-theme-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] transition hover:translate-y-[-1px]"
                    >
                      {mode === 'replace' ? 'Replace' : 'Add'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center rounded-[24px] border border-dashed border-black/10 px-5 py-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-theme-primary/10 text-theme-primary">
                    <Plus className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-sm font-semibold text-zinc-950">Choose content</div>
                  <div className="mt-1 text-[12px] leading-5 text-zinc-500">Pick content type, then add or replace without breaking composition.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function BentoCustomizer() {
  const { templateData, setTemplateData, applyThemePreset, updateThemeColor, selectedElement } = useVisualBuilder();
  const resolvedConfig = normalizeBentoConfig((templateData as { bentoBioConfig?: unknown }).bentoBioConfig || DEFAULT_BENTO_CONFIG);
  const [activeTab, setActiveTab] = useState<'content' | 'appearance' | 'theme'>('content');
  const [modalMode, setModalMode] = useState<'add' | 'replace'>('add');
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(resolvedConfig.boxes[0]?.id || null);

  useEffect(() => {
    const selectedFromCanvas = getWidgetIdFromSelection(selectedElement?.id);
    if (selectedFromCanvas && resolvedConfig.boxes.some((widget) => widget.id === selectedFromCanvas)) {
      setSelectedWidgetId(selectedFromCanvas);
    }
  }, [selectedElement, resolvedConfig.boxes]);

  const updateConfig = (updater: (current: BentoBioConfig) => BentoBioConfig) => {
    setTemplateData((previous) => {
      const current = normalizeBentoConfig((previous as { bentoBioConfig?: unknown }).bentoBioConfig || DEFAULT_BENTO_CONFIG);
      return {
        ...previous,
        bentoBioConfig: updater(current),
      } as typeof previous;
    });
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ widgetId: string | null; nonce: number }>;
      setIsLibraryOpen(true);
      setModalMode(ce.detail?.widgetId ? 'replace' : 'add');
      if (ce.detail?.widgetId && resolvedConfig.boxes.some((w) => w.id === ce.detail!.widgetId)) {
        setSelectedWidgetId(ce.detail.widgetId);
      }
    };
    window.addEventListener('portiva:bento-open-library', handler as EventListener);
    return () => window.removeEventListener('portiva:bento-open-library', handler as EventListener);
  }, [resolvedConfig.boxes]);

  const widgets = resolvedConfig.boxes;
  const selectedWidget = widgets.find((widget) => widget.id === selectedWidgetId) || widgets[0] || null;
  const selectedDefinition = selectedWidget ? getDefinitionForWidget(selectedWidget) : null;
  const visibleWidgets = widgets.filter((widget) => widget.visible);

  const openAdd = () => {
    setModalMode('add');
    setIsLibraryOpen(true);
  };

  const openReplace = () => {
    if (!selectedWidget) return;
    setModalMode('replace');
    setIsLibraryOpen(true);
  };

  const createCard = (definition: BentoWidgetDefinition, values: Partial<Record<keyof BentoBioWidget | 'itemsText', string>>) => {
    const nextWidget = createWidgetFromDefinition(definition, values, resolvedConfig.boxes);
    updateConfig((current) => {
      const result = insertWidget(current.boxes, nextWidget, current.composition.slotAssignments);
      return {
        ...current,
        boxes: result.widgets,
        composition: {
          ...current.composition,
          slotAssignments: result.slotAssignments,
        },
      };
    });
    setSelectedWidgetId(nextWidget.id);
  };

  const replaceCard = (widgetId: string, definition: BentoWidgetDefinition, values: Partial<Record<keyof BentoBioWidget | 'itemsText', string>>) => {
    const nextWidget = createWidgetFromDefinition(definition, values, resolvedConfig.boxes);
    updateConfig((current) => {
      const result = replaceWidget(current.boxes, widgetId, nextWidget, current.composition.slotAssignments);
      return {
        ...current,
        boxes: result.widgets,
        composition: {
          ...current.composition,
          slotAssignments: result.slotAssignments,
        },
      };
    });
    setSelectedWidgetId(widgetId);
  };

  return (
    <div className="flex flex-col gap-4 font-sans text-xs">
      <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border-subtle bg-bg-tertiary p-2">
        {[
          ['content', 'Content'],
          ['appearance', 'Layout'],
          ['theme', 'Theme'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id as 'content' | 'appearance' | 'theme')}
            className={`rounded-xl px-3 py-2 text-[11px] font-semibold transition ${activeTab === id ? 'bg-theme-primary text-white' : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'content' ? (
        <div className="grid gap-4">
          <div className="rounded-[24px] border border-border-subtle bg-bg-secondary p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">Bento overview</div>
                <div className="mt-1 text-sm font-semibold text-text-primary">{visibleWidgets.length} visible cards</div>
                <div className="mt-1 text-[11px] leading-5 text-text-quaternary">Fewer, larger cards. Replace content without rebuilding layout.</div>
              </div>
              <button type="button" onClick={openAdd} className="inline-flex items-center gap-1.5 rounded-full bg-theme-primary px-3.5 py-2 text-[11px] font-semibold text-white">
                <Plus className="h-3.5 w-3.5" />
                <span>Add content</span>
              </button>
            </div>
          </div>

          {selectedWidget ? (
            <div className="rounded-[24px] border border-border-subtle bg-bg-secondary p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">Selected card</div>
                  <div className="mt-1 text-sm font-semibold text-text-primary">{selectedWidget.title || selectedDefinition?.label || selectedWidget.type}</div>
                  <div className="mt-1 text-[11px] text-text-quaternary">{selectedDefinition?.description || 'Card-specific controls only.'}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={openReplace} className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1.5 text-[11px] font-medium text-text-secondary transition hover:bg-bg-hover hover:text-text-primary">
                    <RefreshCcw className="h-3.5 w-3.5" />
                    <span>Replace</span>
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => updateConfig((current) => { const result = duplicateWidget(current.boxes, selectedWidget.id, current.composition.slotAssignments); return { ...current, boxes: result.widgets, composition: { ...current.composition, slotAssignments: result.slotAssignments } }; })} className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-3 py-2 text-[11px] font-medium text-text-secondary transition hover:bg-bg-hover hover:text-text-primary">
                  <Copy className="h-3.5 w-3.5" />
                  <span>Duplicate</span>
                </button>
                <button type="button" onClick={() => updateConfig((current) => { const result = toggleWidgetVisibility(current.boxes, selectedWidget.id, current.composition.slotAssignments); return { ...current, boxes: result.widgets, composition: { ...current.composition, slotAssignments: result.slotAssignments } }; })} className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-3 py-2 text-[11px] font-medium text-text-secondary transition hover:bg-bg-hover hover:text-text-primary">
                  <EyeOff className="h-3.5 w-3.5" />
                  <span>{selectedWidget.visible ? 'Hide' : 'Show'}</span>
                </button>
                <button type="button" onClick={() => updateConfig((current) => { const result = moveWidgetByStep(current.boxes, selectedWidget.id, -1, current.composition.slotAssignments); return { ...current, boxes: result.widgets, composition: { ...current.composition, slotAssignments: result.slotAssignments } }; })} className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-3 py-2 text-[11px] font-medium text-text-secondary transition hover:bg-bg-hover hover:text-text-primary">
                  <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                  <span>Move up</span>
                </button>
                <button type="button" onClick={() => updateConfig((current) => { const result = moveWidgetByStep(current.boxes, selectedWidget.id, 1, current.composition.slotAssignments); return { ...current, boxes: result.widgets, composition: { ...current.composition, slotAssignments: result.slotAssignments } }; })} className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-3 py-2 text-[11px] font-medium text-text-secondary transition hover:bg-bg-hover hover:text-text-primary">
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>Move down</span>
                </button>
                <button type="button" onClick={() => { updateConfig((current) => { const result = removeWidget(current.boxes, selectedWidget.id, current.composition.slotAssignments); return { ...current, boxes: result.widgets, composition: { ...current.composition, slotAssignments: result.slotAssignments } }; }); setSelectedWidgetId(null); }} className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-3 py-2 text-[11px] font-medium text-text-secondary transition hover:bg-bg-hover hover:text-red-600">
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <div className="mt-4 grid gap-3">
                <label className="grid gap-1.5">
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-tertiary">Title</span>
                  <input value={selectedWidget.title || ''} onChange={(event) => updateConfig((current) => { const result = updateWidget(current.boxes, selectedWidget.id, { title: event.target.value }, current.composition.slotAssignments); return { ...current, boxes: result.widgets, composition: { ...current.composition, slotAssignments: result.slotAssignments } }; })} className="rounded-2xl border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none" />
                </label>

                {selectedWidget.subtitle !== undefined || selectedWidget.type !== 'social' ? (
                  <label className="grid gap-1.5">
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-tertiary">Subtitle</span>
                    <input value={selectedWidget.subtitle || ''} onChange={(event) => updateConfig((current) => { const result = updateWidget(current.boxes, selectedWidget.id, { subtitle: event.target.value }, current.composition.slotAssignments); return { ...current, boxes: result.widgets, composition: { ...current.composition, slotAssignments: result.slotAssignments } }; })} className="rounded-2xl border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none" />
                  </label>
                ) : null}

                {'url' in selectedWidget ? (
                  <label className="grid gap-1.5">
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-tertiary">URL</span>
                    <input value={selectedWidget.url || ''} onChange={(event) => updateConfig((current) => { const result = updateWidget(current.boxes, selectedWidget.id, { url: event.target.value }, current.composition.slotAssignments); return { ...current, boxes: result.widgets, composition: { ...current.composition, slotAssignments: result.slotAssignments } }; })} className="rounded-2xl border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none" />
                  </label>
                ) : null}

                {selectedWidget.type === 'product' ? (
                  <label className="grid gap-1.5">
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-tertiary">Price</span>
                    <input value={selectedWidget.price || ''} onChange={(event) => updateConfig((current) => { const result = updateWidget(current.boxes, selectedWidget.id, { price: event.target.value }, current.composition.slotAssignments); return { ...current, boxes: result.widgets, composition: { ...current.composition, slotAssignments: result.slotAssignments } }; })} className="rounded-2xl border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none" />
                  </label>
                ) : null}

                {selectedWidget.type === 'gallery' || selectedWidget.type === 'collection' ? (
                  <label className="grid gap-1.5">
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-tertiary">Items</span>
                    <textarea rows={4} value={(selectedWidget.items || []).join('\n')} onChange={(event) => updateConfig((current) => { const result = updateWidget(current.boxes, selectedWidget.id, { items: event.target.value.split('\n').map((item) => item.trim()).filter(Boolean) }, current.composition.slotAssignments); return { ...current, boxes: result.widgets, composition: { ...current.composition, slotAssignments: result.slotAssignments } }; })} className="rounded-2xl border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none" />
                  </label>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-border-default bg-bg-secondary px-4 py-6 text-center text-[12px] text-text-quaternary">
              Select card on canvas. Content, replace, layout controls appear here.
            </div>
          )}
        </div>
      ) : null}

      {activeTab === 'appearance' ? (
        <div className="grid gap-4">
          {selectedWidget ? (
            <div className="rounded-[24px] border border-border-subtle bg-bg-secondary p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">Card layout</div>
              <div className="mt-1 text-sm font-semibold text-text-primary">Curated sizes only</div>
              <div className="mt-3">
                <SizeSelector
                  value={selectedWidget.size}
                  sizes={selectedDefinition?.supportedSizes || [selectedWidget.size]}
                  onChange={(size) => updateConfig((current) => { const result = updateWidget(current.boxes, selectedWidget.id, { size }, current.composition.slotAssignments); return { ...current, boxes: result.widgets, composition: { ...current.composition, slotAssignments: result.slotAssignments } }; })}
                />
              </div>
            </div>
          ) : null}

          <div className="rounded-[24px] border border-border-subtle bg-bg-secondary p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">Composition preset</div>
            <div className="mt-3 grid gap-2">
              {BENTO_LAYOUT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => updateConfig((current) => {
                    const nextBoxes = applyPresetToWidgets(current.boxes, preset.id);
                    return {
                      ...current,
                      presetGradient: preset.id,
                      boxes: nextBoxes,
                    };
                  })}
                  className={`rounded-[20px] border px-3 py-3 text-left transition ${resolvedConfig.presetGradient === preset.id ? 'border-theme-primary bg-theme-primary/8' : 'border-border-subtle bg-bg-primary hover:bg-bg-hover'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-theme-primary/10 text-theme-primary">
                        <LayoutTemplate className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-text-primary">{preset.label}</div>
                        <div className="mt-1 text-[11px] text-text-quaternary">{preset.description}</div>
                      </div>
                    </div>
                    {resolvedConfig.presetGradient === preset.id ? <Check className="h-4 w-4 text-theme-primary" /> : null}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {activeTab === 'theme' ? (
        <div className="grid gap-4">
          <div className="rounded-[24px] border border-border-subtle bg-bg-secondary p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">Theme presets</div>
            <div className="mt-3 grid gap-2">
              {BENTO_BIO_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    applyThemePreset(preset.theme);
                    updateConfig((current) => ({ ...current, ...preset.config, presetGradient: preset.id }));
                  }}
                  className={`rounded-[20px] border px-3 py-3 text-left transition ${resolvedConfig.presetGradient === preset.id ? 'border-theme-primary bg-theme-primary/8' : 'border-border-subtle bg-bg-primary hover:bg-bg-hover'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[13px] font-semibold text-text-primary">{preset.label}</div>
                      <div className="mt-1 text-[11px] text-text-quaternary">{preset.description}</div>
                    </div>
                    {resolvedConfig.presetGradient === preset.id ? <Check className="h-4 w-4 text-theme-primary" /> : null}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-border-subtle bg-bg-secondary p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">Theme colors</div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {([
                ['primary', 'Primary'],
                ['background', 'Background'],
                ['surface', 'Surface'],
                ['foreground', 'Text'],
                ['muted', 'Muted'],
                ['border', 'Border'],
              ] as const).map(([key, label]) => (
                <label key={key} className="grid gap-1.5">
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-tertiary">{label}</span>
                  <input type="color" value={templateData.theme[key]} onChange={(event) => updateThemeColor(key, event.target.value)} className="h-10 w-full rounded-2xl border border-border-subtle bg-bg-primary p-1" />
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <AddWidgetModal
        isOpen={isLibraryOpen}
        mode={modalMode}
        selectedWidget={modalMode === 'replace' ? selectedWidget : null}
        onClose={() => setIsLibraryOpen(false)}
        onCreate={createCard}
        onReplace={replaceCard}
      />
    </div>
  );
}
