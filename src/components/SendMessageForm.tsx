import { useState, FormEvent } from 'react';

export default function SendMessageForm() {
  const [message, setMessage] = useState<string>('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (message.length === 0) {
      return;
    }

    try {
      await fetch('/api/send-message', {
        method: 'POST',
        body: JSON.stringify({
          message,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button>Send</button>
    </form>
  );
};
