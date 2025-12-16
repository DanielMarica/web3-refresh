import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { messageSchema, type MessageFormData } from '../schema/messageSchema';
import type { Message } from '../../types/Message';
import './MessageAdd.css';

interface MessageAddProps {
  addMessage: (message: Message) => void;
}

export default function MessageAdd({ addMessage }: MessageAddProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      author: 'Alice',
    },
  });

  const onSubmit = (data: MessageFormData) => {
    const newMessage = {
      id: Date.now(), // Temporary
      createdAt: new Date().toISOString(),
      author: data.author,
      content: data.content,
    };

    addMessage(newMessage);
    reset({ author: data.author, content: '' }); // Keep author, clear content
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="message-form">
      <h3>Send a Message</h3>

      <div>
        <label>
          Author:
          <select {...register('author')}>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
          </select>
          {errors.author && <span className="error">{errors.author.message}</span>}
        </label>
      </div>

      <div>
        <label>
          Message:
          <textarea
            {...register('content')}
            placeholder="Type your message here..."
            rows={4}
          />
          {errors.content && <span className="error">{errors.content.message}</span>}
        </label>
      </div>

      <button type="submit">Send Message</button>
    </form>
  );
}