export interface ISearchArticle {
  author_id: number;
  body: string;
  comments_disabled: boolean;
  created_at: Date;
  draft: boolean;
  html_url: string;
  id: number;
  locale: string;
  name: string;
  outdated: boolean;
  position: number;
  promoted: boolean;
  result_type: string;
  section_id: number;
  source_locale: string;
  title: string;
  updated_at: Date;
  url: string;
  vote_count: number;
  vote_sum: number;
}
