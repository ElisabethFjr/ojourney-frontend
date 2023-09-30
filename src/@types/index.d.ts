export interface Trip {
  id: number;
  date_start: string;
  date_end: string;
  localisation: string;
  description: string;
  url_image: string;
  alt_image: string;
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
}

export interface Link {
  title: string;
  url: string;
  image: string;
}
