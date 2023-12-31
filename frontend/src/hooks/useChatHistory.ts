import { useState, useEffect } from "react";
import { Message } from "@/types/general-types";
import ApiService from "@/services/ApiService";
interface ChatHistoryHookResult {
    chatHistory: Message[] | null;
    loading: boolean
}
export function useChatHistory(groupId: string): ChatHistoryHookResult {
    const [chatHistory, setChatHistory] = useState<Message[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchChat = async () => {
            try {
                if (!chatHistory) {
                    setLoading(true)
                    const result = await ApiService.readMessagesByGroupId(groupId);
                    setChatHistory(result);
                    setLoading(false)
                }
            } catch (error) {
                console.log(error, 'Error fetching chat history');
            }
        };

        fetchChat();
    }, [chatHistory, groupId]);

    return { chatHistory, loading };
}
