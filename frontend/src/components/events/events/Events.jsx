import React, { useEffect, useState } from 'react';
import "./Events.scss"
import { useSelector } from 'react-redux';
import EventCard from '../eventCartd/EventCard';
import axios from 'axios';

const Events = () => {
  // Global state variables
  const { events, loading, error } = useSelector((state) => state.event);
  const { currentSeller } = useSelector((state) => state.seller);

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
    <section className="popular-events-wrapper">
      <h2 className="subTitle">Popular Events</h2>

      <article className="event-cards-wrapper">
        {eventsData.length !== 0 &&
          eventsData.map((event) => <EventCard data={event} key={event._id} />)}
        <h4>{eventsData?.length === 0 && 'New Events are coming soon!'}</h4>
      </article>
    </section>
  );
};

export default Events;
