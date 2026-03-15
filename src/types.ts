export interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  avgPrice: number;
  distance: number; // in minutes (walking)
  lat: number;
  lng: number;
  image: string;
  isStudentFriendly: boolean; // avgPrice < 15
  tags: string[];
  description: string;
  hotness: number; // current check-in count
  waitTime: string;
  crowdedness: 'low' | 'medium' | 'high';
  isFavorited?: boolean;
}

export interface Review {
  id: string;
  restaurantId: string;
  userName: string;
  userSchool: string;
  isFromThisSchool: boolean;
  rating: number;
  content: string;
  date: string;
  images?: string[];
}

export interface Dish {
  id: string;
  restaurantId: string;
  name: string;
  price: number;
  image: string;
}

export type Page = 'map' | 'recommend' | 'search' | 'profile' | 'detail';
