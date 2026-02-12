export type CreateCategoriesRequestType = {
    outletId: string;
    name: string;
    sequence: number
}

export type CreateSubCategoriesRequestType = {
    categoryId: string;
    name: string;
    sequence: number
}

export type ListCategoryResponseType = {
    _id: string;
    outletId: string;
    name: string;
    sequence: string;
    createdAt: Date;
    updatedAt: Date;
}

export type ListSubCategoryResponseType = {
    _id: string;
    categoryId: string;
    name: string;
    sequence: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface MenuFormValues {
    itemName: string;
    isAvailable: boolean;
    isVeg: boolean;
}