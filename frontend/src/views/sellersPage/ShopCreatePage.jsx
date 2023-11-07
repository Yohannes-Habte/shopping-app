import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopCreate from '../../components/shop/createShop/CreateShop';

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const { currentSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (currentSeller) {
      // navigate(`/shop/${currentSeller._id}`);
      navigate('/create-shop');
    }
  }, []);
  return <ShopCreate />;
};

export default ShopCreatePage;
