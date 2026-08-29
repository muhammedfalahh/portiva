/**
 * Content definition for the Autobahn Pro premium template.
 *
 * Designed to match the light showroom marketplace aesthetic:
 *   Home : 6 sections (Hero, Bento Brand Cars, Proof Stats, Testimonials, Photo Gallery, Contact Form)
 *   Store: Full inventory grid with brand chips, metrics, price, and sourcing band
 */

import type { PremiumTemplateDefinition } from '@/lib/template-contract';

const brandImage = (key: string, src: string, alt: string) => ({ key, src, alt });

export const autoInventoryDefinition: PremiumTemplateDefinition = {
  brandName: 'Autobahn Performance',
  categoryLabel: 'Automotive',
  navTagline: 'Luxury & Performance Dealership',
  footerHeadline: 'Where luxury meets the road.',
  footerDescription:
    'Autobahn Pro delivers verified luxury supercars and collector grand tourers with certified inspections, transparent pricing, and white-glove concierge delivery.',
  footerLinks: [
    {
      id: 'home',
      label: 'Home',
      targetPageId: 'home',
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '#contact',
    },
  ],
  pages: [
    // ────────────────────────────────────────────────────────────────────────
    // PAGE 1 · HOME — exactly matching reference images
    // ────────────────────────────────────────────────────────────────────────
    {
      id: 'home',
      label: 'Home',
      slug: '',
      description: 'Cinematic luxury automotive showroom landing page.',
      sections: [
        // SECTION 1 · HERO -------------------------------------------------
        {
          type: 'hero',
          id: 'bl-home-hero',
          eyebrow: 'Exclusive Supercars & Grand Tourers',
          title: 'We are the best car dealer you will find.',
          description:
            'Find your dream vehicle right now:',
          stats: [
            { id: 'h1', label: '0-100 KM/H', value: '2.9s' },
            { id: 'h2', label: 'TOP VELOCITY', value: '325 KM/H' },
            { id: 'h3', label: 'CHASSIS SPEC', value: '2024' },
          ],
          primaryAction: {
            id: 'book-now',
            label: 'View Our Cars',
            href: '#bl-home-featured',
          },
          secondaryAction: {
            id: 'contact-cta',
            label: 'Get In Touch',
            href: '#contact',
          },
          media: brandImage(
            'bl-home-hero-image',
            'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop',
            'Dynamic orange performance sports coupe driving on mountain pass',
          ),
        },

        // SECTION 2 · TOP BRAND CARS (Bento) -------------------------------
        {
          type: 'cards',
          id: 'bl-home-featured',
          eyebrow: 'Featured Fleet',
          title: 'Top Brand Vehicles',
          description:
            'Curated collection of world-class automotive engineering, meticulously inspected and ready for immediate delivery.',
          columns: 4,
          style: 'vehicle',
          primaryAction: {
            id: 'view-all-cars',
            label: 'View All Cars',
            href: '#bl-home-gallery',
          },
          items: [
            {
              id: 'brand-1',
              eyebrow: 'Lamborghini',
              title: 'Lamborghini Huracán Evo',
              description: 'V10 naturally aspirated 640 HP icon with active aerodynamics and dynamic steering.',
              price: '$320,000',
              meta: 'V10 · 640 HP · AWD',
              status: 'Available',
              image: brandImage(
                'bl-brand-1-image',
                'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop',
                'Vibrant green Lamborghini sports car with butterfly doors open',
              ),
              metrics: [
                { id: 'm1', label: '0-100', value: '2.9s' },
                { id: 'm2', label: 'Top Speed', value: '325 km/h' },
                { id: 'm3', label: 'Engine', value: '5.2L V10' },
              ],
              action: {
                id: 'view-details',
                label: 'View Details',
                href: '#bl-home-contact',
              },
            },
            {
              id: 'brand-2',
              eyebrow: 'Ferrari',
              title: 'Ferrari F8 Tributo',
              description: 'Maranello racing pedigree with sculpted aerodynamic poise and twin-turbo V8 crescendo.',
              price: '$380,000',
              meta: 'V8 Turbo · 710 HP · RWD',
              status: 'Available',
              image: brandImage(
                'bl-brand-2-image',
                'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop',
                'Orange Ferrari supercar with dihedral doors open',
              ),
              metrics: [
                { id: 'm1', label: '0-100', value: '2.8s' },
                { id: 'm2', label: 'Top Speed', value: '340 km/h' },
                { id: 'm3', label: 'Engine', value: '3.9L V8' },
              ],
              action: {
                id: 'view-details',
                label: 'View Details',
                href: '#bl-home-contact',
              },
            },
            {
              id: 'brand-3',
              eyebrow: 'Mercedes',
              title: 'Mercedes-AMG GT R',
              description: 'Handcrafted Affalterbach twin-turbo V8 grand tourer with active underbody aero.',
              price: '$210,000',
              meta: 'V8 Biturbo · 577 HP · RWD',
              status: 'Available',
              image: brandImage(
                'bl-brand-3-image',
                'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
                'Red Mercedes-AMG performance coupe rear angle',
              ),
              metrics: [
                { id: 'm1', label: '0-100', value: '3.5s' },
                { id: 'm2', label: 'Top Speed', value: '318 km/h' },
                { id: 'm3', label: 'Engine', value: '4.0L V8' },
              ],
              action: {
                id: 'view-details',
                label: 'View Details',
                href: '#bl-home-contact',
              },
            },
            {
              id: 'brand-4',
              eyebrow: 'Bugatti',
              title: 'Bugatti Chiron Sport',
              description: 'W16 quad-turbo engineering masterpiece redefining the boundaries of automotive physics.',
              price: '$3,400,000',
              meta: 'W16 Quad-Turbo · 1500 HP · AWD',
              status: 'Collector',
              image: brandImage(
                'bl-brand-4-image',
                'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop',
                'Electric blue Bugatti hypercar top angle',
              ),
              metrics: [
                { id: 'm1', label: '0-100', value: '2.4s' },
                { id: 'm2', label: 'Top Speed', value: '420 km/h' },
                { id: 'm3', label: 'Engine', value: '8.0L W16' },
              ],
              action: {
                id: 'view-details',
                label: 'View Details',
                href: '#bl-home-contact',
              },
            },
            {
              id: 'brand-5',
              eyebrow: 'BMW',
              title: 'BMW M4 Competition',
              description: 'Precision Bavarian dynamics with M xDrive traction and carbon fibre bucket seating.',
              price: '$115,000',
              meta: 'Inline-6 TwinPower · 503 HP · AWD',
              status: 'Available',
              image: brandImage(
                'bl-brand-5-image',
                'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop',
                'White BMW M4 Competition front profile',
              ),
              metrics: [
                { id: 'm1', label: '0-100', value: '3.4s' },
                { id: 'm2', label: 'Top Speed', value: '290 km/h' },
                { id: 'm3', label: 'Engine', value: '3.0L S58' },
              ],
              action: {
                id: 'view-details',
                label: 'View Details',
                href: '#bl-home-contact',
              },
            },
          ],
        },

        // SECTION 3 · PROOF STATS BANNER ----------------------------------
        {
          type: 'story',
          id: 'bl-home-why',
          eyebrow: 'Excellence In Motion',
          title: 'Indulge in the Ultimate Driving Luxury',
          description:
            'Setting the gold standard for luxury vehicle acquisitions, certified inspections, and client satisfaction.',
          body: [
            { id: 'b1', text: 'Setting the gold standard for luxury vehicle acquisitions and certified showroom delivery.' }
          ],
          points: [
            { id: 'p1', text: '150-point diagnostic inspection on every chassis before showroom arrival.' },
            { id: 'p2', text: 'Transparent direct-to-owner pricing with zero hidden dealership overhead.' },
            { id: 'p3', text: 'Climate-controlled white glove delivery to any destination worldwide.' },
            { id: 'p4', text: 'Comprehensive factory warranty support and dedicated concierge assistance.' },
          ],
          stats: [
            { id: 'stat-1', label: 'Luxury Cars in Our Fleet', value: '150+' },
            { id: 'stat-2', label: 'Satisfied Clients Worldwide', value: '8000+' },
            { id: 'stat-3', label: 'Successful Corporate Partnerships', value: '200+' },
            { id: 'stat-4', label: 'Providing Premium Services', value: '10+ Years' },
            { id: 'stat-5', label: 'Customer Ratings', value: '4.9' },
          ],
        },

        // SECTION 4 · TESTIMONIALS ----------------------------------------
        {
          type: 'testimonials',
          id: 'bl-home-testimonials',
          eyebrow: 'Client Endorsements',
          title: 'What People Say',
          description:
            'Hear unedited thoughts and experiences from distinguished owners and collectors across the world.',
          communityBadge: '5.0 Verified Owner Reviews',
          items: [
            {
              id: 't1',
              quote:
                'Acquiring my 911 Carrera T through Autobahn Pro was effortless. The inspection file ran forty pages with complete telemetry and paint micrometer checks.',
              name: 'Kamran Khan',
              role: 'UX/UI Designer & 911 Owner',
              tag: 'Verified Buyer',
              year: '2024',
            },
            {
              id: 't2',
              quote:
                'They sourced a rare specification Taycan Cross Turismo in 7 days, managed private transport, and delivered it in pristine showroom condition.',
              name: 'Priya Nair',
              role: 'Tech Executive & Taycan Owner',
              tag: 'Sourced Spec',
              year: '2024',
            },
            {
              id: 't3',
              quote:
                'Consignment of my AMG GT was completely seamless. High-definition media, verified prospective buyers, and funds cleared on the same afternoon.',
              name: 'Marcus Webb',
              role: 'AMG GT Consignor',
              tag: 'Consignment',
              year: '2025',
            },
            {
              id: 't4',
              quote:
                'The level of automotive knowledge here is unmatched. They understood every technical detail on the Ferrari F8 and provided bespoke financing.',
              name: 'Sarah Jenkins',
              role: 'F8 Tributo Owner',
              tag: 'Repeat Collector',
              year: '2024',
            },
            {
              id: 't5',
              quote:
                'Autobahn Pro sets the global standard for collector automobile sales. White-glove concierge delivery right to my residence was flawless.',
              name: 'David Alistair',
              role: 'M4 Competition Client',
              tag: 'Private Client',
              year: '2025',
            },
          ],
        },

        // SECTION 5 · PHOTO GALLERY ---------------------------------------
        {
          type: 'gallery',
          id: 'bl-home-gallery',
          eyebrow: 'Curated Showcase',
          title: 'Cars Photo Gallery',
          description:
            'Immerse yourself in high-resolution photography capturing every sculpted aerodynamic curve and precision engineered detail.',
          communityBadge: '🏎️ Lamborghini & Exotic Fleet',
          items: [
            {
              id: 'gal-1',
              title: 'Alfa Romeo 4C Spider',
              meta: 'Rosso Competizione · Carbon Monocoque',
              image: brandImage(
                'bl-gal-1-img',
                'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
                'Red Alfa Romeo performance sportscar in scenic outdoor setting',
              ),
            },
            {
              id: 'gal-2',
              title: 'Ford Mustang GT Convertible',
              meta: 'Race Red · 5.0L Coyote V8',
              image: brandImage(
                'bl-gal-2-img',
                'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop',
                'Red Ford Mustang convertible driving through open countryside',
              ),
            },
            {
              id: 'gal-3',
              title: 'McLaren 720S Spider',
              meta: 'Onyx Black · Twin-Turbo V8',
              image: brandImage(
                'bl-gal-3-img',
                'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop',
                'Dark aggressive McLaren supercar with neon accents at night',
              ),
            },
            {
              id: 'gal-4',
              title: 'Lotus Eletre Hyper-SUV',
              meta: 'Solar White · Dual Motor AWD',
              image: brandImage(
                'bl-gal-4-img',
                'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
                'White modern electric hyper-SUV profile',
              ),
            },
            {
              id: 'gal-5',
              title: 'Lamborghini Revuelto V12',
              meta: 'Giallo Inti · Hybrid V12 1015 HP',
              image: brandImage(
                'bl-gal-5-img',
                'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1200&auto=format&fit=crop',
                'Bright yellow Lamborghini Revuelto supercar on mountain switchback road',
              ),
            },
          ],
        },

        // SECTION 6 · CONTACT & INQUIRY FORM -------------------------------
        {
          type: 'contact',
          id: 'bl-home-contact',
          eyebrow: 'Get In Touch',
          title: "We'd Love to Hear From You",
          description:
            'Have questions regarding our fleet, private consignment, or scheduling an exclusive showroom viewing? Our concierge team is ready to assist you.',
          details: [
            { id: 'c1', label: 'Sales Line', value: '+1 (555) 909-4545' },
            { id: 'c2', label: 'Email Concierge', value: 'concierge@autobahnpro.com' },
            { id: 'c3', label: 'Showroom Hours', value: 'Mon–Sat · 9am–7pm' },
            { id: 'c4', label: 'Atelier Location', value: 'Westfield Motor District' },
          ],
          primaryAction: {
            id: 'send-message',
            label: 'Send Message',
            href: '#',
          },
          media: brandImage(
            'bl-home-contact-image',
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1600&auto=format&fit=crop',
            'Sleek dark performance SUV profile',
          ),
        },
      ],
    },
  ],
};
