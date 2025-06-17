"use server";
import axiosInstance from "@/lib/axios/axiosInstance";
import { Message } from "@/types";

export const fetchAllChatMessages: (roomid: string) => Promise<Message[]> =
  async (roomId: string) => {
    try {
      const fetchedMessages: { data: { messages: Message[] } } =
        await axiosInstance.get(`/content/chat/${roomId}`);

      let messages: Message[] = [];
      if (
        fetchedMessages &&
        fetchedMessages.data &&
        fetchedMessages.data.messages
      ) {
        messages = fetchedMessages.data.messages;
      }
      return messages;
    } catch (e) {
      return [];
    }
  };

export const fetchMoreChatMessages: (
  roomId: string,
  lastSrNo: number
) => Promise<Message[]> = async (roomId: string, lastSrNo: number) => {
  try {
    const fetchedMessages: { data: { messages: Message[] } } =
      await axiosInstance.get(`/content/chat/${roomId}?lastSrNo=${lastSrNo}`);

    let messages: Message[] = [];
    if (
      fetchedMessages &&
      fetchedMessages.data &&
      fetchedMessages.data.messages
    ) {
      messages = fetchedMessages.data.messages;
    }
    return messages;
  } catch (e) {
    return [];
  }
};
