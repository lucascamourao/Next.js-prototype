"use client"; // virou client component

import { Layout } from "antd";
import Sidebar from "../Sidebar/Sidebar";
import Map from "../Map/Map";

export default function MainLayout() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />

      <Layout.Content style={{ height: "100vh" }}>
        <Map />
      </Layout.Content>
    </Layout>
  );
}