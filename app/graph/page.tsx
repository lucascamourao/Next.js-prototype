'use client';

import GraphView from '@/components/Graph/GraphView';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function GraphPage() {
  const router = useRouter();
  return (
    <>
      <Button icon={<ArrowLeftOutlined />} onClick={() => router.push('/')}>
        Voltar ao mapa
      </Button>
      <GraphView />
    </>
  );
}
