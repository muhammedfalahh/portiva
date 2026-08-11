export type BentoBioPresetId = 'creator' | 'business' | 'influencer' | 'minimal';
export type BentoWidgetCategory = 'suggested' | 'commerce' | 'social' | 'media' | 'contact' | 'events' | 'text';
export type BentoWidgetSize = '1x1' | '2x1' | '1x2' | '2x2' | '4x1' | '4x2';
export type SocialPlatformId =
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'x'
  | 'facebook'
  | 'linkedin'
  | 'pinterest'
  | 'snapchat'
  | 'threads'
  | 'reddit'
  | 'discord'
  | 'telegram'
  | 'whatsapp'
  | 'twitch'
  | 'github'
  | 'behance'
  | 'dribbble'
  | 'medium';
export type BentoWidgetType =
  | 'link'
  | 'social'
  | 'youtube'
  | 'spotify'
  | 'gallery'
  | 'product'
  | 'collection'
  | 'form'
  | 'contact'
  | 'event'
  | 'text'
  | 'social_group';
export type BentoWidgetPresentation = 'icon' | 'label' | 'card' | 'gallery' | 'list';
export type BentoSlotRole = 'hero' | 'feature' | 'support' | 'tall' | 'compact' | 'utility' | 'banner';
export type BentoWidgetKind =
  | 'default'
  | 'video'
  | 'channel'
  | 'playlist'
  | 'latest'
  | 'song'
  | 'album'
  | 'artist'
  | 'podcast'
  | 'email'
  | 'phone'
  | 'whatsapp'
  | 'booking'
  | 'location'
  | 'heading'
  | 'announcement'
  | 'quote'
  | 'rich_text'
  | 'product_collection'
  | 'signup';

export interface BentoWidgetLayoutHint {
  preferredRole?: BentoSlotRole;
  preserveSlotOnReplace?: boolean;
}

export interface BentoBioWidget {
  id: string;
  type: BentoWidgetType;
  size: BentoWidgetSize;
  order: number;
  visible: boolean;
  title?: string;
  subtitle?: string;
  description?: string;
  url?: string;
  label?: string;
  imageUrl?: string;
  alt?: string;
  thumbnailUrl?: string;
  platform?: SocialPlatformId;
  username?: string;
  price?: string;
  originalPrice?: string;
  badge?: string;
  ctaLabel?: string;
  kind?: BentoWidgetKind;
  presentation?: BentoWidgetPresentation;
  items?: string[];
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  countdownLabel?: string;
  openInNewTab?: boolean;
  layoutHint?: BentoWidgetLayoutHint;
}

export type BentoBioBox = BentoBioWidget;

export interface BentoBioComposition {
  version: 1;
  strategy: 'packed-patterns';
  patternId?: string;
  slotAssignments: Record<string, string>;
}

export interface BentoBioConfig {
  presetGradient: BentoBioPresetId;
  boxStyle: 'soft' | 'solid' | 'outline';
  profileVariant: 'editorial' | 'compact' | 'minimal';
  showVerified: boolean;
  showLocation: boolean;
  showWebsite: boolean;
  location?: string;
  websiteLabel?: string;
  websiteUrl?: string;
  primaryActionLabel?: string;
  primaryActionHref?: string;
  socials: Partial<Record<SocialPlatformId, string>>;
  boxes: BentoBioWidget[];
  composition: BentoBioComposition;
}

export interface BentoPlacement {
  id: string;
  colStart: number;
  rowStart: number;
  colSpan: number;
  rowSpan: number;
}

export interface BentoPatternSlot {
  id: string;
  role: BentoSlotRole;
  colStart: number;
  rowStart: number;
  colSpan: number;
  rowSpan: number;
}

export interface BentoPattern {
  id: string;
  widgetCount: number;
  rowCount: number;
  slots: BentoPatternSlot[];
}

export interface BentoPlacementResult {
  placements: BentoPlacement[];
  rowCount: number;
  patternId: string;
  slotAssignments: Record<string, string>;
}

export interface SocialPlatformDefinition {
  id: SocialPlatformId;
  label: string;
  description: string;
  iconKey: string;
  placeholder: string;
  domains: string[];
}

export interface WidgetFieldDefinition {
  key: keyof BentoBioWidget | 'itemsText';
  label: string;
  type: 'text' | 'url' | 'textarea' | 'email' | 'phone';
  placeholder?: string;
  required?: boolean;
}

export interface BentoWidgetDefinition {
  id: string;
  type: BentoWidgetType;
  label: string;
  description: string;
  category: BentoWidgetCategory;
  iconKey: string;
  supportedSizes: BentoWidgetSize[];
  defaultSize: BentoWidgetSize;
  quickAdd?: boolean;
  suggested?: boolean;
  platform?: SocialPlatformId;
  kind?: BentoWidgetKind;
  presentation?: BentoWidgetPresentation;
  keywords: string[];
  fields: WidgetFieldDefinition[];
}

export const BENTO_GRID_COLUMNS = 4;
export const BENTO_ROW_HEIGHT = 96;
export const BENTO_GAP = 12;

export const BENTO_SIZE_MAP: Record<BentoWidgetSize, { colSpan: number; rowSpan: number; label: string }> = {
  '1x1': { colSpan: 2, rowSpan: 1, label: 'Compact' },
  '2x1': { colSpan: 2, rowSpan: 1, label: 'Medium' },
  '1x2': { colSpan: 2, rowSpan: 3, label: 'Tall' },
  '2x2': { colSpan: 2, rowSpan: 2, label: 'Large' },
  '4x1': { colSpan: 4, rowSpan: 1, label: 'Wide' },
  '4x2': { colSpan: 4, rowSpan: 2, label: 'Feature' },
};

export const BENTO_PACKED_PATTERNS: BentoPattern[] = [
  {
    id: 'packed-3-a',
    widgetCount: 3,
    rowCount: 4,
    slots: [
      { id: 'hero', role: 'hero', colStart: 1, rowStart: 1, colSpan: 4, rowSpan: 2 },
      { id: 'feature-left', role: 'feature', colStart: 1, rowStart: 3, colSpan: 2, rowSpan: 2 },
      { id: 'feature-right', role: 'support', colStart: 3, rowStart: 3, colSpan: 2, rowSpan: 2 },
    ],
  },
  {
    id: 'packed-4-a',
    widgetCount: 4,
    rowCount: 4,
    slots: [
      { id: 'hero', role: 'hero', colStart: 1, rowStart: 1, colSpan: 4, rowSpan: 2 },
      { id: 'feature-left', role: 'feature', colStart: 1, rowStart: 3, colSpan: 2, rowSpan: 2 },
      { id: 'support-top', role: 'support', colStart: 3, rowStart: 3, colSpan: 2, rowSpan: 1 },
      { id: 'support-bottom', role: 'utility', colStart: 3, rowStart: 4, colSpan: 2, rowSpan: 1 },
    ],
  },
  {
    id: 'packed-5-a',
    widgetCount: 5,
    rowCount: 5,
    slots: [
      { id: 'hero', role: 'hero', colStart: 1, rowStart: 1, colSpan: 4, rowSpan: 2 },
      { id: 'feature-left', role: 'feature', colStart: 1, rowStart: 3, colSpan: 2, rowSpan: 2 },
      { id: 'support-top', role: 'support', colStart: 3, rowStart: 3, colSpan: 2, rowSpan: 1 },
      { id: 'support-bottom', role: 'utility', colStart: 3, rowStart: 4, colSpan: 2, rowSpan: 1 },
      { id: 'banner', role: 'banner', colStart: 1, rowStart: 5, colSpan: 4, rowSpan: 1 },
    ],
  },
  {
    id: 'packed-6-a',
    widgetCount: 6,
    rowCount: 6,
    slots: [
      { id: 'hero', role: 'hero', colStart: 1, rowStart: 1, colSpan: 4, rowSpan: 2 },
      { id: 'feature-left', role: 'feature', colStart: 1, rowStart: 3, colSpan: 2, rowSpan: 2 },
      { id: 'feature-right', role: 'support', colStart: 3, rowStart: 3, colSpan: 2, rowSpan: 2 },
      { id: 'utility-left', role: 'utility', colStart: 1, rowStart: 5, colSpan: 2, rowSpan: 1 },
      { id: 'utility-right', role: 'compact', colStart: 3, rowStart: 5, colSpan: 2, rowSpan: 1 },
      { id: 'banner', role: 'banner', colStart: 1, rowStart: 6, colSpan: 4, rowSpan: 1 },
    ],
  },
  {
    id: 'packed-7-a',
    widgetCount: 7,
    rowCount: 7,
    slots: [
      { id: 'hero', role: 'hero', colStart: 1, rowStart: 1, colSpan: 4, rowSpan: 2 },
      { id: 'feature-left', role: 'feature', colStart: 1, rowStart: 3, colSpan: 2, rowSpan: 2 },
      { id: 'feature-right', role: 'support', colStart: 3, rowStart: 3, colSpan: 2, rowSpan: 2 },
      { id: 'wide', role: 'support', colStart: 1, rowStart: 5, colSpan: 4, rowSpan: 1 },
      { id: 'utility-left', role: 'utility', colStart: 1, rowStart: 6, colSpan: 2, rowSpan: 1 },
      { id: 'utility-right', role: 'compact', colStart: 3, rowStart: 6, colSpan: 2, rowSpan: 1 },
      { id: 'banner', role: 'banner', colStart: 1, rowStart: 7, colSpan: 4, rowSpan: 1 },
    ],
  },
  {
    id: 'packed-8-a',
    widgetCount: 8,
    rowCount: 7,
    slots: [
      { id: 'hero', role: 'hero', colStart: 1, rowStart: 1, colSpan: 4, rowSpan: 2 },
      { id: 'feature-left', role: 'feature', colStart: 1, rowStart: 3, colSpan: 2, rowSpan: 2 },
      { id: 'support-top', role: 'support', colStart: 3, rowStart: 3, colSpan: 2, rowSpan: 1 },
      { id: 'support-bottom', role: 'support', colStart: 3, rowStart: 4, colSpan: 2, rowSpan: 1 },
      { id: 'wide', role: 'support', colStart: 1, rowStart: 5, colSpan: 4, rowSpan: 1 },
      { id: 'utility-left', role: 'utility', colStart: 1, rowStart: 6, colSpan: 2, rowSpan: 1 },
      { id: 'utility-right', role: 'compact', colStart: 3, rowStart: 6, colSpan: 2, rowSpan: 1 },
      { id: 'banner', role: 'banner', colStart: 1, rowStart: 7, colSpan: 4, rowSpan: 1 },
    ],
  },
];

export const BENTO_LAYOUT_PRESETS: Array<{
  id: BentoBioPresetId;
  label: string;
  description: string;
}> = [
  { id: 'creator', label: 'Creator', description: 'Feature media and links first.' },
  { id: 'business', label: 'Business', description: 'Lead with contact and offers.' },
  { id: 'influencer', label: 'Influencer', description: 'Push social and visual content.' },
  { id: 'minimal', label: 'Minimal', description: 'Keep the stack clean and calm.' },
];

export const SOCIAL_PLATFORMS: SocialPlatformDefinition[] = [
  { id: 'instagram', label: 'Instagram', description: 'Display posts and reels', iconKey: 'instagram', placeholder: 'https://instagram.com/yourname', domains: ['instagram.com'] },
  { id: 'tiktok', label: 'TikTok', description: 'Share short-form video', iconKey: 'tiktok', placeholder: 'https://tiktok.com/@yourname', domains: ['tiktok.com'] },
  { id: 'youtube', label: 'YouTube', description: 'Share videos and channel content', iconKey: 'youtube', placeholder: 'https://youtube.com/watch?v=...', domains: ['youtube.com', 'youtu.be'] },
  { id: 'x', label: 'X', description: 'Link your latest updates', iconKey: 'x', placeholder: 'https://x.com/yourname', domains: ['x.com', 'twitter.com'] },
  { id: 'facebook', label: 'Facebook', description: 'Direct people to your page', iconKey: 'facebook', placeholder: 'https://facebook.com/yourname', domains: ['facebook.com'] },
  { id: 'linkedin', label: 'LinkedIn', description: 'Share your professional profile', iconKey: 'linkedin', placeholder: 'https://linkedin.com/in/yourname', domains: ['linkedin.com'] },
  { id: 'pinterest', label: 'Pinterest', description: 'Show boards and inspiration', iconKey: 'pinterest', placeholder: 'https://pinterest.com/yourname', domains: ['pinterest.com'] },
  { id: 'snapchat', label: 'Snapchat', description: 'Share your Snap profile', iconKey: 'snapchat', placeholder: 'https://snapchat.com/add/yourname', domains: ['snapchat.com'] },
  { id: 'threads', label: 'Threads', description: 'Share your Threads profile', iconKey: 'threads', placeholder: 'https://threads.net/@yourname', domains: ['threads.net'] },
  { id: 'reddit', label: 'Reddit', description: 'Share your subreddit or profile', iconKey: 'reddit', placeholder: 'https://reddit.com/u/yourname', domains: ['reddit.com'] },
  { id: 'discord', label: 'Discord', description: 'Invite visitors to your community', iconKey: 'discord', placeholder: 'https://discord.gg/invite', domains: ['discord.gg', 'discord.com'] },
  { id: 'telegram', label: 'Telegram', description: 'Share your channel or chat', iconKey: 'telegram', placeholder: 'https://t.me/yourname', domains: ['t.me', 'telegram.me'] },
  { id: 'whatsapp', label: 'WhatsApp', description: 'Open a direct conversation', iconKey: 'whatsapp', placeholder: 'https://wa.me/919999999999', domains: ['wa.me', 'whatsapp.com'] },
  { id: 'twitch', label: 'Twitch', description: 'Promote your live streams', iconKey: 'twitch', placeholder: 'https://twitch.tv/yourname', domains: ['twitch.tv'] },
  { id: 'github', label: 'GitHub', description: 'Share your code and repos', iconKey: 'github', placeholder: 'https://github.com/yourname', domains: ['github.com'] },
  { id: 'behance', label: 'Behance', description: 'Showcase creative work', iconKey: 'behance', placeholder: 'https://behance.net/yourname', domains: ['behance.net'] },
  { id: 'dribbble', label: 'Dribbble', description: 'Share design shots', iconKey: 'dribbble', placeholder: 'https://dribbble.com/yourname', domains: ['dribbble.com'] },
  { id: 'medium', label: 'Medium', description: 'Link your writing and articles', iconKey: 'medium', placeholder: 'https://medium.com/@yourname', domains: ['medium.com'] },
];

const BASE_WIDGET_DEFINITIONS: BentoWidgetDefinition[] = [
  {
    id: 'link',
    type: 'link',
    label: 'Link',
    description: 'Add a direct link with a clear CTA',
    category: 'suggested',
    iconKey: 'link',
    supportedSizes: ['2x1', '4x1'],
    defaultSize: '4x1',
    quickAdd: true,
    suggested: true,
    keywords: ['link', 'website', 'url', 'cta'],
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Featured Link', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Short supporting copy' },
      { key: 'url', label: 'URL', type: 'url', placeholder: 'https://example.com', required: true },
    ],
  },
  {
    id: 'collection',
    type: 'collection',
    label: 'Collection',
    description: 'Group several links, tools, or products together',
    category: 'commerce',
    iconKey: 'collection',
    supportedSizes: ['2x2', '4x2'],
    defaultSize: '4x2',
    quickAdd: true,
    suggested: true,
    keywords: ['collection', 'tools', 'bundle', 'resources', 'list'],
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'My Favorite Tools', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Optional label' },
      { key: 'itemsText', label: 'Items', type: 'textarea', placeholder: 'Camera\nLaptop\nSoftware', required: true },
    ],
  },
  {
    id: 'product',
    type: 'product',
    label: 'Product',
    description: 'Highlight a single product or offer',
    category: 'commerce',
    iconKey: 'product',
    supportedSizes: ['2x2', '4x2'],
    defaultSize: '2x2',
    quickAdd: true,
    suggested: true,
    keywords: ['product', 'shop', 'commerce', 'offer'],
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Product name', required: true },
      { key: 'subtitle', label: 'Description', type: 'text', placeholder: 'Short product summary' },
      { key: 'price', label: 'Price', type: 'text', placeholder: '₹1,299' },
      { key: 'url', label: 'URL', type: 'url', placeholder: 'https://example.com/product', required: true },
      { key: 'imageUrl', label: 'Image URL', type: 'url', placeholder: 'https://images.unsplash.com/...' },
    ],
  },
  {
    id: 'form',
    type: 'form',
    label: 'Form',
    description: 'Collect emails, inquiries, or signups',
    category: 'contact',
    iconKey: 'form',
    supportedSizes: ['2x2', '4x2'],
    defaultSize: '2x2',
    quickAdd: true,
    suggested: true,
    kind: 'signup',
    keywords: ['form', 'signup', 'newsletter', 'email collection'],
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Join the newsletter', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Tell people what they get' },
      { key: 'url', label: 'Destination URL', type: 'url', placeholder: 'https://example.com/form' },
      { key: 'ctaLabel', label: 'CTA Label', type: 'text', placeholder: 'Sign up' },
    ],
  },
  {
    id: 'youtube-video',
    type: 'youtube',
    label: 'YouTube Video',
    description: 'Share a video preview card',
    category: 'media',
    iconKey: 'youtube',
    supportedSizes: ['2x2', '4x2'],
    defaultSize: '2x2',
    quickAdd: true,
    suggested: true,
    kind: 'video',
    keywords: ['youtube', 'video', 'reel', 'media'],
    fields: [
      { key: 'url', label: 'Video URL', type: 'url', placeholder: 'https://youtube.com/watch?v=...', required: true },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Video title' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Channel or note' },
      { key: 'thumbnailUrl', label: 'Thumbnail URL', type: 'url', placeholder: 'https://i.ytimg.com/...' },
    ],
  },
  {
    id: 'youtube-channel',
    type: 'youtube',
    label: 'YouTube Channel',
    description: 'Promote a channel destination',
    category: 'media',
    iconKey: 'youtube',
    supportedSizes: ['2x2', '4x2'],
    defaultSize: '2x2',
    kind: 'channel',
    keywords: ['youtube', 'channel'],
    fields: [
      { key: 'url', label: 'Channel URL', type: 'url', placeholder: 'https://youtube.com/@channel', required: true },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Channel name' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'What people will find' },
      { key: 'thumbnailUrl', label: 'Thumbnail URL', type: 'url', placeholder: 'https://i.ytimg.com/...' },
    ],
  },
  {
    id: 'youtube-playlist',
    type: 'youtube',
    label: 'YouTube Playlist',
    description: 'Feature a playlist or series',
    category: 'media',
    iconKey: 'youtube',
    supportedSizes: ['2x2', '4x2'],
    defaultSize: '2x2',
    kind: 'playlist',
    keywords: ['youtube', 'playlist', 'series'],
    fields: [
      { key: 'url', label: 'Playlist URL', type: 'url', placeholder: 'https://youtube.com/playlist?...', required: true },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Playlist name' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Optional note' },
      { key: 'thumbnailUrl', label: 'Thumbnail URL', type: 'url', placeholder: 'https://i.ytimg.com/...' },
    ],
  },
  {
    id: 'spotify-song',
    type: 'spotify',
    label: 'Spotify Song',
    description: 'Share a track with artwork and CTA',
    category: 'media',
    iconKey: 'spotify',
    supportedSizes: ['2x2', '4x2'],
    defaultSize: '2x2',
    kind: 'song',
    keywords: ['spotify', 'music', 'song', 'track'],
    fields: [
      { key: 'url', label: 'Spotify URL', type: 'url', placeholder: 'https://open.spotify.com/track/...', required: true },
      { key: 'title', label: 'Track', type: 'text', placeholder: 'Track name' },
      { key: 'subtitle', label: 'Artist', type: 'text', placeholder: 'Artist name' },
      { key: 'imageUrl', label: 'Artwork URL', type: 'url', placeholder: 'https://i.scdn.co/...' },
    ],
  },
  {
    id: 'spotify-playlist',
    type: 'spotify',
    label: 'Spotify Playlist',
    description: 'Feature a playlist or listening queue',
    category: 'media',
    iconKey: 'spotify',
    supportedSizes: ['2x2', '4x2'],
    defaultSize: '2x2',
    kind: 'playlist',
    keywords: ['spotify', 'music', 'playlist'],
    fields: [
      { key: 'url', label: 'Playlist URL', type: 'url', placeholder: 'https://open.spotify.com/playlist/...', required: true },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Playlist title' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Creator or note' },
      { key: 'imageUrl', label: 'Artwork URL', type: 'url', placeholder: 'https://i.scdn.co/...' },
    ],
  },
  {
    id: 'spotify-artist',
    type: 'spotify',
    label: 'Spotify Artist',
    description: 'Promote an artist profile',
    category: 'media',
    iconKey: 'spotify',
    supportedSizes: ['2x2', '4x2'],
    defaultSize: '2x2',
    kind: 'artist',
    keywords: ['spotify', 'artist'],
    fields: [
      { key: 'url', label: 'Artist URL', type: 'url', placeholder: 'https://open.spotify.com/artist/...', required: true },
      { key: 'title', label: 'Artist', type: 'text', placeholder: 'Artist name' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Genre or note' },
      { key: 'imageUrl', label: 'Artwork URL', type: 'url', placeholder: 'https://i.scdn.co/...' },
    ],
  },
  {
    id: 'image-gallery',
    type: 'gallery',
    label: 'Image Gallery',
    description: 'Showcase multiple images in one widget',
    category: 'media',
    iconKey: 'gallery',
    supportedSizes: ['2x2', '4x2'],
    defaultSize: '2x2',
    suggested: true,
    keywords: ['gallery', 'images', 'photos', 'carousel'],
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Image gallery', required: true },
      { key: 'itemsText', label: 'Image URLs', type: 'textarea', placeholder: 'https://...\nhttps://...\nhttps://...', required: true },
    ],
  },
  {
    id: 'image-upload',
    type: 'gallery',
    label: 'Upload Image',
    description: 'Use local image upload for featured media',
    category: 'media',
    iconKey: 'gallery',
    supportedSizes: ['2x2', '4x2'],
    defaultSize: '2x2',
    quickAdd: true,
    suggested: true,
    kind: 'default',
    keywords: ['upload', 'image', 'photo', 'local media'],
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Featured image', required: true },
    ],
  },
  {
    id: 'email-contact',
    type: 'contact',
    label: 'Email',
    description: 'Offer a direct email CTA',
    category: 'contact',
    iconKey: 'email',
    supportedSizes: ['1x1', '2x1', '4x1'],
    defaultSize: '2x1',
    kind: 'email',
    keywords: ['email', 'contact', 'inquiry'],
    fields: [
      { key: 'title', label: 'Label', type: 'text', placeholder: 'Email me', required: true },
      { key: 'url', label: 'Email', type: 'email', placeholder: 'hello@example.com', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Response time or note' },
    ],
  },
  {
    id: 'phone-contact',
    type: 'contact',
    label: 'Phone',
    description: 'Create a tap-to-call widget',
    category: 'contact',
    iconKey: 'phone',
    supportedSizes: ['1x1', '2x1', '4x1'],
    defaultSize: '2x1',
    kind: 'phone',
    keywords: ['phone', 'call', 'contact'],
    fields: [
      { key: 'title', label: 'Label', type: 'text', placeholder: 'Call us', required: true },
      { key: 'url', label: 'Phone', type: 'phone', placeholder: '+91 90000 00000', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Availability or note' },
    ],
  },
  {
    id: 'whatsapp-contact',
    type: 'contact',
    label: 'WhatsApp',
    description: 'Open a WhatsApp conversation',
    category: 'contact',
    iconKey: 'whatsapp',
    supportedSizes: ['1x1', '2x1', '4x1'],
    defaultSize: '2x1',
    kind: 'whatsapp',
    keywords: ['whatsapp', 'chat', 'message'],
    fields: [
      { key: 'title', label: 'Label', type: 'text', placeholder: 'WhatsApp', required: true },
      { key: 'url', label: 'WhatsApp URL', type: 'url', placeholder: 'https://wa.me/919999999999', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Fastest response channel' },
    ],
  },
  {
    id: 'booking-contact',
    type: 'contact',
    label: 'Booking',
    description: 'Link a Calendly or booking page',
    category: 'contact',
    iconKey: 'booking',
    supportedSizes: ['2x1', '4x1'],
    defaultSize: '4x1',
    kind: 'booking',
    keywords: ['booking', 'calendly', 'appointment'],
    fields: [
      { key: 'title', label: 'Label', type: 'text', placeholder: 'Book a call', required: true },
      { key: 'url', label: 'Booking URL', type: 'url', placeholder: 'https://calendly.com/...', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Quick scheduling note' },
    ],
  },
  {
    id: 'location-contact',
    type: 'contact',
    label: 'Location',
    description: 'Add an address or map destination',
    category: 'contact',
    iconKey: 'location',
    supportedSizes: ['2x1', '4x1'],
    defaultSize: '2x1',
    kind: 'location',
    keywords: ['location', 'address', 'map'],
    fields: [
      { key: 'title', label: 'Label', type: 'text', placeholder: 'Visit us', required: true },
      { key: 'subtitle', label: 'Address', type: 'text', placeholder: '123 Market Street', required: true },
      { key: 'url', label: 'Map URL', type: 'url', placeholder: 'https://maps.google.com/?q=...' },
    ],
  },
  {
    id: 'event',
    type: 'event',
    label: 'Event',
    description: 'Promote an event, RSVP, or ticket link',
    category: 'events',
    iconKey: 'event',
    supportedSizes: ['2x2', '4x2'],
    defaultSize: '2x2',
    keywords: ['event', 'ticket', 'rsvp', 'calendar'],
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Launch party', required: true },
      { key: 'eventDate', label: 'Date', type: 'text', placeholder: '28 Aug 2026', required: true },
      { key: 'eventTime', label: 'Time', type: 'text', placeholder: '7:00 PM' },
      { key: 'eventLocation', label: 'Location', type: 'text', placeholder: 'Bangalore' },
      { key: 'url', label: 'RSVP URL', type: 'url', placeholder: 'https://example.com/rsvp' },
    ],
  },
  {
    id: 'text-heading',
    type: 'text',
    label: 'Heading',
    description: 'Add a short section heading or intro',
    category: 'text',
    iconKey: 'heading',
    supportedSizes: ['2x1', '4x1'],
    defaultSize: '4x1',
    quickAdd: true,
    kind: 'heading',
    keywords: ['heading', 'title', 'text'],
    fields: [
      { key: 'title', label: 'Heading', type: 'text', placeholder: 'What I’m sharing today', required: true },
      { key: 'subtitle', label: 'Body', type: 'text', placeholder: 'Optional supporting line' },
    ],
  },
  {
    id: 'text-announcement',
    type: 'text',
    label: 'Announcement',
    description: 'Highlight a time-sensitive update',
    category: 'text',
    iconKey: 'announcement',
    supportedSizes: ['2x1', '4x1'],
    defaultSize: '4x1',
    kind: 'announcement',
    keywords: ['announcement', 'badge', 'update'],
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Now booking for September', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Short supporting copy' },
      { key: 'badge', label: 'Badge', type: 'text', placeholder: 'New drop' },
      { key: 'url', label: 'URL', type: 'url', placeholder: 'https://example.com' },
    ],
  },
  {
    id: 'text-quote',
    type: 'text',
    label: 'Quote',
    description: 'Display a quote or testimonial',
    category: 'text',
    iconKey: 'quote',
    supportedSizes: ['2x1', '2x2', '4x1'],
    defaultSize: '2x2',
    kind: 'quote',
    keywords: ['quote', 'testimonial', 'text'],
    fields: [
      { key: 'title', label: 'Quote', type: 'textarea', placeholder: 'Design is how it works.', required: true },
      { key: 'subtitle', label: 'Attribution', type: 'text', placeholder: 'Name or source' },
    ],
  },
];

const SOCIAL_WIDGET_DEFINITIONS: BentoWidgetDefinition[] = SOCIAL_PLATFORMS.map((platform) => ({
  id: `social-${platform.id}`,
  type: 'social',
  label: platform.label,
  description: platform.description,
  category: 'social',
  iconKey: platform.iconKey,
  supportedSizes: ['1x1', '2x1'],
  defaultSize: '1x1',
  platform: platform.id,
  presentation: 'icon',
  keywords: [platform.label.toLowerCase(), platform.id, 'social', platform.description.toLowerCase()],
  fields: [
    { key: 'url', label: 'URL', type: 'url', placeholder: platform.placeholder, required: true },
    { key: 'title', label: 'Label', type: 'text', placeholder: platform.label },
    { key: 'username', label: 'Username', type: 'text', placeholder: '@yourname' },
  ],
}));

export const BENTO_WIDGET_DEFINITIONS = [...BASE_WIDGET_DEFINITIONS, ...SOCIAL_WIDGET_DEFINITIONS];

export const CATEGORY_LABELS: Record<BentoWidgetCategory | 'view_all', string> = {
  suggested: 'Suggested',
  commerce: 'Commerce',
  social: 'Social',
  media: 'Media',
  contact: 'Contact',
  events: 'Events',
  text: 'Text',
  view_all: 'View all',
};

export const DEFAULT_BENTO_BOXES: BentoBioWidget[] = [
  {
    id: 'bento-youtube-video-1',
    type: 'youtube',
    title: 'Latest Build Breakdown',
    subtitle: 'Inside premium creator pages, motion, and conversion systems.',
    url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    size: '4x2',
    order: 0,
    visible: true,
    kind: 'video',
    ctaLabel: 'Watch now',
    layoutHint: { preferredRole: 'hero', preserveSlotOnReplace: true },
  },
  {
    id: 'bento-gallery-1',
    type: 'gallery',
    title: 'Selected visuals',
    items: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    ],
    size: '2x2',
    order: 1,
    visible: true,
    presentation: 'gallery',
    layoutHint: { preferredRole: 'feature', preserveSlotOnReplace: true },
  },
  {
    id: 'bento-product-1',
    type: 'product',
    title: 'Bento Creator Kit',
    subtitle: 'Layout kit, prompts, and launch assets.',
    price: '₹1,299',
    url: 'https://example.com/kit',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    size: '2x2',
    order: 2,
    visible: true,
    ctaLabel: 'View product',
    badge: 'New',
    layoutHint: { preferredRole: 'support', preserveSlotOnReplace: true },
  },
  {
    id: 'bento-link-featured-1',
    type: 'link',
    title: 'Book a Strategy Session',
    subtitle: 'High-leverage design, launch, and growth support.',
    url: 'https://example.com/strategy',
    ctaLabel: 'Book now',
    size: '4x1',
    order: 3,
    visible: true,
    badge: 'Featured',
    layoutHint: { preferredRole: 'support', preserveSlotOnReplace: true },
  },
  {
    id: 'bento-social-instagram-1',
    type: 'social',
    title: 'Instagram',
    url: 'https://instagram.com',
    size: '2x1',
    order: 4,
    visible: true,
    platform: 'instagram',
    username: '@portiva',
    presentation: 'label',
    layoutHint: { preferredRole: 'utility', preserveSlotOnReplace: true },
  },
  {
    id: 'bento-contact-whatsapp-1',
    type: 'contact',
    title: 'WhatsApp',
    subtitle: 'Fastest response channel',
    url: 'https://wa.me/919999999999',
    size: '2x1',
    order: 5,
    visible: true,
    kind: 'whatsapp',
    ctaLabel: 'Message now',
    layoutHint: { preferredRole: 'compact', preserveSlotOnReplace: true },
  },
  {
    id: 'bento-text-announcement-1',
    type: 'text',
    title: 'Now booking September launch support',
    subtitle: 'Limited client spots for brand systems and link-in-bio redesigns.',
    size: '4x1',
    order: 6,
    visible: true,
    kind: 'announcement',
    badge: 'Open',
    url: 'https://example.com/contact',
    ctaLabel: 'Apply',
    layoutHint: { preferredRole: 'banner', preserveSlotOnReplace: true },
  },
];

export const DEFAULT_BENTO_CONFIG: BentoBioConfig = {
  presetGradient: 'creator',
  boxStyle: 'soft',
  profileVariant: 'editorial',
  showVerified: true,
  showLocation: true,
  showWebsite: true,
  location: 'Bangalore, India',
  websiteLabel: 'portiva.in',
  websiteUrl: 'https://portiva.in',
  primaryActionLabel: 'Open portfolio',
  primaryActionHref: 'https://portiva.in',
  socials: {
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  boxes: DEFAULT_BENTO_BOXES,
  composition: {
    version: 1,
    strategy: 'packed-patterns',
    slotAssignments: {},
  },
};

export const BENTO_BIO_PRESETS: Array<{
  id: BentoBioPresetId;
  label: string;
  description: string;
  theme: {
    background: string;
    foreground: string;
    primary: string;
    primaryHover: string;
    surface: string;
    surfaceHover: string;
    muted: string;
    border: string;
    accent: string;
    accentHover: string;
  };
  config: Partial<BentoBioConfig>;
}> = [
  {
    id: 'creator',
    label: 'Creator',
    description: 'Warm editorial surfaces with strong media focus.',
    theme: {
      background: '#F7F3EC',
      foreground: '#171717',
      primary: '#2563EB',
      primaryHover: '#1D4ED8',
      surface: '#FFFFFF',
      surfaceHover: '#F8F7F3',
      muted: '#6B6B63',
      border: '#E8E1D6',
      accent: '#EA580C',
      accentHover: '#C2410C',
    },
    config: { presetGradient: 'creator', profileVariant: 'editorial', boxStyle: 'soft' },
  },
  {
    id: 'business',
    label: 'Business',
    description: 'Structured commerce-first composition.',
    theme: {
      background: '#F5F7F9',
      foreground: '#111827',
      primary: '#0F766E',
      primaryHover: '#115E59',
      surface: '#FFFFFF',
      surfaceHover: '#F3F6F8',
      muted: '#64748B',
      border: '#DCE5EC',
      accent: '#2563EB',
      accentHover: '#1D4ED8',
    },
    config: { presetGradient: 'business', profileVariant: 'compact', boxStyle: 'solid' },
  },
  {
    id: 'influencer',
    label: 'Influencer',
    description: 'High-contrast profile with bold media tiles.',
    theme: {
      background: '#101116',
      foreground: '#F8FAFC',
      primary: '#F43F5E',
      primaryHover: '#E11D48',
      surface: '#171923',
      surfaceHover: '#1F2432',
      muted: '#94A3B8',
      border: '#2A2F3D',
      accent: '#8B5CF6',
      accentHover: '#7C3AED',
    },
    config: { presetGradient: 'influencer', profileVariant: 'editorial', boxStyle: 'soft' },
  },
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'Quiet grayscale layout with restrained accents.',
    theme: {
      background: '#F8F8F5',
      foreground: '#111111',
      primary: '#111111',
      primaryHover: '#000000',
      surface: '#FFFFFF',
      surfaceHover: '#F3F3EF',
      muted: '#70706A',
      border: '#E7E5DE',
      accent: '#52525B',
      accentHover: '#3F3F46',
    },
    config: { presetGradient: 'minimal', profileVariant: 'minimal', boxStyle: 'outline' },
  },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function booleanValue(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

function arrayValue(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const result = value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  return result.length ? result : undefined;
}

export function sizeToSpan(size: BentoWidgetSize) {
  return BENTO_SIZE_MAP[size];
}

export function createWidgetId(type: BentoWidgetType, existingIds: string[]) {
  const prefix = `bento-${type}`;
  let max = 0;
  for (const id of existingIds) {
    if (!id.startsWith(prefix)) continue;
    const maybe = Number(id.split('-').at(-1));
    if (Number.isFinite(maybe)) {
      max = Math.max(max, maybe);
    }
  }
  return `${prefix}-${max + 1}`;
}

export function sanitizeUrlInput(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return { value: '', valid: false, reason: 'Add a valid URL.' };
  if (trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) {
    return { value: trimmed, valid: true };
  }
  const candidate = /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(candidate);
    if (!parsed.hostname) {
      return { value: candidate, valid: false, reason: 'URL is missing a hostname.' };
    }
    return { value: parsed.toString(), valid: true };
  } catch {
    return { value: candidate, valid: false, reason: 'URL format looks invalid.' };
  }
}

export function detectWidgetDefinitionFromInput(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const sanitized = sanitizeUrlInput(trimmed);
  if (!sanitized.valid) return null;
  const lower = sanitized.value.toLowerCase();
  if (lower.includes('youtube.com/watch') || lower.includes('youtu.be/')) {
    return getWidgetDefinition('youtube-video');
  }
  if (lower.includes('youtube.com/playlist')) {
    return getWidgetDefinition('youtube-playlist');
  }
  if (lower.includes('youtube.com/@') || lower.includes('youtube.com/channel/')) {
    return getWidgetDefinition('youtube-channel');
  }
  if (lower.includes('open.spotify.com/track')) {
    return getWidgetDefinition('spotify-song');
  }
  if (lower.includes('open.spotify.com/playlist')) {
    return getWidgetDefinition('spotify-playlist');
  }
  if (lower.includes('open.spotify.com/artist')) {
    return getWidgetDefinition('spotify-artist');
  }
  const socialMatch = SOCIAL_PLATFORMS.find((platform) => platform.domains.some((domain) => lower.includes(domain)));
  if (socialMatch) {
    return getWidgetDefinition(`social-${socialMatch.id}`);
  }
  if (lower.includes('calendly.com')) {
    return getWidgetDefinition('booking-contact');
  }
  if (lower.startsWith('mailto:')) {
    return getWidgetDefinition('email-contact');
  }
  if (lower.startsWith('tel:')) {
    return getWidgetDefinition('phone-contact');
  }
  return getWidgetDefinition('link');
}

export function getWidgetDefinition(id: string) {
  return BENTO_WIDGET_DEFINITIONS.find((definition) => definition.id === id) ?? null;
}

export function getDefinitionForWidget(widget: BentoBioWidget) {
  if (widget.platform) {
    return getWidgetDefinition(`social-${widget.platform}`);
  }
  if (widget.type === 'youtube') {
    return getWidgetDefinition(`youtube-${widget.kind === 'channel' ? 'channel' : widget.kind === 'playlist' ? 'playlist' : 'video'}`);
  }
  if (widget.type === 'spotify') {
    return getWidgetDefinition(`spotify-${widget.kind === 'playlist' ? 'playlist' : widget.kind === 'artist' ? 'artist' : 'song'}`);
  }
  if (widget.type === 'contact') {
    return getWidgetDefinition(`${widget.kind || 'email'}-contact`);
  }
  if (widget.type === 'text') {
    return getWidgetDefinition(`text-${widget.kind === 'quote' ? 'quote' : widget.kind === 'announcement' ? 'announcement' : 'heading'}`);
  }
  if (widget.type === 'gallery' && widget.imageUrl && widget.items?.length === 1) {
    return getWidgetDefinition('image-upload');
  }
  return getWidgetDefinition(widget.type);
}

export function searchWidgetDefinitions(query: string, category: BentoWidgetCategory | 'view_all') {
  const normalized = query.trim().toLowerCase();
  return BENTO_WIDGET_DEFINITIONS.filter((definition) => {
    const inCategory = category === 'view_all'
      ? true
      : category === 'suggested'
        ? Boolean(definition.suggested || definition.quickAdd)
        : definition.category === category;
    if (!inCategory) return false;
    if (!normalized) return true;
    return [definition.label, definition.description, definition.category, ...definition.keywords]
      .join(' ')
      .toLowerCase()
      .includes(normalized);
  });
}

function createContactHref(kind: BentoWidgetKind | undefined, rawValue: string | undefined) {
  if (!rawValue) return undefined;
  if (kind === 'email' && !rawValue.startsWith('mailto:')) return `mailto:${rawValue}`;
  if (kind === 'phone' && !rawValue.startsWith('tel:')) return `tel:${rawValue.replace(/\s+/g, '')}`;
  return sanitizeUrlInput(rawValue).value;
}

function normalizeItemsFromForm(input: string | undefined) {
  if (!input) return undefined;
  const items = input
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length ? items : undefined;
}

export function createWidgetFromDefinition(
  definition: BentoWidgetDefinition,
  values: Partial<Record<keyof BentoBioWidget | 'itemsText', string>>,
  existingWidgets: BentoBioWidget[],
): BentoBioWidget {
  const existingIds = existingWidgets.map((widget) => widget.id);
  const urlValue = values.url ? values.url.trim() : '';
  const sanitizedUrl = urlValue ? sanitizeUrlInput(urlValue) : null;
  const title = values.title?.trim() || definition.label;
  const subtitle = values.subtitle?.trim() || undefined;
  const resolvedSize = defaultSizeForDefinition(definition);
  const ctaLabel = values.ctaLabel?.trim() || defaultCtaForType(definition.type);
  const widget: BentoBioWidget = {
    id: createWidgetId(definition.type, existingIds),
    type: definition.type,
    size: resolvedSize,
    order: existingWidgets.length,
    visible: true,
    title,
    subtitle,
    description: values.description?.trim() || undefined,
    url:
      definition.type === 'contact'
        ? createContactHref(definition.kind, values.url)
        : sanitizedUrl?.valid
        ? sanitizedUrl.value
        : undefined,
    imageUrl: values.imageUrl?.trim() || undefined,
    thumbnailUrl: values.thumbnailUrl?.trim() || values.imageUrl?.trim() || undefined,
    platform: definition.platform,
    username: values.username?.trim() || undefined,
    price: values.price?.trim() || undefined,
    originalPrice: values.originalPrice?.trim() || undefined,
    badge: values.badge?.trim() || undefined,
    ctaLabel,
    kind: definition.kind || 'default',
    presentation: definition.presentation || defaultPresentationForType(definition.type, resolvedSize),
    items: normalizeItemsFromForm(values.itemsText),
    eventDate: values.eventDate?.trim() || undefined,
    eventTime: values.eventTime?.trim() || undefined,
    eventLocation: values.eventLocation?.trim() || undefined,
    alt: values.alt?.trim() || title,
    openInNewTab: true,
    layoutHint: {
      preferredRole: defaultRoleForDefinition(definition),
      preserveSlotOnReplace: true,
    },
  };
  if (definition.id === 'image-upload') {
    widget.items = values.imageUrl?.trim() ? [values.imageUrl.trim()] : DEFAULT_BENTO_CONFIG.boxes.find((item) => item.type === 'gallery')?.items;
    widget.imageUrl = values.imageUrl?.trim() || undefined;
    widget.thumbnailUrl = values.imageUrl?.trim() || undefined;
  }
  if (definition.type === 'gallery' && !widget.items) {
    widget.items = DEFAULT_BENTO_CONFIG.boxes.find((item) => item.type === 'gallery')?.items;
  }
  if (definition.type === 'social' && !widget.title && definition.platform) {
    widget.title = SOCIAL_PLATFORMS.find((item) => item.id === definition.platform)?.label;
  }
  return widget;
}

function getSlotSize(slot: BentoPatternSlot): BentoWidgetSize {
  if (slot.colSpan >= 4 && slot.rowSpan >= 2) return '4x2';
  if (slot.colSpan >= 4) return '4x1';
  if (slot.colSpan === 2 && slot.rowSpan >= 3) return '1x2';
  if (slot.colSpan === 2 && slot.rowSpan === 2) return '2x2';
  if (slot.colSpan === 2 && slot.rowSpan === 1) return '2x1';
  return '1x1';
}

function getWidgetRolePriority(widget: BentoBioWidget) {
  const preferredRole = widget.layoutHint?.preferredRole;
  if (preferredRole) {
    return {
      preferredRole,
      preferredSize: widget.size,
      priority: 100,
      flexibility: 0,
    };
  }

  if (widget.type === 'youtube' || widget.type === 'gallery') {
    return { preferredRole: 'hero' as const, preferredSize: '4x2' as const, priority: 95, flexibility: 3 };
  }
  if (widget.type === 'product') {
    return { preferredRole: 'hero' as const, preferredSize: '2x2' as const, priority: 88, flexibility: 3 };
  }
  if (widget.type === 'collection' || widget.type === 'form') {
    return { preferredRole: 'feature' as const, preferredSize: '2x2' as const, priority: 80, flexibility: 2 };
  }
  if (widget.type === 'spotify' || widget.type === 'event') {
    return { preferredRole: 'support' as const, preferredSize: '2x1' as const, priority: 70, flexibility: 2 };
  }
  if (widget.type === 'contact') {
    return {
      preferredRole: widget.kind === 'location' || widget.kind === 'booking' ? ('support' as const) : ('utility' as const),
      preferredSize: widget.kind === 'location' || widget.kind === 'booking' ? ('2x1' as const) : ('1x1' as const),
      priority: 66,
      flexibility: 2,
    };
  }
  if (widget.type === 'social') {
    return {
      preferredRole: widget.presentation === 'icon' ? ('compact' as const) : ('utility' as const),
      preferredSize: widget.presentation === 'icon' ? ('1x1' as const) : ('2x1' as const),
      priority: widget.presentation === 'icon' ? 40 : 48,
      flexibility: 1,
    };
  }
  if (widget.type === 'text') {
    return {
      preferredRole: widget.kind === 'announcement' || widget.kind === 'heading' ? ('banner' as const) : ('support' as const),
      preferredSize: widget.kind === 'quote' ? ('2x2' as const) : ('4x1' as const),
      priority: widget.kind === 'announcement' ? 76 : widget.kind === 'heading' ? 60 : 55,
      flexibility: 2,
    };
  }
  if (widget.type === 'link') {
    return {
      preferredRole: widget.badge ? ('banner' as const) : ('support' as const),
      preferredSize: widget.badge ? ('4x1' as const) : ('2x1' as const),
      priority: widget.badge ? 82 : 58,
      flexibility: 2,
    };
  }
  return { preferredRole: 'support' as const, preferredSize: widget.size, priority: 50, flexibility: 2 };
}

function getRoleCompatibility(role: BentoSlotRole) {
  switch (role) {
    case 'hero':
      return ['hero', 'feature', 'support'];
    case 'tall':
      return ['feature', 'support'];
    case 'feature':
      return ['feature', 'support', 'hero'];
    case 'compact':
      return ['compact', 'utility', 'support'];
    case 'utility':
      return ['utility', 'compact', 'support'];
    case 'banner':
      return ['banner', 'support', 'feature'];
    case 'support':
    default:
      return ['support', 'feature', 'banner', 'utility'];
  }
}

function selectPackedPattern(count: number) {
  if (count <= 0) return null;
  const exact = BENTO_PACKED_PATTERNS.find((pattern) => pattern.widgetCount === count);
  if (exact) return exact;
  if (count < 3) return BENTO_PACKED_PATTERNS[0];
  return BENTO_PACKED_PATTERNS[BENTO_PACKED_PATTERNS.length - 1];
}

function scoreWidgetForSlot(widget: BentoBioWidget, slot: BentoPatternSlot, assignedSlotId?: string) {
  const profile = getWidgetRolePriority(widget);
  const slotSize = getSlotSize(slot);
  let score = profile.priority;

  if (assignedSlotId && assignedSlotId === slot.id) score += 80;
  if (profile.preferredRole === slot.role) score += 42;
  if (getRoleCompatibility(slot.role).includes(profile.preferredRole)) score += 14;
  if (profile.preferredSize === slotSize) score += 18;
  if (widget.size === slotSize) score += 10;
  if (widget.type === 'social' && slot.role === 'compact' && widget.presentation === 'icon') score += 18;
  if (widget.type === 'contact' && slot.role === 'utility') score += 14;
  if (widget.type === 'text' && slot.role === 'banner') score += 16;
  if (widget.type === 'link' && slot.role === 'banner') score += 16;
  score -= profile.flexibility * Math.abs(slot.rowStart - 1);

  return score;
}

function assignWidgetsToPattern(
  widgets: BentoBioWidget[],
  pattern: BentoPattern,
  slotAssignments: Record<string, string>,
) {
  const visibleWidgets = widgets.filter((widget) => widget.visible).sort((a, b) => {
    const left = getWidgetRolePriority(a);
    const right = getWidgetRolePriority(b);
    if (right.priority !== left.priority) return right.priority - left.priority;
    return a.order - b.order;
  });
  const remainingSlots = [...pattern.slots];
  const placements: BentoPlacement[] = [];
  const nextAssignments: Record<string, string> = {};

  for (const widget of visibleWidgets) {
    const preferredSlotId = slotAssignments[widget.id];
    const scoredSlots = remainingSlots
      .map((slot) => ({ slot, score: scoreWidgetForSlot(widget, slot, preferredSlotId) }))
      .sort((left, right) => {
        if (right.score !== left.score) return right.score - left.score;
        if (left.slot.rowStart !== right.slot.rowStart) return left.slot.rowStart - right.slot.rowStart;
        return left.slot.colStart - right.slot.colStart;
      });

    const match = scoredSlots[0]?.slot;
    if (!match) continue;

    const size = getSlotSize(match);
    placements.push({
      id: widget.id,
      colStart: match.colStart,
      rowStart: match.rowStart,
      colSpan: match.colSpan,
      rowSpan: match.rowSpan,
    });
    nextAssignments[widget.id] = match.id;
    widget.size = size;
    remainingSlots.splice(
      remainingSlots.findIndex((slot) => slot.id === match.id),
      1,
    );
  }

  return { placements, slotAssignments: nextAssignments };
}

function buildFallbackPlacements(widgets: BentoBioWidget[]): BentoPlacementResult {
  const placements: BentoPlacement[] = [];
  const occupied = new Set<string>();
  const visibleWidgets = widgets.filter((widget) => widget.visible).sort((a, b) => a.order - b.order);

  const fits = (row: number, col: number, colSpan: number, rowSpan: number) => {
    if (col + colSpan - 1 > BENTO_GRID_COLUMNS) return false;
    for (let currentRow = row; currentRow < row + rowSpan; currentRow += 1) {
      for (let currentCol = col; currentCol < col + colSpan; currentCol += 1) {
        if (occupied.has(`${currentRow}:${currentCol}`)) return false;
      }
    }
    return true;
  };

  const reserve = (row: number, col: number, colSpan: number, rowSpan: number) => {
    for (let currentRow = row; currentRow < row + rowSpan; currentRow += 1) {
      for (let currentCol = col; currentCol < col + colSpan; currentCol += 1) {
        occupied.add(`${currentRow}:${currentCol}`);
      }
    }
  };

  let maxRow = 1;
  const slotAssignments: Record<string, string> = {};

  for (const widget of visibleWidgets) {
    const { colSpan, rowSpan } = sizeToSpan(widget.size);
    let placed = false;
    let row = 1;
    while (!placed) {
      for (let col = 1; col <= BENTO_GRID_COLUMNS; col += 1) {
        if (!fits(row, col, colSpan, rowSpan)) continue;
        reserve(row, col, colSpan, rowSpan);
        placements.push({ id: widget.id, colStart: col, rowStart: row, colSpan, rowSpan });
        slotAssignments[widget.id] = `fallback-${row}-${col}`;
        maxRow = Math.max(maxRow, row + rowSpan - 1);
        placed = true;
        break;
      }
      row += 1;
    }
  }

  return { placements, rowCount: maxRow, patternId: 'fallback-greedy', slotAssignments };
}

export function computeBentoPlacements(widgets: BentoBioWidget[], slotAssignments: Record<string, string> = {}): BentoPlacementResult {
  const visibleWidgets = widgets.filter((widget) => widget.visible);
  const pattern = selectPackedPattern(Math.min(Math.max(visibleWidgets.length, 3), 8));
  if (!pattern || visibleWidgets.length > pattern.slots.length || visibleWidgets.length < 3) {
    return buildFallbackPlacements(widgets);
  }

  const normalizedWidgets = widgets.map((widget) => ({ ...widget }));
  const assigned = assignWidgetsToPattern(normalizedWidgets, pattern, slotAssignments);
  if (assigned.placements.length !== visibleWidgets.length) {
    return buildFallbackPlacements(widgets);
  }

  return {
    placements: assigned.placements,
    rowCount: pattern.rowCount,
    patternId: pattern.id,
    slotAssignments: assigned.slotAssignments,
  };
}

export function normalizeWidgetOrder(widgets: BentoBioWidget[]) {
  return widgets.map((widget, index) => ({ ...widget, order: index }));
}

function syncWidgetSizesToPattern(widgets: BentoBioWidget[], assignments: Record<string, string>, patternId?: string) {
  const pattern = BENTO_PACKED_PATTERNS.find((item) => item.id === patternId) || selectPackedPattern(widgets.filter((widget) => widget.visible).length);
  if (!pattern) return widgets;
  const slots = new Map(pattern.slots.map((slot) => [slot.id, slot]));
  return widgets.map((widget) => {
    const slotId = assignments[widget.id];
    const slot = slotId ? slots.get(slotId) : null;
    if (!slot) return widget;
    return {
      ...widget,
      size: getSlotSize(slot),
    };
  });
}

export function moveWidget(
  widgets: BentoBioWidget[],
  draggedId: string,
  targetId: string,
  position: 'before' | 'after',
  slotAssignments: Record<string, string> = {},
) {
  const draggedSlot = slotAssignments[draggedId];
  const targetSlot = slotAssignments[targetId];
  if (draggedSlot && targetSlot) {
    const nextAssignments = { ...slotAssignments, [draggedId]: targetSlot, [targetId]: draggedSlot };
    return {
      widgets: syncWidgetSizesToPattern(normalizeWidgetOrder([...widgets]), nextAssignments),
      slotAssignments: nextAssignments,
    };
  }

  const next = [...widgets];
  const from = next.findIndex((widget) => widget.id === draggedId);
  const target = next.findIndex((widget) => widget.id === targetId);
  if (from === -1 || target === -1) return { widgets, slotAssignments };
  const [item] = next.splice(from, 1);
  const adjustedTarget = next.findIndex((widget) => widget.id === targetId);
  const insertIndex = position === 'before' ? adjustedTarget : adjustedTarget + 1;
  next.splice(insertIndex, 0, item);
  const normalized = normalizeWidgetOrder(next);
  const placements = computeBentoPlacements(normalized, slotAssignments);
  return {
    widgets: syncWidgetSizesToPattern(normalized, placements.slotAssignments, placements.patternId),
    slotAssignments: placements.slotAssignments,
  };
}

export function moveWidgetByStep(
  widgets: BentoBioWidget[],
  widgetId: string,
  direction: -1 | 1,
  slotAssignments: Record<string, string> = {},
) {
  const placements = computeBentoPlacements(widgets, slotAssignments);
  const ordered = placements.placements
    .slice()
    .sort((left, right) => {
      if (left.rowStart !== right.rowStart) return left.rowStart - right.rowStart;
      return left.colStart - right.colStart;
    })
    .map((placement) => placement.id);
  const current = ordered.findIndex((id) => id === widgetId);
  const nextIndex = current + direction;
  if (current === -1 || nextIndex < 0 || nextIndex >= ordered.length) return { widgets, slotAssignments: placements.slotAssignments };
  return moveWidget(widgets, widgetId, ordered[nextIndex], direction < 0 ? 'before' : 'after', placements.slotAssignments);
}

export function duplicateWidget(
  widgets: BentoBioWidget[],
  widgetId: string,
  slotAssignments: Record<string, string> = {},
) {
  const current = widgets.find((widget) => widget.id === widgetId);
  if (!current) return { widgets, slotAssignments };
  const copyId = createWidgetId(current.type, widgets.map((widget) => widget.id));
  const copy: BentoBioWidget = {
    ...current,
    id: copyId,
    order: current.order + 1,
    title: current.title ? `${current.title} Copy` : current.title,
  };
  const targetIndex = widgets.findIndex((widget) => widget.id === widgetId);
  const next = [...widgets];
  next.splice(targetIndex + 1, 0, copy);
  const normalized = normalizeWidgetOrder(next);
  const nextAssignments = { ...slotAssignments };
  const sourceSlot = slotAssignments[widgetId];
  if (sourceSlot) {
    delete nextAssignments[widgetId];
    nextAssignments[widgetId] = sourceSlot;
  }
  const placements = computeBentoPlacements(normalized, nextAssignments);
  return {
    widgets: syncWidgetSizesToPattern(normalized, placements.slotAssignments, placements.patternId),
    slotAssignments: placements.slotAssignments,
  };
}

export function removeWidget(
  widgets: BentoBioWidget[],
  widgetId: string,
  slotAssignments: Record<string, string> = {},
) {
  const normalized = normalizeWidgetOrder(widgets.filter((widget) => widget.id !== widgetId));
  const nextAssignments = { ...slotAssignments };
  delete nextAssignments[widgetId];
  const placements = computeBentoPlacements(normalized, nextAssignments);
  return {
    widgets: syncWidgetSizesToPattern(normalized, placements.slotAssignments, placements.patternId),
    slotAssignments: placements.slotAssignments,
  };
}

export function toggleWidgetVisibility(
  widgets: BentoBioWidget[],
  widgetId: string,
  slotAssignments: Record<string, string> = {},
) {
  const nextWidgets = widgets.map((widget) => (widget.id === widgetId ? { ...widget, visible: !widget.visible } : widget));
  const placements = computeBentoPlacements(nextWidgets, slotAssignments);
  return {
    widgets: syncWidgetSizesToPattern(nextWidgets, placements.slotAssignments, placements.patternId),
    slotAssignments: placements.slotAssignments,
  };
}

export function updateWidget(
  widgets: BentoBioWidget[],
  widgetId: string,
  patch: Partial<BentoBioWidget>,
  slotAssignments: Record<string, string> = {},
) {
  const nextWidgets = widgets.map((widget) => (widget.id === widgetId ? { ...widget, ...patch } : widget));
  const placements = computeBentoPlacements(nextWidgets, slotAssignments);
  return {
    widgets: syncWidgetSizesToPattern(nextWidgets, placements.slotAssignments, placements.patternId),
    slotAssignments: placements.slotAssignments,
  };
}

export function replaceWidget(
  widgets: BentoBioWidget[],
  widgetId: string,
  nextWidget: BentoBioWidget,
  slotAssignments: Record<string, string> = {},
) {
  const current = widgets.find((widget) => widget.id === widgetId);
  if (!current) return { widgets, slotAssignments };
  const existingSlot = slotAssignments[widgetId];
  const preservedSize = current.layoutHint?.preserveSlotOnReplace !== false ? current.size : nextWidget.size;
  const replaced = widgets.map((widget) =>
    widget.id === widgetId
      ? {
          ...nextWidget,
          id: current.id,
          order: current.order,
          size: preservedSize,
          visible: current.visible,
          layoutHint: {
            preferredRole: current.layoutHint?.preferredRole || nextWidget.layoutHint?.preferredRole,
            preserveSlotOnReplace: true,
          },
        }
      : widget,
  );
  const nextAssignments = { ...slotAssignments };
  if (existingSlot) {
    nextAssignments[current.id] = existingSlot;
  }
  const normalized = normalizeWidgetOrder(replaced);
  const placements = computeBentoPlacements(normalized, nextAssignments);
  return {
    widgets: syncWidgetSizesToPattern(normalized, placements.slotAssignments, placements.patternId),
    slotAssignments: placements.slotAssignments,
  };
}

export function suggestInsertIndex(widgets: BentoBioWidget[], widget: BentoBioWidget) {
  const visibleWidgets = widgets.filter((item) => item.visible);
  if (widget.type === 'social') {
    const lastSocial = visibleWidgets.map((item) => item.type).lastIndexOf('social');
    if (lastSocial >= 0) return lastSocial + 1;
  }
  if (widget.type === 'contact') {
    const firstProduct = visibleWidgets.findIndex((item) => item.type === 'product');
    if (firstProduct >= 0) return firstProduct;
  }
  if (widget.type === 'youtube' || widget.type === 'gallery' || widget.type === 'spotify') {
    return Math.min(2, widgets.length);
  }
  return widgets.length;
}

export function insertWidget(
  widgets: BentoBioWidget[],
  widget: BentoBioWidget,
  slotAssignments: Record<string, string> = {},
) {
  const index = suggestInsertIndex(widgets, widget);
  const next = [...widgets];
  next.splice(index, 0, widget);
  const normalized = normalizeWidgetOrder(next);
  const placements = computeBentoPlacements(normalized, slotAssignments);
  return {
    widgets: syncWidgetSizesToPattern(normalized, placements.slotAssignments, placements.patternId),
    slotAssignments: placements.slotAssignments,
  };
}

export function applyPresetToWidgets(widgets: BentoBioWidget[], presetId: BentoBioPresetId) {
  const ordered = normalizeWidgetOrder([...widgets]);
  const byType = (type: BentoWidgetType) => ordered.filter((widget) => widget.type === type);
  const map = new Map<string, BentoWidgetSize>();

  if (presetId === 'creator') {
    const firstYouTube = byType('youtube')[0];
    const firstGallery = byType('gallery')[0];
    if (firstYouTube) map.set(firstYouTube.id, '2x2');
    if (firstGallery) map.set(firstGallery.id, '2x2');
    byType('link').forEach((widget, index) => map.set(widget.id, index === 0 ? '4x1' : '2x1'));
    byType('social').forEach((widget, index) => map.set(widget.id, index === 0 ? '1x1' : '2x1'));
  }
  if (presetId === 'business') {
    byType('contact').forEach((widget, index) => map.set(widget.id, index < 2 ? '2x1' : '4x1'));
    byType('product').forEach((widget) => map.set(widget.id, '2x2'));
    byType('link').forEach((widget, index) => map.set(widget.id, index === 0 ? '4x1' : '2x1'));
  }
  if (presetId === 'influencer') {
    const firstYouTube = byType('youtube')[0];
    const firstGallery = byType('gallery')[0];
    if (firstYouTube) map.set(firstYouTube.id, '4x2');
    if (firstGallery) map.set(firstGallery.id, '4x2');
    byType('social').forEach((widget) => map.set(widget.id, '1x1'));
  }
  if (presetId === 'minimal') {
    ordered.forEach((widget) => {
      if (widget.type === 'social') map.set(widget.id, '1x1');
      if (widget.type === 'link' || widget.type === 'text' || widget.type === 'contact') map.set(widget.id, '4x1');
    });
  }

  return ordered.map((widget) => ({ ...widget, size: map.get(widget.id) || widget.size }));
}

function defaultSizeForType(type: BentoWidgetType) {
  switch (type) {
    case 'social':
      return '2x1';
    case 'youtube':
    case 'gallery':
      return '4x2';
    case 'spotify':
    case 'product':
    case 'event':
    case 'form':
    case 'collection':
      return '2x2';
    case 'contact':
      return '2x1';
    case 'text':
    case 'link':
    default:
      return '4x1';
  }
}

function defaultSizeForDefinition(definition: BentoWidgetDefinition): BentoWidgetSize {
  if (definition.id === 'image-upload') return '2x2';
  if (definition.type === 'social') return definition.presentation === 'icon' ? '1x1' : '2x1';
  if (definition.type === 'youtube') return definition.kind === 'video' ? '4x2' : '2x2';
  if (definition.type === 'gallery') return definition.id === 'image-gallery' ? '2x2' : '2x2';
  if (definition.type === 'spotify' || definition.type === 'product' || definition.type === 'event' || definition.type === 'form' || definition.type === 'collection') return '2x2';
  if (definition.type === 'contact') return definition.kind === 'booking' || definition.kind === 'location' ? '4x1' : '2x1';
  if (definition.type === 'text' || definition.type === 'link') return '4x1';
  return definition.defaultSize;
}

function defaultRoleForDefinition(definition: BentoWidgetDefinition): BentoSlotRole {
  if (definition.type === 'youtube' || definition.id === 'image-upload') return definition.kind === 'video' ? 'hero' : 'feature';
  if (definition.type === 'gallery' || definition.type === 'product' || definition.type === 'spotify' || definition.type === 'collection' || definition.type === 'form' || definition.type === 'event') return 'feature';
  if (definition.type === 'text' || definition.type === 'link') return definition.kind === 'announcement' || definition.kind === 'heading' ? 'banner' : 'support';
  if (definition.type === 'contact') return definition.kind === 'booking' || definition.kind === 'location' ? 'support' : 'utility';
  if (definition.type === 'social') return definition.presentation === 'icon' ? 'compact' : 'utility';
  return 'support';
}

function defaultPresentationForType(type: BentoWidgetType, size: BentoWidgetSize): BentoWidgetPresentation {
  if (type === 'social') {
    return size === '1x1' ? 'icon' : 'label';
  }
  if (type === 'gallery') return 'gallery';
  if (type === 'collection' || type === 'social_group') return 'list';
  return 'card';
}

function defaultCtaForType(type: BentoWidgetType) {
  switch (type) {
    case 'product':
      return 'View product';
    case 'youtube':
      return 'Watch';
    case 'spotify':
      return 'Listen';
    case 'contact':
      return 'Contact';
    case 'form':
      return 'Open form';
    default:
      return 'Open';
  }
}

function normalizeLegacyWidget(input: Record<string, unknown>, index: number): BentoBioWidget {
  const type = stringValue(input.type);
  const legacyVariant = stringValue(input.variant);
  const visible = !booleanValue(input.isHidden, false);
  if (type === 'link_card') {
    return {
      id: stringValue(input.id) || `bento-link-${index + 1}`,
      type: 'link',
      title: stringValue(input.title) || 'Link',
      subtitle: stringValue(input.subtitle),
      url: stringValue(input.url),
      badge: stringValue(input.badge),
      ctaLabel: stringValue(input.btnText) || 'Open',
      size: legacyVariant === 'featured' ? '4x1' : '2x1',
      order: index,
      visible,
      kind: 'default',
      presentation: 'card',
    };
  }
  if (type === 'media_card') {
    return {
      id: stringValue(input.id) || `bento-youtube-${index + 1}`,
      type: 'youtube',
      title: stringValue(input.title) || 'Featured media',
      subtitle: stringValue(input.subtitle),
      url: stringValue(input.url),
      thumbnailUrl: stringValue(input.image),
      size: '2x2',
      order: index,
      visible,
      kind: 'video',
      ctaLabel: stringValue(input.btnText) || 'Watch',
      presentation: 'card',
    };
  }
  if (type === 'product_card') {
    return {
      id: stringValue(input.id) || `bento-product-${index + 1}`,
      type: 'product',
      title: stringValue(input.title) || 'Product',
      subtitle: stringValue(input.subtitle),
      url: stringValue(input.url),
      imageUrl: stringValue(input.image),
      price: stringValue(input.price),
      badge: stringValue(input.badge),
      ctaLabel: stringValue(input.btnText) || 'View product',
      size: '2x2',
      order: index,
      visible,
      kind: 'default',
      presentation: 'card',
    };
  }
  if (type === 'music_card') {
    return {
      id: stringValue(input.id) || `bento-spotify-${index + 1}`,
      type: 'spotify',
      title: stringValue(input.title) || 'Now playing',
      subtitle: stringValue(input.artist) || stringValue(input.subtitle),
      url: stringValue(input.url),
      imageUrl: stringValue(input.image),
      ctaLabel: stringValue(input.btnText) || 'Listen',
      size: '2x2',
      order: index,
      visible,
      kind: 'song',
      presentation: 'card',
    };
  }
  if (type === 'social_card') {
    return {
      id: stringValue(input.id) || `bento-social-group-${index + 1}`,
      type: 'social_group',
      title: stringValue(input.title) || 'Social links',
      subtitle: stringValue(input.subtitle),
      size: '2x2',
      order: index,
      visible,
      presentation: 'list',
      items: [],
    };
  }
  if (type === 'announcement_card') {
    return {
      id: stringValue(input.id) || `bento-text-${index + 1}`,
      type: 'text',
      title: stringValue(input.title) || 'Announcement',
      subtitle: stringValue(input.subtitle),
      badge: stringValue(input.badge),
      url: stringValue(input.url),
      ctaLabel: stringValue(input.btnText) || 'Open',
      size: '4x1',
      order: index,
      visible,
      kind: 'announcement',
      presentation: 'card',
    };
  }
  if (type === 'utility_card') {
    return {
      id: stringValue(input.id) || `bento-contact-${index + 1}`,
      type: 'contact',
      title: stringValue(input.title) || 'Contact',
      subtitle: stringValue(input.subtitle),
      url: stringValue(input.url),
      badge: stringValue(input.badge),
      ctaLabel: stringValue(input.btnText) || 'Contact',
      size: '2x1',
      order: index,
      visible,
      kind: 'email',
      presentation: 'card',
    };
  }
  if (type === 'quote_card') {
    return {
      id: stringValue(input.id) || `bento-quote-${index + 1}`,
      type: 'text',
      title: stringValue(input.quoteText) || stringValue(input.title) || 'Quote',
      subtitle: stringValue(input.author),
      size: '2x2',
      order: index,
      visible,
      kind: 'quote',
      presentation: 'card',
    };
  }
  if (type === 'stats_card') {
    const stat1Num = stringValue(input.stat1Num);
    const stat1Label = stringValue(input.stat1Label);
    const stat2Num = stringValue(input.stat2Num);
    const stat2Label = stringValue(input.stat2Label);
    return {
      id: stringValue(input.id) || `bento-collection-${index + 1}`,
      type: 'collection',
      title: stringValue(input.title) || 'Highlights',
      items: [stat1Num && stat1Label ? `${stat1Num} ${stat1Label}` : '', stat2Num && stat2Label ? `${stat2Num} ${stat2Label}` : ''].filter(Boolean),
      size: '2x2',
      order: index,
      visible,
      presentation: 'list',
    };
  }
  return {
    id: stringValue(input.id) || `bento-link-${index + 1}`,
    type: 'link',
    title: stringValue(input.title) || 'Link',
    subtitle: stringValue(input.subtitle),
    url: stringValue(input.url),
    size: defaultSizeForType('link'),
    order: index,
    visible,
    ctaLabel: stringValue(input.btnText) || 'Open',
  };
}

function normalizeWidget(input: unknown, index: number): BentoBioWidget {
  if (!isRecord(input)) {
    return { ...DEFAULT_BENTO_BOXES[index % DEFAULT_BENTO_BOXES.length], order: index };
  }
  if (typeof input.order === 'number' && typeof input.size === 'string' && typeof input.visible === 'boolean') {
    return {
      id: stringValue(input.id) || createWidgetId('link', []),
      type: (stringValue(input.type) as BentoWidgetType) || 'link',
      size: (stringValue(input.size) as BentoWidgetSize) || defaultSizeForType((stringValue(input.type) as BentoWidgetType) || 'link'),
      order: input.order,
      visible: input.visible,
      title: stringValue(input.title),
      subtitle: stringValue(input.subtitle),
      description: stringValue(input.description),
      url: stringValue(input.url),
      label: stringValue(input.label),
      imageUrl: stringValue(input.imageUrl),
      alt: stringValue(input.alt),
      thumbnailUrl: stringValue(input.thumbnailUrl),
      platform: stringValue(input.platform) as SocialPlatformId | undefined,
      username: stringValue(input.username),
      price: stringValue(input.price),
      originalPrice: stringValue(input.originalPrice),
      badge: stringValue(input.badge),
      ctaLabel: stringValue(input.ctaLabel),
      kind: (stringValue(input.kind) as BentoWidgetKind) || 'default',
      presentation: (stringValue(input.presentation) as BentoWidgetPresentation) || defaultPresentationForType((stringValue(input.type) as BentoWidgetType) || 'link', (stringValue(input.size) as BentoWidgetSize) || '4x1'),
      items: arrayValue(input.items),
      eventDate: stringValue(input.eventDate),
      eventTime: stringValue(input.eventTime),
      eventLocation: stringValue(input.eventLocation),
      countdownLabel: stringValue(input.countdownLabel),
      openInNewTab: booleanValue(input.openInNewTab, true),
      layoutHint: isRecord(input.layoutHint)
        ? {
            preferredRole: stringValue(input.layoutHint.preferredRole) as BentoSlotRole | undefined,
            preserveSlotOnReplace: typeof input.layoutHint.preserveSlotOnReplace === 'boolean' ? input.layoutHint.preserveSlotOnReplace : undefined,
          }
        : undefined,
    };
  }
  return normalizeLegacyWidget(input, index);
}

export function normalizeBentoConfig(input: unknown): BentoBioConfig {
  const raw = isRecord(input) ? input : {};
  const rawBoxes = Array.isArray(raw.boxes) ? raw.boxes : Array.isArray(raw.widgets) ? raw.widgets : [];
  const normalizedBoxes = rawBoxes.length
    ? normalizeWidgetOrder(rawBoxes.map((box, index) => normalizeWidget(box, index)))
    : DEFAULT_BENTO_BOXES;
  const socialsSource = isRecord(raw.socials) ? raw.socials : isRecord(raw.socialLinks) ? raw.socialLinks : {};
  const compositionSource = isRecord(raw.composition) ? raw.composition : {};
  const socials = Object.fromEntries(
    SOCIAL_PLATFORMS.map((platform) => [platform.id, stringValue(socialsSource[platform.id])]).filter((entry): entry is [SocialPlatformId, string] => Boolean(entry[1])),
  ) as Partial<Record<SocialPlatformId, string>>;
  const slotAssignments = isRecord(compositionSource.slotAssignments)
    ? Object.fromEntries(
        Object.entries(compositionSource.slotAssignments)
          .filter((entry): entry is [string, string] => typeof entry[0] === 'string' && typeof entry[1] === 'string'),
      )
    : {};
  const initialConfig: BentoBioConfig = {
    presetGradient: (stringValue(raw.presetGradient) as BentoBioPresetId) || DEFAULT_BENTO_CONFIG.presetGradient,
    boxStyle: (stringValue(raw.boxStyle) as BentoBioConfig['boxStyle']) || DEFAULT_BENTO_CONFIG.boxStyle,
    profileVariant: (stringValue(raw.profileVariant) as BentoBioConfig['profileVariant']) || DEFAULT_BENTO_CONFIG.profileVariant,
    showVerified: booleanValue(raw.showVerified, DEFAULT_BENTO_CONFIG.showVerified),
    showLocation: booleanValue(raw.showLocation, DEFAULT_BENTO_CONFIG.showLocation),
    showWebsite: booleanValue(raw.showWebsite, DEFAULT_BENTO_CONFIG.showWebsite),
    location: stringValue(raw.location) || DEFAULT_BENTO_CONFIG.location,
    websiteLabel: stringValue(raw.websiteLabel) || DEFAULT_BENTO_CONFIG.websiteLabel,
    websiteUrl: stringValue(raw.websiteUrl) || DEFAULT_BENTO_CONFIG.websiteUrl,
    primaryActionLabel: stringValue(raw.primaryActionLabel) || DEFAULT_BENTO_CONFIG.primaryActionLabel,
    primaryActionHref: stringValue(raw.primaryActionHref) || DEFAULT_BENTO_CONFIG.primaryActionHref,
    socials: { ...DEFAULT_BENTO_CONFIG.socials, ...socials },
    boxes: normalizedBoxes,
    composition: {
      version: 1,
      strategy: 'packed-patterns',
      patternId: stringValue(compositionSource.patternId) || undefined,
      slotAssignments,
    },
  };
  const placements = computeBentoPlacements(initialConfig.boxes, initialConfig.composition.slotAssignments);

  return {
    ...initialConfig,
    boxes: syncWidgetSizesToPattern(initialConfig.boxes, placements.slotAssignments, placements.patternId),
    composition: {
      version: 1,
      strategy: 'packed-patterns',
      patternId: placements.patternId,
      slotAssignments: placements.slotAssignments,
    },
  };
}
