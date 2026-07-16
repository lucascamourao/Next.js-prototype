'use client';

import { Button, Form, Input, Modal, Select } from 'antd';
import { CreateZoneFormDto } from '@/types/zone';
import { useEffect } from 'react';

const zoneColors = [
  { value: '#ff0000', label: 'Vermelho' },
  { value: '#0000ff', label: 'Azul' },
  { value: '#00ff00', label: 'Verde' },
];

interface CreateZoneModalProps {
  open: boolean;
  onCancel: () => void;
  onZoneCreated: (data: CreateZoneFormDto) => Promise<void>;
}

export default function CreateZoneModal({ open, onCancel, onZoneCreated }: CreateZoneModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);

  async function handleSubmit(values: CreateZoneFormDto) {
    await onZoneCreated(values);
    onCancel();
  }

  return (
    <Modal title="Nova zona" open={open} onCancel={onCancel} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Nome: "
          name="name"
          rules={[
            {
              required: true,
              message: 'Informe o nome da zona.',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Cor"
          name="color"
          rules={[
            {
              required: true,
              message: 'Selecione uma cor. ',
            },
          ]}
        >
          <Select options={zoneColors} placeholder="Selecione uma cor" />
        </Form.Item>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
