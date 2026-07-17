'use client';

import { Location } from '@/types/location';
import { Zone } from '@/types/zone';
import { Descriptions, List, Modal } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';

interface ZoneDetailsModalProps {
  open: boolean;
  zone: Zone | null;
  locationsInsideZone: Location[];
  onCancel: () => void;
}

export default function ZoneDetailsModal({
  open,
  zone,
  locationsInsideZone,
  onCancel,
}: ZoneDetailsModalProps) {
  return (
    <Modal title="Detalhes da zona" open={open} onCancel={onCancel} footer={null}>
      {zone && (
        <>
          <Descriptions>
            <DescriptionsItem label="Nome">{zone.name}</DescriptionsItem>

            <DescriptionsItem label="Cor">{zone.color}</DescriptionsItem>

            <Descriptions.Item label="Quantidade de pontos">
              {locationsInsideZone.length}
            </Descriptions.Item>
          </Descriptions>

          <br />

          <List
            header={<strong>Locais dentro da zona</strong>}
            dataSource={locationsInsideZone}
            locale={{ emptyText: 'Nenhum local encontrado. ' }}
            renderItem={(location) => <List.Item>{location.name}</List.Item>}
          />
        </>
      )}
    </Modal>
  );
}
