export type CategoryType = {
    _id: string;
    outletId: string;
    name: string;
    sequence: string;
    isActive: boolean;
}

export type SubCategoryType = {
    _id: string;
    categoryId: string;
    name: string;
    sequence: string;
    isActive: boolean;
}

export type ItemPrices = {
    FULL?: number;
    HALF?: number;
    QUARTER?: number;
}

export type ItemType = {
    _id: string;
    subCategoryId: string;
    name: string;
    prices: ItemPrices;
    image: string | File;
    sequence: number;
    isActive: boolean;
    removeImage: boolean;
}

export type CreateCategoriesRequestType = {
    outletId: string;
    name: string;
    isActive: boolean;
    sequence: number;
}

export type UpdateCategoriesRequestType = {
    categoryId: string;
    name: string;
    isActive: boolean;
    sequence: number;
}

export type CreateSubCategoriesRequestType = {
    categoryId: string;
    name: string;
    isActive: boolean;
    sequence: number;
}

export type UpdateSubCategoriesRequestType = {
    subCategoryId: string;
    name: string;
    isActive: boolean;
    sequence: number;
}

export type CreateItemRequestType = {
    subCategoryId: string;
    name: string;
    sequence: number;
    isActive: boolean;
    prices?: ItemPrices;
    image?: File;
}

export type UpdateItemRequestType = {
    itemId: string;
    name: string;
    prices: ItemPrices;
    image: File;
    sequence: number;
    isActive: boolean;
    subCategoryId: string;
    removeImage: boolean;
}

export type CompleteMenuResponseType = {
    outletId: string;
    categories: OrderCategory[];
}

export type OrderCategory = {
     _id: string;
    name: string;
    sequence: string;
    isActive: boolean;
    subCategories: OrderSubCategory[];
}

export type OrderSubCategory = {
      _id: string;
    name: string;
    sequence: string;
    isActive: boolean;
    items: ItemType[];
}


