import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'
import './ReadPosts.css'

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);
    const [sortMethod, setSortMethod] = useState('time');
    const [searchTerm, setSearchTerm] = useState(''); // Add this line

    useEffect(() => {
        const fetchPosts = async () => {
            const {data} = await supabase
              .from('Posts')
              .select()
              .order(sortMethod === 'time' ? 'created_at' : 'upvotes', { ascending: false });
          
            // set state of posts
            setPosts(data)
        }

        fetchPosts();
    }, [sortMethod]);

    const handleSortChange = (e) => {
        setSortMethod(e.target.value);
    };

    const handleSearchChange = (e) => { // Add this function
        setSearchTerm(e.target.value);
    };
    
    return (
        <div className="Sort">
            <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search posts..." /> {/* Add this line */}
            <select value={sortMethod} onChange={handleSortChange}>
                <option value="time">Sort by Time</option>
                <option value="upvotes">Sort by Upvotes</option>
            </select>
            {
                posts && posts.length > 0 ?
                posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase())).map((post,index) => // Modify this line
                   <Card id={post.id} title={post.title} created_at={post.created_at} upvotes={post.upvotes}/>
                ) : <h2>{'No Posts Have Been Made Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts;