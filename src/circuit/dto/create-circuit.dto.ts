export class CreateCircuitDto {
  name: string;
  location: string;
  distance: number;
  layoutImageUrl: string;
}

export class UpdateCircuitDto {
  name?: string;
  location?: string;
  distance?: number;
  layoutImageUrl?: string;
}
