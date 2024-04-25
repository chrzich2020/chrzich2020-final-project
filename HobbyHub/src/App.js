import './App.css';
import React, { useState, useEffect } from 'react';
import { useRoutes, useLocation } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import AboutPost from './pages/AboutPost'
import { Link } from 'react-router-dom'

const App = () => {
    const posts = []
    const location = useLocation();
    const showHeader = !location.pathname.startsWith('/edit') && !location.pathname.startsWith('/about');

    // Sets up routes
    let element = useRoutes([
        {
            path: "/",
            element:<ReadPosts data={posts}/>
        },
        {
            path:"/edit/:id",
            element: <EditPost data={posts} />
        },
        {
            path:"/new",
            element: <CreatePost />
        },
        {
            path:"/about/:id",
            element: <AboutPost data={posts}/>
        }
    ]);

    return ( 
        <div className="App">
            {showHeader && (
                <div className="header">
                    <h1>HobbyHub</h1>
                    <h3>Create a post about your favorite things!</h3>
                    <Link to="/new"><button className="headerBtn"> Submit Post </button></Link>
                </div>
            )}
            {element}
        </div>
    );
}

export default App;