'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EditableElement } from '@/components/engine/EditableElement';

interface DreamVehicleMarqueeProps {
  marqueeText?: string;
}

export const DreamVehicleMarquee: React.FC<DreamVehicleMarqueeProps> = ({
  marqueeText = 'YOUR DREAM RIDE',
}) => {
  const items = Array.from({ length: 8 });

  return (
    <section className="w-full py-8 sm:py-12 bg-theme-background border-y border-theme-border relative overflow-hidden select-none font-inter">
      {/* Marquee Track */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex items-center gap-10 sm:gap-14 whitespace-nowrap will-change-transform"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 24,
          }}
        >
          {items.map((_, idx) => (
            <div key={idx} className="flex items-center gap-10 sm:gap-14 shrink-0">
              <EditableElement
                as="span"
                id={`auto-marquee-text-${idx}`}
                field="storyWatermark"
                value={marqueeText}
                type="text"
                className="font-manrope text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-[0.15em] uppercase text-theme-foreground hover:text-theme-muted transition-colors"
              />
              <span className="text-theme-primary text-lg sm:text-2xl">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
