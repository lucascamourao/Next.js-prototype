"use client";

import { Layout, Typography } from "antd";

const { Sider } = Layout;
const { Title } = Typography;

export default function Sidebar() {
    return (
        <Sider
            width={300}
            theme="light"
            style={{
                padding: 16,
                borderRight: "1px solid #b1b1b1",
            }}
        >
            <Title level={4}>Prototype</Title>

            <p>Sidebar</p>
        </Sider>
    );
}