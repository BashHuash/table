export interface IDataItems {
    key: number
    name: string
    date: string
    number: number
}

export interface ITable {
    data: IDataItems[]
    isModalOpen: boolean
    editDataKey: number
    searchValue: string
}

export interface IForm {
    name: string
    date: string
    number: number
}