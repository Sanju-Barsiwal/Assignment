export interface Ingredient {
  id: string;
  name: string;
  image: string;
  x: number;
  y: number;
  calories: number;
  protein: number;
  carbs: number;
  price: number;
  quantity: number;
  allergens?: string[];
  substitutions?: string[];
  canRemove?: boolean;
}

export interface Hotspot {
  id: string;
  ingredientId: string;
  x: number;
  y: number;
}

export interface Media {
  type: 'image' | 'video';
  url: string;
  duration: number;
  hotspots: Hotspot[];
}

export interface DishStory {
  id: string;
  restaurantId: string;
  restaurantName: string;
  dishName: string;
  price: number;
  basePrice: number;
  media: Media[];
  ingredients: Ingredient[];
}

export interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  stories: DishStory[];
}
