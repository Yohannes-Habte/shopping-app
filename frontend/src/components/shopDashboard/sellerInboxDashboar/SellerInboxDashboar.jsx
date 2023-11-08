import React from 'react';
import { AiOutlineArrowRight, AiOutlineSend } from 'react-icons/ai';
import { TfiGallery } from 'react-icons/tfi';
import { format } from 'timeago.js';

const SellerInboxDashboar = ({
  scrollRef,
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  handleImageUpload,
}) => {
  return (
    <div className="seller-inbox-dashboar-wrapper">
      {/* message header */}
      <article className="message-header-wrapper">
        <figure className="flex">
          <img
            src={`${userData?.avatar?.url}`}
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
        </figure>

        <h1 className="subTitle">{userData?.name}</h1>
        <p>{activeStatus ? 'Active Now' : ''}</p>

        <AiOutlineArrowRight className="icon" onClick={() => setOpen(false)} />
      </article>

      {/* messages */}
      <div className="message-wrapper">
        {messages &&
          messages.map((item, index) => {
            return (
              <div
                className={
                  item.sender === sellerId ? 'justify-end' : 'justify-start'
                }
                ref={scrollRef}
              >
                {item.sender !== sellerId && (
                  <img
                    src={`${userData?.avatar?.url}`}
                    className="image"
                    alt="User"
                  />
                )}
                {item.images && (
                  <img src={`${item.images?.url}`} className="image" />
                )}
                {item.text !== '' && (
                  <div>
                    <div
                      className={
                        item.sender === sellerId ? 'active' : 'passive'
                      }
                    >
                      <p>{item.text}</p>
                    </div>

                    <p className="createdAt">{format(item.createdAt)}</p>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* send message input */}
      <form aria-required={true} className="form" onSubmit={sendMessageHandler}>
        <div className="input-container">
          <input
            type="file"
            name=""
            id="image"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="label">
            <TfiGallery className="cursor-pointer" size={20} />
          </label>
        </div>
        <div className="input-container">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={``}
          />
          <button type="submit">Send</button>

          <label htmlFor="send">
            <AiOutlineSend className="icon" />
          </label>
        </div>
      </form>
    </div>
  );
};

export default SellerInboxDashboar;
