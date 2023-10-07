export interface User {
  id: number | null;
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
  id: number;
  date_start: string;
  date_end: string;
  localisation: string;
  description: string;
  url_image: string;
  alt_image: string;
  user_id: number;
  members: Member[];
  links: Proposition[];
}

export interface Member {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface Proposition {
  id: number;
  description: string;
  url: string;
  localisation: string;
  trip_id: number;
  title: string;
  image: string;
  alt_image: string;
  user_id: number;
}

export interface Link {
  title: string;
  url: string;
  image: string;
}
