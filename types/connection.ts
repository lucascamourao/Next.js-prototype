export interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
}

export interface CreateConnectionDto {
  sourceId: string;
  targetId: string;
}
