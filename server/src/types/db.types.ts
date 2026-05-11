export interface Content {
   content_id: number;
   content_type: "film" | "series";
   title: string;
   release_year: number;
   description: string | null;
   rating: number;
   poster_url: string | null;
}

export interface ContentWithMeta extends Content {
   genres: string | null;
   directors: string | null;
   actors: string | null;
}

export interface FilmDetail extends ContentWithMeta {
   duration: number | null;
   video_url: string | null;
}

export interface SeriesDetail extends ContentWithMeta {
   seasons: Season[];
}

export interface Season {
   season_id: number;
   series_id: number;
   season_number: number;
   title: string | null;
   episodes: Episode[];
}

export interface Episode {
   episode_id: number;
   season_id: number;
   episode_number: number;
   title: string;
   duration: number | null;
   video_url: string | null;
}

export interface User {
   user_id: number;
   first_name: string;
   last_name: string;
   email: string;
   password_hash: string;
   created_at: string;
   subscription_id: number | null;
}

export interface UserPublic {
   user_id: number;
   first_name: string;
   last_name: string;
   email: string;
   created_at: string;
   subscription_id: number | null;
   subscription_type: string | null;
}

export interface Subscription {
   subscription_id: number;
   type: string;
   price: number;
}

export interface Transaction {
   transaction_id: number;
   user_id: number;
   subscription_id: number;
   started_at: string;
   expires_at: string;
   status: "active" | "expired";
}

export interface Review {
   review_id: number;
   user_id: number;
   content_id: number;
   text: string;
   rating: number;
   created_at: string;
}

export interface ReviewPublic extends Review {
   first_name: string;
   last_name: string;
}

export interface Genre {
   genre_id: number;
   name: string;
}

export interface Actor {
   actor_id: number;
   full_name: string;
   biography: string | null;
}

export interface Director {
   director_id: number;
   full_name: string;
   biography: string | null;
}
