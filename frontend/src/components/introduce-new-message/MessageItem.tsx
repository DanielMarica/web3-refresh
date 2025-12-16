import type { Message } from '../../types/Message';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`message-item ${message.author.toLowerCase()}`}>
      <div className="message-header">
        <strong>{message.author}</strong>
        <span className="message-time">{formatDate(message.createdAt)}</span>
      </div>
      <div className="message-content">{message.content}</div>
    </div>
  );
}