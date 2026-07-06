export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  created_at: string;
}

export interface Download {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string;
  category_id: string;
  category_name: string;
  category_slug: string;
  download_url: string;
  version: string;
  file_size: string;
  download_count: number;
  image_url: string;
  featured: boolean;
  developer: string;
  platform: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  download_id: string;
  user_id: string;
  user_email: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Newsletter {
  id: string;
  email: string;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  download_id: string;
  created_at: string;
}

export interface Stats {
  total_downloads: number;
  total_categories: number;
  total_reviews: number;
  total_subscribers: number;
  total_download_count: number;
}
