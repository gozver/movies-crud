export interface Actor {
  id?: number;
  first_name: string;
  last_name: string;
  gender: 'M' | 'F';
  bornCity: string;
  birthdate?: string;
  img: string;
  rating: number;
  movies?: number[];
}