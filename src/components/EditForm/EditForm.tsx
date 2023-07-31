import React, { useEffect, useState } from 'react';
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { IForm } from "../../redux/types";
import { Button, DatePicker, DatePickerProps, Form, Input, InputNumber } from "antd";
import s from "./EditForm.module.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getCurrentEditData } from "../../redux/selectors/tableSelector";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { setEditedDataItem } from '../../redux/slices/tableSlice';


interface IEditFormComponent {
    toggleModal: () => void
}

export const EditForm: React.FC<IEditFormComponent> = ( { toggleModal } ) => {
    const dispatch = useAppDispatch()
    const [ form ] = useForm()
    const editData = useAppSelector( getCurrentEditData )
    const [ completeDate, setCompleteDate ] = useState<string>( '' )

    const onFinish = ( data: IForm ) => {
        if ( completeDate !== '' ) {
            data.date = completeDate
        } else {
            data.date = editData.date
        }
        dispatch( setEditedDataItem( data ) )
        toggleModal()
    }

    const datePickerHandler: DatePickerProps['onChange'] = ( date, dateString ) => {
        setCompleteDate( dateString )
    }

    let initialValues

    if ( editData && completeDate === '' ) {
        initialValues = {
            name: editData.name,
            date: dayjs( editData.date, 'DD.MM.YYYY' ),
            number: editData.number
        }
    } else if ( editData ) {
        initialValues = {
            name: editData.name,
            date: dayjs( completeDate, 'DD.MM.YYYY' ),
            number: editData.number
        }
    }

    useEffect( () => {
        form.resetFields()
    } )

    return <Form
        form={ form }
        name="edit"
        onFinish={ onFinish }
        className={ s.editForm }
        labelCol={ { span: 4 } }
        wrapperCol={ { span: 16 } }
        initialValues={ initialValues }
    >
        <Form.Item label="Имя" name="name" rules={ [ { required: true, message: 'Зполните поле!' } ] }>
            <Input/>
        </Form.Item>
        <Form.Item label="Дата" name="date" rules={ [ { required: true, message: 'Выберите дату!' } ] }>
            <DatePicker format='DD.MM.YYYY' onChange={ datePickerHandler }/>
        </Form.Item>
        <Form.Item label="Число" name="number" rules={ [ { required: true, message: 'Зполните поле!' } ] }>
            <InputNumber type='number'/>
        </Form.Item>
        <div className={ s.buttons }>
            <Form.Item>
                <Button type="primary" htmlType="submit">Подтвердить</Button>
            </Form.Item>
            <Button onClick={ toggleModal }>Отмена</Button>
        </div>
    </Form>
};