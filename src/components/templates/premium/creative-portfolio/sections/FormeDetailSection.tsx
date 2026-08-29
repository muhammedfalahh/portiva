'use client';

/**
 * FORME Studio — detail section.
 * Extracted verbatim from PremiumMultipageTemplate.tsx (CreativeDetailSection)
 * during the template platform migration. Composed from shared runtime
 * primitives (MotionSection, SectionHeader, ActionRow).
 */

import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import {
  ActionRow,
  MotionSection,
  SectionHeader,
} from '@/components/templates/shared/premium-runtime';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import type { FormeSectionProps } from './types';

export function FormeDetailSection({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: FormeSectionProps<Extract<PremiumTemplateSection, { type: 'detail' }>>) {
  return (
    <MotionSection className="py-10 sm:py-14 lg:py-16" reduced={reducedMotion}>
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:px-8">
        <div className="space-y-6">
          <SectionHeader section={section} />
          {section.specs && section.specs.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {section.specs.map((spec) => (
                <div key={spec.id} className="rounded-[1.4rem] border border-theme-border bg-theme-surface px-4 py-4">
                  <EditableElement
                    as="p"
                    id={`${section.id}-${spec.id}-label`}
                    field="value"
                    value={spec.label}
                    className="text-[11px] uppercase tracking-[0.22em] text-theme-muted"
                  />
                  <EditableElement
                    as="p"
                    id={`${section.id}-${spec.id}-value`}
                    field="value"
                    value={spec.value}
                    className="mt-2 text-base font-semibold tracking-[-0.02em] text-theme-foreground"
                  />
                </div>
              ))}
            </div>
          ) : null}
          <ActionRow
            sectionId={section.id}
            definition={definition}
            handle={handle}
            templateId={templateId}
            onNavigate={onNavigate}
            mode={mode}
            primaryAction={section.primaryAction}
            secondaryAction={section.secondaryAction}
          />
        </div>
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[2rem] border border-theme-border bg-theme-surface">
            {section.media ? (
              <EditableImage
                imageKey={section.media.key}
                defaultSrc={section.media.src}
                defaultAlt={section.media.alt}
                className="aspect-[4/4.6] w-full object-cover"
              />
            ) : (
              <div className="aspect-[4/4.6] w-full bg-theme-surface" />
            )}
          </div>
          <EditableElement
            as="p"
            id={`${section.id}-caption`}
            field="value"
            value="Use this section for challenge, approach, and outcome framing before deeper supporting visuals below."
            className="text-xs uppercase tracking-[0.22em] text-theme-muted"
          />
        </div>
      </div>
    </MotionSection>
  );
}
