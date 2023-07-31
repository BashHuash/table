import React from 'react';
import s from './App.module.css';
import { Button, Input } from "antd";
import { useAppSelector } from "./hooks/useAppSelector";
import { getEditDataKey, getSearchValue } from "./redux/selectors/tableSelector";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { setSearchValue, toggleModal } from './redux/slices/tableSlice';
import { ModalComponent } from "./components/ModalComponent/ModalComponent";
import { TableComponent } from "./components/TableComponent/TableComponent";


export const App = () => {
    const dispatch = useAppDispatch()
    const key = useAppSelector( getEditDataKey )
    const searchValue = useAppSelector( getSearchValue )

    const toggleIsModalOpen = () => {
        dispatch( toggleModal() )
    }

    const searchHandler = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        dispatch( setSearchValue( e.target.value ) )
    }

    return <div className={ s.appWrapper }>
        <ModalComponent toggleModal={ toggleIsModalOpen } isAdd={ key === 0 }/>
        <div className={ s.app }>
            <div className={ s.functions }>
                <Input.Search placeholder='Поиск' onChange={ searchHandler } value={ searchValue }/>
                <Button type="primary" onClick={ toggleIsModalOpen }>
                    Добавить
                </Button>
            </div>
            <TableComponent toggleModal={ toggleIsModalOpen } searchValue={ searchValue }/>
        </div>
    </div>
}