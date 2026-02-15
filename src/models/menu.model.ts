export type CreateCategoriesRequestType = {
    outletId: string;
    name: string;
    isActive: boolean;
    sequence: number
}

export type UpdateCategoriesRequestType = {
    categoryId: string;
    name: string;
    isActive: boolean;
    sequence: number
}

export type CreateSubCategoriesRequestType = {
    categoryId: string;
    name: string;
    isActive: boolean;
    sequence: number
}

export type UpdateSubCategoriesRequestType = {
    subCategoryId: string;
    name: string;
    isActive: boolean;
    sequence: number
}

export type CategoryType = {
    _id: string;
    outletId: string;
    name: string;
    sequence: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export type SubCategoryType = {
    _id: string;
    categoryId: string;
    name: string;
    sequence: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export type ItemPrices = {
    FULL?: number;
    HALF?: number;
    QUARTER?: number;
    _id: string;
}

export type ListMenuItemResponseType = {
    _id: string;
    subCategoryId: string;
    name: string;
    prices: ItemPrices;
    image: string;
    sequence: number;
    createdAt: Date;
    updatedAt: Date;
}
