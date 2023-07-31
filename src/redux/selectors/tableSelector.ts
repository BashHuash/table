import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "../store";

export const getData = ( state: StateType ) => state.tableReducer.data

export const getIsModalOpen = ( state: StateType ) => state.tableReducer.isModalOpen

export const getEditDataKey = ( state: StateType ) => state.tableReducer.editDataKey

export const getSearchValue = ( state: StateType ) => state.tableReducer.searchValue

export const getCurrentEditData = createSelector( [ getData, getEditDataKey ], ( dataItems, key ) =>
    dataItems.filter( item => item.key === key )[0] )