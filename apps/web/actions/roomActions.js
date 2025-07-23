"use server";
import axiosInstance from "@/lib/axios/axiosInstance";
export async function createRoomAction(initialState, formData) {
    const title = formData.get("title");
    if (!title || title.trim().length === 0) {
        return {
            message: "Title is required",
        };
    }
    if (title.length > 50) {
        return {
            message: "Title must be less than 50 characters",
        };
    }
    try {
        const room = await axiosInstance.post(`/room/create`, {
            title,
        });
        return {
            message: "Room created successfully",
            room: room.data.room,
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: error.response.data.message,
        };
    }
}
export async function joinRoomAction(initialState, formData) {
    const joinCode = formData.get("joinCode");
    if (!joinCode || joinCode.trim().length === 0) {
        return {
            message: "Join code is required",
        };
    }
    try {
        const room = await axiosInstance.post(`/room/join`, {
            joinCode,
        });
        return {
            message: "Room joined successfully",
            room: room.data.room,
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: error.response.data.message,
        };
    }
}
