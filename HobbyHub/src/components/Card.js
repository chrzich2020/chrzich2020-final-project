import React, { useState, useEffect } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { supabase } from '../client'

const Card = (props) =>  {

  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(props.upvotes);
  }, [props.upvotes]);

  const updateCount = async () => {
    const newCount = count + 1;
    setCount(newCount);

    const { error } = await supabase
      .from('Posts')
      .update({ upvotes: newCount })
      .eq('id', props.id);

    if (error) {
      console.error('Error updating upvotes:', error);
    }
  }

  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  // Format the created_at timestamp
  const createdAt = timeSince(new Date(props.created_at));

  return (
      <div className="Card">
          
          <h1 className="title">{props.title}</h1>
          <p className="timestamp">{createdAt}</p>
          <button className="betButton" onClick={updateCount} >Upvote Count: {count}</button>
          <br />
          <Link to={`/about/${props.id}`}>
    <button>Post Details</button>
  </Link>
      </div>
  );
};

export default Card;