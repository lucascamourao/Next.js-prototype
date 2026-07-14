"use client"; // virou client component

import { Layout } from "antd";
import { useState } from "react";

import Sidebar from "../Sidebar/Sidebar";
import Map from "../Map/Map";

import { Tool } from "@/types/tool";

export default function MainLayout() {
  const [selectedTool, setSelectedTool] = useState<Tool>("none");

  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar 
        selectedTool={selectedTool}
        onToolChange={setSelectedTool}
      />

      <Layout.Content style={{ height: "100vh" }}>
        <Map 
          selectedTool={selectedTool}
        />
      </Layout.Content>
    </Layout>
  );
}