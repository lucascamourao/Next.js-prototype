"use client";

import { Form, Input, Modal, Select } from "antd";

interface CreateLocationModalProps {
    open: boolean;
    position: {
        lat: number;
        lng: number;
    } | null;
    onCancel: () => void;
}

export default function CreateLocationModal({
    open,
    position,
    onCancel,
}: CreateLocationModalProps) {
    return(
        <Modal 
        title="Novo Local"
        open={open}
        onCancel={onCancel}
        footer={null}
        >
            <Form>
                <p>
                    Latitude: {position?.lat}
                </p>

                <p>
                    Longitude: {position?.lng}
                </p>
                <Input />
                <Input.TextArea />
                <Select />
            </Form>
        </Modal>
    )
}