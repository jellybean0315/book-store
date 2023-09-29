import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Button, Form, FormInstance, Input, Select } from "antd";
import { add, update } from "./booksSlice";
import { v4 as uuidv4 } from 'uuid';
import { BookInfo } from "./book-card";
import styled from "styled-components";
const { Option } = Select;
const { TextArea } = Input;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export enum FormMode {
    ADD = "ADD",
    EDIT = "EDIT"
}

interface AddEditFormProps {
    modalVisibilitySetter: (status: boolean) => void;
    mode: FormMode
    existingBook?: BookInfo;
}

const FormButtonContainer = styled.div`
    display: flex;
    justify-content: right;

    button:first-child {
      margin-right: 10px;
    }
`;

const AddEditForm = (props: AddEditFormProps) => {
    const {
        modalVisibilitySetter,
        mode,
        existingBook
    } = props;
    const formRef = React.useRef<FormInstance>(null);
    const dispatch = useDispatch();
    const id = uuidv4();
    const [initialBookValue, setInitialBookValue] = useState<BookInfo | undefined>(
        existingBook
    );
    const formName: string = mode === FormMode.ADD ? 'add-form' : (existingBook && existingBook.id) || 'abc';

    const addUpdateButtonLabel: string = mode === FormMode.ADD ? 'Add' : 'Update';

    const onFinish = (values: any) => {
        if (mode === FormMode.EDIT && existingBook) {
            dispatch(update({
                ...values,
                price: +values.price,
                id: existingBook.id,
            }));
        }
        if (mode === FormMode.ADD) {
            dispatch(add({
                ...values,
                id
            }));
            formRef.current?.resetFields();
        }
        modalVisibilitySetter(false);
    };

    const handleCancel = () => {
        formRef.current?.resetFields();
        modalVisibilitySetter(false);
    };

    useEffect(() => {
        if (existingBook !== undefined) {
            setInitialBookValue(existingBook);
        }
    }, [existingBook]);

    return (
        <Form
            {...layout}
            ref={formRef}
            name={formName}
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            initialValues={initialBookValue}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true }]}
            >
                <Input type="number" />
            </Form.Item>
            <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true }]}
            >
                <Select
                    placeholder="Select a option and change input text above"
                    onChange={() => {
                        console.log(formRef.current);
                    }}
                    allowClear
                >
                    <Option value="Fantasy">Fantasy</Option>
                    <Option value="Horror">Horror</Option>
                    <Option value="Other">Other</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true }]}
            >
                <TextArea />
            </Form.Item>
            <FormButtonContainer>
                <Button onClick={() => handleCancel()}>
                    Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                    {addUpdateButtonLabel}
                </Button>
            </FormButtonContainer>
        </Form>
    );
};

export default AddEditForm;