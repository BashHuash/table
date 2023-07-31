import { configureStore } from "@reduxjs/toolkit";
import { tableReducer } from "./slices/tableSlice";

export let store = configureStore( {
    reducer: {
        tableReducer
    }
} )

export type StateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch