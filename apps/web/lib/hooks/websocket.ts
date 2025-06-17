import { useEffect, useState } from "react";

export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url || url.includes("undefined")) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setSocket(null);

    const ws = new WebSocket(url);

    ws.onopen = () => {
      setIsLoading(false);
      setIsError(false);
      setSocket(ws);
    };

    ws.onclose = (event) => {
      setSocket(null);
      if (!event.wasClean) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    ws.onerror = (error) => {
      setIsError(true);
      setIsLoading(false);
      setSocket(null);
    };

    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
    };
  }, [url]);

  return { socket, isLoading, isError };
};
