import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';
import { BsRobot, BsPerson } from 'react-icons/bs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from "axios"
const ChatApp = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = 'AIzaSyAdHk6BjIks-ZS-ZY-GFK3kauC5FkV1lwE'; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(API_KEY);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
       const res = await axios.post("http://localhost:5200", {prompt:input});
       setMessages((prev) => [...prev, { role: 'assistant', content: res.data.msg }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again later.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContainer>
      <Header>
        <h1>Gemini AI Chat</h1>
        <p>Powered by Google Gemini API</p>
      </Header>

      <MessagesContainer>
        {messages.map((message, index) => (
          <Message key={index} role={message.role}>
            <Avatar role={message.role}>
              {message.role === 'assistant' ? <BsRobot /> : <BsPerson />}
            </Avatar>
            <MessageContent role={message.role}>
              {message.content.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </MessageContent>
          </Message>
        ))}
        {isLoading && (
          <Message role="assistant">
            <Avatar role="assistant">
              <BsRobot />
            </Avatar>
            <MessageContent role="assistant">
              <TypingIndicator>
                <span></span>
                <span></span>
                <span></span>
              </TypingIndicator>
            </MessageContent>
          </Message>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputForm onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          <FiSend />
        </button>
      </InputForm>
    </ChatContainer>
  );
};

export default ChatApp;

// Styled Components
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  background: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  background: #4285f4;
  color: white;
  padding: 1.5rem;
  text-align: center;

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0.5rem 0 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background: #fafafa;
`;

const Message = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  align-items: flex-start;
  flex-direction: ${(props) => (props.role === 'assistant' ? 'row' : 'row-reverse')};
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => (props.role === 'assistant' ? '#4285f4' : '#34a853')};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin: 0 10px;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  max-width: 70%;
  padding: 0.8rem 1.2rem;
  border-radius: 18px;
  background: ${(props) => (props.role === 'assistant' ? 'white' : '#4285f4')};
  color: ${(props) => (props.role === 'assistant' ? '#333' : 'white')};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  line-height: 1.5;

  p {
    margin: 0.5rem 0;
  }

  p:first-child {
    margin-top: 0;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  padding: 10px;

  span {
    height: 10px;
    width: 10px;
    background: #ccc;
    border-radius: 50%;
    display: inline-block;
    margin: 0 2px;
    animation: bounce 1.5s infinite ease-in-out;

    &:nth-child(1) {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes bounce {
    0%,
    60%,
    100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-5px);
    }
  }
`;

const InputForm = styled.form`
  display: flex;
  padding: 1rem;
  background: white;
  border-top: 1px solid #eee;

  input {
    flex: 1;
    padding: 0.8rem 1.2rem;
    border: 1px solid #ddd;
    border-radius: 24px;
    outline: none;
    font-size: 1rem;

    &:focus {
      border-color: #4285f4;
    }
  }

  button {
    background: #4285f4;
    color: white;
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: #3367d6;
    }
  }
`;
