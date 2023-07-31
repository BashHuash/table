import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IForm, ITable } from "../types";


const initialState: ITable = {
    data: [
        {
            key: 1,
            name: 'Max',
            date: '28.07.2023',
            number: 1
        },
        {
            key: 2,
            name: 'Nikita',
            date: '29.07.2023',
            number: 15
        },
        {
            key: 3,
            name: 'John',
            date: '30.07.2023',
            number: 78
        }
    ],
    isModalOpen: false,
    editDataKey: 0,
    searchValue: ''
}

const tableSlice = createSlice( {
    name: 'tableSlice',
    initialState,
    reducers: {
        deleteDataItem: ( state, action: PayloadAction<number> ) => {
            state.data = state.data.filter( item => item.key !== action.payload )
        },
        addDataItem: ( state, action: PayloadAction<IForm> ) => {
            let newKey = 1
            if ( state.data.length >= 1 ) {
                // @ts-ignore
                newKey = state.data.at( -1 ).key + 1
            }
            state.data.push( {
                key: newKey,
                name: action.payload.name,
                date: action.payload.date,
                number: action.payload.number
            } )
        },
        toggleModal: ( state ) => {
            state.isModalOpen = !state.isModalOpen
        },
        setEditDataKey: ( state, action: PayloadAction<number> ) => {
            state.editDataKey = action.payload
        },
        setEditedDataItem: ( state, action: PayloadAction<IForm> ) => {
            state.data.map( item => {
                if ( item.key === state.editDataKey ) {
                    item.name = action.payload.name
                    item.date = action.payload.date
                    item.number = action.payload.number
                }
            } )
        },
        setSearchValue: ( state, action: PayloadAction<string> ) => {
            state.searchValue = action.payload
        }
    }
} )

export const tableReducer = tableSlice.reducer
export const {
    deleteDataItem, toggleModal, addDataItem, setEditDataKey, setEditedDataItem, setSearchValue
} = tableSlice.actions