export interface ICategory {
    _id: string
    name: string
}

export interface IFoodCategoryProps {
    categorys?: ICategory[];
}