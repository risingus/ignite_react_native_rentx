
interface Photos {
  id: string;
  car_id: string;
  photo: string;
}

export interface CarDTO {
    id: string;
    brand: string;
    name: string;
    about: string
    period: string;
    price: number;
    fuel_type: string
    thumbnail: string;
    accessories: {
      type: string;
      name: string;
    }[];
    photos: Photos[];
}