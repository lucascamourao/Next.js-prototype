import { Tool } from "@/types/tool";
import { Button } from "antd";

interface ActionProps {
    selectedTool: Tool;
    onToolChange: (tool: Tool) => void;
}

export default function Actions({
    selectedTool,
    onToolChange,
}: ActionProps) {
    function toggleTool(tool: Tool) {
        onToolChange(selectedTool === tool ? "none" : tool);
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
            }}
        >   

            <Button
                type={
                    selectedTool === "connection" ? "primary" : "default"
                }
                onClick={() => toggleTool("connection")}
            >
                Connection
            </Button>

            <Button
                type={
                    selectedTool === "zone" ? "primary" : "default"
                }
                onClick={() => toggleTool("zone")}
            >
                Zone
            </Button>

            <Button
                type={
                    selectedTool === "relation" ? "primary" : "default"
                }
                onClick={() => toggleTool("relation")}
            >
                Relation
            </Button>
        </div>
    )
}