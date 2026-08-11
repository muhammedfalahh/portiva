/**
 * =============================================================================
 * PORTIVA: WorkspaceContainer — Unified Creator Dashboard & Canvas System
 * =============================================================================
 *
 * Implements the flagship creator dashboard. Supports tab switching:
 *   - 'projects': Shelves for live customized websites.
 *   - 'templates': Sleek Canva-style categories ribbon explorer with 3D spring cards.
 *   - 'builder': The Figma-style visual editor canvas artboard.
 */

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useWorkspaceStore, BentoBlock, TemplateData, ProjectItem } from './useWorkspaceStore';
import { WorkspaceLayout } from './WorkspaceLayout';
import { VisualBuilderProvider, useVisualBuilder } from './VisualBuilderContext';
import { ThemeProvider } from './ThemeProvider';
import { SnapMaster } from '../templates/SnapMaster';
import { LuxeUniversal } from '../templates/LuxeUniversal';
import { CafeCloud } from '../templates/CafeCloud';
import { AutoDrive } from '../templates/AutoDrive';
import { AuraSalon } from '../templates/AuraSalon';
import { ApexFit } from '../templates/ApexFit';
import { EstatePrime } from '../templates/EstatePrime';
import { MentorX } from '../templates/MentorX';
import { StudioNova } from '../templates/StudioNova';
import { BentoBio, DEFAULT_BENTO_CONFIG } from '../templates/BentoBio';
import { Sparkles, ShoppingBag, FolderOpen, Compass, ArrowRight, Play, Search, User, ExternalLink, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeConfig, MENTROX_THEME } from '@/lib/theme.types';

// ─── Default Templates Configuration Data ────────────────────────────────────

const TEMPLATE_PRESETS: Record<string, { name: string; category: string; description: string; previewImage: string; data: TemplateData }> = {
  luxe_universal: {
    name: 'Valkyrie Luxe (Universal Luxury E-Commerce)',
    category: 'ecommerce',
    description: 'Universal high-end luxury e-commerce landing page. Works for watches, perfumes, fashion, electronics, jewelry, skincare, & decor. Inspired by Rolex, Apple, Aesop, & B&O with adaptive dynamic product reflow.',
    previewImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop',
    data: {
      profileName: 'VALKYRIE LUXURY',
      profileHandle: 'valkyrieluxe',
      theme: {
        background: '#08080A',
        foreground: '#f4f4f5',
        primary: '#d97706',
        surface: '#111115',
        border: '#27272a',
        muted: '#94a3b8',
        primaryHover: '#b45309',
        surfaceHover: '#18181b',
        accent: '#10b981',
        accentHover: '#34d399',
      },
      textColors: {},
      styleOverrides: {},
      mediaOverrides: {},
      buttonOverrides: {},
      blocks: [
        {
          id: 'luxe-nav',
          block_type: 'link',
          content: {
            item_0: 'COLLECTION',
            item_1: 'CRAFTSMANSHIP',
            item_2: 'WHY US',
            item_3: 'REVIEWS',
            item_4: 'FAQ',
            item_5: 'CONTACT',
            navbarBg: 'glass',
            hoverStyle: 'underline',
          },
          grid_position: { x: 1, y: 0, w: 4, h: 1 },
          order_index: 0,
        },
      ],
    },
  },

  portfolio: {
    name: 'Snap Master (Creative Portfolio)',
    category: 'portfolio',
    description: 'High-contrast, edgy, Apple-inspired layout depth with heavy diffused drop shadows. Features design metrics, asymmetrical bento grids, and rotating circular badges.',
    previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    data: {
      profileName: 'Bruno Erdison',
      profileHandle: 'bruno',
      theme: {
        background: '#0A1A0F',
        foreground: '#C5FF2E',
        primary: '#C5FF2E',
        surface: '#0F2415',
        border: '#1F3F28',
        muted: '#7FA88B',
        primaryHover: '#C5FF2ECC',
        surfaceHover: '#0F2415E6',
        accent: '#C5FF2E',
        accentHover: '#C5FF2ECC',
      },
      textColors: {},
      styleOverrides: {},
      mediaOverrides: {},
      buttonOverrides: {},
      blocks: [
        {
          id: 'port-nav',
          block_type: 'link',
          content: {
            item_0: 'About',
            item_1: 'Services',
            item_2: 'Projects',
            item_3: 'Testimonials',
            item_4: 'Contact',
            navbarBg: 'glass',
            hoverStyle: 'pill',
          },
          grid_position: { x: 1, y: 0, w: 4, h: 1 },
          order_index: 0,
        },
        {
          id: 'port-hero',
          block_type: 'link',
          content: {
            heroHeading: 'UI/UX Interaction Designer',
            heroSubtitle: 'Based in Poland',
            heroDescription: "Work for money and design for love! I'm Bruno, an UI/UX Interaction Designer based in Poland",
            image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
          },
          grid_position: { x: 1, y: 1, w: 2, h: 2 },
          order_index: 1,
        },
        {
          id: 'port-stats',
          block_type: 'link',
          content: {
            stat1Value: '8',
            stat1Label: 'YEARS OF EXPERIENCE',
            stat2Value: '100%',
            stat2Label: 'SATISFACTION CLIENTS',
            stat3Value: '+ 80',
            stat3Label: 'CLIENTS ON WORLDWIDE',
            stat4Value: '675',
            stat4Label: 'PROJECTS DONE',
          },
          grid_position: { x: 3, y: 1, w: 2, h: 1 },
          order_index: 2,
        },
        {
          id: 'port-about',
          block_type: 'link',
          content: {
            aboutSubtitle: 'ABOUT ME',
            aboutTitle: 'Turning Ideas Into Reality',
            aboutDescription: 'With over 8 years of experience in design and development, I bring a unique blend of creativity and technical expertise to every project. My approach combines strategic thinking with meticulous execution to deliver solutions that not only meet expectations but consistently exceed them.',
            aboutBadgeText: 'CREATE • DESIGN • BUILD • SHIP • ',
            aboutHighlight1Value: '10+',
            aboutHighlight1Label: 'Years of Experience',
            aboutHighlight2Value: '200+',
            aboutHighlight2Label: 'Projects Completed',
            image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
          },
          grid_position: { x: 1, y: 3, w: 2, h: 2 },
          order_index: 3,
        },
        {
          id: 'port-projects',
          block_type: 'link',
          content: {
            project1Title: 'Nova Dashboard',
            project1Category: 'Web Application',
            project1Description: 'A comprehensive analytics dashboard with real-time data visualization, user management, and custom reporting tools.',
            project1Image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
            project2Title: 'Meridian Brand',
            project2Category: 'Brand Identity',
            project2Description: 'Complete brand identity redesign including visual language, guidelines, and digital asset creation for a tech startup.',
            project2Image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop',
            project3Title: 'Pulse Platform',
            project3Category: 'Mobile App',
            project3Description: 'Cross-platform mobile application for health and wellness tracking with social features and AI-powered insights.',
            project3Image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=600&auto=format&fit=crop',
          },
          grid_position: { x: 3, y: 3, w: 2, h: 2 },
          order_index: 4,
        },
        {
          id: 'port-timeline',
          block_type: 'link',
          content: {
            timeline1Year: '2024',
            timeline1Title: 'Lead Creative Director',
            timeline1Description: 'Leading a team of designers and developers at a top creative agency, delivering award-winning digital experiences for global brands.',
            timeline2Year: '2022',
            timeline2Title: 'Senior Product Designer',
            timeline2Description: 'Drove product design strategy for a Series B startup, increasing user engagement by 340% through iterative design improvements.',
            timeline3Year: '2020',
            timeline3Title: 'Freelance Consultant',
            timeline3Description: 'Launched independent practice serving clients across tech, finance, and healthcare with end-to-end design and development solutions.',
          },
          grid_position: { x: 1, y: 5, w: 2, h: 2 },
          order_index: 5,
        },
      ],
    },
  },
  cafe_cloud: {
    name: 'Café & Cloud Kitchen (Universal Food Template)',
    category: 'food',
    description: 'Premium universal template for cafés, coffee shops, bakeries, cloud kitchens, restaurants, and food trucks. Warm palette, dynamic menu grid, gallery, reviews, FAQ, and full contact section.',
    previewImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop',
    data: {
      profileName: 'THE ARTISAN KITCHEN',
      profileHandle: 'cafedemo',
      theme: {
        background: '#FAFAF7',
        foreground: '#1C1510',
        primary: '#B8860B',
        surface: '#1C1510',
        border: '#E8E3DA',
        muted: '#8B7D6B',
        primaryHover: '#9A7209',
        surfaceHover: '#2A2018',
        accent: '#2D6A4F',
        accentHover: '#3D8B68',
      },
      textColors: {},
      styleOverrides: {},
      mediaOverrides: {},
      buttonOverrides: {},
      blocks: [
        {
          id: 'cafe-nav',
          block_type: 'link',
          content: {
            item_0: 'Menu',
            item_1: 'About',
            item_2: 'Specials',
            item_3: 'Gallery',
            item_4: 'Reviews',
            item_5: 'Contact',
            navbarBg: 'glass',
            hoverStyle: 'pill',
          },
          grid_position: { x: 1, y: 0, w: 4, h: 1 },
          order_index: 0,
        },
        {
          id: 'cafe-hero',
          block_type: 'image',
          content: {
            title: 'Crafted with Passion, Served with Love',
            description: 'Experience the finest artisan coffee and freshly prepared dishes in a warm, inviting atmosphere. From our kitchen to your table, every bite tells a story.',
            hero_image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
            openingHours: 'Open Today: 8AM – 10PM',
            deliveryBadge: '🛵 Delivery Available',
          },
          grid_position: { x: 1, y: 1, w: 4, h: 2 },
          order_index: 1,
        },
        {
          id: 'cafe-featured',
          block_type: 'link',
          content: {
            title: 'Our Bestsellers',
            description: 'Hand-picked favorites loved by our customers. Made fresh daily with the finest ingredients.',
          },
          grid_position: { x: 1, y: 3, w: 4, h: 1 },
          order_index: 2,
        },
        {
          id: 'cafe-menu-1',
          block_type: 'whatsapp_catalog',
          content: {
            title: 'Signature Latte',
            description: 'Rich espresso with velvety steamed milk and a hint of vanilla',
            price: '$5.90',
            originalPrice: '$7.50',
            category: 'Coffee',
            badge: 'bestseller',
            image_url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&auto=format&fit=crop',
          },
          grid_position: { x: 1, y: 4, w: 1, h: 1 },
          order_index: 3,
        },
        {
          id: 'cafe-menu-2',
          block_type: 'whatsapp_catalog',
          content: {
            title: 'Avocado Toast',
            description: 'Smashed avocado on sourdough with cherry tomatoes and microgreens',
            price: '$12.90',
            originalPrice: '',
            category: 'Breakfast',
            badge: 'new',
            image_url: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=400&auto=format&fit=crop',
          },
          grid_position: { x: 2, y: 4, w: 1, h: 1 },
          order_index: 4,
        },
        {
          id: 'cafe-menu-3',
          block_type: 'whatsapp_catalog',
          content: {
            title: 'Tiramisu',
            description: 'Classic Italian coffee-flavored dessert with mascarpone cream',
            price: '$8.50',
            originalPrice: '$10.00',
            category: 'Desserts',
            badge: 'bestseller',
            image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=400&auto=format&fit=crop',
          },
          grid_position: { x: 3, y: 4, w: 1, h: 1 },
          order_index: 5,
        },
        {
          id: 'cafe-menu-4',
          block_type: 'whatsapp_catalog',
          content: {
            title: 'Matcha Latte',
            description: 'Premium Japanese matcha whisked with steamed oat milk',
            price: '$6.50',
            originalPrice: '',
            category: 'Tea',
            badge: 'new',
            image_url: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=400&auto=format&fit=crop',
          },
          grid_position: { x: 4, y: 4, w: 1, h: 1 },
          order_index: 6,
        },
        {
          id: 'cafe-menu-5',
          block_type: 'whatsapp_catalog',
          content: {
            title: 'Grilled Chicken Panini',
            description: 'Tender grilled chicken with pesto, mozzarella, and roasted peppers',
            price: '$14.90',
            originalPrice: '$16.50',
            category: 'Lunch',
            badge: '',
            image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=400&auto=format&fit=crop',
          },
          grid_position: { x: 1, y: 5, w: 1, h: 1 },
          order_index: 7,
        },
        {
          id: 'cafe-menu-6',
          block_type: 'whatsapp_catalog',
          content: {
            title: 'Fresh Berry Smoothie',
            description: 'Blend of seasonal berries with Greek yogurt and honey',
            price: '$7.90',
            originalPrice: '',
            category: 'Drinks',
            badge: 'veg',
            image_url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=400&auto=format&fit=crop',
          },
          grid_position: { x: 2, y: 5, w: 1, h: 1 },
          order_index: 8,
        },
        {
          id: 'cafe-menu-7',
          block_type: 'whatsapp_catalog',
          content: {
            title: 'Eggs Benedict',
            description: 'Poached eggs on English muffin with hollandaise sauce',
            price: '$15.50',
            originalPrice: '',
            category: 'Breakfast',
            badge: 'bestseller',
            image_url: 'https://images.unsplash.com/photo-1608039829572-9b0189a7dbc4?q=80&w=400&auto=format&fit=crop',
          },
          grid_position: { x: 3, y: 5, w: 1, h: 1 },
          order_index: 9,
        },
        {
          id: 'cafe-menu-8',
          block_type: 'whatsapp_catalog',
          content: {
            title: 'Chocolate Fondant',
            description: 'Warm molten chocolate cake with vanilla ice cream',
            price: '$9.90',
            originalPrice: '$12.00',
            category: 'Desserts',
            badge: 'spicy',
            image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400&auto=format&fit=crop',
          },
          grid_position: { x: 4, y: 5, w: 1, h: 1 },
          order_index: 10,
        },
        {
          id: 'cafe-about',
          block_type: 'link',
          content: {
            title: 'Our Story',
            description: 'Founded in 2012, The Artisan Kitchen started as a small neighborhood café with a simple mission: serve exceptional food and coffee in a space that feels like home. Over a decade later, we continue to source the finest ingredients, roast our own beans, and bake fresh every morning. Every dish is crafted with care, every cup poured with passion.',
            image_url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop',
            stat1Value: '12+',
            stat1Label: 'Years Serving',
            stat2Value: '50K+',
            stat2Label: 'Happy Customers',
            stat3Value: '200+',
            stat3Label: 'Menu Items',
          },
          grid_position: { x: 1, y: 6, w: 4, h: 2 },
          order_index: 11,
        },
        {
          id: 'cafe-promos',
          block_type: 'link',
          content: {
            promo1_title: 'Weekend Brunch Special',
            promo1_description: 'Enjoy 20% off on all brunch items every Saturday & Sunday from 9AM to 12PM',
            promo1_badge: '20% OFF',
            promo1_image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop',
            promo2_title: 'Free Delivery on Orders $30+',
            promo2_description: 'Order online and get free delivery on all orders above $30. Valid daily.',
            promo2_badge: 'FREE DELIVERY',
            promo2_image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop',
          },
          grid_position: { x: 1, y: 8, w: 4, h: 1 },
          order_index: 12,
        },
        {
          id: 'cafe-gallery',
          block_type: 'image',
          content: {
            image_0: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=400&auto=format&fit=crop',
            image_1: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=400&auto=format&fit=crop',
            image_2: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&auto=format&fit=crop',
            image_3: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop',
            image_4: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=400&auto=format&fit=crop',
            image_5: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop',
          },
          grid_position: { x: 1, y: 9, w: 4, h: 1 },
          order_index: 13,
        },
        {
          id: 'cafe-reviews',
          block_type: 'link',
          content: {
            review_1_name: 'Sarah Mitchell',
            review_1_text: 'The best café experience in town! The signature latte is absolutely divine, and the avocado toast is always fresh. The ambiance is perfect for both work and relaxation.',
            review_1_rating: '5.0',
            review_1_image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
            review_2_name: 'James Rodriguez',
            review_2_text: 'Outstanding food quality and service. The weekend brunch is a must-try. We come here every Sunday as a family tradition now.',
            review_2_rating: '5.0',
            review_2_image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
            review_3_name: 'Priya Sharma',
            review_3_text: 'Love the matcha latte and the cozy atmosphere. The staff is incredibly friendly and the pastries are baked fresh daily. Highly recommend!',
            review_3_rating: '4.8',
            review_3_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
          },
          grid_position: { x: 1, y: 10, w: 4, h: 1 },
          order_index: 14,
        },
        {
          id: 'cafe-faq',
          block_type: 'link',
          content: {
            faq_1_question: 'Do you offer delivery services?',
            faq_1_answer: 'Yes! We offer delivery through our website and major delivery platforms. Orders above $30 qualify for free delivery within a 5km radius.',
            faq_2_question: 'Can I customize my order for dietary restrictions?',
            faq_2_answer: 'Absolutely. We offer gluten-free, vegan, and dairy-free options. Please let our staff know about any allergies and we will be happy to accommodate.',
            faq_3_question: 'Do you take reservations for large groups?',
            faq_3_answer: 'Yes, we accept reservations for groups of 6 or more. Please call us or use the Reserve Table button to book in advance.',
            faq_4_question: 'What are your busiest hours?',
            faq_4_answer: 'Weekday mornings (8-10 AM) and weekend brunches (10 AM-1 PM) tend to be our busiest times. We recommend visiting during off-peak hours for the best experience.',
          },
          grid_position: { x: 1, y: 11, w: 4, h: 1 },
          order_index: 15,
        },
        {
          id: 'cafe-contact',
          block_type: 'link',
          content: {
            heading: 'Visit Us',
            phone: '+1 (555) 123-4567',
            whatsapp: '+15551234567',
            email: 'hello@artisankitchen.com',
            address: '123 Brew Street, Café District, Artisan City, AC 90210',
            businessHours: 'Mon-Fri: 7AM-9PM | Sat-Sun: 8AM-10PM',
          },
          grid_position: { x: 1, y: 12, w: 4, h: 1 },
          order_index: 16,
        },
        {
          id: 'cafe-cta',
          block_type: 'link',
          content: {
            title: 'Ready to Order?',
            description: 'Skip the line and order ahead. Fresh food and perfectly brewed coffee, ready when you are.',
          },
          grid_position: { x: 1, y: 13, w: 4, h: 1 },
          order_index: 17,
        },
        {
          id: 'cafe-footer',
          block_type: 'link',
          content: {
            description: 'Crafting exceptional coffee and cuisine since 2012. Every cup tells a story, every dish is a masterpiece.',
            copyright: '© 2024 The Artisan Kitchen. All rights reserved.',
            col2Title: 'Quick Links',
            col3Title: 'Business Hours',
          },
          grid_position: { x: 1, y: 14, w: 4, h: 1 },
          order_index: 18,
        },
      ],
    },
  },
  auto_drive: {
    name: 'Autobahn Performance Dealership',
    category: 'ecommerce',
    description: 'Cinematic automotive flagship template featuring editorial typography, 21:9 hero stage, 3 architectural performance pillars, and 6 curated fleet inventory cards.',
    previewImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=400&auto=format&fit=crop',
    data: {
      profileName: 'AUTOBAHN',
      profileHandle: 'autobahnpremium',
      theme: {
        background: '#08080a',
        foreground: '#f4f4f5',
        primary: '#ffffff',
        surface: '#111115',
        border: '#27272a',
        muted: '#94a3b8',
        primaryHover: '#e4e4e7',
        surfaceHover: '#18181c',
        accent: '#10b981',
        accentHover: '#34d399',
      },
      textColors: {},
      styleOverrides: {},
      mediaOverrides: {},
      buttonOverrides: {},
      blocks: [],
    },
  },
  aura_salon: {
    name: 'Aura Salon (Bridal MUA / Beauty)',
    category: 'landing',
    description: 'High-fashion luxury bridal MUA & beauty editorial template. Asymmetrical hero, 5-lookbook carousel, before/after slider, packages, and artistry storytelling.',
    previewImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&auto=format&fit=crop',
    data: {
      profileName: 'Ananya Sharma',
      profileHandle: 'aurasalon',
      theme: {
        background: '#FAF7F2',
        foreground: '#181715',
        primary: '#1C1B18',
        surface: '#F0EADF',
        border: 'rgba(24, 23, 21, 0.12)',
        muted: '#6E665E',
        primaryHover: '#33302B',
        surfaceHover: '#E5DDCF',
        accent: '#B38E6E',
        accentHover: '#967456',
      },
      textColors: {},
      styleOverrides: {},
      mediaOverrides: {},
      buttonOverrides: {},
      blocks: [],
    },
  },
  apex_fit: {
    name: 'Apex Fit (Fitness Cohort)',
    category: 'landing',
    description: 'High-energy fitness coach template with urgency banner, trainer bio stats grid, and 2-tier pricing. Built for personal trainers, gyms, and cohort programs.',
    previewImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    data: {
      profileName: 'Coach Marcus',
      profileHandle: 'apexfit',
      theme: {
        background: '#09090b',
        foreground: '#fafafa',
        primary: '#f59e0b',
        surface: '#141416',
        border: '#27272a',
        muted: '#a1a1aa',
        primaryHover: '#d97706',
        surfaceHover: '#1c1c1f',
        accent: '#10b981',
        accentHover: '#34d399',
      },
      textColors: {},
      styleOverrides: {},
      mediaOverrides: {},
      buttonOverrides: {},
      blocks: [],
    },
  },
  estate_prime: {
    name: 'Estate Prime (Luxury Real Estate Editorial)',
    category: 'landing',
    description: 'Editorial real estate showcase for luxury brokers, independent agents, & property consultants. Features 5 curated flagship properties, penthouse story deep-dive, advisor telemetry, & pull-quote clientele endorsements.',
    previewImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400&auto=format&fit=crop',
    data: {
      profileName: 'Vance Private Estates',
      profileHandle: 'estateprime',
      theme: {
        background: '#faf8f5',
        foreground: '#1c1b18',
        primary: '#a88b68',
        surface: '#ffffff',
        border: '#e8e4dc',
        muted: '#78736a',
        primaryHover: '#947855',
        surfaceHover: '#f5f2eb',
        accent: '#a88b68',
        accentHover: '#947855',
      },
      textColors: {},
      styleOverrides: {},
      mediaOverrides: {},
      buttonOverrides: {},
      blocks: [],
    },
  },
  mentor_x: {
    name: 'MentorX (Skill Educator / Tutor)',
    category: 'landing',
    description: 'Modern authority landing page for tutors, educators, subject experts, and coaches with direct WhatsApp conversion.',
    previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    data: {
      profileName: 'Dr. Alex Rivera',
      profileHandle: 'mentorx',
      theme: MENTROX_THEME,
      textColors: {},
      styleOverrides: {},
      mediaOverrides: {},
      buttonOverrides: {},
      blocks: [],
    },
  },
  studio_nova: {
    name: 'Studio Nova (Universal Digital Marketing Agency)',
    category: 'portfolio',
    description: 'Universal digital marketing & performance growth agency template inspired by high-end editorial studios. Features art-directed hero, case study engine, electric orange FAQ accordion, 3D process system, & asymmetrical testimonials.',
    previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    data: {
      profileName: 'Studio Nova',
      profileHandle: 'studionova',
      theme: {
        background: '#F8F7F4',
        foreground: '#121214',
        primary: '#FF4D17',
        surface: '#FFFFFF',
        border: '#E5E3DE',
        muted: '#666460',
        primaryHover: '#E03E0B',
        surfaceHover: '#F0EEE8',
        accent: '#FF4D17',
        accentHover: '#E03E0B',
      },
      textColors: {},
      styleOverrides: {},
      mediaOverrides: {},
      buttonOverrides: {},
      blocks: [],
    },
  },
  bento_bio: {
    name: 'Bento Bio (Link-in-Bio)',
    category: 'portfolio',
    description: 'Premium link-in-bio page with editorial profile header, asymmetric bento cards, link variants, media highlights, and refined creator controls.',
    previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    data: {
      profileName: 'Avery Stone',
      profileHandle: 'bentobio',
      bentoBioConfig: DEFAULT_BENTO_CONFIG,
      theme: {
        background: '#F7F4EE',
        foreground: '#171717',
        primary: '#0A84FF',
        surface: '#FFFFFF',
        border: '#E5DED3',
        muted: '#6F6B63',
        primaryHover: '#0077E6',
        surfaceHover: '#F4F1EA',
        accent: '#0A84FF',
        accentHover: '#0077E6',
      },
      textColors: {},
      styleOverrides: {},
      mediaOverrides: {},
      buttonOverrides: {},
      blocks: [],
    } as any,
  },
};

// ─── Visual Canvas Preview Wrapper Component ────────────────────────────────
function VisualCanvas({ selectedTemplateId }: { selectedTemplateId: string }) {
  const { templateData } = useVisualBuilder();
  const { profileName, profileHandle, blocks } = templateData;

  const navBlock = blocks.find((b) => b.id.includes('nav'));
  const navItems = [
    navBlock?.content.item_0 || 'Stories',
    navBlock?.content.item_1 || 'Coffe',
    navBlock?.content.item_2 || 'Equipment',
    navBlock?.content.item_3 || 'Store',
  ];
  const navbarBg = navBlock?.content.navbarBg || 'transparent';
  const hoverStyle = navBlock?.content.hoverStyle || 'color';

  let canvasContent: React.ReactNode = null;



  if (selectedTemplateId === 'portfolio') {
    const heroBlock = blocks.find((b) => b.id === 'port-hero');
    const statsBlock = blocks.find((b) => b.id === 'port-stats');
    const aboutBlock = blocks.find((b) => b.id === 'port-about');
    const projectsBlock = blocks.find((b) => b.id === 'port-projects');
    const timelineBlock = blocks.find((b) => b.id === 'port-timeline');

    canvasContent = (
      <SnapMaster
        fullName={profileName}
        handle={profileHandle}
        navbarBg={navbarBg}
        hoverStyle={hoverStyle}
        heroImage={heroBlock?.content.image_url}
        heroSubtitle={heroBlock?.content.heroSubtitle}
        heroHeading={heroBlock?.content.heroHeading}
        heroDescription={heroBlock?.content.heroDescription}
        stat1Value={statsBlock?.content.stat1Value}
        stat1Label={statsBlock?.content.stat1Label}
        stat2Value={statsBlock?.content.stat2Value}
        stat2Label={statsBlock?.content.stat2Label}
        stat3Value={statsBlock?.content.stat3Value}
        stat3Label={statsBlock?.content.stat3Label}
        stat4Value={statsBlock?.content.stat4Value}
        stat4Label={statsBlock?.content.stat4Label}
        aboutImage={aboutBlock?.content.image_url}
        aboutDescription={aboutBlock?.content.aboutDescription}
        aboutBadgeText={aboutBlock?.content.aboutBadgeText}
        aboutHighlight1Value={aboutBlock?.content.aboutHighlight1Value}
        aboutHighlight1Label={aboutBlock?.content.aboutHighlight1Label}
        aboutHighlight2Value={aboutBlock?.content.aboutHighlight2Value}
        aboutHighlight2Label={aboutBlock?.content.aboutHighlight2Label}
        project1Title={projectsBlock?.content.project1Title}
        project1Category={projectsBlock?.content.project1Category}
        project1Description={projectsBlock?.content.project1Description}
        project1Image={projectsBlock?.content.project1Image}
        project2Title={projectsBlock?.content.project2Title}
        project2Category={projectsBlock?.content.project2Category}
        project2Description={projectsBlock?.content.project2Description}
        project2Image={projectsBlock?.content.project2Image}
        project3Title={projectsBlock?.content.project3Title}
        project3Category={projectsBlock?.content.project3Category}
        project3Description={projectsBlock?.content.project3Description}
        project3Image={projectsBlock?.content.project3Image}
        timeline1Year={timelineBlock?.content.timeline1Year}
        timeline1Title={timelineBlock?.content.timeline1Title}
        timeline1Description={timelineBlock?.content.timeline1Description}
        timeline2Year={timelineBlock?.content.timeline2Year}
        timeline2Title={timelineBlock?.content.timeline2Title}
        timeline2Description={timelineBlock?.content.timeline2Description}
        timeline3Year={timelineBlock?.content.timeline3Year}
        timeline3Title={timelineBlock?.content.timeline3Title}
        timeline3Description={timelineBlock?.content.timeline3Description}
      />
    );
  }

  if (selectedTemplateId === 'cafe_cloud') {
    const heroBlock = blocks.find((b) => b.id === 'cafe-hero');
    const featuredBlock = blocks.find((b) => b.id === 'cafe-featured');
    const dish1Block = blocks.find((b) => b.id === 'cafe-dish-1' || b.id === 'cafe-menu-1');
    const dish2Block = blocks.find((b) => b.id === 'cafe-dish-2' || b.id === 'cafe-menu-2');
    const dish3Block = blocks.find((b) => b.id === 'cafe-dish-3' || b.id === 'cafe-menu-3');
    const aboutBlock = blocks.find((b) => b.id === 'cafe-about');
    const galleryBlock = blocks.find((b) => b.id === 'cafe-gallery');
    const contactBlock = blocks.find((b) => b.id === 'cafe-contact');
    const footerBlock = blocks.find((b) => b.id === 'cafe-footer');

    const buildDish = (block: any, defaults: any) => ({
      title: block?.content.title || defaults.title,
      description: block?.content.description || defaults.description,
      price: String(block?.content.price || defaults.price),
      originalPrice: String(block?.content.originalPrice || defaults.originalPrice || ''),
      image_url: block?.content.image_url || defaults.image_url,
      badge: block?.content.badge || defaults.badge || '',
    });

    canvasContent = (
      <CafeCloud
        brandName={profileName}
        heroTitle={heroBlock?.content.title}
        heroDescription={heroBlock?.content.description}
        heroImage={heroBlock?.content.hero_image}
        openingHours={heroBlock?.content.openingHours}
        deliveryBadge={heroBlock?.content.deliveryBadge}
        featuredTitle={featuredBlock?.content.title}
        featuredDescription={featuredBlock?.content.description}
        dish1={buildDish(dish1Block, {
          title: 'Signature Espresso Roast',
          description: 'Rich, smooth single-origin espresso with chocolate and caramel notes.',
          price: '$4.50',
          originalPrice: '$5.50',
          image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
          badge: 'BESTSELLER'
        })}
        dish2={buildDish(dish2Block, {
          title: 'Artisan Avocado Toast',
          description: 'Freshly smashed avocado on sourdough with poached eggs and radish.',
          price: '$12.90',
          originalPrice: '',
          image_url: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=600&q=80',
          badge: 'FRESH'
        })}
        dish3={buildDish(dish3Block, {
          title: 'House Pastry & Berry Bowl',
          description: 'Freshly baked buttery croissant served with seasonal organic berries.',
          price: '$9.50',
          originalPrice: '$11.00',
          image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
          badge: 'DAILY SPECIAL'
        })}
        aboutTitle={aboutBlock?.content.title}
        aboutDescription={aboutBlock?.content.description}
        aboutImage={aboutBlock?.content.image_url}
        galleryImages={[
          galleryBlock?.content.image_0 || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
          galleryBlock?.content.image_1 || 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=600&q=80',
          galleryBlock?.content.image_2 || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
          galleryBlock?.content.image_3 || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        ]}
        phone={contactBlock?.content.phone}
        whatsapp={contactBlock?.content.whatsapp}
        address={contactBlock?.content.address}
        mapLocation={contactBlock?.content.mapLocation}
        businessHours={contactBlock?.content.businessHours}
        footerDescription={footerBlock?.content.description}
        copyright={footerBlock?.content.copyright}
      />
    );
  }

  if (selectedTemplateId === 'auto_drive') {
    canvasContent = (
      <AutoDrive
        dealershipName={profileName}
      />
    );
  }

  if (selectedTemplateId === 'aura_salon') {
    canvasContent = (
      <AuraSalon
        artistName={profileName}
      />
    );
  }

  if (selectedTemplateId === 'apex_fit') {
    canvasContent = (
      <ApexFit
        trainerName={profileName}
      />
    );
  }

  if (selectedTemplateId === 'estate_prime') {
    canvasContent = (
      <EstatePrime
        propertyName={profileName}
      />
    );
  }

  if (selectedTemplateId === 'mentor_x') {
    canvasContent = (
      <MentorX
        instructorName={profileName}
      />
    );
  }

  if (selectedTemplateId === 'studio_nova') {
    canvasContent = (
      <StudioNova
        studioName={profileName}
      />
    );
  }

  if (selectedTemplateId === 'bento_bio') {
    canvasContent = (
      <BentoBio
        name={profileName}
      />
    );
  }

  if (selectedTemplateId === 'luxe_universal' || !canvasContent) {
    canvasContent = (
      <LuxeUniversal
        brandName={profileName || 'VALKYRIE'}
        navbarBg={navbarBg as any}
        hoverStyle={hoverStyle as any}
      />
    );
  }

  return (
    <ThemeProvider theme={templateData.theme}>
      {canvasContent}
    </ThemeProvider>
  );
}

// ─── WorkspaceContainer Root ────────────────────────────────────────────────
export function WorkspaceContainer() {
  const {
    activeTab,
    currentProjectId,
    builderMode,
    templateSearchQuery,
    selectedCategory,
    projectsList,
    templateData,
    setActiveTab,
    setCurrentProjectId,
    setBuilderMode,
    setTemplateSearchQuery,
    setSelectedCategory,
    setProjectsList,
    addProject,
    updateProjectData,
    setTemplateData,
  } = useWorkspaceStore();

  const [isPublishing, setIsPublishing] = useState(false);

  // Initialize store with dummy data for immediate engagement
  useEffect(() => {
    if (projectsList.length === 0) {
      setProjectsList([
        {
          id: 'proj-luxe-universal',
          name: 'Valkyrie Luxury Store',
          templateId: 'luxe_universal',
          subDomain: 'valkyrieluxe.portiva.site',
          isLive: true,
          data: TEMPLATE_PRESETS.luxe_universal.data,
        },
        {
          id: 'proj-cafe-cloud',
          name: 'The Artisan Kitchen',
          templateId: 'cafe_cloud',
          subDomain: 'cafedemo.portiva.site',
          isLive: true,
          data: TEMPLATE_PRESETS.cafe_cloud.data,
        },
        {
          id: 'proj-auto-drive',
          name: 'Autobahn Premium Dealership',
          templateId: 'auto_drive',
          subDomain: 'autobahnpremium.portiva.site',
          isLive: true,
          data: TEMPLATE_PRESETS.auto_drive.data,
        },
        {
          id: 'proj-aura-salon',
          name: 'Ananya Sharma Bridal',
          templateId: 'aura_salon',
          subDomain: 'aurasalon.portiva.site',
          isLive: true,
          data: TEMPLATE_PRESETS.aura_salon.data,
        },
        {
          id: 'proj-apex-fit',
          name: 'Coach Marcus Apex Fit',
          templateId: 'apex_fit',
          subDomain: 'apexfit.portiva.site',
          isLive: true,
          data: TEMPLATE_PRESETS.apex_fit.data,
        },
        {
          id: 'proj-estate-prime',
          name: 'Villa Serenity Listing',
          templateId: 'estate_prime',
          subDomain: 'estateprime.portiva.site',
          isLive: true,
          data: TEMPLATE_PRESETS.estate_prime.data,
        },
        {
          id: 'proj-mentor-x',
          name: 'Dr. Alex Rivera Courses',
          templateId: 'mentor_x',
          subDomain: 'mentorx.portiva.site',
          isLive: true,
          data: TEMPLATE_PRESETS.mentor_x.data,
        },
        {
          id: 'proj-studio-nova',
          name: 'Studio Nova Agency',
          templateId: 'studio_nova',
          subDomain: 'studionova.portiva.site',
          isLive: true,
          data: TEMPLATE_PRESETS.studio_nova.data,
        },
        {
          id: 'proj-bento-bio',
          name: 'Creator Bento Bio',
          templateId: 'bento_bio',
          subDomain: 'bentobio.portiva.site',
          isLive: true,
          data: TEMPLATE_PRESETS.bento_bio.data,
        },
      ]);
    }
  }, [projectsList.length, setProjectsList]);

  const handleCreateProjectFromTemplate = (templateKey: string) => {
    const preset = TEMPLATE_PRESETS[templateKey];
    if (!preset) return;

    const projectId = `proj-${templateKey}-${Date.now().toString().slice(-4)}`;
    const newProject: ProjectItem = {
      id: projectId,
      name: `${preset.name} Draft`,
      templateId: templateKey,
      subDomain: `${preset.data.profileHandle}-${Math.floor(Math.random() * 900 + 100)}.portiva.site`,
      isLive: false,
      data: JSON.parse(JSON.stringify(preset.data)), // deep copy
    };

    addProject(newProject);
    setCurrentProjectId(projectId);
    setTemplateData(newProject.data);
    setActiveTab('builder');
  };

  const handleLoadProject = (project: ProjectItem) => {
    setCurrentProjectId(project.id);
    setTemplateData(project.data);
    setActiveTab('builder');
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjectsList(projectsList.filter((p) => p.id !== projectId));
    if (currentProjectId === projectId) {
      setCurrentProjectId(null);
    }
  };

  const handleSaveWorkspaceDraft = useCallback((updatedData: TemplateData) => {
    if (currentProjectId) {
      updateProjectData(currentProjectId, updatedData);
    }
  }, [currentProjectId, updateProjectData]);

  const handleSimulatePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      // Automatically make it live in projects shelf
      if (currentProjectId) {
        setProjectsList(
          projectsList.map((p) => (p.id === currentProjectId ? { ...p, isLive: true } : p))
        );
      }
      alert('Congratulations! Your bento micro-site is live on the sub-domain!');
    }, 1800);
  };

  // Filter templates list
  const filteredTemplateKeys = Object.keys(TEMPLATE_PRESETS).filter((key) => {
    const preset = TEMPLATE_PRESETS[key];
    const matchesSearch = preset.name.toLowerCase().includes(templateSearchQuery.toLowerCase()) ||
                          preset.description.toLowerCase().includes(templateSearchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || preset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeProject = projectsList.find((p) => p.id === currentProjectId);

  return (
    <div className="w-full min-h-screen bg-bg-primary text-text-primary flex flex-col overflow-hidden font-sans">
      
      {/* ─── Top Navigation Bar ────────────────────────────────────────── */}
      <nav className="w-full h-12 border-b border-border-subtle bg-bg-primary px-6 flex justify-between items-center z-30 shrink-0">
        {/* Left Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center font-bold text-white text-sm shadow-glow gradient-brand">
            P
          </div>
          <span className="text-base font-display font-semibold tracking-tight text-text-primary">
            PORTIVA
          </span>
        </div>

        {/* Center: Tab Switcher */}
        <div className="glass-light p-1 rounded-full flex items-center gap-1">
          <button
            onClick={() => setActiveTab('projects')}
            className={`
              flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer
              ${activeTab === 'projects'
                ? 'bg-accent text-white shadow-sm'
                : 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              }
            `}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Projects</span>
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`
              flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer
              ${activeTab === 'templates'
                ? 'bg-accent text-white shadow-sm'
                : 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              }
            `}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Templates</span>
          </button>
          {currentProjectId && (
            <button
              onClick={() => setActiveTab('builder')}
              className={`
                flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer
                ${activeTab === 'builder'
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                }
              `}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Builder</span>
            </button>
          )}
        </div>

        {/* Right Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-bg-secondary border border-border-default flex items-center justify-center text-xs font-medium text-text-primary">
            AD
          </div>
        </div>
      </nav>

      {/* ─── Multi-View Shelf Container ───────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          {/* VIEW A: Projects List Shelf */}
          {activeTab === 'projects' && (
            <motion.main
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto px-6 sm:px-8 lg:px-10 py-8"
            >
              <div className="max-w-6xl mx-auto flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-display font-semibold text-text-primary">Your Projects</h2>
                    <p className="text-sm text-text-secondary">
                      Manage and edit your active micro-websites.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('templates')}
                    className="btn btn-primary"
                  >
                    New Project
                  </button>
                </div>

                {projectsList.length === 0 ? (
                  <div className="border border-dashed border-border-subtle rounded-card p-16 flex flex-col items-center justify-center text-center bg-bg-secondary/50">
                    <div className="w-12 h-12 rounded-full bg-bg-tertiary flex items-center justify-center mb-4">
                      <FolderOpen className="w-6 h-6 text-text-tertiary" />
                    </div>
                    <h3 className="text-base font-semibold text-text-primary mb-1">No projects yet</h3>
                    <p className="text-sm text-text-secondary mb-6">Create your first website from a template.</p>
                    <button
                      onClick={() => setActiveTab('templates')}
                      className="btn btn-primary"
                    >
                      Browse Templates
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectsList.map((project) => {
                      const preset = TEMPLATE_PRESETS[project.templateId];
                      return (
                        <motion.div
                          key={project.id}
                          whileHover={{ y: -2 }}
                          className="card rounded-card border border-border-subtle bg-bg-secondary overflow-hidden flex flex-col group transition-colors hover:border-border-strong cursor-pointer"
                          onClick={() => handleLoadProject(project)}
                        >
                          {/* Layout Snapshot Frame */}
                          <div className="w-full aspect-video bg-bg-tertiary relative overflow-hidden">
                            <img
                              src={preset?.previewImage || 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=400'}
                              alt={project.name}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent opacity-80" />
                            <div className="absolute top-3 right-3">
                              <span className={`badge ${project.isLive ? 'badge-success' : 'badge-warning'}`}>
                                {project.isLive ? 'LIVE' : 'DRAFT'}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4 flex flex-col gap-1 border-t border-border-subtle">
                            <h3 className="text-sm font-semibold text-text-primary line-clamp-1">{project.name}</h3>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-text-tertiary font-mono truncate">{project.subDomain}</span>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleLoadProject(project);
                                  }}
                                  className="btn-ghost btn-icon btn-sm text-text-secondary hover:text-text-primary"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={(e) => handleDeleteProject(project.id, e)}
                                  className="btn-ghost btn-icon btn-sm text-text-secondary hover:text-danger"
                                  title="Delete project"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.main>
          )}

          {/* VIEW B: Templates Library Explorer */}
          {activeTab === 'templates' && (
            <motion.main
              key="templates"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto px-6 sm:px-8 lg:px-10 py-8"
            >
              <div className="max-w-6xl mx-auto flex flex-col gap-6">
                
                {/* Header & Search */}
                <div className="flex flex-col items-center text-center gap-6 mb-4">
                  <div className="flex flex-col gap-2 items-center">
                    <h2 className="text-2xl font-display font-semibold text-text-primary">Start from a Template</h2>
                    <p className="text-sm text-text-secondary max-w-lg">
                      Choose a professional layout to kickstart your micro-site. Customize everything in the visual builder.
                    </p>
                  </div>

                  <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-tertiary">
                      <Search className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search templates..."
                      value={templateSearchQuery}
                      onChange={(e) => setTemplateSearchQuery(e.target.value)}
                      className="input w-full pl-9"
                    />
                  </div>
                </div>

                {/* Horizontal Categories Ribbon */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'landing', label: 'Landing' },
                    { id: 'ecommerce', label: 'E-Commerce' },
                    { id: 'portfolio', label: 'Portfolio' },
                  ].map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id as any)}
                        className={`
                          px-4 py-1.5 rounded-badge text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap
                          ${isActive
                            ? 'bg-accent text-white'
                            : 'bg-bg-hover text-text-secondary hover:text-text-primary'
                          }
                        `}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Template Grid */}
                {filteredTemplateKeys.length === 0 ? (
                  <div className="border border-dashed border-border-subtle rounded-card p-16 flex flex-col items-center justify-center text-center bg-bg-secondary/50">
                    <Search className="w-8 h-8 text-text-tertiary mb-3" />
                    <h3 className="text-sm font-medium text-text-secondary">No templates found</h3>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplateKeys.map((key) => {
                      const preset = TEMPLATE_PRESETS[key];
                      return (
                        <motion.div
                          key={key}
                          whileHover={{ y: -4 }}
                          className="card rounded-card border border-border-subtle bg-bg-secondary overflow-hidden flex flex-col group relative"
                        >
                          {/* Visual Preview */}
                          <div className="w-full aspect-[4/3] bg-bg-tertiary overflow-hidden relative">
                            <img
                              src={preset.previewImage}
                              alt={preset.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                              <button
                                onClick={() => handleCreateProjectFromTemplate(key)}
                                className="btn btn-primary shadow-lg"
                              >
                                Use Template
                              </button>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="p-4 flex flex-col gap-1 border-t border-border-subtle">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-sm font-semibold text-text-primary truncate">
                                {preset.name}
                              </h3>
                              <span className="badge badge-neutral shrink-0 uppercase text-[10px]">
                                {preset.category}
                              </span>
                            </div>
                            <p className="text-xs text-text-tertiary line-clamp-2">
                              {preset.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.main>
          )}

          {activeTab === 'builder' && activeProject && (
            <motion.div 
              key="builder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 w-full h-full"
            >
              <VisualBuilderProvider
                key={activeProject.id}
                initialData={templateData}
                defaultTheme={TEMPLATE_PRESETS[activeProject.templateId]?.data.theme}
                onSave={handleSaveWorkspaceDraft}
              >
                <WorkspaceLayout
                  onPublish={handleSimulatePublish}
                  isPublishing={isPublishing}
                  onBack={() => setActiveTab('projects')}
                >
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
