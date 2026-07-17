'use client';

import { Modal, Descriptions } from 'antd';
import { Location } from '@/types/location';

interface LocationDetailsModalProps {
  open: boolean;
  location: Location | null;
  onCancel: () => void;
}

export default function LocationDetailsModal({
  open,
  location,
  onCancel,
}: LocationDetailsModalProps) {
  return (
    <Modal title="Detalhes do local" open={open} onCancel={onCancel} footer={null}>
      {location && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Nome">{location.name}</Descriptions.Item>

          <Descriptions.Item label="Descrição">{location.description}</Descriptions.Item>

          <Descriptions.Item label="Latitude">{location.lat}</Descriptions.Item>

          <Descriptions.Item label="Longitude">{location.lng}</Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
}
