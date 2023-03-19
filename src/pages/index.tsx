import { PusherProvider } from '@/hooks/usePusherChannel';
import MessageList from '@/components/MessageList';
import SendMessageForm from '@/components/SendMessageForm';

export default function Home() {
  return (
    <>
      <h1>Messages</h1>
      <PusherProvider>
        <MessageList />
      </PusherProvider>
      <SendMessageForm />
    </>
  );
}
