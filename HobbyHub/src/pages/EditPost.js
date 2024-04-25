import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { supabase } from '../client'
import { Link } from 'react-router-dom'

const EditPost = ({data}) => {
    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", content: "", image_url: "", upvotes: 0});

    useEffect(() => {
        const fetchPost = async () => {
            const { data: post, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) console.log("Error: ", error);
            else if (post) setPost(post);
        };

        fetchPost();
    }, [id]);

    const updatePost = async (event) => {
        event.preventDefault();

        const { error: updateError } = await supabase
            .from('Posts')
            .update({ title: post.title, content: post.content, image_url: post.image_url, upvotes: post.upvotes })
            .eq('id', id);

        if (updateError) {
            console.error('Error updating post: ', updateError);
        } else {
            window.location = "/";
        }
    }

    const deletePost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .delete()
          .eq('id', id); 
      
        window.location = "http://localhost:3000/";
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
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
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="content">Content</label><br />
                <textarea rows="5" cols="50" id="content" name="content" value={post.content} onChange={handleChange}></textarea><br />
                <br/>

                <label htmlFor="image_url">Image URL</label><br />
                <input type="text" id="image_url" name="image_url" value={post.image_url} onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Submit" onClick={updatePost}/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost