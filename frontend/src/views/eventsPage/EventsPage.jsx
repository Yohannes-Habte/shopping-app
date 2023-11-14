import React, { useEffect, useState } from 'react';
import "./EventsPage.scss"
import Header from '../../components/layout/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from '../../components/events/eventCartd/EventCard';
import {
  eventsShopFetchFailure,
  eventsShopFetchStart,
  eventsShopFetchSuccess,
} from '../../redux/reducers/eventReducer';
import axios from 'axios';

const EventsPage = () => {
  // Global state variables
  const { events, loading, error } = useSelector((state) => state.event);
  const { currentSeller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  // local state variables
  const [eventsData, setEventsData] = useState([]);

  console.log('the events data are', eventsData);
  // Display events data
  useEffect(() => {
    const getAllEvents = async () => {
      try {
        // dispatch(eventsShopFetchStart());
        const { data } = await axios.get(
          `http://localhost:5000/api/events/${currentSeller._id}/shop-events`
        );
        setEventsData(data);
        // dispatch(eventsShopFetchSuccess(data));
      } catch (error) {
        console.log(error);
        // dispatch(eventsShopFetchFailure(error.response.data.message));
      }
    };
    getAllEvents();
  }, []);
  return (
    <main className="events-page">
      <Header />

      <section className="events-page-container">
        <h1 className="events-title">Best Selling </h1>

        <article className="event-cards-wrapper">
          {eventsData.length !== 0 &&
            eventsData.map((event) => (
              <EventCard data={event} key={event._id} />
            ))}
          <h2 className="subTitle">
            {eventsData?.length === 0 && 'New Events are coming soon!'}
          </h2>
        </article>
      </section>
    </main>
  );
};

export default EventsPage;
