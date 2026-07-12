export interface Location {
  id: number;
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
}