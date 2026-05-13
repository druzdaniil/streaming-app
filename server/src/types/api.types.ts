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

export interface ContentQuery {
   search?: string;
   genre_id?: string;
}

export interface CreateReviewBody {
   text: string;
   rating: number;
}

export interface ActivateSubscriptionBody {
   subscription_id: number;
}
