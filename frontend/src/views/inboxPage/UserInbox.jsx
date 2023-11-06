import React, { useEffect, useRef, useState } from 'react';
import './UserInbox.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MessageList from '../../components/chat/messageList/MessageList';
import SellerInbox from '../../components/chat/sellerInbox/SellerInbox';
import Header from '../../components/layout/header/Header';

const UserInbox = () => {
  // Global state variables
  const { currentUser, loading } = useSelector((state) => state.user);

  // Local state variables
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [images, setImages] = useState();
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);

  // User ref
  const scrollRef = useRef(null);

  // Get message
  useEffect(() => {
    //   socketId.on("getMessage", (data) => {
    //     setArrivalMessage({
    //       sender: data.senderId,
    //       text: data.text,
    //       createdAt: Date.now(),
    //     });
    //   });
  }, []);

  // Display message
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // Get conversation
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/chats/user/conversations/${currentUser?._id}`,
          {
            withCredentials: true,
          }
        );

        setConversations(data.conversations);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchConversations();
  }, [currentUser, messages]);

  // Get sellers and users
  useEffect(() => {
    if (currentUser) {
      const sellerId = currentUser?._id;
      // socketId.emit("addUser", sellerId);
      // socketId.on("getUsers", (data) => {
      //   setOnlineUsers(data);
      // });
    }
  }, [currentUser]);

  // Online chack
  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find(
      (member) => member !== currentUser?._id
    );
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/chats/messages/user/${currentChat?._id}`
        );
        setMessages(data.messages);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getMessage();
  }, [currentChat]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== currentUser?._id
    );

    // socketId.emit("sendMessage", {
    //   senderId: currentUser?._id,
    //   receiverId,
    //   text: newMessage,
    // });

    try {
      if (newMessage !== '') {
        await axios
          .post(
            `http://localhost:5000/api/chats/message/create-new-message`,
            message
          )
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update the last message
  const updateLastMessage = async () => {
    // socketId.emit("updateLastMessage", {
    //   lastMessage: newMessage,
    //   lastMessageId: currentUser._id,
    // });

    await axios
      .put(`/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: currentUser._id,
      })
      .then((res) => {
        setNewMessage('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    const reader = new FileReader();

    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     setImages(reader.result);
    //     imageSendingHandler(reader.result);
    //   }
    // };

    reader.readAsDataURL(e.target.files[0]);
  };

  // Image sending handler
  const imageSendingHandler = async (e) => {
    const receiverId = currentChat.members.find(
      (member) => member !== currentUser._id
    );

    // socketId.emit("sendMessage", {
    //   senderId: currentUser._id,
    //   receiverId,
    //   images: e,
    // });

    try {
      await axios
        .post(`/message/create-new-message`, {
          images: e,
          sender: currentUser._id,
          text: newMessage,
          conversationId: currentChat._id,
        })
        .then((res) => {
          setImages();
          setMessages([...messages, res.data.message]);
          //   updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Update last message image
  const updateLastMessageForImage = async () => {
    await axios.put(`/conversation/update-last-message/${currentChat._id}`, {
      lastMessage: 'Photo',
      lastMessageId: currentUser._id,
    });
  };

  // Scroll use ref
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: 'smooth' });
  }, [messages]);

  return (
    <main className="user-inbox-page">
      {!open && (
        <React.Fragment>
          <Header />
          <section className="inbox-container">
            <h1 className="inbox-title"> All Messages </h1>

            {/* All messages list */}
            {conversations &&
              conversations.map((item, index) => (
                <MessageList
                  data={item}
                  key={index}
                  index={index}
                  setOpen={setOpen}
                  setCurrentChat={setCurrentChat}
                  me={currentUser?._id}
                  setUserData={setUserData}
                  userData={userData}
                  online={onlineCheck(item)}
                  setActiveStatus={setActiveStatus}
                  loading={loading}
                />
              ))}

            {open && (
              <SellerInbox
                setOpen={setOpen}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                sendMessageHandler={sendMessageHandler}
                messages={messages}
                sellerId={currentUser._id}
                userData={userData}
                activeStatus={activeStatus}
                scrollRef={scrollRef}
                handleImageUpload={handleImageUpload}
              />
            )}
          </section>
        </React.Fragment>
      )}
    </main>
  );
};

export default UserInbox;
