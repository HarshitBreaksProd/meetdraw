import { Message } from "@/types";
interface ChatBarProps {
    closeChat: () => void;
    messages: Message[];
    user: {
        id: string;
        username: string;
    };
    onSendMessage: (content: string) => void;
    onLoadMoreMessages: () => Promise<Message[]>;
    isLoadingMore: boolean;
    chatMessageInputRef: React.RefObject<HTMLTextAreaElement | null>;
}
declare const ChatBar: ({ closeChat, messages, user, onSendMessage, onLoadMoreMessages, isLoadingMore, chatMessageInputRef, }: ChatBarProps) => import("react").JSX.Element;
export default ChatBar;
//# sourceMappingURL=ChatBar.d.ts.map