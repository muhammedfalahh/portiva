'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Shared Section Primitives
 * =============================================================================
 *
 * Small building blocks reused by every bespoke storefront section: the
 * entrance-reveal wrapper (opacity/transform only, frozen in builder mode and
 * reduced-motion contexts) and the standard editorial heading stack.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { EditableElement } from '@/components/engine/EditableElement';

export function MeridianReveal({
  children,
  className,
  reducedMotion,
}: {
  children: React.ReactNode;
  className?: string;
  reducedMotion: boolean;
}) {
  if (reducedMotion) {
    return <section className={className}>{children}</section>;
  }

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

export interface MeridianHeadingProps {
  sectionId: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function MeridianHeading({
  sectionId,
  eyebrow,
  title,
  description,
  align = 'left',
}: MeridianHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'max-w-2xl';

  return (
    <div className={alignment}>
      <EditableElement
        as="p"
        id={`${sectionId}-eyebrow`}
        field="value"
        value={eyebrow}
        className="text-[11px] font-bold uppercase tracking-[0.24em] text-theme-accent sm:text-xs"
      />
      <EditableElement
        as="h2"
        id={`${sectionId}-title`}
        field="value"
        value={title}
        className="mt-3 font-editorial-serif text-3xl leading-[1.08] tracking-tight text-theme-foreground sm:text-4xl lg:text-[2.75rem]"
      />
      {description ? (
        <EditableElement
          as="p"
          id={`${sectionId}-description`}
          field="value"
          value={description}
          className={`mt-4 break-words text-sm leading-7 text-theme-muted sm:text-base ${
            align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl'
          }`}
        />
      ) : null}
    </div>
  );
}
