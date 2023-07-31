import React from 'react';
import { AddForm } from "../AddForm/AddForm";
import { Modal } from "antd";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getIsModalOpen } from "../../redux/selectors/tableSelector";
import s from './ModalComponent.module.css'
import { EditForm } from "../EditForm/EditForm";
import { setEditDataKey } from "../../redux/slices/tableSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";


interface IModal {
    toggleModal: () => void
    isAdd: boolean
}

export const ModalComponent: React.FC<IModal> = ( { toggleModal, isAdd } ) => {
    const dispatch = useAppDispatch()
    const isModalOpen = useAppSelector( getIsModalOpen )

    const onCancel = () => {
        toggleModal()
        dispatch( setEditDataKey( 0 ) )
    }

    if ( isAdd ) {
        return <Modal className={ s.modal } title="Добавить строку" open={ isModalOpen } centered footer={ null }
                      onCancel={ onCancel }>
            <AddForm toggleModal={ toggleModal }/>
        </Modal>
    } else {
        return <Modal className={ s.modal } title="Редактировать строку" open={ isModalOpen } centered footer={ null }
                      onCancel={ onCancel }>
            <EditForm toggleModal={ toggleModal }/>
        </Modal>
    }
}