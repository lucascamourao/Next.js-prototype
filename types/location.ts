export interface Location {
  id: string;
  name: string;
  description: string;
  type: string;
  lat: number;
  lng: number;
}

export interface CreateLocationDto {
  name: string;
  description: string;
  type: string;
  lat: number;
  lng: number;
}