export interface Trip {
  id: number;
  date_start: Date;
  date_end: Date;
  localisation: string;
  description: string;
  url_image: string;
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
}
