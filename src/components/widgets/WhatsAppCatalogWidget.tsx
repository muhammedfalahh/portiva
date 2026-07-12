'use client';

import React from 'react';

/**
 * =============================================================================
 * PORTIVA: WhatsApp Catalog Widget — Click-to-Chat Commerce Card
 * =============================================================================
 *
 * A premium commerce card component designed for the Indian market where
 * WhatsApp is the dominant messaging platform. Renders a product listing
 * with a one-tap order button that opens WhatsApp with a pre-filled message.
 *
 * WhatsApp API Integration:
 *   Uses the official wa.me click-to-chat URL scheme:
 *   https://wa.me/{phone}?text={encoded_message}
 *
 * Design System:
 *   - Emerald accent color scheme (WhatsApp brand association)
 *   - Glassmorphism glow effect on hover
 *   - 28px border radius matching Portiva's rounded design language
 */

interface WhatsAppCatalogProps {
  /** Product/item display name */
  itemName: string;
  /** Short product description (max ~80 chars for optimal display) */
  description: string;
  /** Seller's WhatsApp number with country code, no spaces (e.g., "919876543210") */
  phoneNumber: string;
  /** Product price in INR (displayed with ₹ symbol) */
  price: number;
}

export const WhatsAppCatalogWidget: React.FC<WhatsAppCatalogProps> = ({
  itemName,
  description,
  phoneNumber,
  price,
}) => {
  /**
   * Constructs a WhatsApp click-to-chat URL with a pre-filled purchase
   * intent message and opens it in a new tab. Uses noopener/noreferrer
   * for security (prevents the opened page from accessing window.opener).
   */
  const triggerWhatsAppRedirect = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // Build a human-readable message that includes the item and price
    const dynamicMessage = `Hi, I want to buy ${itemName} for Rs. ${price}. Please confirm stock availability.`;
    const encodedPayload = encodeURIComponent(dynamicMessage);
    const apiTargetUri = `https://wa.me/${phoneNumber}?text=${encodedPayload}`;

    window.open(apiTargetUri, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full h-full bg-[#111115] border border-slate-800 rounded-[28px] p-6 flex flex-col justify-between overflow-hidden shadow-xl hover:border-emerald-500/40 transition-colors duration-300 group relative">
      {/* Ambient glow effect — subtle emerald radial gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-300 pointer-events-none" />

      {/* Product Information */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start w-full">
          <span className="text-emerald-400 font-extrabold text-[9px] tracking-widest uppercase bg-emerald-950/40 border border-emerald-900/40 px-3 py-1 rounded-full">
            Store Product
          </span>
          <span className="text-slate-100 font-black text-xl">
            ₹{price.toLocaleString('en-IN')}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-100 mt-2 line-clamp-1">
          {itemName}
        </h3>
        <p className="text-slate-400 text-xs font-medium leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* WhatsApp CTA Button */}
      <button
        onClick={triggerWhatsAppRedirect}
        className="w-full py-3.5 mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-950/20 active:scale-[0.98]"
      >
        {/* WhatsApp SVG Icon */}
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.948 0c3.179.001 6.167 1.24 8.412 3.487 2.245 2.246 3.482 5.239 3.482 8.417-.003 6.596-5.343 11.946-11.893 11.946-1.993-.001-3.951-.5-5.688-1.448L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.758 1.451 5.432 0 9.851-4.38 9.854-9.765.001-2.606-1.013-5.059-2.856-6.905C16.5 2.088 14.054.87 11.498.87c-5.439 0-9.856 4.377-9.86 9.763-.001 1.959.514 3.878 1.49 5.597L2.14 21.925l5.664-1.48c-.018-.01-.018-.01 0 0z" />
        </svg>
        Instant Order via WhatsApp
      </button>
    </div>
  );
};
