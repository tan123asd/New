// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const goToAssist = () => {
        navigate('/assist');
    };
    
    const goToYoutube = () => {
        window.location.href = 'https://www.youtube.com/';
    };

    return (
        <div style={{ textAlign: 'center',}}>
            <h1>Home Page</h1>
            <a href="https://support.lenovo.com/" target="_blank" rel="noopener noreferrer">
            <button>SP Lenovo</button>
            </a>
            <button onClick={goToYoutube}>Youtube</button>
            <button onClick={goToAssist}>Go to Assist1 Page</button>
        </div>
    );
}

export default Home;
