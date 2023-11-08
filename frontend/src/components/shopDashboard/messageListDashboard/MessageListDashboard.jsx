import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MessageListDashboard = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
  isLoading,
}) => {
  console.log(data);

  const navigate = useNavigate();

  // Local state variable
  const [user, setUser] = useState([]);

  // Handle click
  const handleClick = (id) => {
    navigate(`/dashboard-messages?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(0);

  // Get user and display on the browser
  useEffect(() => {
    const userId = data.members.find((user) => user != me);

    const getUser = async () => {
      try {
        const res = await axios.get(`http://5000//user/user-info/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);

  return (
    <section
      className={active === index ? 'active' : 'passive'}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <figure className="image-container">
        <img src={`${user?.avatar?.url}`} alt="" className="image" />
        {online ? <div className="online" /> : <div className="offline" />}
      </figure>

      <h1 className="subTitle">{user?.name}</h1>
      <p className="user">
        {!isLoading && data?.lastMessageId !== user?._id
          ? 'You:'
          : user?.name.split(' ')[0] + ': '}{' '}
        {data?.lastMessage}
      </p>
    </section>
  );
};

export default MessageListDashboard;
