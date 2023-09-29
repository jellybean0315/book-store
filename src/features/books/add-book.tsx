import React, { useState } from 'react';
import { Button, Modal, Tooltip } from 'antd';
import { AppstoreAddOutlined } from "@ant-design/icons";
import AddEditForm, { FormMode } from "./add-edit-form";

const AddBook = () => {
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    return (
        <div className="add-button">
            <Tooltip placement="leftTop" title="Add a new book">
                <Button type="primary" shape="circle" icon={<AppstoreAddOutlined />} onClick={showModal} />
            </Tooltip>

            <Modal
                title="Add Book"
                centered
                open={open}
                onCancel={() => setOpen(false)}
                width={650}
                footer={null}
            >
                <AddEditForm mode={FormMode.ADD} modalVisibilitySetter={setOpen} />
            </Modal>
        </div>
    );
};

export default AddBook;