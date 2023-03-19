import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Pusher, { Channel } from 'pusher-js';

export default function usePusherChannel(channelName: string) {
  const pusher = useContext(PusherContext);
  const [channel, setChannel] = useState<Channel>();

  useEffect(() => {
    if (!pusher) {
      return;
    }

    const channel = pusher.subscribe(channelName);

    setChannel(channel);

    return () => void pusher.unsubscribe(channelName);
  }, [channelName, pusher]);

  return channel;
}

const PusherContext = createContext<Pusher | undefined>(undefined);

export const PusherProvider = ({ children }: { children: ReactNode }) => {
  if (process.env.NODE_ENV !== 'production') {
    Pusher.logToConsole = true;
  }

  let pusher: Pusher | undefined = undefined;

  if (typeof window !== 'undefined') {
    pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string, {
      channelAuthorization: {
        endpoint: '/api/subscribe',
        transport: 'ajax',
      },
      cluster: 'eu',
      forceTLS: true,
    });
  }

  return (
    <PusherContext.Provider value={pusher}>
      {children}
    </PusherContext.Provider>
  );
};
