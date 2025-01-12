export class HouseOutputDto {
  title: string;
  description: string;
  location: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  images: string[];
  host: string;
  createdAt: Date;
}
