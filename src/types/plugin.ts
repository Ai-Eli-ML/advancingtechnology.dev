export interface Plugin {
  id: string;
  name: string;
  tagline: string;
  price: number;
  coverImage?: string;
  rating: number;
  categories: string[];
  reviewCount?: number;
  downloads?: number;
  activeUsers?: number;
  verified?: boolean;
}