import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { SERVER_URL } from '../../config/env.config';

const socket = io(SERVER_URL);

export const Activities = () => {
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    socket.on("newActivity", (activity) => {
      setActivities((preActivities) => [...preActivities, activity]);
    })
  
    return () => {
      socket.off("newActivity");
    }
  }, [])
  
  useEffect(() => {
    axios.get(`${SERVER_URL}/activities`)
      .then((response) => setActivities(response.data))
      .catch((error) => console.log(error));
  }, []);
  

  return (
    <div>
      <h1>Activities</h1>
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            <h2>{activity.title}</h2>
            <p>{activity.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
