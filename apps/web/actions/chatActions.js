"use server";
import axiosInstance from "@/lib/axios/axiosInstance";
export const fetchAllChatMessages = async (roomId) => {
    try {
        const fetchedMessages = await axiosInstance.get(`/content/chat/${roomId}`);
        let messages = [];
        if (fetchedMessages &&
            fetchedMessages.data &&
            fetchedMessages.data.messages) {
            messages = fetchedMessages.data.messages;
        }
        return messages;
    }
    catch (e) {
        return [];
    }
};
export const fetchMoreChatMessages = async (roomId, lastSrNo) => {
    try {
        const fetchedMessages = await axiosInstance.get(`/content/chat/${roomId}?lastSrNo=${lastSrNo}`);
        let messages = [];
        if (fetchedMessages &&
            fetchedMessages.data &&
            fetchedMessages.data.messages) {
            messages = fetchedMessages.data.messages;
        }
        return messages;
    }
    catch (e) {
        return [];
    }
};
