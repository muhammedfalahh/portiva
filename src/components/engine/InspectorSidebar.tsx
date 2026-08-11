/**
 * =============================================================================
 * PORTIVA: InspectorSidebar — Property Controls Inspector
 * =============================================================================
 *
 * This component renders the properties inspector panel.
 *   - When an element is selected: renders tabs for Content, Style, and Layout.
 *   - When no element is selected: renders the global Theme and Presets settings.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualBuilder } from './VisualBuilderContext';
import { useWorkspaceStore } from './useWorkspaceStore';
import { BentoBioConfig, BentoBioBox, BentoBioPresetId, BENTO_BIO_PRESETS, DEFAULT_BENTO_BOXES } from '@/components/templates/BentoBio';
import {
  Sliders,
  Type,
  Palette,
  Layout as LayoutIcon,
  Sparkles,
  Check,
  UploadCloud,
  RotateCcw,
  Image as ImageIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Settings,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Maximize2,
  Minimize2,
  MousePointerClick,
  FileText,
  ShoppingBag,
  Plus,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  AlertTriangle,
  Layers,
  Grid,
  LayoutGrid,
  Compass,
  Share2,
  MessageCircle,
  Navigation,
  Mail,
  Phone,
  MapPin,
  GripVertical
} from 'lucide-react';
import { THEME_PRESETS_LIST, type ThemeConfig, FONT_OPTIONS } from '@/lib/theme.types';
import BentoCustomizer from './BentoCustomizer';

// Preset colors for quick overrides
const PRESET_COLORS = [
  { name: 'Crimson', hex: '#DC2626' },
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Lime', hex: '#C5FF2E' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Off-White', hex: '#F4F4EE' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Pure Black', hex: '#000000' },
];

const THEME_PALETTES = THEME_PRESETS_LIST;

interface InspectorSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  mobileDrawerMode?: boolean;
}

export function InspectorSidebar({ isOpen = false, onClose, mobileDrawerMode }: InspectorSidebarProps) {
  const {
    selectedElement,
    updateElementValue,
    applyChanges,
    discardChanges,
    templateData,
    updateThemeColor,
    resetTheme,
    applyThemePreset,
    updateBlockContent,
    updateStyleOverride,
    getStyleOverride,
    updateMediaOverride,
    getMediaOverride,
    updateButtonOverride,
    getButtonOverride,
  } = useVisualBuilder();

  // Selected element specific type checking
  const isImage = selectedElement?.type === 'image';
  const isButton = selectedElement?.type === 'button';
  const isText = selectedElement?.type === 'text' || selectedElement?.type === 'heading';

  const currentProjectId = useWorkspaceStore((state) => state.currentProjectId);
  const projectsList = useWorkspaceStore((state) => state.projectsList);
  const activeProject = projectsList.find((p) => p.id === currentProjectId);
  const activeTemplateId = activeProject?.templateId;

  // Check if active template is bento_bio or contains bentoBioConfig
  const isBentoBioTemplate =
    activeTemplateId === 'bento_bio' ||
    templateData?.profileHandle === 'bentobio' ||
    (templateData as any)?.bentoBioConfig !== undefined ||
    templateData?.blocks?.some(
      (b) => b.id === 'bento_bio' || b.id === 'bento-header' || b.content?.bentoBioConfig !== undefined
    );

  // Check if active template contains products or contact cards blocks
  const hasProductsBlock = templateData?.blocks?.some(
    (b) => b.id === 'luxe-products' || (b.content && (Array.isArray(b.content.products) || b.content.products !== undefined))
  );
  const hasContactCardsBlock = templateData?.blocks?.some(
    (b) => b.id === 'luxe-contact' || b.id === 'contact-cards' || (b.content && (Array.isArray(b.content.cards) || Array.isArray(b.content.contactItems)))
  );

  // Local form states synced with selected element
  const [text, setText] = useState('');
  const [color, setColor] = useState('');
  const [isContentOpen, setIsContentOpen] = useState(true);
  const [isStyleOpen, setIsStyleOpen] = useState(true);
  const [isGlobalStylesOpen, setIsGlobalStylesOpen] = useState(true);
  const [themeSlideIndex, setThemeSlideIndex] = useState(0);

  // Sync state when selected element changes
  useEffect(() => {
    if (selectedElement) {
      setText(selectedElement.value);
      setColor(selectedElement.color || '');
      setIsContentOpen(true);
      setIsStyleOpen(true);
    }
  }, [selectedElement]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    applyChanges();
  };

  const handleUpdateNavbarSettings = (key: 'navbarBg' | 'hoverStyle', value: string) => {
    updateBlockContent('bev-nav', { [key]: value });
  };

  // Get style values for the currently selected element
  const elementKey = selectedElement ? `${selectedElement.id}-${selectedElement.field}` : '';
  const currentStyleOverride = selectedElement ? getStyleOverride(elementKey) : undefined;
  const currentButtonOverride = selectedElement && isButton ? getButtonOverride(selectedElement.id) : undefined;
  const currentMediaOverride = selectedElement && isImage ? getMediaOverride(selectedElement.id) : undefined;

  // Helper to update styles based on type (button overrides vs normal overrides)
  const updateStyle = (key: string, value: any) => {
    if (isButton && selectedElement) {
      updateButtonOverride(selectedElement.id, { [key]: value });
    } else if (selectedElement) {
      updateStyleOverride(elementKey, { [key]: value });
    }
  };

  const getStyleVal = (key: string): string => {
    if (isButton && currentButtonOverride) {
      return (currentButtonOverride as any)[key] || '';
    }
    if (currentStyleOverride) {
      return (currentStyleOverride as any)[key] || '';
    }
    return '';
  };

  // ─── Render: Dedicated Bento Bio Inspector or Global Theme Settings Panel ───
  if (!selectedElement) {
    if (isBentoBioTemplate) {
      return (
        <aside 
          className={`
            fixed inset-y-0 left-0 w-[360px] xl:w-[380px] border-r border-border-subtle bg-bg-secondary flex flex-col shrink-0 z-40 font-sans transition-transform duration-300 h-screen
            lg:relative lg:translate-x-0 lg:flex lg:z-10 lg:h-[calc(100vh-48px)]
            ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          {/* Sidebar Header */}
          <div className="px-6 py-4.5 border-b border-border-subtle flex items-center justify-between shrink-0 bg-bg-tertiary">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-lime-400 shrink-0" />
              <span className="text-xs font-extrabold text-text-primary uppercase tracking-wider">
                Bento Bio Customizer
              </span>
            </div>
            {onClose && (
              <button 
                onClick={onClose}
                className="lg:hidden btn-ghost btn-icon btn-sm"
              >
                <span className="text-xs font-bold font-mono">CLOSE &times;</span>
              </button>
            )}
          </div>

          {/* Dedicated Custom Inspector Panel */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-border-default scrollbar-track-transparent">
            <BentoBioInspectorPanel />
          </div>
        </aside>
      );
    }

    return (
      <aside 
        className={`
          fixed inset-y-0 left-0 w-[360px] xl:w-[380px] border-r border-border-subtle bg-bg-secondary flex flex-col shrink-0 z-40 font-sans transition-transform duration-300 h-screen
          lg:relative lg:translate-x-0 lg:flex lg:z-10 lg:h-[calc(100vh-48px)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Sidebar Header */}
        <div className="px-6 py-5 border-b border-border-subtle flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
              Inspector
            </span>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="lg:hidden btn-ghost btn-icon btn-sm"
            >
              <span className="text-xs font-bold font-mono">CLOSE &times;</span>
            </button>
          )}
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-border-default scrollbar-track-transparent">
          
          {/* Canva-style Interactive Editor Instructions */}
          <div className="flex flex-col gap-4 bg-bg-tertiary border border-border-subtle p-4.5 rounded-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent animate-pulse shrink-0" />
              <h3 className="text-xs font-black text-text-secondary uppercase tracking-wider">Visual Editor</h3>
            </div>
            
            <p className="text-[10px] text-text-quaternary leading-normal">
              Click elements directly on the canvas to customize their content, colors, shapes, typography, and hover effects instantly.
            </p>

            <div className="flex flex-col gap-3 mt-1.5 border-t border-border-subtle pt-3">
              {/* Step 1 */}
              <div className="flex gap-2.5 items-start">
                <div className="w-5 h-5 rounded-full bg-bg-secondary border border-border-default text-[10px] font-bold text-text-secondary flex items-center justify-center shrink-0">
                  1
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10.5px] font-bold text-text-primary">Text Content</span>
                  <span className="text-[9px] text-text-quaternary leading-tight">Double-click text to type inline, or edit via properties panel.</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-2.5 items-start">
                <div className="w-5 h-5 rounded-full bg-bg-secondary border border-border-default text-[10px] font-bold text-text-secondary flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10.5px] font-bold text-text-primary">Styling & Layout</span>
                  <span className="text-[9px] text-text-quaternary leading-tight">Click any container or card to change background, padding, borders, shadows.</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-2.5 items-start">
                <div className="w-5 h-5 rounded-full bg-bg-secondary border border-border-default text-[10px] font-bold text-text-secondary flex items-center justify-center shrink-0">
                  3
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10.5px] font-bold text-text-primary">Buttons & Images</span>
                  <span className="text-[9px] text-text-quaternary leading-tight">Replace media assets and change button links or hover behavior.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dedicated Products Management Panel (Only rendered if template has products) */}
          {hasProductsBlock && <ProductManagementPanel />}

          {/* Dedicated Contact & Social Cards Panel (Only rendered if template has contact cards) */}
          {hasContactCardsBlock && <ContactCardsManagementPanel />}

          {/* Dedicated Link-in-Bio & Bento Customizer Panel */}
          {isBentoBioTemplate && <BentoBioInspectorPanel />}

          {/* Collapsible Global Styling Accordion */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsGlobalStylesOpen(!isGlobalStylesOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-bg-tertiary hover:bg-bg-hover border border-border-subtle rounded-lg transition text-text-secondary group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-accent shrink-0" />
                <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Global Theme Styling</span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-text-quaternary transition-transform duration-300 group-hover:text-text-tertiary ${
                  isGlobalStylesOpen ? 'rotate-180 text-accent' : ''
                }`} 
              />
            </button>

            <AnimatePresence initial={false}>
              {isGlobalStylesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden flex flex-col gap-5 pt-1 px-4 pb-4"
                >
                  <p className="text-[9px] text-text-quaternary leading-normal px-1 border-l border-border-default">
                    Use these options to quickly change variables globally. Every element without color overrides will update automatically.
                  </p>

                  {/* 1. Theme Presets Grid */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Theme Presets</span>
                      <span className="text-[9px] font-mono text-text-quaternary">{THEME_PALETTES.length} Presets</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {THEME_PALETTES.map((preset) => {
                        const isSelected = 
                          templateData.theme.background.toLowerCase() === preset.background.toLowerCase() &&
                          templateData.theme.foreground.toLowerCase() === preset.foreground.toLowerCase() &&
                          templateData.theme.primary.toLowerCase() === preset.primary.toLowerCase();

                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => applyThemePreset(preset)}
                            className={`
                              flex flex-col gap-1.5 p-2 rounded-lg text-left transition-all duration-200 cursor-pointer select-none bg-bg-tertiary
                              ${isSelected 
                                ? 'ring-2 ring-accent border-transparent bg-accent-subtle/20 shadow-sm' 
                                : 'border border-border-subtle hover:border-border-default hover:bg-bg-hover'
                              }
                            `}
                            title={preset.name}
                          >
                            <span className="text-[10.5px] font-semibold text-text-secondary truncate w-full">
                              {preset.name.split('(')[0].trim()}
                            </span>

                            {/* Multi-color Palette Swatch Bar showing ALL 5 theme colors */}
                            <div className="flex h-3.5 w-full rounded-md overflow-hidden border border-black/30 shadow-inner shrink-0">
                              <div className="flex-1 h-full" style={{ backgroundColor: preset.background }} title={`Background: ${preset.background}`} />
                              <div className="flex-1 h-full" style={{ backgroundColor: preset.surface }} title={`Surface: ${preset.surface}`} />
                              <div className="flex-1 h-full" style={{ backgroundColor: preset.foreground }} title={`Text: ${preset.foreground}`} />
                              <div className="flex-1 h-full" style={{ backgroundColor: preset.primary }} title={`Primary Accent: ${preset.primary}`} />
                              <div className="flex-1 h-full" style={{ backgroundColor: preset.border }} title={`Border: ${preset.border}`} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Custom Color Pickers Horizontal Carousel */}
                  {(() => {
                    const themeSlides = [
                      {
                        id: 'base',
                        title: 'Base Layout Colors',
                        subtitle: 'Canvas & typography foundation',
                        controls: (
                          <div className="flex flex-col gap-2.5">
                            <ThemeColorControl
                              label="Canvas Background"
                              description="Main back-drop color"
                              value={templateData.theme.background}
                              onChange={(val) => updateThemeColor('background', val)}
                            />
                            <ThemeColorControl
                              label="Text / Primary Foreground"
                              description="Base readable text labels"
                              value={templateData.theme.foreground}
                              onChange={(val) => updateThemeColor('foreground', val)}
                            />
                          </div>
                        ),
                      },
                      {
                        id: 'accents',
                        title: 'Elements & Accents',
                        subtitle: 'Brand highlights & surface cards',
                        controls: (
                          <div className="flex flex-col gap-2.5">
                            <ThemeColorControl
                              label="Primary Branding Accent"
                              description="Primary button backgrounds and badges"
                              value={templateData.theme.primary}
                              onChange={(val) => updateThemeColor('primary', val)}
                            />
                            <ThemeColorControl
                              label="Card Surface / Bento Box"
                              description="Background of layout grid cells"
                              value={templateData.theme.surface}
                              onChange={(val) => updateThemeColor('surface', val)}
                            />
                          </div>
                        ),
                      },
                      {
                        id: 'details',
                        title: 'Details & Dividers',
                        subtitle: 'Borders & secondary muted text',
                        controls: (
                          <div className="flex flex-col gap-2.5">
                            <ThemeColorControl
                              label="Dividing Borders"
                              description="Lines separating cells and content blocks"
                              value={templateData.theme.border}
                              onChange={(val) => updateThemeColor('border', val)}
                            />
                            <ThemeColorControl
                              label="Secondary Muted Text"
                              description="Descriptions and captions"
                              value={templateData.theme.muted}
                              onChange={(val) => updateThemeColor('muted', val)}
                            />
                          </div>
                        ),
                      },
                    ];

                    const currentSlide = themeSlides[themeSlideIndex] || themeSlides[0];

                    return (
                      <div className="flex flex-col gap-3 bg-bg-tertiary border border-border-subtle p-3.5 rounded-xl">
                        {/* Carousel Header with Navigation Arrows */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-text-primary uppercase tracking-wide">
                              {currentSlide.title}
                            </span>
                            <span className="text-[9px] text-text-quaternary">
                              {currentSlide.subtitle}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => setThemeSlideIndex((prev) => (prev === 0 ? themeSlides.length - 1 : prev - 1))}
                              className="w-7 h-7 rounded-md bg-bg-secondary border border-border-default hover:bg-bg-hover text-text-secondary hover:text-text-primary flex items-center justify-center transition cursor-pointer"
                              title="Previous Category"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>

                            <span className="text-[10px] font-mono text-text-quaternary px-1 select-none">
                              {themeSlideIndex + 1}/{themeSlides.length}
                            </span>

                            <button
                              type="button"
                              onClick={() => setThemeSlideIndex((prev) => (prev === themeSlides.length - 1 ? 0 : prev + 1))}
                              className="w-7 h-7 rounded-md bg-bg-secondary border border-border-default hover:bg-bg-hover text-text-secondary hover:text-text-primary flex items-center justify-center transition cursor-pointer"
                              title="Next Category"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Carousel Dots Indicator */}
                        <div className="flex justify-center items-center gap-1.5 py-0.5">
                          {themeSlides.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setThemeSlideIndex(idx)}
                              className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                                idx === themeSlideIndex ? 'w-5 bg-accent' : 'w-1.5 bg-border-strong hover:bg-text-quaternary'
                              }`}
                              title={`Go to ${themeSlides[idx].title}`}
                            />
                          ))}
                        </div>

                        {/* Active Slide Content */}
                        <div className="pt-2 border-t border-border-subtle overflow-hidden">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={themeSlideIndex}
                              initial={{ opacity: 0, x: 12 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -12 }}
                              transition={{ duration: 0.18 }}
                            >
                              {currentSlide.controls}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Section-level Reset */}
                  <div className="pt-2">
                    <button
                      onClick={resetTheme}
                      className="w-full btn-ghost btn-sm text-danger flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset Theme to Default
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </aside>
    );
  }

  // ─── Render: Element Properties Inspector ──────────────────────────────────
  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 w-[360px] xl:w-[380px] border-r border-border-subtle bg-bg-secondary flex flex-col shrink-0 overflow-y-auto z-40 font-sans transition-transform duration-300 h-screen
        lg:relative lg:translate-x-0 lg:flex lg:z-10 lg:h-[calc(100vh-48px)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Sidebar Header */}
      <div className="px-6 py-5 border-b border-border-subtle flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Inspector
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-text-quaternary bg-accent-subtle text-accent px-2 py-0.5 rounded-badge border border-border-focus">
            {selectedElement.type}
          </span>
          {onClose && (
            <button 
              onClick={onClose}
              className="lg:hidden btn-ghost btn-icon btn-sm"
            >
              <span className="text-xs font-bold font-mono">CLOSE &times;</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Controls: Single Vertically Scrollable Panel */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-border-default scrollbar-track-transparent">
        {/* Selected Element Identifier */}
        <div className="flex flex-col gap-0.5 border-b border-border-subtle pb-3 mb-5 shrink-0">
          <span className="text-[10px] font-mono text-text-quaternary uppercase tracking-widest">
            Selected Element
          </span>
          <span className="text-[11px] font-semibold text-text-secondary truncate">
            {selectedElement.id} &rarr; {selectedElement.field}
          </span>
        </div>

        <div className="flex flex-col gap-4">

          {/* ═══ 1. CONTENT ACCORDION SECTION ═══ */}
          <div className="border border-border-subtle bg-bg-tertiary rounded-lg overflow-hidden transition-all duration-200">
            <button
              type="button"
              onClick={() => setIsContentOpen(!isContentOpen)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-bg-hover transition cursor-pointer select-none text-left"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent shrink-0" />
                <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">
                  Content
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-text-quaternary transition-transform duration-300 ${
                  isContentOpen ? 'rotate-180 text-accent' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isContentOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pb-4 flex flex-col gap-5 border-t border-border-subtle">
                    {/* Text Editing for text element */}
                    {!isImage && !isButton && (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Type className="w-3.5 h-3.5 text-text-tertiary" />
                          <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">
                            Text Content
                          </label>
                        </div>
                        <textarea
                          rows={5}
                          value={text}
                          onChange={(e) => {
                            setText(e.target.value);
                            updateElementValue(e.target.value, color);
                          }}
                          className="input w-full resize-none"
                          placeholder="Enter text value..."
                        />
                      </div>
                    )}

                    {/* Media Editing for images */}
                    {isImage && (
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-text-tertiary" />
                          <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">
                            Image Settings
                          </label>
                        </div>

                        <ImageFileUploader
                          currentValue={currentMediaOverride?.src || text}
                          onChange={(base64Url) => {
                            setText(base64Url);
                            updateMediaOverride(selectedElement.id, { src: base64Url });
                          }}
                        />

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Direct URL</label>
                          <input
                            type="text"
                            value={currentMediaOverride?.src || text}
                            onChange={(e) => {
                              setText(e.target.value);
                              updateMediaOverride(selectedElement.id, { src: e.target.value });
                            }}
                            className="input w-full font-mono"
                            placeholder="https://example.com/image.png"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Alt Text</label>
                          <input
                            type="text"
                            value={currentMediaOverride?.alt || ''}
                            onChange={(e) => {
                              updateMediaOverride(selectedElement.id, { alt: e.target.value });
                            }}
                            className="input w-full"
                            placeholder="Image description..."
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Fitting Strategy</label>
                          <select
                            value={currentMediaOverride?.objectFit || 'cover'}
                            onChange={(e) => {
                              updateMediaOverride(selectedElement.id, { objectFit: e.target.value as any });
                            }}
                            className="input w-full cursor-pointer"
                          >
                            <option value="cover">Cover (Fill & Crop)</option>
                            <option value="contain">Contain (Fit Entire Image)</option>
                            <option value="fill">Fill (Stretch to Fit)</option>
                            <option value="none">Original Size</option>
                          </select>
                        </div>

                        {/* Text Content associated with this Image Card */}
                        <div className="border-t border-border-subtle pt-4 mt-2 flex flex-col gap-4">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Type className="w-3.5 h-3.5 text-accent" />
                            <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Card / Slide Text Content</span>
                          </div>

                          {/* Case 1: Gallery Carousel Images (cafe-gallery-image-0, 1, 2, 3) */}
                          {selectedElement.id.startsWith('cafe-gallery-image-') && (() => {
                            const slideIdx = parseInt(selectedElement.id.replace('cafe-gallery-image-', ''), 10);
                            const slideNum = slideIdx + 1;
                            const blockId = 'cafe-gallery';
                            const tagField = `slide_${slideNum}_tag`;
                            const titleField = `slide_${slideNum}_title`;
                            const descField = `slide_${slideNum}_desc`;
                            const numField = `slide_${slideNum}_num`;

                            const galleryDefaults: Record<number, { tag: string; title: string; desc: string }> = {
                              0: { tag: 'ESPRESSO CRAFT', title: 'Artisan Coffee Bar', desc: 'Single-origin beans roasted daily' },
                              1: { tag: 'KITCHEN & OVEN', title: 'Fresh Daily Bakery', desc: 'Fresh croissants & sourdough breads' },
                              2: { tag: 'OUR SPACE', title: 'Warm Café Ambiance', desc: 'Cozy seating & warm neighborhood vibes' },
                              3: { tag: 'SIGNATURE MENU', title: 'Handcrafted Drinks', desc: 'Seasonal fruit smoothies & matcha' },
                            };
                            const defaultSlide = galleryDefaults[slideIdx] || galleryDefaults[0];

                            const currentTag = templateData?.textOverrides?.[`${blockId}-${tagField}`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.[tagField] || defaultSlide.tag;
                            const currentTitle = templateData?.textOverrides?.[`${blockId}-${titleField}`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.[titleField] || defaultSlide.title;
                            const currentDesc = templateData?.textOverrides?.[`${blockId}-${descField}`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.[descField] || defaultSlide.desc;
                            const currentNum = templateData?.textOverrides?.[`${blockId}-${numField}`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.[numField] || `0${slideNum}`;

                            return (
                              <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Slide Title</label>
                                  <input
                                    type="text"
                                    value={currentTitle}
                                    onChange={(e) => updateElementValue(e.target.value, undefined, blockId, titleField)}
                                    className="input w-full"
                                    placeholder="Slide title..."
                                  />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Category Tag</label>
                                  <input
                                    type="text"
                                    value={currentTag}
                                    onChange={(e) => updateElementValue(e.target.value, undefined, blockId, tagField)}
                                    className="input w-full font-mono text-xs uppercase"
                                    placeholder="ESPRESSO CRAFT"
                                  />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Slide Subtitle / Description</label>
                                  <input
                                    type="text"
                                    value={currentDesc}
                                    onChange={(e) => updateElementValue(e.target.value, undefined, blockId, descField)}
                                    className="input w-full"
                                    placeholder="Short description..."
                                  />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Slide Badge Number</label>
                                  <input
                                    type="text"
                                    value={currentNum}
                                    onChange={(e) => updateElementValue(e.target.value, undefined, blockId, numField)}
                                    className="input w-full font-mono text-xs"
                                    placeholder="01"
                                  />
                                </div>
                              </div>
                            );
                          })()}

                          {/* Case 2: Dish Card Images (cafe-dish-1, cafe-dish-2, cafe-dish-3) */}
                          {selectedElement.id.includes('cafe-dish-') && (() => {
                            const match = selectedElement.id.match(/cafe-dish-(\d+)/);
                            const dishNum = match ? match[1] : '1';
                            const blockId = `cafe-dish-${dishNum}`;

                            const dishDefaults: Record<string, { title: string; price: string; badge: string; desc: string }> = {
                              '1': { title: 'Signature Espresso Roast', price: '$4.50', badge: 'BESTSELLER', desc: 'Rich, smooth single-origin espresso with chocolate and caramel notes.' },
                              '2': { title: 'Artisan Avocado Toast', price: '$12.90', badge: 'FRESH', desc: 'Freshly smashed avocado on sourdough with poached eggs and radish.' },
                              '3': { title: 'House Pastry & Berry Bowl', price: '$9.50', badge: 'DAILY SPECIAL', desc: 'Freshly baked buttery croissant served with seasonal organic berries.' },
                            };
                            const defaultDish = dishDefaults[dishNum] || dishDefaults['1'];

                            const currentTitle = templateData?.textOverrides?.[`${blockId}-title`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.title || defaultDish.title;
                            const currentPrice = templateData?.textOverrides?.[`${blockId}-price`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.price || defaultDish.price;
                            const currentBadge = templateData?.textOverrides?.[`${blockId}-badge`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.badge || defaultDish.badge;
                            const currentDesc = templateData?.textOverrides?.[`${blockId}-description`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.description || defaultDish.desc;

                            return (
                              <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Dish Name</label>
                                  <input
                                    type="text"
                                    value={currentTitle}
                                    onChange={(e) => updateElementValue(e.target.value, undefined, blockId, 'title')}
                                    className="input w-full"
                                    placeholder="Dish title..."
                                  />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Price</label>
                                  <input
                                    type="text"
                                    value={currentPrice}
                                    onChange={(e) => updateElementValue(e.target.value, undefined, blockId, 'price')}
                                    className="input w-full font-mono"
                                    placeholder="$12.90"
                                  />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Badge Tag</label>
                                  <input
                                    type="text"
                                    value={currentBadge}
                                    onChange={(e) => updateElementValue(e.target.value, undefined, blockId, 'badge')}
                                    className="input w-full font-mono text-xs uppercase"
                                    placeholder="BESTSELLER"
                                  />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Description</label>
                                  <textarea
                                    value={currentDesc}
                                    onChange={(e) => updateElementValue(e.target.value, undefined, blockId, 'description')}
                                    className="input w-full min-h-[60px] text-xs resize-y"
                                    placeholder="Dish description..."
                                  />
                                </div>
                              </div>
                            );
                          })()}

                          {/* Case 3: Hero Image (cafe-hero-hero_image) */}
                          {(selectedElement.id === 'cafe-hero-hero_image' || selectedElement.id === 'cafe-hero') && (() => {
                            const blockId = 'cafe-hero';
                            const currentTitle = templateData?.textOverrides?.[`${blockId}-title`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.title || 'Fresh Ingredients, Thoughtfully Prepared Daily';
                            const currentDesc = templateData?.textOverrides?.[`${blockId}-description`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.description || 'Welcome to your neighborhood destination for artisan coffee, freshly baked goods, and savory kitchen classics. Experience quality in every bite.';
                            const currentBadge = templateData?.textOverrides?.[`${blockId}-deliveryBadge`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.deliveryBadge || '🛵 Fast Local Delivery Available';

                            return (
                              <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Hero Headline</label>
                                  <input
                                    type="text"
                                    value={currentTitle}
                                    onChange={(e) => updateElementValue(e.target.value, undefined, blockId, 'title')}
                                    className="input w-full"
                                    placeholder="Hero headline..."
                                  />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Tagline / Delivery Badge</label>
                                  <input
                                    type="text"
                                    value={currentBadge}
                                    onChange={(e) => updateElementValue(e.target.value, undefined, blockId, 'deliveryBadge')}
                                    className="input w-full"
                                    placeholder="Delivery badge..."
                                  />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Hero Description</label>
                                  <textarea
                                    value={currentDesc}
                                    onChange={(e) => updateElementValue(e.target.value, undefined, blockId, 'description')}
                                    className="input w-full min-h-[60px] text-xs resize-y"
                                    placeholder="Hero description..."
                                  />
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    )}

                    {/* Google Maps Location & Contact Settings */}
                    {(selectedElement.id === 'cafe-contact' || selectedElement.id.startsWith('cafe-contact')) && (() => {
                      const blockId = 'cafe-contact';
                      const currentMapLocation = templateData?.textOverrides?.[`${blockId}-mapLocation`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.mapLocation || templateData?.textOverrides?.[`${blockId}-address`] || '456 Gourmet Boulevard, Suite 100, Cityville';
                      const currentAddress = templateData?.textOverrides?.[`${blockId}-address`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.address || '456 Gourmet Boulevard, Suite 100, Cityville';
                      const currentPhone = templateData?.textOverrides?.[`${blockId}-phone`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.phone || '+1 (555) 234-5678';
                      const currentWhatsapp = templateData?.textOverrides?.[`${blockId}-whatsapp`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.whatsapp || '+15552345678';
                      const currentHours = templateData?.textOverrides?.[`${blockId}-businessHours`] || templateData?.blocks?.find(b => b.id === blockId)?.content?.businessHours || 'Mon – Sun: 8:00 AM – 10:00 PM';

                      return (
                        <div className="border-t border-border-subtle pt-4 mt-2 flex flex-col gap-4">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <MapPin className="w-3.5 h-3.5 text-accent" />
                            <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Google Maps & Contact Location</span>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Google Maps Location / Query</label>
                            <input
                              type="text"
                              value={currentMapLocation}
                              onChange={(e) => {
                                updateElementValue(e.target.value, undefined, blockId, 'mapLocation');
                              }}
                              className="input w-full font-mono text-xs"
                              placeholder="Address or Google Maps link..."
                            />
                            <span className="text-[10px] text-text-tertiary">Type any address (e.g. 100 Fifth Ave, NY or Paris, France) to update live map.</span>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Display Address</label>
                            <input
                              type="text"
                              value={currentAddress}
                              onChange={(e) => {
                                updateElementValue(e.target.value, undefined, blockId, 'address');
                              }}
                              className="input w-full"
                              placeholder="Display address text..."
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Phone Number</label>
                            <input
                              type="text"
                              value={currentPhone}
                              onChange={(e) => {
                                updateElementValue(e.target.value, undefined, blockId, 'phone');
                              }}
                              className="input w-full font-mono"
                              placeholder="+1 (555) 234-5678"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">WhatsApp Number</label>
                            <input
                              type="text"
                              value={currentWhatsapp}
                              onChange={(e) => {
                                updateElementValue(e.target.value, undefined, blockId, 'whatsapp');
                              }}
                              className="input w-full font-mono"
                              placeholder="+15552345678"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Opening Hours</label>
                            <input
                              type="text"
                              value={currentHours}
                              onChange={(e) => {
                                updateElementValue(e.target.value, undefined, blockId, 'businessHours');
                              }}
                              className="input w-full"
                              placeholder="Mon – Sun: 8:00 AM – 10:00 PM"
                            />
                          </div>
                        </div>
                      );
                    })()}

                    {/* Button Editing for buttons */}
                    {isButton && (
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <MousePointerClick className="w-3.5 h-3.5 text-text-tertiary" />
                          <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">
                            Button Action
                          </label>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Button Label</label>
                          <input
                            type="text"
                            value={currentButtonOverride?.text || text}
                            onChange={(e) => {
                              setText(e.target.value);
                              updateButtonOverride(selectedElement.id, { text: e.target.value });
                            }}
                            className="input w-full"
                            placeholder="Click Here"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Destination Link</label>
                          <input
                            type="text"
                            value={currentButtonOverride?.href || ''}
                            onChange={(e) => {
                              updateButtonOverride(selectedElement.id, { href: e.target.value });
                            }}
                            className="input w-full"
                            placeholder="https://wa.me/... or #contact"
                          />
                        </div>

                        <div className="flex items-center justify-between border border-border-default bg-bg-secondary p-3 rounded-lg">
                          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Open in New Tab</span>
                          <input
                            type="checkbox"
                            checked={currentButtonOverride?.openInNewTab || false}
                            onChange={(e) => {
                              updateButtonOverride(selectedElement.id, { openInNewTab: e.target.checked });
                            }}
                            className="w-4 h-4 accent-accent cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    {/* Navbar custom block configs */}
                    {selectedElement.id === 'bev-nav' && (
                      <div className="border-t border-border-subtle pt-4 mt-2 flex flex-col gap-4">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <LayoutIcon className="w-3.5 h-3.5 text-accent" />
                          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Navbar Config</span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Navbar Styling</label>
                          <select
                            value={templateData.blocks.find(b => b.id === 'bev-nav')?.content.navbarBg || 'transparent'}
                            onChange={(e) => handleUpdateNavbarSettings('navbarBg', e.target.value)}
                            className="input w-full cursor-pointer"
                          >
                            <option value="transparent">Transparent</option>
                            <option value="surface">Surface Solid</option>
                            <option value="glass">Glassmorphic Blur</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Links Hover style</label>
                          <select
                            value={templateData.blocks.find(b => b.id === 'bev-nav')?.content.hoverStyle || 'color'}
                            onChange={(e) => handleUpdateNavbarSettings('hoverStyle', e.target.value)}
                            className="input w-full cursor-pointer"
                          >
                            <option value="color">Accent Color Shift</option>
                            <option value="underline">Minimal Underline</option>
                            <option value="pill">Capsule Pill Outline</option>
                            <option value="border-bottom">Bottom Accent Line</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ═══ 2. STYLE ACCORDION SECTION ═══ */}
          <div className="border border-border-subtle bg-bg-tertiary rounded-lg overflow-hidden transition-all duration-200">
            <button
              type="button"
              onClick={() => setIsStyleOpen(!isStyleOpen)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-bg-hover transition cursor-pointer select-none text-left"
            >
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-accent shrink-0" />
                <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">
                  Style
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-text-quaternary transition-transform duration-300 ${
                  isStyleOpen ? 'rotate-180 text-accent' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isStyleOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pb-4 flex flex-col gap-5 border-t border-border-subtle">
                    {/* 1. Background Color Control */}
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Palette className="w-3.5 h-3.5 text-text-tertiary" />
                        <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Background Color</span>
                      </div>
                      <ColorPickerControl
                        value={getStyleVal('backgroundColor')}
                        onChange={(val) => updateStyle('backgroundColor', val)}
                        presets={['transparent', '#efece6', '#fafafa', '#09090b', '#0F1117', '#1e293b', '#6366F1']}
                      />
                    </div>
                    {!isImage && (
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Type className="w-3.5 h-3.5 text-text-tertiary" />
                          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Text Color</span>
                        </div>
                        <ColorPickerControl
                          value={getStyleVal('color')}
                          onChange={(val) => updateStyle('color', val)}
                          presets={['#2b1c16', '#09090b', '#ffffff', '#C5FF2E', '#94a3b8', '#10b981', '#DC2626']}
                        />
                      </div>
                    )}

                    {/* Section Background Override Control */}
                    {selectedElement && selectedElement.id && (
                      <div className="flex flex-col gap-2.5 border-t border-border-subtle pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">Section Background</span>
                          <span className="text-[10px] font-mono text-accent uppercase">
                            {selectedElement.id.replace('cafe-', '').split('-')[0]} section
                          </span>
                        </div>
                        <ColorPickerControl
                          value={
                            getStyleOverride(`${selectedElement.id}-section`)?.backgroundColor ||
                            getStyleOverride(selectedElement.id)?.backgroundColor ||
                            getStyleOverride(`${selectedElement.id}-bg`)?.backgroundColor ||
                            ''
                          }
                          onChange={(val) => {
                            updateStyleOverride(`${selectedElement.id}-section`, { backgroundColor: val });
                            updateStyleOverride(selectedElement.id, { backgroundColor: val });
                            updateStyleOverride(`${selectedElement.id}-bg`, { backgroundColor: val });
                          }}
                          presets={['#1C1510', '#FAFAF7', '#13261b', '#09090b', '#1f1614', '#1e293b', '#6366F1', '#efece6', '#ffffff']}
                        />
                      </div>
                    )}

                    {/* 3. Border radius / Width Controls */}
                    <div className="flex flex-col gap-4 border-t border-border-subtle pt-4">
                      <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Border Styles</span>
                      
                      {/* Border Radius */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">
                          <span>Corner Radius</span>
                          <span>{getStyleVal('borderRadius') || 'Default'}</span>
                        </div>
                        <input
                          type="text"
                          placeholder="e.g. 12px, 2rem, 9999px"
                          value={getStyleVal('borderRadius')}
                          onChange={(e) => updateStyle('borderRadius', e.target.value)}
                          className="input w-full"
                        />
                      </div>

                      {/* Border Width */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">
                          <span>Border Width</span>
                          <span>{getStyleVal('borderWidth') || 'None'}</span>
                        </div>
                        <input
                          type="text"
                          placeholder="e.g. 1px, 2px"
                          value={getStyleVal('borderWidth')}
                          onChange={(e) => updateStyle('borderWidth', e.target.value)}
                          className="input w-full"
                        />
                      </div>

                      {/* Border Color */}
                      {getStyleVal('borderWidth') && (
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Border Color</span>
                          <ColorPickerControl
                            value={getStyleVal('borderColor')}
                            onChange={(val) => updateStyle('borderColor', val)}
                            presets={['#d5cdbf', '#e4e4e7', '#27272a', '#1F3F28', 'transparent']}
                          />
                        </div>
                      )}
                    </div>

                    {/* 4. Effects: Opacity, Shadow */}
                    <div className="flex flex-col gap-4 border-t border-border-subtle pt-4">
                      <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Visual Effects</span>
                      
                      {/* Opacity slider */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">
                          <span>Opacity</span>
                          <span>{getStyleVal('opacity') !== '' ? Math.round(Number(getStyleVal('opacity')) * 100) : 100}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={getStyleVal('opacity') !== '' ? getStyleVal('opacity') : '1'}
                          onChange={(e) => updateStyle('opacity', Number(e.target.value))}
                          className="w-full h-1.5 rounded-full bg-border-default appearance-none accent-accent cursor-pointer"
                        />
                      </div>

                      {/* Drop Shadow dropdown */}
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Drop Shadow</span>
                        <select
                          value={getStyleVal('boxShadow')}
                          onChange={(e) => updateStyle('boxShadow', e.target.value)}
                          className="input w-full cursor-pointer"
                        >
                          <option value="">No Shadow (Default)</option>
                          <option value="0 1px 2px rgba(0,0,0,0.05)">Small shadow</option>
                          <option value="0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)">Medium shadow</option>
                          <option value="0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)">Large shadow</option>
                          <option value="0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.04)">X-Large shadow</option>
                          <option value="inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)">Inner Shadow</option>
                        </select>
                      </div>
                    </div>

                    {/* 5. Typography Customization (For Text / Button) */}
                    {(!isImage) && (
                      <div className="flex flex-col gap-4 border-t border-border-subtle pt-4">
                        <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Text Typography</span>

                        {/* Font Family */}
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Font Family</span>
                          <select
                            value={getStyleVal('fontFamily')}
                            onChange={(e) => updateStyle('fontFamily', e.target.value)}
                            className="input w-full cursor-pointer"
                          >
                            <option value="">Theme default font</option>
                            {FONT_OPTIONS.map((f, i) => (
                              <option key={i} value={f.value}>{f.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Font Size */}
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Font Size (with units)</span>
                          <input
                            type="text"
                            placeholder="e.g. 14px, 1.2rem, 3.5vw"
                            value={getStyleVal('fontSize')}
                            onChange={(e) => updateStyle('fontSize', e.target.value)}
                            className="input w-full"
                          />
                        </div>

                        {/* Font Weight */}
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Font Weight</span>
                          <select
                            value={getStyleVal('fontWeight')}
                            onChange={(e) => updateStyle('fontWeight', e.target.value)}
                            className="input w-full cursor-pointer"
                          >
                            <option value="">Theme default weight</option>
                            <option value="300">Light (300)</option>
                            <option value="400">Regular (400)</option>
                            <option value="500">Medium (500)</option>
                            <option value="600">Semi-Bold (600)</option>
                            <option value="700">Bold (700)</option>
                            <option value="900">Black (900)</option>
                          </select>
                        </div>

                        {/* Text Align */}
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Text Alignment</span>
                          <div className="flex bg-bg-tertiary p-0.5 rounded-lg border border-border-default">
                            {[
                              { value: 'left', icon: AlignLeft },
                              { value: 'center', icon: AlignCenter },
                              { value: 'right', icon: AlignRight },
                              { value: 'justify', icon: AlignJustify },
                            ].map((alignOpt) => {
                              const AlignIcon = alignOpt.icon;
                              const isActive = getStyleVal('textAlign') === alignOpt.value;
                              return (
                                <button
                                  key={alignOpt.value}
                                  onClick={() => updateStyle('textAlign', alignOpt.value)}
                                  className={`flex-1 py-1.5 rounded flex items-center justify-center transition cursor-pointer ${
                                    isActive ? 'bg-bg-hover text-text-primary' : 'text-text-tertiary hover:text-text-primary'
                                  }`}
                                >
                                  <AlignIcon className="w-3.5 h-3.5" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 6. Custom Interactive Hover Controls */}
                    <div className="flex flex-col gap-4 border-t border-border-subtle pt-4 pb-2">
                      <div className="flex items-center gap-2">
                        <MousePointerClick className="w-3.5 h-3.5 text-accent" />
                        <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Hover Overrides</span>
                      </div>

                      {/* Hover Background Color */}
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Hover Background</span>
                        <ColorPickerControl
                          value={getStyleVal('hoverBackgroundColor')}
                          onChange={(val) => updateStyle('hoverBackgroundColor', val)}
                          presets={['transparent', '#2b1c16', '#6366f1', '#C5FF2E', '#DC2626']}
                        />
                      </div>

                      {/* Hover Text Color */}
                      {!isImage && (
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1.5">Hover Text Color</span>
                          <ColorPickerControl
                            value={getStyleVal('hoverColor')}
                            onChange={(val) => updateStyle('hoverColor', val)}
                            presets={['#ffffff', '#2b1c16', '#C5FF2E', '#10b981', '#ffffff']}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Action Buttons (Discard & Apply) */}
        <div className="sticky bottom-0 mt-6 pt-5 bg-bg-secondary border-t border-border-subtle flex gap-3 shrink-0">
          <button
            type="button"
            onClick={discardChanges}
            className="flex-1 btn-ghost"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 btn-primary"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Apply
          </button>
        </div>
      </div>
    </aside>
  );
}

// ─── Helper Component: Color control with hex input & preset swatches ────────
function ColorPickerControl({
  value,
  onChange,
  presets,
}: {
  value: string;
  onChange: (val: string) => void;
  presets: string[];
}) {
  return (
    <div className="flex flex-col gap-2 bg-[#0c0c0e] border border-[#1e1e24] p-3 rounded-xl">
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#2d2d3a] flex items-center justify-center shrink-0 cursor-pointer hover:scale-102 transition">
          <input
            type="color"
            value={value.startsWith('#') && value.length === 7 ? value : '#ffffff'}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div
            className="w-full h-full border border-black/10 rounded-lg"
            style={{ backgroundColor: value || '#ffffff' }}
          />
        </div>
        <input
          type="text"
          placeholder="Hex/color or transparent"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-[#16161c] border border-[#2d2d3a] rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-slate-200 focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* Preset Dot Swatches */}
      <div className="flex flex-wrap gap-2.5 mt-1 border-t border-[#1b1b22] pt-2">
        {presets.map((presetColor, i) => {
          const isActive = value.toLowerCase() === presetColor.toLowerCase();
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(presetColor)}
              className={`w-5 h-5 rounded-full border relative transition hover:scale-110 active:scale-90 ${
                isActive ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-800'
              }`}
              style={{
                backgroundColor: presetColor === 'transparent' ? undefined : presetColor,
                backgroundImage: presetColor === 'transparent'
                  ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                  : undefined,
                backgroundSize: presetColor === 'transparent' ? '4px 4px' : undefined,
                backgroundPosition: presetColor === 'transparent' ? '0 0, 0 2px, 2px -2px, -2px 0' : undefined
              }}
              title={presetColor}
            >
              {isActive && (
                <Check className={`w-3 h-3 absolute inset-0 m-auto ${
                  presetColor === '#ffffff' || presetColor === '#efece6' || presetColor === '#F4F4EE' || presetColor === '#C5FF2E' ? 'text-black' : 'text-white'
                }`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Helper Component: Color Control Row ────────────────────────────────────
function ThemeColorControl({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 border border-[#1e1e24] bg-[#0c0c0e] p-3 rounded-xl">
      <div className="flex flex-col">
        <span className="text-[11px] font-bold text-slate-350">{label}</span>
        <span className="text-[9px] text-slate-500 leading-tight">{description}</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        {/* Colored picker swatch */}
        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#2d2d3a] flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 active:scale-95 transition">
          <input
            type="color"
            value={value.startsWith('#') && value.length === 7 ? value : '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div
            className="w-full h-full border border-black/10 rounded-lg"
            style={{ backgroundColor: value }}
          />
        </div>
        {/* Hex input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-[#16161c] border border-[#2d2d3a] rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-slate-200 focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
}

// ─── Helper Component: Image File Uploader ──────────────────────────────────
function ImageFileUploader({
  currentValue,
  onChange,
}: {
  currentValue: string;
  onChange: (base64Url: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const triggerBrowse = () => {
    fileInputRef.current?.click();
  };

  const isBase64 = currentValue?.startsWith('data:image/');

  return (
    <div className="flex flex-col gap-3">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerBrowse}
        className={`
          border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 min-h-[160px]
          ${isDragging 
            ? 'border-blue-500 bg-blue-500/5' 
            : 'border-[#2d2d3a] bg-[#0c0c0e] hover:border-[#3a3a4c] hover:bg-[#101014]'
          }
        `}
      >
        {currentValue ? (
          /* Thumbnail preview of current image */
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#2d2d3a] shadow-inner relative group bg-black">
              <img
                src={currentValue}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-350">Click or drag to replace</span>
              <span className="text-[8px] text-slate-500 mt-0.5">Supports PNG, JPG, WebP, SVG</span>
            </div>
          </div>
        ) : (
          /* Upload instruction */
          <div className="flex flex-col items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-300">Drag & drop your image here</span>
              <span className="text-[9px] text-slate-500 mt-0.5">or click to browse local files</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Default Products List for ProductManagementPanel ───────────────────────
const DEFAULT_PRODUCTS_MANAGEMENT_LIST = [
  {
    id: 'prod-1',
    name: 'Gazelle Indoor Shoes',
    subtitle: 'Classic Gazelle Collection',
    description: 'Classic indoor-ready Gazelle with premium suede upper, earthy tones, and signature contrast stripes.',
    price: '$229.96',
    discountPrice: '',
    discountBadge: '',
    rating: 4.9,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop',
    badge: "Men's Sneakers",
    ctaText: 'Buy Now',
  },
  {
    id: 'prod-2',
    name: 'Gazelle Indoor Shoes',
    subtitle: 'Muted Green Edition',
    description: 'Sleek Gazelle Indoor in muted green with crisp black/white accents and gum outsole.',
    price: '$329.96',
    discountPrice: '',
    discountBadge: '',
    rating: 5.0,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
    badge: "Men's Sneakers",
    ctaText: 'Buy Now',
  },
  {
    id: 'prod-3',
    name: 'Zoom Vomero',
    subtitle: 'Green/Purple Colorway',
    description: 'Bold Zoom Vomero 5 runner with eye-catching green/purple colorway, breathable mesh upper, and dual Zoom Air cushioning.',
    price: '$169.99',
    discountPrice: '',
    discountBadge: '',
    rating: 4.8,
    reviewCount: 210,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
    badge: "Men's Sneakers",
    ctaText: 'Buy Now',
  },
  {
    id: 'prod-4',
    name: 'Gazelle Indoor Shoes',
    subtitle: 'Vintage Suede Edition',
    description: 'Classic indoor-ready Gazelle with premium suede upper, crisp black/white contrast stripes, and timeless retro appeal.',
    price: '$219.96',
    discountPrice: '',
    discountBadge: '',
    rating: 4.9,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop',
    badge: "Men's Sneakers",
    ctaText: 'Buy Now',
  },
  {
    id: 'prod-5',
    name: 'Gazelle Indoor Shoes',
    subtitle: 'Subtle Muted Gum',
    description: 'Sleek Gazelle Indoor in subtle muted green with crisp black/white accents and gum outsole.',
    price: '$249.96',
    discountPrice: '',
    discountBadge: '',
    rating: 4.7,
    reviewCount: 53,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
    badge: "Men's Sneakers",
    ctaText: 'Buy Now',
  },
  {
    id: 'prod-6',
    name: 'Zoom Vomero',
    subtitle: 'Navy/Blue Colorway',
    description: 'Bold Zoom Vomero runner featuring breathable mesh upper, eye-catching navy/blue colorway.',
    price: '$169.99',
    discountPrice: '',
    discountBadge: '',
    rating: 4.9,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    badge: "Men's Sneakers",
    ctaText: 'Buy Now',
  },
  {
    id: 'prod-7',
    name: 'Zoom Vomero',
    subtitle: 'Light Bone/Cream',
    description: 'Premium Zoom Vomero runner featuring breathable mesh upper and light bone/cream accents.',
    price: '$189.96',
    discountPrice: '',
    discountBadge: '',
    rating: 4.8,
    reviewCount: 95,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop',
    badge: "Men's Sneakers",
    ctaText: 'Buy Now',
  },
];

// ─── Component: Dedicated Product Management Panel ─────────────────────────
// ─── Component: Dedicated Product Management Panel ─────────────────────────
function ProductManagementPanel() {
  const { templateData, updateBlockContent } = useVisualBuilder();

  const productsBlock = templateData.blocks.find((b) => b.id === 'luxe-products' || b.content?.products !== undefined);
  const products: any[] = productsBlock?.content?.products || DEFAULT_PRODUCTS_MANAGEMENT_LIST;
  const layoutMode = productsBlock?.content?.layoutMode || 'grid';

  const [isOpen, setIsOpen] = useState(true);
  const [activeProdIndex, setActiveProdIndex] = useState(0);

  const safeIndex = Math.min(Math.max(0, activeProdIndex), Math.max(0, products.length - 1));

  const saveProducts = (updatedProducts: any[], updatedLayoutMode?: string) => {
    const capped = updatedProducts.slice(0, 6);
    updateBlockContent('luxe-products', {
      products: capped,
      layoutMode: updatedLayoutMode || layoutMode,
    });
  };

  const handleAddProduct = () => {
    if (products.length >= 6) return;
    const newProduct = {
      id: `prod-${Date.now()}`,
      name: `NEW PRODUCT ${products.length + 1}`,
      subtitle: 'Handcrafted Edition',
      description: 'Superior quality materials designed for eternity.',
      price: '$450',
      rating: 5.0,
      reviewCount: 10,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
      badge: 'NEW',
      ctaText: 'QUICK VIEW',
      hidden: false,
    };
    const updated = [...products, newProduct];
    saveProducts(updated);
    setActiveProdIndex(updated.length - 1);
  };

  const handleUpdateProduct = (index: number, key: string, val: any) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [key]: val };
    saveProducts(updated);
  };

  const handleRemoveProduct = (index: number) => {
    if (products.length <= 1) return;
    const updated = products.filter((_, i) => i !== index);
    saveProducts(updated);
    if (activeProdIndex >= updated.length) {
      setActiveProdIndex(Math.max(0, updated.length - 1));
    }
  };

  const handleDuplicateProduct = (index: number) => {
    if (products.length >= 6) return;
    const item = products[index];
    const duplicated = {
      ...item,
      id: `prod-${Date.now()}`,
      name: `${item.name} (COPY)`,
    };
    const updated = [...products];
    updated.splice(index + 1, 0, duplicated);
    saveProducts(updated);
    setActiveProdIndex(index + 1);
  };

  const handleMoveProduct = (index: number, direction: 'prev' | 'next') => {
    const target = direction === 'prev' ? index - 1 : index + 1;
    if (target < 0 || target >= products.length) return;
    const updated = [...products];
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    saveProducts(updated);
    setActiveProdIndex(target);
  };

  const handleToggleHide = (index: number) => {
    const updated = [...products];
    updated[index] = { ...updated[index], hidden: !updated[index].hidden };
    saveProducts(updated);
  };

  const isCapped = products.length >= 6;
  const currentProd = products[safeIndex] || products[0];

  return (
    <div className="flex flex-col gap-3">
      {/* Accordion Toggle Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3.5 bg-bg-tertiary hover:bg-bg-hover border border-border-subtle rounded-xl transition text-text-secondary group cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Products Showcase ({products.length}/6)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[9px] font-mono px-2 py-0.5 rounded-badge font-semibold ${isCapped ? 'bg-warning-muted text-warning border border-warning/30' : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'}`}>
            {isCapped ? 'MAX 6 CAPPED' : `${products.length}/6 ACTIVE`}
          </span>
          <ChevronDown className={`w-4 h-4 text-text-quaternary transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden flex flex-col gap-4 pt-1"
          >
            {/* Product Cards Horizontal Carousel Navigation Header */}
            <div className="flex flex-col gap-3 bg-bg-tertiary p-3.5 rounded-xl border border-border-subtle">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40 shrink-0">
                    #{safeIndex + 1}
                  </span>
                  <span className="text-xs font-bold text-text-primary truncate">
                    {currentProd?.name || 'Untitled Product'}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveProdIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1))}
                    className="w-7 h-7 rounded-md bg-bg-secondary border border-border-default hover:bg-bg-hover text-text-secondary hover:text-text-primary flex items-center justify-center transition cursor-pointer"
                    title="Previous Product"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-[10px] font-mono text-text-quaternary px-1 select-none">
                    {safeIndex + 1}/{products.length}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveProdIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1))}
                    className="w-7 h-7 rounded-md bg-bg-secondary border border-border-default hover:bg-bg-hover text-text-secondary hover:text-text-primary flex items-center justify-center transition cursor-pointer"
                    title="Next Product"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Horizontal Pill Indicators */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {products.map((p, idx) => (
                  <button
                    key={p.id || idx}
                    type="button"
                    onClick={() => setActiveProdIndex(idx)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold transition shrink-0 cursor-pointer ${
                      idx === safeIndex
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : p.hidden
                        ? 'bg-bg-secondary text-text-quaternary opacity-50 border border-border-subtle'
                        : 'bg-bg-secondary text-text-tertiary hover:text-text-primary hover:bg-bg-hover border border-border-subtle'
                    }`}
                  >
                    #{idx + 1} {p.name?.slice(0, 10)}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handleAddProduct}
                  disabled={isCapped}
                  className={`px-2 py-1 rounded-md text-[10px] font-bold transition shrink-0 border border-dashed flex items-center gap-1 ${
                    isCapped
                      ? 'border-border-subtle text-text-quaternary cursor-not-allowed opacity-40'
                      : 'border-emerald-500/50 text-emerald-400 hover:bg-emerald-950/40 cursor-pointer'
                  }`}
                  title={isCapped ? 'Max 6 products limit reached' : 'Add new product'}
                >
                  <Plus className="w-3 h-3" />
                  <span>New</span>
                </button>
              </div>

              {/* Active Product Form Controls Slide */}
              {currentProd && (
                <div className="pt-3 border-t border-border-subtle flex flex-col gap-3">
                  {/* Quick Action Bar for current product */}
                  <div className="flex items-center justify-between bg-bg-secondary p-2 rounded-lg border border-border-subtle">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleToggleHide(safeIndex)}
                        className="btn-ghost btn-sm text-text-tertiary flex items-center gap-1 text-[10px]"
                        title={currentProd.hidden ? 'Show Product' : 'Hide Product'}
                      >
                        {currentProd.hidden ? <EyeOff className="w-3.5 h-3.5 text-danger" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
                        <span>{currentProd.hidden ? 'Hidden' : 'Visible'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMoveProduct(safeIndex, 'prev')}
                        disabled={safeIndex === 0}
                        className="btn-ghost btn-icon btn-sm disabled:opacity-30"
                        title="Move Left"
                      >
                        <ArrowUp className="w-3.5 h-3.5 -rotate-90" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMoveProduct(safeIndex, 'next')}
                        disabled={safeIndex === products.length - 1}
                        className="btn-ghost btn-icon btn-sm disabled:opacity-30"
                        title="Move Right"
                      >
                        <ArrowDown className="w-3.5 h-3.5 -rotate-90" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleDuplicateProduct(safeIndex)}
                        disabled={isCapped}
                        className="btn-ghost btn-icon btn-sm disabled:opacity-30"
                        title="Duplicate Product"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(safeIndex)}
                        disabled={products.length <= 1}
                        className="btn-ghost btn-icon btn-sm text-danger disabled:opacity-30"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Product Form Fields */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-medium text-text-tertiary uppercase tracking-wide">Product Title</label>
                      <input
                        type="text"
                        value={currentProd.name || ''}
                        onChange={(e) => handleUpdateProduct(safeIndex, 'name', e.target.value)}
                        className="input w-full text-xs font-semibold"
                        placeholder="e.g. Gazelle Indoor Shoes"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-medium text-text-tertiary uppercase tracking-wide">Price</label>
                        <input
                          type="text"
                          value={currentProd.price || ''}
                          onChange={(e) => handleUpdateProduct(safeIndex, 'price', e.target.value)}
                          className="input w-full text-xs font-mono text-emerald-400 font-bold"
                          placeholder="$229.96"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-medium text-text-tertiary uppercase tracking-wide">Badge Label</label>
                        <input
                          type="text"
                          value={currentProd.badge || ''}
                          onChange={(e) => handleUpdateProduct(safeIndex, 'badge', e.target.value)}
                          className="input w-full text-xs"
                          placeholder="e.g. New Drop"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-medium text-text-tertiary uppercase tracking-wide">Product Image</label>
                      <ImageFileUploader
                        currentValue={currentProd.image || ''}
                        onChange={(base64Url) => handleUpdateProduct(safeIndex, 'image', base64Url)}
                      />
                      <input
                        type="text"
                        value={currentProd.image || ''}
                        onChange={(e) => handleUpdateProduct(safeIndex, 'image', e.target.value)}
                        className="input w-full font-mono text-[11px] mt-1"
                        placeholder="Direct image URL..."
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-medium text-text-tertiary uppercase tracking-wide">Description</label>
                      <textarea
                        rows={2}
                        value={currentProd.description || ''}
                        onChange={(e) => handleUpdateProduct(safeIndex, 'description', e.target.value)}
                        className="input w-full text-xs resize-none"
                        placeholder="Product highlight description..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Default Contact Cards for ContactCardsManagementPanel ────────────────
const DEFAULT_CONTACT_CARDS_MANAGEMENT_LIST = [
  {
    id: 'card-1',
    type: 'whatsapp',
    title: 'WhatsApp Support',
    value: '+1 (555) 123-4567',
    link: 'https://wa.me/15551234567',
    description: 'Instant chat assistance with customer care',
    hidden: false,
  },
  {
    id: 'card-2',
    type: 'instagram',
    title: 'Instagram',
    value: '@ourbrand',
    link: 'https://instagram.com',
    description: 'Follow our official handle for new drops',
    hidden: false,
  },
  {
    id: 'card-3',
    type: 'x',
    title: 'X.com (Twitter)',
    value: '@ourbrand',
    link: 'https://x.com',
    description: 'Latest updates & community announcements',
    hidden: false,
  },
  {
    id: 'card-4',
    type: 'googlemaps',
    title: 'Google Maps Location',
    value: '123 Premium Ave, NY 10001',
    link: 'https://maps.google.com',
    description: 'Find directions to our flagship store',
    hidden: false,
  },
  {
    id: 'card-5',
    type: 'phone',
    title: 'Phone Support',
    value: '+1 (555) 000-0000',
    link: 'tel:+15550000000',
    description: 'Mon - Fri, 9am - 6pm EST',
    hidden: false,
  },
  {
    id: 'card-6',
    type: 'email',
    title: 'Email Us',
    value: 'hello@example.com',
    link: 'mailto:hello@example.com',
    description: 'We reply within 24 business hours',
    hidden: false,
  },
  {
    id: 'card-7',
    type: 'address',
    title: 'Flagship Address',
    value: '123 Premium Avenue, Suite 100',
    link: '#',
    description: 'New York, NY 10001',
    hidden: false,
  },
];

// ─── Component: Dedicated Contact & Social Cards Panel ─────────────────────
// ─── Component: Dedicated Contact & Social Cards Panel ─────────────────────
function ContactCardsManagementPanel() {
  const { templateData, updateBlockContent } = useVisualBuilder();

  const contactBlock = templateData.blocks.find((b) => b.id === 'luxe-contact' || b.id === 'contact-cards');
  const cards: any[] = contactBlock?.content?.cards || DEFAULT_CONTACT_CARDS_MANAGEMENT_LIST;

  const [isOpen, setIsOpen] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const safeIndex = Math.min(Math.max(0, activeCardIndex), Math.max(0, cards.length - 1));

  const saveCards = (updatedCards: any[]) => {
    updateBlockContent('luxe-contact', {
      cards: updatedCards,
    });
  };

  const handleAddCard = (type: string = 'whatsapp') => {
    const presets: Record<string, any> = {
      whatsapp: { type: 'whatsapp', title: 'WhatsApp Support', value: '+1 (555) 123-4567', link: 'https://wa.me/15551234567', description: 'Instant chat assistance' },
      instagram: { type: 'instagram', title: 'Instagram', value: '@ourbrand', link: 'https://instagram.com', description: 'Follow our official handle' },
      x: { type: 'x', title: 'X.com', value: '@ourbrand', link: 'https://x.com', description: 'Latest news & updates' },
      googlemaps: { type: 'googlemaps', title: 'Google Maps Location', value: '123 Store Address, NY', link: 'https://maps.google.com', description: 'Directions to our store' },
      phone: { type: 'phone', title: 'Phone Support', value: '+1 (555) 000-0000', link: 'tel:+15550000000', description: 'Mon - Fri, 9am - 6pm EST' },
      address: { type: 'address', title: 'Address', value: '123 Premium Ave, Suite 100', link: '#', description: 'New York, NY 10001' },
      email: { type: 'email', title: 'Email Us', value: 'hello@example.com', link: 'mailto:hello@example.com', description: 'We reply within 24 hours' },
    };

    const preset = presets[type] || presets.whatsapp;
    const newCard = { ...preset, id: `card-${Date.now()}`, hidden: false };
    const updated = [...cards, newCard];
    saveCards(updated);
    setActiveCardIndex(updated.length - 1);
  };

  const handleUpdateCard = (index: number, key: string, val: any) => {
    const updated = [...cards];
    updated[index] = { ...updated[index], [key]: val };
    saveCards(updated);
  };

  const handleRemoveCard = (index: number) => {
    if (cards.length <= 1) return;
    const updated = cards.filter((_, i) => i !== index);
    saveCards(updated);
    if (activeCardIndex >= updated.length) {
      setActiveCardIndex(Math.max(0, updated.length - 1));
    }
  };

  const handleDuplicateCard = (index: number) => {
    const item = cards[index];
    const duplicated = { ...item, id: `card-${Date.now()}`, title: `${item.title} (COPY)` };
    const updated = [...cards];
    updated.splice(index + 1, 0, duplicated);
    saveCards(updated);
    setActiveCardIndex(index + 1);
  };

  const handleMoveCard = (index: number, direction: 'prev' | 'next') => {
    const target = direction === 'prev' ? index - 1 : index + 1;
    if (target < 0 || target >= cards.length) return;
    const updated = [...cards];
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    saveCards(updated);
    setActiveCardIndex(target);
  };

  const handleToggleHide = (index: number) => {
    const updated = [...cards];
    updated[index] = { ...updated[index], hidden: !updated[index].hidden };
    saveCards(updated);
  };

  const currentCard = cards[safeIndex] || cards[0];

  return (
    <div className="flex flex-col gap-3">
      {/* Accordion Toggle Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3.5 bg-bg-tertiary hover:bg-bg-hover border border-border-subtle rounded-xl transition text-text-secondary group cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Contact & Social Cards ({cards.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono px-2 py-0.5 rounded-badge font-semibold bg-sky-950/60 text-sky-400 border border-sky-800/40">
            {cards.length} CHANNELS
          </span>
          <ChevronDown className={`w-4 h-4 text-text-quaternary transition-transform duration-300 ${isOpen ? 'rotate-180 text-sky-400' : ''}`} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden flex flex-col gap-4 pt-1"
          >
            {/* Quick Channel Add Buttons */}
            <div className="flex flex-col gap-1.5 bg-bg-tertiary p-3 rounded-xl border border-border-subtle">
              <span className="text-[9px] font-bold text-text-quaternary uppercase tracking-wider">+ Add Social / Contact Channel</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { type: 'whatsapp', label: 'WhatsApp' },
                  { type: 'instagram', label: 'Instagram' },
                  { type: 'x', label: 'X.com' },
                  { type: 'googlemaps', label: 'Maps' },
                  { type: 'phone', label: 'Phone' },
                  { type: 'email', label: 'Email' },
                ].map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => handleAddCard(item.type)}
                    className="px-2.5 py-1 rounded-md bg-bg-secondary hover:bg-sky-950/40 hover:text-sky-400 border border-border-subtle hover:border-sky-500/40 text-[10px] font-semibold text-text-tertiary transition cursor-pointer"
                  >
                    + {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Cards Horizontal Carousel Header */}
            <div className="flex flex-col gap-3 bg-bg-tertiary p-3.5 rounded-xl border border-border-subtle">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-800/40 shrink-0">
                    #{safeIndex + 1}
                  </span>
                  <span className="text-xs font-bold text-text-primary truncate">
                    {currentCard?.title || 'Untitled Card'}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1))}
                    className="w-7 h-7 rounded-md bg-bg-secondary border border-border-default hover:bg-bg-hover text-text-secondary hover:text-text-primary flex items-center justify-center transition cursor-pointer"
                    title="Previous Channel"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-[10px] font-mono text-text-quaternary px-1 select-none">
                    {safeIndex + 1}/{cards.length}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1))}
                    className="w-7 h-7 rounded-md bg-bg-secondary border border-border-default hover:bg-bg-hover text-text-secondary hover:text-text-primary flex items-center justify-center transition cursor-pointer"
                    title="Next Channel"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Horizontal Channel Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {cards.map((c, idx) => (
                  <button
                    key={c.id || idx}
                    type="button"
                    onClick={() => setActiveCardIndex(idx)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold transition shrink-0 cursor-pointer ${
                      idx === safeIndex
                        ? 'bg-sky-500 text-white shadow-sm'
                        : c.hidden
                        ? 'bg-bg-secondary text-text-quaternary opacity-50 border border-border-subtle'
                        : 'bg-bg-secondary text-text-tertiary hover:text-text-primary hover:bg-bg-hover border border-border-subtle'
                    }`}
                  >
                    {c.title?.slice(0, 12)}
                  </button>
                ))}
              </div>

              {/* Active Channel Form Controls */}
              {currentCard && (
                <div className="pt-3 border-t border-border-subtle flex flex-col gap-3">
                  {/* Quick Bar */}
                  <div className="flex items-center justify-between bg-bg-secondary p-2 rounded-lg border border-border-subtle">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleToggleHide(safeIndex)}
                        className="btn-ghost btn-sm text-text-tertiary flex items-center gap-1 text-[10px]"
                        title={currentCard.hidden ? 'Show Channel' : 'Hide Channel'}
                      >
                        {currentCard.hidden ? <EyeOff className="w-3.5 h-3.5 text-danger" /> : <Eye className="w-3.5 h-3.5 text-sky-400" />}
                        <span>{currentCard.hidden ? 'Hidden' : 'Visible'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMoveCard(safeIndex, 'prev')}
                        disabled={safeIndex === 0}
                        className="btn-ghost btn-icon btn-sm disabled:opacity-30"
                        title="Move Left"
                      >
                        <ArrowUp className="w-3.5 h-3.5 -rotate-90" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMoveCard(safeIndex, 'next')}
                        disabled={safeIndex === cards.length - 1}
                        className="btn-ghost btn-icon btn-sm disabled:opacity-30"
                        title="Move Right"
                      >
                        <ArrowDown className="w-3.5 h-3.5 -rotate-90" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleDuplicateCard(safeIndex)}
                        className="btn-ghost btn-icon btn-sm"
                        title="Duplicate Channel"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveCard(safeIndex)}
                        disabled={cards.length <= 1}
                        className="btn-ghost btn-icon btn-sm text-danger disabled:opacity-30"
                        title="Delete Channel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Channel Form Inputs */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-medium text-text-tertiary uppercase tracking-wide">Channel Title</label>
                      <input
                        type="text"
                        value={currentCard.title || ''}
                        onChange={(e) => handleUpdateCard(safeIndex, 'title', e.target.value)}
                        className="input w-full text-xs font-semibold"
                        placeholder="e.g. WhatsApp Support"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-medium text-text-tertiary uppercase tracking-wide">Display Value / Handle</label>
                      <input
                        type="text"
                        value={currentCard.value || ''}
                        onChange={(e) => handleUpdateCard(safeIndex, 'value', e.target.value)}
                        className="input w-full text-xs font-mono"
                        placeholder="e.g. +1 (555) 123-4567 or @ourbrand"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-medium text-text-tertiary uppercase tracking-wide">Target Link URL</label>
                      <input
                        type="text"
                        value={currentCard.link || ''}
                        onChange={(e) => handleUpdateCard(safeIndex, 'link', e.target.value)}
                        className="input w-full text-xs font-mono text-sky-400"
                        placeholder="https://..."
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-medium text-text-tertiary uppercase tracking-wide">Subtitle Description</label>
                      <input
                        type="text"
                        value={currentCard.description || ''}
                        onChange={(e) => handleUpdateCard(safeIndex, 'description', e.target.value)}
                        className="input w-full text-xs"
                        placeholder="Short subtitle or status description..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BentoBioInspectorPanel() {
  // Replace the previous, more technical Bento inspector with the new visual BentoCustomizer.
  return <BentoCustomizer />;
}
