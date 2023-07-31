import React, { useState } from 'react';
import { IForm } from "../../redux/types";
import { Button, DatePicker, DatePickerProps, Form, Input, InputNumber } from "antd";
import s from './AddForm.module.css';
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addDataItem } from '../../redux/slices/tableSlice';


interface IAddFormComponent {
    toggleModal: () => void
}

export const AddForm: React.FC<IAddFormComponent> = ( { toggleModal } ) => {
    const [ completeDate, setCompleteDate ] = useState<string>( '' )
    const dispatch = useAppDispatch()

    const onFinish = ( data: IForm ) => {
        if ( completeDate !== '' ) {
            data.date = completeDate
        }
        dispatch( addDataItem( data ) )
        toggleModal()
    }

    const datePickerHandler: DatePickerProps['onChange'] = ( date, dateString ) => {
        setCompleteDate( dateString )
    }

    return <Form
        name="add"
        onFinish={ onFinish }
        className={ s.addForm }
        labelCol={ { span: 4 } }
        wrapperCol={ { span: 16 } }
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
            <Button htmlType="reset">Очистить</Button>
            <Form.Item>
                <Button type="primary" htmlType="submit">Добавить</Button>
            </Form.Item>
            <Button onClick={ toggleModal }>Отмена</Button>
        </div>
    </Form>
};