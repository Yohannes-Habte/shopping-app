import React, { useState } from 'react';
import { BsCartPlusFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';

const SingleWishList = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="single-wish-list">
      <MdDelete className="icon-delete" />

      <figure>
        <img src="" alt="" />
      </figure>

      <article>
        <h2> {data.name} </h2>
        <p> Price: ${data.price} </p>
        <p> Total Price: ${totalPrice} </p>
      </article>
      <BsCartPlusFill />
    </div>
  );
};

export default SingleWishList;
