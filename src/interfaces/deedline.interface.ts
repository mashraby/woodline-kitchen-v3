export interface IDeedline {
    _id: string
    time: number
}

export interface IDeedlineProps {
    deedlines: IDeedline[]
}

export interface IDeedlineModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    deedId: string
    time: number | undefined
}