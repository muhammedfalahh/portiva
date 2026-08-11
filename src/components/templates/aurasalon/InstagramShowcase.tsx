'use client';

import React from 'react';
import { Camera, Heart, ArrowUpRight } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { useScrollReveal } from './useScrollReveal';
import type { InstagramPost } from './types';

interface InstagramShowcaseProps {
  instagramHandle: string;
  instagramFollowerCount: string;
  instagramPosts: InstagramPost[];
}

export const InstagramShowcase: React.FC<InstagramShowcaseProps> = ({
  instagramHandle,
  instagramFollowerCount,
  instagramPosts,
}) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      id="instagram"
      ref={ref}
      className={`w-full py-28 bg-theme-surface/30 border-b border-theme-border/20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Handle & Follow CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Camera className="w-4 h-4 text-theme-accent" />
              <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-theme-accent">
                INSTAGRAM EDITORIAL STREAM
              </span>
            </div>
            <EditableElement
              as="h2"
              id="aura-ig-handle"
              field="instagramHandle"
              value={instagramHandle}
              type="heading"
              className="font-editorial text-4xl sm:text-5xl font-light text-theme-foreground"
            />
            <EditableElement
              as="p"
              id="aura-ig-followers"
              field="instagramFollowerCount"
              value={instagramFollowerCount}
              type="text"
              className="font-sans text-sm text-theme-muted mt-1"
            />
          </div>

          <a
            href={`https://instagram.com/${instagramHandle.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-theme-primary/30 text-theme-primary hover:bg-theme-primary hover:text-theme-background px-6 py-3 rounded-full text-xs font-sans font-semibold uppercase tracking-widest transition-all duration-200"
          >
            <span>Follow {instagramHandle}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Asymmetric Strip Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {instagramPosts.map((post, idx) => (
            <a
              key={post.id || idx}
              href={post.link || 'https://instagram.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden border border-theme-border/40 bg-theme-surface shadow-xs block"
            >
              <EditableImage
                imageKey={`aura-ig-post-${idx}`}
                defaultSrc={post.image}
                defaultAlt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                containerClassName="w-full h-full"
              />
              {/* Hover Dark Overlay with Likes & Caption */}
              <div className="absolute inset-0 bg-theme-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between text-xs font-sans font-bold">
                  <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest">
                    <EditableElement
                      as="span"
                      id={`aura-ig-${idx}-tag`}
                      field="tag"
                      value={post.tag}
                      type="text"
                    />
                  </span>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                    <EditableElement
                      as="span"
                      id={`aura-ig-${idx}-likes`}
                      field="likes"
                      value={post.likes}
                      type="text"
                    />
                  </div>
                </div>

                <div>
                  <EditableElement
                    as="p"
                    id={`aura-ig-${idx}-caption`}
                    field="caption"
                    value={post.caption}
                    type="text"
                    className="font-sans text-xs text-white/90 line-clamp-3"
                  />
                  <div className="flex items-center gap-1 text-[11px] font-sans text-theme-accent font-semibold uppercase tracking-wider mt-2">
                    <span>View Post</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
