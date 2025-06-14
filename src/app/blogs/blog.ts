export interface BlogAuthor {
  name: string;
  socials: any | null;
}

export interface Blog {
  id: number;
  title: string;
  authors: BlogAuthor[];
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: any[];
  events: any[];
}

export interface BlogsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Blog[];
}
