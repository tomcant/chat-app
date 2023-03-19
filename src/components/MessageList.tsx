import { useEffect, useState } from 'react';
import usePusherChannel from '@/hooks/usePusherChannel';

type MessageData = {
  message: string;
};

export default function MessageList() {
  const [messages, setMessages] = useState<string[]>([]);
  const channel = usePusherChannel('private-channel');

  useEffect(() => {
    if (!channel) {
      return;
    }

    channel.bind('message', (data: MessageData) => {
      setMessages((messages) => [...messages, data.message]);
    });

    return () => void channel.unbind('message');
  }, [channel]);

  return (
    <ul>
      {messages.map((message, i) => <li key={i}>{message}</li>)}
    </ul>
  );
};
