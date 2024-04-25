import React, { useState } from 'react';
import './CreatePost.css'
import { supabase } from '../client'
import { Link } from 'react-router-dom'

const CreatePost = () => {

    const [post, setPost] = useState({ title: "", content: "", image_url: "", upvotes: 0 })

    const createPost = async (event) => {
        event.preventDefault();

        const { error } = await supabase
            .from('Posts')
            .insert({ title: post.title, content: post.content, image_url: post.image_url, upvotes: post.upvotes });

        if (error) {
            console.error('Error: ', error);
        } else {
            window.location = "/";
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    return (
        <div>
            <Link to="/" style={{ position: 'absolute', top: 0, left: 0 }}>
                <button>Back to Posts</button>
            </Link>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br />

                <label htmlFor="content">Content</label><br />
                <textarea rows="5" cols="50" id="content" name="content" onChange={handleChange}></textarea><br />
                <br />

                <label htmlFor="image_url">Image URL</label><br />
                <input type="text" id="image_url" name="image_url" onChange={handleChange} /><br />
                <br />

                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost