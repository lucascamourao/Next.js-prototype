'use client';

import { Location } from '@/types/location';
import { Zone } from '@/types/zone';
import { Card, Descriptions, Empty, Flex, Modal } from 'antd';
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

          <Card title="Locais dentro da zona">
            {locationsInsideZone.length === 0 ? (
              <Empty description="Nenhum local encontrado." />
            ) : (
              <Flex vertical gap={8}>
                {locationsInsideZone.map((location) => (
                  <Card key={location.id} size="small">
                    {location.name}
                  </Card>
                ))}
              </Flex>
            )}
          </Card>
        </>
      )}
    </Modal>
  );
}
