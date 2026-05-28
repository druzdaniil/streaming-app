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
   genres: string[];
   directors: string[];
   actors: string[];
}

export interface FilmDetail extends ContentWithMeta {
   duration: number | null;
   video_url: string | null;
}

export interface Episode {
   episode_id: number;
   season_id: number;
   episode_number: number;
   title: string;
   duration: number | null;
   video_url: string | null;
}

export interface Season {
   season_id: number;
   series_id: number;
   season_number: number;
   title: string | null;
   episodes: Episode[];
}

export interface SeriesDetail extends ContentWithMeta {
   seasons: Season[];
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

export interface AuthResponse {
   token: string;
   user: UserPublic;
}

export interface RegisterBody {
   first_name: string;
   last_name: string;
   email: string;
   password: string;
}

export interface LoginBody {
   email: string;
   password: string;
}

export interface Subscription {
   subscription_id: number;
   type: string;
   price: number;
}

export interface SubscriptionStatus {
   subscription_type: string | null;
   subscription_id: number | null;
   expires_at: string | null;
}

export interface ReviewPublic {
   review_id: number;
   user_id: number;
   content_id: number;
   text: string;
   rating: number;
   created_at: string;
   first_name: string;
   last_name: string;
}

export interface CreateReviewBody {
   text: string;
   rating: number;
}

export interface Genre {
   genre_id: number;
   name: string;
}

export interface ApiError {
   error: string;
}

export interface AppState {
   user: UserPublic | null;
   isAuthChecked: boolean;
}
