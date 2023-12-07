import React, { useState } from 'react';
import './Profile.scss';
import { useSelector } from 'react-redux';
import UserProfile from '../../../components/user/userProfile/UserProfile';
import Header from '../../../components/userLayout/header/Header';
import ProfileSidebar from '../../../components/user/profileSidebar/ProfileSidebar';

const Profile = () => {
  // State  variables
  const { currentUser, loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <main className="profile-page">
      <Header />
      <section className="profile-container">
        <h1 className="profile-title"> Details of {currentUser.name} </h1>

        <div className="sidebar-form-wrapper">
          <ProfileSidebar active={active} setActive={setActive} />

          <UserProfile active={active} />
        </div>
      </section>
    </main>
  );
};

export default Profile;
