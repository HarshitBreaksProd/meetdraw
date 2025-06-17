"use server";
import axiosInstance from "@/lib/axios/axiosInstance";
import { Draw } from "@/types";

export const fetchAllDraws: (roomId: string) => Promise<Draw[]> = async (
  roomId: string
) => {
  try {
    const response = await axiosInstance.get(`/content/draws/${roomId}`);
    let draws: Draw[] = [];
    if (response.data && response.data.draws) {
      draws = response.data.draws;
    }
    return draws;
  } catch (e) {
    return [];
  }
};
