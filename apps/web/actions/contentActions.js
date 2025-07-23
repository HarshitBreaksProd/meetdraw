"use server";
import axiosInstance from "@/lib/axios/axiosInstance";
export const fetchAllDraws = async (roomId) => {
    try {
        const response = await axiosInstance.get(`/content/draws/${roomId}`);
        let draws = [];
        if (response.data && response.data.draws) {
            draws = response.data.draws;
        }
        return draws;
    }
    catch (e) {
        return [];
    }
};
