export interface User {
  id: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  password: string | null;
  trips: Trip[] | null;
  links: Proposition[] | null;
  consent_newsletter: boolean;
  consent_commercial: boolean;
}

export interface Trip {
  id: string;
  date_start: string;
  date_end: string;
  localisation: string;
  lat: number;
  lon: number;
  description: string;
  url_image: string;
  alt_image: string;
  user_id: string;
  links: Proposition[];
  members: Member[];
}

export interface Member {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface Proposition {
  id: string;
  description: string;
  url: string;
  localisation: string;
  trip_id: string;
  user_id: string;
  title: string;
  lat: number;
  lon: number;
  image: string;
  alt_image: string;
  likes: string[];
  total_likes: number;
}

export interface Link {
  title: string;
  url: string;
  image: string;
}

export interface Suggestion {
  line1: string;
  line2: string;
}
