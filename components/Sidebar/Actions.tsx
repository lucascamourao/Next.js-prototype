import { Tool } from '@/types/tool';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

interface ActionProps {
  selectedTool: Tool;
  onToolChange: (tool: Tool) => void;
  canFinishZone: boolean;
  onFinishZone: () => void;
}

export default function Actions({
  selectedTool,
  onToolChange,
  canFinishZone,
  onFinishZone,
}: ActionProps) {
  const router = useRouter();

  function toggleTool(tool: Tool) {
    onToolChange(selectedTool === tool ? 'none' : tool);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <Button
        type={selectedTool === 'location' ? 'primary' : 'default'}
        onClick={() => toggleTool('location')}
      >
        Location
      </Button>

      <Button
        type={selectedTool === 'zone' ? 'primary' : 'default'}
        onClick={() => toggleTool('zone')}
      >
        Zone
      </Button>

      <Button
        type={selectedTool === 'relation' ? 'primary' : 'default'}
        onClick={() => toggleTool('relation')}
      >
        Relation
      </Button>

      {selectedTool === 'zone' && canFinishZone && (
        <Button type="primary" onClick={onFinishZone}>
          Finalizar Zona
        </Button>
      )}

      <Button onClick={() => router.push('/graph')}>Graph</Button>
    </div>
  );
}
