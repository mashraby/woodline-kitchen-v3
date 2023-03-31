import { IFood } from "./foods.interfaces"

interface IAgreeUser {
    _id: string
}

interface IDeegreUser {
    _id: string
}

export interface ILunch {
    _id: string
    food: IFood
    agree_users: IAgreeUser[]    
    disagree: IDeegreUser[]
}

export interface ILunchsProps {
    lunchs: ILunch[]
}