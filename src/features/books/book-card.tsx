import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { deleteBook } from './booksSlice';
import { Card, Modal, Tooltip } from 'antd';
import AddEditForm, { FormMode } from "./add-edit-form";
const { Meta } = Card;

export interface BookInfo {
    name: string;
    description: string;
    price: number;
    category: string;
    id: string;
}
interface BookCardProps {
    book: BookInfo;
}

const BookCard = (props: BookCardProps) => {
    const {
        book: {
            name,
            description,
            price,
            id,
            category
        }
    } = props;
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    return (
        <Card
            className="book-card"
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src="/bc-genericbook.png"
                />
            }
            actions={[
                <DeleteOutlined key="deleted" style={{
                    color: 'red',
                }} onClick={() => {
                    dispatch(deleteBook(id))
                }} />,
                <Tooltip title={description}>
                    <InfoCircleOutlined  />
                </Tooltip>,
                <EditOutlined onClick={() => setOpen(true) }/>
            ]}
        >
            <Meta
                title={name}
                description={`$${price} | ${category}`}
            />
            <Modal
                title="Edit Book"
                centered
                open={open}
                onCancel={() => setOpen(false)}
                width={650}
                footer={null}
            >
                <AddEditForm
                    mode={FormMode.EDIT}
                    modalVisibilitySetter={setOpen}
                    existingBook={props.book}
                />
            </Modal>
        </Card>
    );
};

export default BookCard;