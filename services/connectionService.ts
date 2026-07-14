import { api } from "./api";
import { CreateConnectionDto, Connection } from "@/types/connection";

export const connectionService = {
    async create(sourceId: number, targetId: number): Promise<number[]> {
        const connectionPoints = [sourceId, targetId];

        return connectionPoints;
    },

    async getAll(): Promise<number[]> {
        const response = await api.get("/connections");

        const allConnections: number[] = [];
        return allConnections;
    }
}