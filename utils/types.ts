export interface foodCategory {
    id: number;
    name: string;
}

export interface foodItem {
    id: number;
    name: string;
    price: string;
    description: string;
    image_path: string;
}

export interface foodCategoryDetails {
    id: number;
    name: string;
    description: string;
    order: number;
    active: boolean;
}

export interface foodItemDetails {
    id: number;
    name: string;
    price: string;
    description: string;
    image_path: string;
}

export interface menuCategoryFoodItems {
    id: number;
    name: string;
    food_items: any
}