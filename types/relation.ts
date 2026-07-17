export interface Relation {
  id: string;
  name: string;
  sourceId: Location;
  targetId: Location;
}

export interface CreateRelationDto {
  name: string;
  sourceId: Location;
  targetId: Location;
}
