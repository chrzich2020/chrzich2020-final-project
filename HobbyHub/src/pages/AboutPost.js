import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useParams, Link } from 'react-router-dom';
import './AboutPost.css';

const AboutPost = () => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) console.error(error);
            else setPost(data);
        };

        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('Comments')
                .select('*')
                .eq('post_id', id);

            if (error) console.error(error);
            else setComments(data);
        };

        fetchPost();
        fetchComments();
    }, [id]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        const { data: comment, error } = await supabase
            .from('Comments')
            .insert([{ text: newComment, post_id: id }]);

        if (error) console.error(error);
        else if (comment) setComments([...comments, comment.data[0]]);
    };

    const handleUpvote = async () => {
    const { error } = await supabase
        .from('Posts')
        .update({ upvotes: post.upvotes + 1 })
        .eq('id', id);

    if (error) console.error(error);
    else setPost({ ...post, upvotes: post.upvotes + 1 });
};

const handleEdit = () => {
    // Navigate to the edit page for this post
    // Replace '/edit' with the actual path to your edit page
    window.location.href = `/edit/${id}`;
};

const handleDelete = async () => {
    const { error } = await supabase
        .from('Posts')
        .delete()
        .eq('id', id);

    if (error) console.error(error);
    else {
        // Navigate back to the posts list after successful deletion
        // Replace '/' with the actual path to your posts list
        window.location.href = '/';
    }
};

    if (!post) return null;

    

    return (
        <div className="AboutPost">
            <Link to="/" style={{ position: 'absolute', top: 0, left: 0 }}>
                <button>Back to Posts</button>
            </Link>
            <div className="edit">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            </div>
            <div className="centered-content">
                <h1>{post.title}</h1>
                <p>{post.content}</p>
                <div className='image'>
                <img src={post.image_url} alt={post.title} />
                </div>
                <p>Upvotes: {post.upvotes}</p>
            <button onClick={handleUpvote}>Upvote</button>
                <form onSubmit={handleCommentSubmit}>
                    <input
                        type="text"
                        value={newComment}
                        onChange={handleCommentChange}
                        placeholder="Write a comment..."
                    />
                    <button type="submit">Submit</button>
                </form>
               {comments.map((comment, index) => (
    comment && <div className="comment" key={index}>{comment.text}</div>
))}
            </div>
        </div>
    );
};

export default AboutPost;