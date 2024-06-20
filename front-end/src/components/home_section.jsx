import React from 'react';
import './style/home_section.css'; 
import placeholderImage from '../imgs/imagem_pagina_inicial.png'; 
import Navbar from './navbar';

function HomeSection() {
    return (
        <div className='page'>
            <div className="home-section">
                <div className="container">
                    <h1 className='title'>Jäger</h1>
                    <p className='semi-content'>Jäger, developed by Boot, is a simulation tool for sentiment analysis using Natural Language Processing (NLP) techniques. With Jäger, you can evaluate and classify emotions in texts, visualize data intuitively, and generate detailed reports. Discover how our solution can mitigate risks and assist in decision-making through simulation!</p>
                    <button onClick={() => window.location.href = 'input'} className='button_simulation'>Simulate</button>
                </div>
                <div className="image-container">
                    <img src={placeholderImage} alt="Descrição da imagem" />
                </div>
            </div>
        </div>
    );
}

export default HomeSection;