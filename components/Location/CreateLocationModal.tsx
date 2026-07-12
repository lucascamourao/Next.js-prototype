"use client";

import { Button, Form, Input, Modal, Select } from "antd";
import { CreateLocationDto } from "@/types/location";

const locationTypes = [
    { value: 'tipo1', label: 'Tipo 1' },
    { value: 'tipo2', label: 'Tipo 2' },
    { value: 'tipo3', label: 'Tipo 3' }
];

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
    function handleSubmit(values: CreateLocationDto) {
        console.log(values);
    }

    return(
        <Modal 
        title="Novo Local"
        open={open}
        onCancel={onCancel}
        footer={null}
        >
            <Form
                layout="vertical"
                onFinish={handleSubmit}
            >
                <p>
                    Latitude: {position?.lat}
                </p>

                <p>
                    Longitude: {position?.lng}
                </p>
                
                <Form.Item 
                    label="Nome: " 
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Informe o nome do local.",
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Descrição: " 
                    name="description"
                >
                    <Input.TextArea />
                </Form.Item>
                
                <Form.Item
                    label="Tipo"
                    name="type"
                    rules={[
                        {
                            required: true,
                            message: "Selecione o tipo do local. "
                        }
                    ]}
                >
                    <Select
                        options={locationTypes}
                        placeholder="Selecione um tipo"
                    />
                </Form.Item>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Salvar
                    </Button>
                </div>
            </Form >
        </Modal>
    )
}