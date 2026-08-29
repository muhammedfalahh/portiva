/**
 * Content definition for the FORME Studio premium template.
 * Recovered verbatim from lib/premium-template-definitions.ts (template platform migration).
 */

import type { PremiumTemplateDefinition } from '@/lib/template-contract';

const brandImage = (key: string, src: string, alt: string) => ({ key, src, alt });

export const creativePortfolioDefinition: PremiumTemplateDefinition = {
  brandName: 'FORME Studio',
  categoryLabel: 'Creative',
  navTagline: 'Creative studio portfolio',
  footerHeadline: '',
  footerDescription: '',
  footerLinks: [],
  pages: [
    {
      id: 'home',
      label: 'Home',
      slug: '',
      description: '',
      sections: [
        {
          type: 'hero',
          id: 'creative-home-hero',
          eyebrow: '[ INCREDIBLE AGENCY ]',
          title: 'Simple Lines, Bold Ideas, Timeless Brands.',
          description:
            "We don't just design. We strip away the noise, leaving only what matters: timeless visuals, and brands that breathe.",
          stats: [],
          primaryAction: { id: 'start-project', label: 'LETS COLLABORATE', href: '#contact' },
          secondaryAction: { id: 'talk-to-us', label: 'TALK TO US', href: '#contact' },
          media: brandImage(
            'creative-home-hero-image',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
            'Design studio workstation and team workspace',
          ),
        },
        {
          type: 'story',
          id: 'creative-home-story',
          eyebrow: '[01] A STORY WORTH TELLING.',
          title:
            'Forme Create for Brands that Value —\nClarity Over Noise, Believing that Meaningful\nDesign Begins with Intention and Grows.',
          description:
            'We are a creative agency obsessed with clarity, modern expression, clean and aesthetics. Our philosophy is design should feel effortless.',
          body: [
            {
              id: 'b1',
              text: 'We are a creative agency obsessed with clarity, modern expression, clean and aesthetics. Our philosophy is design should feel effortless.',
            },
          ],
          primaryAction: { id: 'see-more', label: 'SEE MORE', href: '#services' },
          media: brandImage(
            'creative-story-team-image',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
            'Forme creative studio team working at design table',
          ),
        },
        {
          type: 'cards',
          id: 'creative-home-services',
          eyebrow: '[02] OUR SERVICES',
          title: 'Our Services',
          description:
            'We craft brand identities and digital experiences with precision, blending creativity and minimalism.',
          style: 'agency',
          items: [
            {
              id: 'svc-branding',
              eyebrow: '[01]',
              title: 'Branding & Identity',
              description:
                "We design logos, identity systems, and brand guidelines that don't chase trends — they're built to last. Every element is crafted to reflect your brand's true essence across all platforms.",
              tags: [
                { id: 't1', text: 'Visual Identity' },
                { id: 't2', text: 'Logo Systems' },
                { id: 't3', text: 'Brand Guidelines' },
              ],
              image: brandImage(
                'creative-services-branding-1',
                'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop',
                'Business card stationary mock for Studio brand',
              ),
              secondaryImage: brandImage(
                'creative-services-branding-2',
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
                'EDO luxury cosmetic packaging boxes and skincare bottles',
              ),
              action: { id: 'cta', label: 'View Details', href: '#contact' },
            },
            {
              id: 'svc-uiux',
              eyebrow: '[02]',
              title: 'UI/UX Design',
              description:
                'User-centric digital interfaces, web platforms, and mobile apps that balance intuitive function with high-end editorial aesthetics.',
              tags: [
                { id: 't1', text: 'Web Platforms' },
                { id: 't2', text: 'Mobile Apps' },
                { id: 't3', text: 'Design Systems' },
              ],
              image: brandImage(
                'creative-services-uiux-1',
                'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
                'Digital web interface wireframe and product design',
              ),
              secondaryImage: brandImage(
                'creative-services-uiux-2',
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
                'Analytics dashboard and interaction prototype',
              ),
              action: { id: 'cta', label: 'View Details', href: '#contact' },
            },
            {
              id: 'svc-creative-dir',
              eyebrow: '[03]',
              title: 'Creative Direction',
              description:
                'Art direction, campaign concepts, editorial photography styling, and motion storytelling that give brands unmistakable distinction.',
              tags: [
                { id: 't1', text: 'Art Direction' },
                { id: 't2', text: 'Campaigns' },
                { id: 't3', text: 'Motion Storytelling' },
              ],
              image: brandImage(
                'creative-services-creative-1',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
                'Editorial fashion photography creative direction',
              ),
              secondaryImage: brandImage(
                'creative-services-creative-2',
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
                'Lookbook art direction and visual styling',
              ),
              action: { id: 'cta', label: 'View Details', href: '#contact' },
            },
            {
              id: 'svc-dev',
              eyebrow: '[04]',
              title: 'Development',
              description:
                'Sub-second Next.js web applications, headless architectures, and fluid interactive animations engineered for modern performance.',
              tags: [
                { id: 't1', text: 'Next.js / React' },
                { id: 't2', text: 'Animation Systems' },
                { id: 't3', text: 'Headless CMS' },
              ],
              image: brandImage(
                'creative-services-dev-1',
                'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
                'Frontend code architecture and web development',
              ),
              secondaryImage: brandImage(
                'creative-services-dev-2',
                'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
                'Modern web application engineering',
              ),
              action: { id: 'cta', label: 'View Details', href: '#contact' },
            },
          ],
        },
        {
          type: 'cards',
          id: 'creative-home-explore-work',
          eyebrow: '[03] FEATURED WORK',
          title: 'Featured Work',
          description: '',
          columns: 3,
          style: 'explore-work',
          primaryAction: {
            id: 'all-work',
            label: 'VIEW ALL WORKS ↗',
            targetPageId: 'works',
          },
          items: [
            {
              id: 'work-another-magazine',
              title: 'ANOTHER MAGAZINE',
              description: 'Sculptural fashion design and avant-garde editorial portraiture.',
              image: brandImage(
                'creative-work-another-mag',
                'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
                'Another Magazine editorial fashion showcase',
              ),
            },
            {
              id: 'work-off-white',
              title: 'OFF-WHITE',
              description: 'Motion blur streetwear showcase and high-contrast runway aesthetics.',
              image: brandImage(
                'creative-work-off-white',
                'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000&auto=format&fit=crop',
                'Off-White runway fashion in motion',
              ),
            },
            {
              id: 'work-vogue-paris',
              title: 'VOGUE PARIS',
              description:
                'Architectural minimalism and Parisian haute couture visual presentation.',
              image: brandImage(
                'creative-work-vogue-paris',
                'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
                'Vogue Paris architectural fashion editorial',
              ),
            },
          ],
        },
        {
          type: 'testimonials',
          id: 'creative-home-testimonials',
          eyebrow: '[04] WHAT CLIENTS SAY',
          title: 'What Clients Say',
          description: 'Real feedback from brands and founders who trusted our vision.',
          milestonesEyebrow: '[05] AGENCY MILESTONES',
          communityBadge: '+1K',
          communityLine1: 'They joined not just for design,',
          communityLine2: "We're ready when you are.",
          items: [
            {
              id: 'test-sarah',
              tag: 'HAPPY CUSTOMER',
              year: '2025©',
              quote:
                'They captured our vision with surprising clarity. The process was simple, colaborative, and the result feels timeless.',
              name: 'Sarah C.',
              role: 'Founder & Design Lead',
              image: brandImage(
                'creative-test-sarah-img',
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
                'Happy customer portrait in black blazer',
              ),
            },
            {
              id: 'test-marcus',
              tag: 'HAPPY CUSTOMER',
              year: '2024©',
              quote:
                'Forme elevated our brand identity to an international standard. Every interaction and deliverable was executed with immaculate detail.',
              name: 'Marcus Vance',
              role: 'CEO, Vance Studio',
              image: brandImage(
                'creative-test-marcus-img',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
                'Editorial portrait of Marcus Vance',
              ),
            },
            {
              id: 'test-elena',
              tag: 'HAPPY CUSTOMER',
              year: '2025©',
              quote:
                'Working with the team felt like having an in-house creative department that deeply understood our aesthetic and commercial goals.',
              name: 'Elena Rostova',
              role: 'Creative Director, Atelier Noir',
              image: brandImage(
                'creative-test-elena-img',
                'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
                'Editorial portrait of Elena Rostova',
              ),
            },
          ],
          stats: [
            { id: 'm1', label: 'Years Experience', value: '05', suffix: '+' },
            { id: 'm2', label: 'Projects Completed', value: '120', suffix: '+' },
            { id: 'm3', label: 'Brands Transformed', value: '50', suffix: '+' },
            { id: 'm4', label: 'Returning Clients', value: '92', suffix: '%' },
          ],
        },
        {
          type: 'pricing',
          id: 'creative-home-pricing',
          eyebrow: '[06] PRICING PLAN',
          title: 'Design, Scaled to Your Needs,\nInstantly Ready When You Are.',
          description: 'Choose a one-time project or an ongoing subscription.',
          ratingValue: '4.9/5',
          socialProofLine1: 'Trusted by teams worldwide',
          socialProofLine2: 'your story deserves to be next.',
          billingToggleMonthly: 'Monthly',
          billingToggleYearly: 'Yearly',
          yearlyDiscountBadge: 'Save 20%',
          plans: [
            {
              id: 'plan-basic',
              name: 'BASIC',
              code: '//01-03',
              price: '$990',
              billing: '/month',
              yearlyPrice: '$790',
              yearlyBilling: '/month',
              subtitle: 'For teams needing ongoing creative power.',
              featuresHeader: "What's Included :",
              features: [
                { id: 'f1', text: '1 major deliverable/month' },
                { id: 'f2', text: 'Priority email support' },
                { id: 'f3', text: '2 revision cycles' },
              ],
              action: {
                id: 'choose-basic',
                label: 'CHOOSE THIS PLAN ↗',
                href: '#contact',
              },
            },
            {
              id: 'plan-pro',
              name: 'PRO',
              code: '//02-03',
              popular: true,
              featured: true,
              highlight: 'Most Popular',
              price: '$2,400',
              billing: '/month',
              yearlyPrice: '$1,920',
              yearlyBilling: '/month',
              subtitle: 'For teams needing ongoing creative power.',
              featuresHeader: "What's Included :",
              features: [
                { id: 'f1', text: '2 major deliverables/month' },
                { id: 'f2', text: 'Unlimited minor requests' },
                { id: 'f3', text: 'Slack/Notion workspace' },
                { id: 'f4', text: 'Weekly check-in' },
              ],
              action: {
                id: 'choose-pro',
                label: 'CHOOSE THIS PLAN ↗',
                href: '#contact',
              },
            },
            {
              id: 'plan-custom',
              name: 'CUSTOM',
              code: '//03-03',
              price: 'Project Based',
              billing: '',
              yearlyPrice: 'Project Based',
              yearlyBilling: '',
              subtitle: 'For brands with unique needs.',
              featuresHeader: "What's Included :",
              features: [
                { id: 'f1', text: 'Fully personalized scope' },
                { id: 'f2', text: 'Dedicated creative direction' },
                { id: 'f3', text: 'Multi-channel design support' },
                { id: 'f4', text: 'Scalable to project or retainer' },
              ],
              action: {
                id: 'choose-custom',
                label: 'CONTACT US ↗',
                href: '#contact',
              },
            },
          ],
        },
        {
          type: 'contact',
          id: 'creative-home-contact',
          eyebrow: "LET'S BRING YOUR VISION TO LIFE",
          title: 'hello@formestudio.com',
          email: 'hello@formestudio.com',
          description: 'Direct inquiry line and international studio representations.',
          tagline: '// Creating Clarity Through Design.',
          brandWordmark: 'FORME®',
          copyright: '© 2025 formestudio, All rights reserved',
          address: '4575 MAISONEWTON AVE.\nMANCHESTER, 30150',
          hours: 'MONDAY - FRIDAY\n09.00 AM — 17.00 PM',
          details: [
            { id: 'd1', label: 'Email', value: 'hello@formestudio.com' },
            { id: 'd2', label: 'Location', value: 'Manchester, UK' },
          ],
          navColumns: [
            {
              id: 'col-general',
              title: 'GENERAL',
              links: [
                { id: 'l-home', label: 'Home', href: '#hero' },
                { id: 'l-about', label: 'About', href: '#about' },
                { id: 'l-services', label: 'Services', href: '#services' },
                { id: 'l-portfolio', label: 'Portfolio', href: '#explore-work' },
                { id: 'l-testimonial', label: 'Testimonial', href: '#testimonials' },
              ],
            },
            {
              id: 'col-services',
              title: 'SERVICES',
              links: [
                { id: 'l-basic', label: 'Basic Plan', href: '#pricing' },
                { id: 'l-pro', label: 'Pro Plan', href: '#pricing' },
                { id: 'l-custom', label: 'Custom Plan', href: '#pricing' },
              ],
            },
            {
              id: 'col-social',
              title: 'SOCIAL MEDIA',
              links: [
                { id: 'l-ig', label: 'Instagram', href: 'https://instagram.com' },
                { id: 'l-wa', label: 'Whatsapp', href: 'https://whatsapp.com' },
                { id: 'l-li', label: 'Linkedin', href: 'https://linkedin.com' },
                { id: 'l-fb', label: 'Facebook', href: 'https://facebook.com' },
              ],
            },
          ],
          legalLinks: [
            { id: 'leg-terms', label: 'Terms & Condition', href: '#terms' },
            { id: 'leg-priv', label: 'Privacy Policy', href: '#privacy' },
          ],
        },
      ],
    },
    {
      id: 'works',
      label: 'Works',
      slug: 'works',
      description: 'Complete index of curated brand identities, digital design systems, and editorial art direction.',
      sections: [
        {
          type: 'cards',
          id: 'creative-works-gallery',
          eyebrow: '[01] ALL PROJECTS',
          title: 'Complete Project Archive',
          description:
            'Filter through our cross-disciplinary portfolio of brand systems, interactive platforms, and physical packaging.',
          style: 'project',
          columns: 3,
          primaryAction: {
            id: 'works-contact-cta',
            label: 'START A PROJECT ↗',
            href: '#contact',
          },
          items: [
            {
              id: 'work-another-magazine',
              category: 'Editorial',
              eyebrow: 'EDITORIAL · 2025©',
              title: 'ANOTHER MAGAZINE',
              description: 'Sculptural fashion design and avant-garde editorial portraiture with bespoke layout typography.',
              meta: 'London, UK',
              tags: [
                { id: 'wt-1-1', text: 'Editorial' },
                { id: 'wt-1-2', text: 'Art Direction' },
                { id: 'wt-1-3', text: 'Print Design' },
              ],
              image: brandImage(
                'creative-work-another-mag',
                'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
                'Another Magazine editorial fashion showcase',
              ),
              action: { id: 'view-case-1', label: 'View Case Study', href: '#contact' },
            },
            {
              id: 'work-off-white',
              category: 'Fashion',
              eyebrow: 'FASHION · 2025©',
              title: 'OFF-WHITE RUNWAY',
              description: 'Motion blur streetwear showcase, high-contrast runway aesthetics, and digital campaign rollout.',
              meta: 'Milan, IT',
              tags: [
                { id: 'wt-2-1', text: 'Fashion Direction' },
                { id: 'wt-2-2', text: 'Digital Campaign' },
                { id: 'wt-2-3', text: 'Video Stills' },
              ],
              image: brandImage(
                'creative-work-off-white',
                'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000&auto=format&fit=crop',
                'Off-White runway fashion in motion',
              ),
              action: { id: 'view-case-2', label: 'View Case Study', href: '#contact' },
            },
            {
              id: 'work-vogue-paris',
              category: 'Editorial',
              eyebrow: 'HAUTE COUTURE · 2024©',
              title: 'VOGUE PARIS',
              description: 'Architectural minimalism and Parisian haute couture visual presentation for seasonal print edition.',
              meta: 'Paris, FR',
              tags: [
                { id: 'wt-3-1', text: 'Art Direction' },
                { id: 'wt-3-2', text: 'Editorial' },
                { id: 'wt-3-3', text: 'Typography' },
              ],
              image: brandImage(
                'creative-work-vogue-paris',
                'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
                'Vogue Paris architectural fashion editorial',
              ),
              action: { id: 'view-case-3', label: 'View Case Study', href: '#contact' },
            },
            {
              id: 'work-aura-cosmetique',
              category: 'Branding',
              eyebrow: 'BRAND IDENTITY · 2025©',
              title: 'AURA COSMÉTIQUE',
              description: 'Complete brand identity, organic packaging architecture, and luxury skincare visual language.',
              meta: 'Geneva, CH',
              tags: [
                { id: 'wt-4-1', text: 'Brand Identity' },
                { id: 'wt-4-2', text: 'Packaging' },
                { id: 'wt-4-3', text: '3D Material' },
              ],
              image: brandImage(
                'creative-work-aura-cosmetique',
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
                'Aura Cosmétique luxury packaging and bottle design',
              ),
              action: { id: 'view-case-4', label: 'View Case Study', href: '#contact' },
            },
            {
              id: 'work-komorebi-arch',
              category: 'Digital',
              eyebrow: 'DIGITAL PLATFORM · 2025©',
              title: 'KOMOREBI ARCHITECTURE',
              description: 'Sub-second interactive web platform and archive presentation for Tokyo-based architectural atelier.',
              meta: 'Tokyo, JP',
              tags: [
                { id: 'wt-5-1', text: 'UI/UX Design' },
                { id: 'wt-5-2', text: 'Next.js' },
                { id: 'wt-5-3', text: 'Architecture' },
              ],
              image: brandImage(
                'creative-work-komorebi-arch',
                'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
                'Komorebi minimal architectural interior space',
              ),
              action: { id: 'view-case-5', label: 'View Case Study', href: '#contact' },
            },
            {
              id: 'work-monolith-audio',
              category: 'Branding',
              eyebrow: 'HARDWARE & IDENTITY · 2024©',
              title: 'MONOLITH SOUND LAB',
              description: 'High-end acoustic hardware branding, anodized aluminum industrial packaging, and physical tactile manual.',
              meta: 'Berlin, DE',
              tags: [
                { id: 'wt-6-1', text: 'Hardware Identity' },
                { id: 'wt-6-2', text: 'Packaging' },
                { id: 'wt-6-3', text: 'Industrial' },
              ],
              image: brandImage(
                'creative-work-monolith-audio',
                'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop',
                'Monolith Sound Lab precision audio design and lighting',
              ),
              action: { id: 'view-case-6', label: 'View Case Study', href: '#contact' },
            },
            {
              id: 'work-velvet-silk-gin',
              category: 'Packaging',
              eyebrow: 'PACKAGING · 2025©',
              title: 'VELVET & SILK DISTILLERY',
              description: 'Bespoke embossed glass bottle curation, foil label system, and limited-edition gift packaging.',
              meta: 'Edinburgh, UK',
              tags: [
                { id: 'wt-7-1', text: 'Packaging' },
                { id: 'wt-7-2', text: 'Foil Stamping' },
                { id: 'wt-7-3', text: 'Custom Glass' },
              ],
              image: brandImage(
                'creative-work-velvet-silk',
                'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=1000&auto=format&fit=crop',
                'Velvet & Silk artisan bottle and embossed label',
              ),
              action: { id: 'view-case-7', label: 'View Case Study', href: '#contact' },
            },
            {
              id: 'work-maison-newton',
              category: 'Fashion',
              eyebrow: 'CAMPAIGN · 2025©',
              title: 'MAISON NEWTON FW25',
              description: 'Seasonal lookbook creative direction, large-format catalog, and digital exhibition experience.',
              meta: 'New York, US',
              tags: [
                { id: 'wt-8-1', text: 'Creative Direction' },
                { id: 'wt-8-2', text: 'Lookbook' },
                { id: 'wt-8-3', text: 'Digital Exhibition' },
              ],
              image: brandImage(
                'creative-work-maison-newton',
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
                'Maison Newton high-fashion model portrait in avant-garde yellow gown',
              ),
              action: { id: 'view-case-8', label: 'View Case Study', href: '#contact' },
            },
          ],
        },
        {
          type: 'contact',
          id: 'creative-works-contact',
          eyebrow: "LET'S BRING YOUR VISION TO LIFE",
          title: 'hello@formestudio.com',
          email: 'hello@formestudio.com',
          description: 'Direct inquiry line and international studio representations.',
          tagline: '// Creating Clarity Through Design.',
          brandWordmark: 'FORME®',
          copyright: '© 2025 formestudio, All rights reserved',
          address: '4575 MAISONEWTON AVE.\nMANCHESTER, 30150',
          hours: 'MONDAY - FRIDAY\n09.00 AM — 17.00 PM',
          details: [
            { id: 'd1', label: 'Email', value: 'hello@formestudio.com' },
            { id: 'd2', label: 'Location', value: 'Manchester, UK' },
          ],
          navColumns: [
            {
              id: 'col-general',
              title: 'GENERAL',
              links: [
                { id: 'l-home', label: 'Home', href: '#hero', targetPageId: 'home' },
                { id: 'l-about', label: 'About', href: '#about' },
                { id: 'l-services', label: 'Services', href: '#services' },
                { id: 'l-portfolio', label: 'Portfolio', href: '#explore-work', targetPageId: 'works' },
                { id: 'l-testimonial', label: 'Testimonial', href: '#testimonials' },
              ],
            },
            {
              id: 'col-services',
              title: 'SERVICES',
              links: [
                { id: 'l-basic', label: 'Basic Plan', href: '#pricing' },
                { id: 'l-pro', label: 'Pro Plan', href: '#pricing' },
                { id: 'l-custom', label: 'Custom Plan', href: '#pricing' },
              ],
            },
            {
              id: 'col-social',
              title: 'SOCIAL MEDIA',
              links: [
                { id: 'l-ig', label: 'Instagram', href: 'https://instagram.com' },
                { id: 'l-wa', label: 'Whatsapp', href: 'https://whatsapp.com' },
                { id: 'l-li', label: 'Linkedin', href: 'https://linkedin.com' },
                { id: 'l-fb', label: 'Facebook', href: 'https://facebook.com' },
              ],
            },
          ],
          legalLinks: [
            { id: 'leg-terms', label: 'Terms & Condition', href: '#terms' },
            { id: 'leg-priv', label: 'Privacy Policy', href: '#privacy' },
          ],
        },
      ],
    },
  ],
};
