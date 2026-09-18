export type Locale = 'om' | 'en' | 'ar';

export type UserRole = 
  | 'SUPER_ADMIN'
  | 'CEO_OWNER'
  | 'EDITOR_IN_CHIEF'
  | 'EDITOR'
  | 'REPORTER'
  | 'PHOTOGRAPHER_MEDIA'
  | 'SOCIAL_MEDIA_MANAGER'
  | 'MEMBERSHIP_MANAGER'
  | 'ADVERTISEMENT_MANAGER'
  | 'ANALYST';

export interface ImageSlotMeta {
  url?: string;
  alt: string;
  caption: string;
  credit: string;
  source: string;
}

export interface Article {
  id: string;
  slug: string;
  category: string;
  headline: string;
  subtitle: string;
  featuredImage: ImageSlotMeta;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  updatedAt: string;
  content: string;
  tags: string[];
  isBreaking?: boolean;
  isFeatured?: boolean;
  language: Locale;
  status: 'DRAFT' | 'EDITOR_REVIEW' | 'CORRECTION' | 'PUBLISHED';
  reactions: {
    like: number;
    love: number;
    insightful: number;
    respect: number;
  };
  views: number;
}

export interface ScholarProfile {
  id: string;
  name: string;
  era: string;
  title: string;
  bio: string;
  photo?: ImageSlotMeta;
  keyContributions: string[];
}

export interface PodcastEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  guest: string;
  host: string;
  description: string;
  date: string;
  audioUrl?: string;
  videoUrl?: string;
  youtubeId?: string;
  duration: string;
  coverImage: ImageSlotMeta;
}

export interface VideoItem {
  id: string;
  title: string;
  category: 'Latest Videos' | 'Islamic Videos' | 'News Videos' | 'Interviews' | 'Aalam Podcast (video)' | 'Short Videos';
  videoUrl?: string;
  youtubeEmbed?: string;
  tiktokEmbed?: string;
  facebookEmbed?: string;
  thumbnail: ImageSlotMeta;
  publishedAt: string;
  duration: string;
}

export interface AudioItem {
  id: string;
  title: string;
  category: 'News Audio' | 'Islamic Lectures' | 'Podcast Audio' | 'Qur’anic Recitation';
  speaker: string;
  audioUrl: string;
  duration: string;
  publishedAt: string;
}

export interface PhotoAlbum {
  id: string;
  title: string;
  event: string;
  date: string;
  location: string;
  caption: string;
  photographer: string;
  category: string;
  coverImage: ImageSlotMeta;
  photos: ImageSlotMeta[];
}

export interface HegereStory {
  id: string;
  title: string;
  destination: string;
  date: string;
  summary: string;
  founderNotes: string;
  coverImage: ImageSlotMeta;
  gallery: ImageSlotMeta[];
}

export interface MemberRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  preferredLanguage: string;
  membershipType: 'Regular Member' | 'Volunteer' | 'Media Contributor' | 'Supporting Member' | 'Professional Member';
  areaOfInterest: string;
  message: string;
  status: 'ACTIVE' | 'PENDING' | 'REJECTED';
  createdAt: string;
}

export interface Advertisement {
  id: string;
  advertiserName: string;
  placement: 'Homepage' | 'Article' | 'Category' | 'Mobile' | 'Desktop';
  image: ImageSlotMeta;
  link: string;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'PAUSED' | 'EXPIRED';
  impressions: number;
  clicks: number;
}

export interface ErrorReport {
  id: string;
  articleId: string;
  articleTitle: string;
  reporterName: string;
  reporterEmail: string;
  details: string;
  status: 'PENDING' | 'RESOLVED';
  createdAt: string;
}

export interface CommentItem {
  id: string;
  articleId: string;
  name: string;
  email: string;
  content: string;
  createdAt: string;
  isApproved: boolean;
}
