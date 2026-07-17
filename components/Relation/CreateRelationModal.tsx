'use client';

import { Button, Form, Input, Modal } from 'antd';
import { useEffect } from 'react';

interface CreateRelationFormDto {
  name: string;
}

interface CreateRelationModalProps {
  open: boolean;
  onCancel: () => void;
  onRelationCreated: (data: CreateRelationFormDto) => Promise<void>;
}

export default function CreateRelationModal({
  open,
  onCancel,
  onRelationCreated,
}: CreateRelationModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);

  async function handleSubmit(values: CreateRelationFormDto) {
    await onRelationCreated(values);
    onCancel();
  }

  return (
    <Modal title="Nova relação" open={open} onCancel={onCancel} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Nome"
          name="name"
          rules={[
            {
              required: true,
              message: 'Informe o nome da relação.',
            },
          ]}
        >
          <Input placeholder="Ex.: Entrega para" />
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
