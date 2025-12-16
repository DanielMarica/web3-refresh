import { useState, useEffect } from 'react';
import MessageList from '../components/introduce-new-message/MessagesList';
import MessageAdd from '../components/introduce-new-message/MessageAdd';
import type { Message } from '../types/Message';

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sendApiRequest = async (method: string = 'GET', path: string, body?: unknown) => {
    try {
      const host = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${host}/api/${path}`, {
        method: method,
        headers: body ? { 'Content-Type': 'application/json' } : {},
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await sendApiRequest('GET', 'messages');
      setMessages(data);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleAddMessage = async (newMessage: Message) => {
    // Optimistic update
    const optimisticMessage = { ...newMessage, id: Date.now(), createdAt: new Date().toISOString() };
    setMessages([...messages, optimisticMessage]);
    
    // Send to backend
    const addedMessage = await sendApiRequest('POST', 'messages', newMessage);
    
    // Replace optimistic with real data
    setMessages([...messages, addedMessage]);
  };

  const handleResetMessages = async () => {
    setMessages([]);
    setLoading(true);

    const resetData = await sendApiRequest('POST', 'messages/reset');
    setMessages(resetData.data);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div>
      <h1>Messages</h1>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      <div>
        <button onClick={handleResetMessages}>Reset Messages</button>
      </div>

      <h2>Conversation ({messages.length} messages)</h2>

      <MessageList messages={messages} />

      <MessageAdd addMessage={handleAddMessage} />
    </div>
  );
}