import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineSend } from 'react-icons/ai';
import styles from '../../styles/styles';
import { TfiGallery } from 'react-icons/tfi';
import socketIO from 'socket.io-client';
import { format } from 'timeago.js';
import MessageListDashboard from '../messageListDashboard/MessageListDashboard';
import SellerInboxDashboar from '../sellerInboxDashboar/SellerInboxDashboar';
const ENDPOINT = 'https://socket-ecommerce-tu68.onrender.com/';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

const MessageDashboard = () => {
  // Global state variables
  const { currentSeller, loading } = useSelector((state) => state.seller);

  // Local state variables
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState();
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  // Messages
  useEffect(() => {
    socketId.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // messages and current chat
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // Get conversation
  useEffect(() => {
    const getConversation = async () => {
      try {
        const { data } = await axios.get(
          `htttp//:5000/conversation/get-all-conversation-seller/${currentSeller?._id}`,
          {
            withCredentials: true,
          }
        );

        setConversations(data.conversations);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [currentSeller, messages]);

  // get and add users
  useEffect(() => {
    if (currentSeller) {
      const sellerId = currentSeller?._id;
      socketId.emit('addUser', sellerId);
      socketId.on('getUsers', (data) => {
        setOnlineUsers(data);
      });
    }
  }, [currentSeller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find(
      (member) => member !== currentSeller?._id
    );
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  // Get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const { data } = await axios.get(
          `http//:5000/message/get-all-messages/${currentChat?._id}`
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  // Create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: currentSeller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member.id !== currentSeller._id
    );

    socketId.emit('sendMessage', {
      senderId: currentSeller._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== '') {
        const { data } = await axios.post(
          `http//:5000/message/create-new-message`,
          message
        );

        setMessages([...messages, data.message]);
        updateLastMessage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update the latest message
  const updateLastMessage = async () => {
    socketId.emit('updateLastMessage', {
      lastMessage: newMessage,
      lastMessageId: currentSeller._id,
    });

    try {
      const { data } = await axios.put(
        `http://5000/conversation/update-last-message/${currentChat._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: currentSeller._id,
        }
      );
      console.log(data.conversation);
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        imageSendingHandler(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  // Image sending handler
  const imageSendingHandler = async (e) => {
    const receiverId = currentChat.members.find(
      (member) => member !== currentSeller._id
    );

    socketId.emit('sendMessage', {
      senderId: currentSeller._id,
      receiverId,
      images: e,
    });

    try {
      const { data } = await axios.post(
        `http://5000/message/create-new-message`,
        {
          images: e,
          sender: currentSeller._id,
          text: newMessage,
          conversationId: currentChat._id,
        }
      );
      setImages();
      setMessages([...messages, data.message]);
      updateLastMessageForImage();
    } catch (error) {
      console.log(error);
    }
  };

  // Update latest message for an image
  const updateLastMessageForImage = async () => {
    try {
      const { data } = await axios.put(
        `http://5000//conversation/update-last-message/${currentChat._id}`,
        {
          lastMessage: 'Photo',
          lastMessageId: currentSeller._id,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Scroll handler
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: 'smooth' });
  }, [messages]);

  return (
    <main className="message-dashboar-page">
      {!open && (
        <section>
          <h1 className="title">All Messages</h1>
          {/* All messages list */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageListDashboard
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={currentSeller._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
                isLoading={loading}
              />
            ))}
        </section>
      )}

      <section>
        {open && (
          <SellerInboxDashboar
            setOpen={setOpen}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessageHandler={sendMessageHandler}
            messages={messages}
            sellerId={currentSeller._id}
            userData={userData}
            activeStatus={activeStatus}
            scrollRef={scrollRef}
            setMessages={setMessages}
            handleImageUpload={handleImageUpload}
          />
        )}
      </section>
    </main>
  );
};

export default MessageDashboard;
