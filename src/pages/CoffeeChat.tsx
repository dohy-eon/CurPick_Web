import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import { useUser } from '../contexts/UserContext';

type MessageType = 'ENTER' | 'TALK' | 'LEAVE';

interface ChatMessageDto {
  sender: string;
  content: string;
  type: MessageType;
}

let stompClient: Client;

const CoffeeChat: React.FC = () => {
  const { nickname } = useUser();
  const [messages, setMessages] = useState<ChatMessageDto[]>([]);
  const [input, setInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  const connectedRef = useRef(false); // 중복 연결 방지용

  // 스크롤 맨 아래로
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const connect = () => {
    if (!nickname || connectedRef.current) return;

    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = over(socket);

    stompClient.connect({}, () => {
      connectedRef.current = true;

      stompClient.subscribe('/topic/coffee-chat', (message) => {
        const received: ChatMessageDto = JSON.parse(message.body);
        setMessages((prev) => [...prev, received]);
      });

      // 입장 메시지 전송
      stompClient.send('/app/chat.send', {}, JSON.stringify({
        sender: nickname,
        content: `${nickname}님이 입장하셨습니다.`,
        type: 'ENTER',
      }));
    });
  };

  const sendMessage = () => {
    if (input.trim() && stompClient?.connected && nickname) {
      const chatMessage: ChatMessageDto = {
        sender: nickname,
        content: input,
        type: 'TALK',
      };
      stompClient.send('/app/chat.send', {}, JSON.stringify(chatMessage));
      setInput('');
    }
  };

  useEffect(() => {
    if (nickname) {
      connect();
    }

    // 컴포넌트 언마운트 시 disconnect
    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          connectedRef.current = false;
        });
      }
    };
  }, [nickname]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!nickname) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="text-curpick-brown text-xl">채팅을 이용하시려면 로그인이 필요합니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-curpick-brown text-2xl font-luxgom font-bold">커피챗</h1>
          <p className="text-curpick-brown text-lg font-luxgom mt-2">
            다른 사용자들과 실시간으로 대화를 나눠보세요!
          </p>
        </div>

        <div className="bg-white rounded-[20px] border-3 border-curpick-brown p-6">
          <div className="flex flex-col h-[600px]">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 bg-[#F9F9FA] p-4 rounded-[10px]">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === nickname ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-[10px] ${
                      msg.sender === nickname
                        ? 'bg-curpick-brown text-white'
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    {msg.type === 'ENTER' || msg.type === 'LEAVE' ? (
                      <div className="text-center text-sm text-gray-500">{msg.content}</div>
                    ) : (
                      <>
                        <div className="font-medium mb-1">{msg.sender}</div>
                        <div>{msg.content}</div>
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 px-4 py-3 border-2 border-curpick-brown rounded-[10px] focus:outline-none focus:border-curpick-brown"
                placeholder="메시지를 입력하세요"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                className="px-6 py-3 bg-curpick-brown text-white rounded-[10px] hover:bg-opacity-90 transition-colors"
                onClick={sendMessage}
              >
                전송
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeChat;