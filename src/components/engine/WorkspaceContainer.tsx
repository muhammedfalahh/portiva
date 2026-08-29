'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useWorkspaceStore, TemplateData, ProjectItem } from './useWorkspaceStore';
import { WorkspaceLayout } from './WorkspaceLayout';
import { VisualBuilderProvider, useVisualBuilder } from './VisualBuilderContext';
import { ThemeProvider } from './ThemeProvider';
import { FolderOpen, Compass, Sparkles, Search, ExternalLink, Trash2, Lock, Layers3, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TEMPLATE_CATEGORY_OPTIONS,
  createTemplateProjectData,
  getTemplateManifest,
  listTemplateManifests,
  loadTemplateModule,
  type ResolvedTemplate,
} from '@/components/templates/platform';
import type { TemplateManifest } from '@/lib/template-contract';

/**
 * Canvas host: resolves the selected template through the platform resolver
 * (lazy chunk per template) and renders it inside the live theme context.
 * No static template imports remain in this file — adding a template never
 * requires touching this component.
 */
function VisualCanvas({ selectedTemplateId }: { selectedTemplateId: string }) {
  const { templateData, setTemplateData } = useVisualBuilder();
  const [resolved, setResolved] = useState<ResolvedTemplate | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    setResolved(null);
    setLoadFailed(false);
    loadTemplateModule(selectedTemplateId)
      .then((module) => {
        if (!alive) return;
        if (module) {
          setResolved(module);
        } else {
          setLoadFailed(true);
        }
      })
      .catch(() => {
        if (alive) setLoadFailed(true);
      });
    return () => {
      alive = false;
    };
  }, [selectedTemplateId]);

  const handlePageNavigate = useCallback(
    (pageId: string) => {
      setTemplateData((prev) => ({
        ...prev,
        activePageId: pageId,
        textOverrides: {
          ...(prev.textOverrides || {}),
          'template-page-activePageId': pageId,
        },
      }));
    },
    [setTemplateData],
  );

  const navBlock = templateData.blocks.find((block) => block.id.includes('nav'));
  const navbarBg = navBlock?.content.navbarBg || 'transparent';
  const hoverStyle = navBlock?.content.hoverStyle || 'color';

  let canvasContent: React.ReactNode = null;
  if (resolved) {
    if ('definition' in resolved) {
      canvasContent = (
        <resolved.Renderer
          definition={resolved.definition}
          activePageId={templateData.activePageId || resolved.definition.pages[0]?.id || 'home'}
          mode="builder"
          handle={templateData.profileHandle}
          templateId={selectedTemplateId}
          onNavigate={handlePageNavigate}
        />
      );
    } else {
      canvasContent = resolved.renderFree(
        {
          templateId: selectedTemplateId,
          profileName: templateData.profileName,
          profileHandle: templateData.profileHandle,
        },
        { navbarBg, hoverStyle, onNavigate: handlePageNavigate },
        templateData.activePageId
      );
    }
  }

  return (
    <ThemeProvider theme={templateData.theme}>
      {canvasContent ??
        (loadFailed ? (
          <div className="flex h-full min-h-[480px] w-full items-center justify-center text-sm text-text-secondary">
            Unable to load this template.
          </div>
        ) : (
          <div className="flex h-full min-h-[480px] w-full items-center justify-center text-sm text-text-secondary">
            Loading template…
          </div>
        ))}
    </ThemeProvider>
  );
}

function TemplateCard({
  template,
  onUse,
}: {
  template: TemplateManifest;
  onUse: (templateId: string) => void;
}) {
  const badgeClassName =
    template.tier === 'premium'
      ? 'border-amber-400/25 bg-amber-400/10 text-amber-200'
      : 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200';

  return (
    <motion.article
      whileHover={{ y: -3 }}
      className="group overflow-hidden rounded-[24px] border border-border-subtle bg-bg-secondary"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-tertiary">
        <img
          src={template.previewImage}
          alt={template.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${badgeClassName}`}>
            {template.tier === 'premium' ? 'PRO' : 'FREE'}
          </span>
          <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
            {template.pageCount} {template.pageCount === 1 ? 'Page' : 'Pages'}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">{template.categoryLabel}</p>
            <h3 className="truncate pt-1 text-lg font-semibold tracking-tight text-white">{template.shortName}</h3>
          </div>
          {template.tier === 'premium' ? <Crown className="h-5 w-5 shrink-0 text-amber-300" /> : <Layers3 className="h-5 w-5 shrink-0 text-emerald-300" />}
        </div>
      </div>
      <div className="space-y-4 p-5">
        <p className="min-h-12 text-sm leading-6 text-text-secondary">{template.description}</p>
        <div className="flex flex-wrap gap-2">
          {template.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full border border-border-subtle bg-bg-tertiary px-3 py-1 text-[11px] font-medium text-text-tertiary">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <button className="btn-ghost btn-sm flex-1">Preview</button>
          <button onClick={() => onUse(template.id)} className="btn-primary btn-sm flex-1">
            Use Template
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function WorkspaceContainer() {
  const {
    activeTab,
    currentProjectId,
    templateSearchQuery,
    selectedCategory,
    projectsList,
    templateData,
    setActiveTab,
    setCurrentProjectId,
    setTemplateSearchQuery,
    setSelectedCategory,
    setProjectsList,
    addProject,
    updateProjectData,
    setTemplateData,
  } = useWorkspaceStore();

  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (projectsList.length > 0) return;

    const seedIds = ['portfolio', 'cafe_cloud', 'auto_drive', 'premium_creative_portfolio', 'premium_social_ecommerce'];
    void Promise.all(
      seedIds.map(async (id, index) => {
        const template = getTemplateManifest(id);
        const data = await createTemplateProjectData(id);
        if (!template || !data) return null;
        return {
          id: `proj-${id}`,
          name: `${template.shortName} ${index < 3 ? 'Starter' : 'Pro'} Project`,
          templateId: id,
          subDomain: `${data.profileHandle}.portiva.site`,
          isLive: index < 3,
          data,
        } satisfies ProjectItem;
      }),
    ).then((seeded) => {
      // Guard against clobbering projects created while seeds were resolving.
      if (useWorkspaceStore.getState().projectsList.length > 0) return;
      setProjectsList(seeded.filter((project): project is ProjectItem => Boolean(project)));
    });
  }, [projectsList.length, setProjectsList]);

  const handleCreateProjectFromTemplate = useCallback(
    async (templateId: string) => {
      const template = getTemplateManifest(templateId);
      const data = await createTemplateProjectData(templateId);
      if (!template || !data) return;

      const suffix = Date.now().toString().slice(-5);
      const projectId = `proj-${templateId}-${suffix}`;
      const newProject: ProjectItem = {
        id: projectId,
        name: `${template.shortName} Draft`,
        templateId,
        subDomain: `${data.profileHandle}-${suffix}.portiva.site`,
        isLive: false,
        data,
      };

      addProject(newProject);
      setCurrentProjectId(projectId);
      setTemplateData(newProject.data);
      setActiveTab('builder');
    },
    [addProject, setCurrentProjectId, setActiveTab, setTemplateData],
  );

  const handleLoadProject = (project: ProjectItem) => {
    setCurrentProjectId(project.id);
    setTemplateData(project.data);
    setActiveTab('builder');
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjectsList(projectsList.filter((project) => project.id !== projectId));
    if (currentProjectId === projectId) {
      setCurrentProjectId(null);
    }
  };

  const handleSaveWorkspaceDraft = useCallback(
    (updatedData: TemplateData) => {
      if (!currentProjectId) return;
      updateProjectData(currentProjectId, updatedData);
    },
    [currentProjectId, updateProjectData],
  );

  const handleSimulatePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      if (currentProjectId) {
        setProjectsList(
          projectsList.map((project) =>
            project.id === currentProjectId ? { ...project, isLive: true } : project,
          ),
        );
      }
    }, 1800);
  };

  const filteredTemplates = useMemo(() => {
    return listTemplateManifests().filter((template) => {
      const query = templateSearchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'free' && template.tier === 'free') ||
        (selectedCategory === 'premium' && template.tier === 'premium') ||
        template.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [selectedCategory, templateSearchQuery]);

  const groupedTemplates = useMemo(
    () => ({
      free: filteredTemplates.filter((template) => template.tier === 'free'),
      premium: filteredTemplates.filter((template) => template.tier === 'premium'),
    }),
    [filteredTemplates],
  );

  const activeProject = projectsList.find((project) => project.id === currentProjectId) || null;

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-bg-primary text-text-primary font-sans">
      <nav className="z-30 flex h-14 shrink-0 items-center justify-between border-b border-border-subtle bg-bg-primary px-5 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white shadow-glow">P</div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-text-primary">Portiva</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-text-tertiary">Website Builder</p>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-full border border-border-subtle bg-bg-secondary p-1">
          {[
            { id: 'projects', label: 'Projects', icon: FolderOpen },
            { id: 'templates', label: 'Templates', icon: Compass },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'projects' | 'templates')}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition ${
                activeTab === tab.id
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
          {activeProject && (
            <button
              onClick={() => setActiveTab('builder')}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition ${
                activeTab === 'builder'
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Builder</span>
            </button>
          )}
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-bg-secondary text-xs font-semibold text-text-primary">
          AD
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && (
            <motion.main
              key="projects"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex-1 overflow-y-auto px-6 py-8 lg:px-10"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-text-primary">Projects</h2>
                    <p className="mt-1 text-sm text-text-secondary">Open drafts, publish client work, and jump back into editing without losing context.</p>
                  </div>
                  <button onClick={() => setActiveTab('templates')} className="btn-primary btn-sm self-start sm:self-auto">
                    New Project
                  </button>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {projectsList.map((project) => {
                    const template = getTemplateManifest(project.templateId);
                    if (!template) return null;
                    return (
                      <motion.article
                        key={project.id}
                        whileHover={{ y: -3 }}
                        onClick={() => handleLoadProject(project)}
                        className="group cursor-pointer overflow-hidden rounded-[24px] border border-border-subtle bg-bg-secondary"
                      >
                        <div className="relative aspect-video overflow-hidden bg-bg-tertiary">
                          <img src={template.previewImage} alt={project.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute left-4 top-4 flex items-center gap-2">
                            <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${project.isLive ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200' : 'border-amber-400/20 bg-amber-400/10 text-amber-200'}`}>
                              {project.isLive ? 'LIVE' : 'DRAFT'}
                            </span>
                            <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
                              {template.tier === 'premium' ? 'PRO' : 'FREE'}
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">{template.categoryLabel}</p>
                            <h3 className="truncate pt-1 text-lg font-semibold text-white">{project.name}</h3>
                          </div>
                        </div>
                        <div className="space-y-3 p-5">
                          <p className="truncate text-xs font-mono text-text-tertiary">{project.subDomain}</p>
                          <p className="min-h-10 text-sm leading-6 text-text-secondary">{template.description}</p>
                          <div className="flex items-center justify-between gap-3">
                            <button className="btn-ghost btn-sm" onClick={(event) => { event.stopPropagation(); handleLoadProject(project); }}>
                              <ExternalLink className="h-3.5 w-3.5" />
                              Open
                            </button>
                            <button
                              onClick={(event) => handleDeleteProject(project.id, event)}
                              className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-4 py-2 text-xs font-medium text-text-secondary transition hover:border-danger/40 hover:text-danger"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            </motion.main>
          )}

          {activeTab === 'templates' && (
            <motion.main
              key="templates"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex-1 overflow-y-auto px-6 py-8 lg:px-10"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <section className="rounded-[32px] border border-border-subtle bg-bg-secondary p-6 sm:p-8 lg:p-10">
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
                    <div>
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-hover">
                        Template Ecosystem
                      </div>
                      <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
                        Free templates for fast starts. Premium templates for real multi-page websites.
                      </h2>
                      <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
                        Understand what is free, what is premium, and which niche fits business in seconds. All current templates stay available. Premium collection adds page-aware editing foundation.
                      </p>
                    </div>
                    <div className="space-y-3 rounded-[24px] border border-border-subtle bg-bg-primary p-5">
                      <div className="flex items-center justify-between text-sm text-text-secondary">
                        <span>Free library</span>
                        <span>{listTemplateManifests().filter((entry) => entry.tier === 'free').length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-text-secondary">
                        <span>Premium library</span>
                        <span>{listTemplateManifests().filter((entry) => entry.tier === 'premium').length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-text-secondary">
                        <span>Multi-page templates</span>
                        <span>{listTemplateManifests().filter((entry) => entry.pageCount > 1).length}</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative w-full max-w-md">
                      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-text-tertiary">
                        <Search className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search templates, categories, or niches"
                        value={templateSearchQuery}
                        onChange={(event) => setTemplateSearchQuery(event.target.value)}
                        className="input w-full pl-10"
                      />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {TEMPLATE_CATEGORY_OPTIONS.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
                            selectedCategory === category.id
                              ? 'bg-accent text-white'
                              : 'border border-border-subtle bg-bg-secondary text-text-secondary hover:border-border-default hover:text-text-primary'
                          }`}
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="space-y-5">
                  <div className="flex items-center gap-3">
                    <Layers3 className="h-5 w-5 text-emerald-300" />
                    <div>
                      <h3 className="text-xl font-semibold text-text-primary">Free Templates</h3>
                      <p className="text-sm text-text-secondary">All existing Portiva templates stay here and remain editable.</p>
                    </div>
                  </div>
                  {groupedTemplates.free.length === 0 ? (
                    <div className="rounded-[24px] border border-dashed border-border-subtle bg-bg-secondary p-12 text-center text-sm text-text-secondary">No free templates match current filter.</div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {groupedTemplates.free.map((template) => (
                        <TemplateCard key={template.id} template={template} onUse={handleCreateProjectFromTemplate} />
                      ))}
                    </div>
                  )}
                </section>

                <section className="space-y-5">
                  <div className="flex items-center gap-3">
                    <Crown className="h-5 w-5 text-amber-300" />
                    <div>
                      <h3 className="text-xl font-semibold text-text-primary">Premium Templates</h3>
                      <p className="text-sm text-text-secondary">Multi-page website systems ready for subscription gating later.</p>
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-amber-400/15 bg-gradient-to-br from-amber-400/5 via-transparent to-transparent p-5 text-sm text-text-secondary">
                    <div className="flex items-center gap-2 text-amber-200">
                      <Lock className="h-4 w-4" />
                      <span className="font-semibold uppercase tracking-[0.18em] text-[11px]">UI architecture ready</span>
                    </div>
                    <p className="mt-3 max-w-3xl leading-6">
                      Premium badge, page count, category hierarchy, and editor page-switching foundation exist now. Real billing and entitlement checks still not implemented.
                    </p>
                  </div>
                  {groupedTemplates.premium.length === 0 ? (
                    <div className="rounded-[24px] border border-dashed border-border-subtle bg-bg-secondary p-12 text-center text-sm text-text-secondary">No premium templates match current filter.</div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {groupedTemplates.premium.map((template) => (
                        <TemplateCard key={template.id} template={template} onUse={handleCreateProjectFromTemplate} />
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </motion.main>
          )}

          {activeTab === 'builder' && activeProject && (
            <motion.div key="builder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full flex-1">
              <VisualBuilderProvider
                key={activeProject.id}
                initialData={templateData}
                defaultTheme={getTemplateManifest(activeProject.templateId)?.theme}
                onSave={handleSaveWorkspaceDraft}
              >
                <WorkspaceLayout onPublish={handleSimulatePublish} isPublishing={isPublishing} onBack={() => setActiveTab('projects')}>
                  <VisualCanvas selectedTemplateId={activeProject.templateId} />
                </WorkspaceLayout>
              </VisualBuilderProvider>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
