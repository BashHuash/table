import React from 'react';
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IDataItems } from "../../redux/types";
import s from "./TableComponent.module.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getData } from "../../redux/selectors/tableSelector";
import { deleteDataItem, setEditDataKey } from "../../redux/slices/tableSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";


interface ITableComponent {
    toggleModal: () => void
    searchValue: string
}

export const TableComponent: React.FC<ITableComponent> = ( { toggleModal, searchValue } ) => {
    const dispatch = useAppDispatch()
    const data = useAppSelector( getData )

    const editHandler = ( key: React.Key ) => {
        dispatch( setEditDataKey( Number( key ) ) )
    }

    const deleteHandler = ( key: React.Key ) => {
        dispatch( deleteDataItem( Number( key ) ) )
    }

    const columns: ColumnsType<IDataItems> = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            sorter: {
                compare: ( a, b ) => {
                    if ( a.name < b.name ) {
                        return -1;
                    }
                    if ( a.name > b.name ) {
                        return 1;
                    }
                    return 0;
                },
                multiple: 1
            },
            filteredValue: [ searchValue ],
            onFilter: ( value, record ) => {
                return String( record.name ).toLowerCase().includes( String( value ).toLowerCase() ) ||
                    String( record.date ).toLowerCase().includes( String( value ).toLowerCase() ) ||
                    String( record.number ).toLowerCase().includes( String( value ).toLowerCase() )
            }
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            sorter: {
                compare: ( a, b ) => {
                    if ( a.date > b.date ) {
                        return -1;
                    }
                    if ( a.date < b.date ) {
                        return 1;
                    }
                    return 0;
                },
                multiple: 2
            }
        },
        {
            title: 'Числовое значение',
            dataIndex: 'number',
            key: 'number',
            sorter: {
                compare: ( a, b ) => b.number - a.number,
                multiple: 3
            }
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            render: ( _, record: { key: React.Key } ) => <div className={ s.buttons } key={ record.key }>
                <Button type='dashed' onClick={ () => {
                    editHandler( record.key )
                    toggleModal()
                } }>Редактировать</Button>
                <Button type='default' onClick={ () => deleteHandler( record.key ) }>Удалить</Button>
            </div>
        }
    ]

    return <Table dataSource={ data } columns={ columns } pagination={ false }/>
};