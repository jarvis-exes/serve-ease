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