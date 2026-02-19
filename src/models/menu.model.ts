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
}

export type ItemType = {
    _id: string;
    subCategoryId: string;
    name: string;
    prices: ItemPrices;
    image: string;
    sequence: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
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

interface FileWithPreview extends File {
  preview: string;
}

export type CreateItemRequestType = {
    subCategoryId: string;
    name: string;
    sequence: number;
    isActive: boolean;
    prices?: ItemPrices;
    image?: FileWithPreview;
}

export type UpdateItemRequestType = {
    itemId: string;
    name: string;
    prices: ItemPrices;
    image: string;
    sequence: number;
    isActive: boolean;
    removeImage: boolean;
}


