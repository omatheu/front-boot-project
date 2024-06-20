import React, { useState } from 'react';
import './style/results.css';
import Navbar from './navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

function Results() {
  return (
    <div>
      <div className="input-container">
        <h1 className="title-light">Boot sentiment analyst</h1>
        <h2 className="title-bold">Jäger</h2>
        <p className="description">Simply input your text, and our tool will instantly classify it as positive, negative, or neutral. Using advanced Natural Language Processing (NLP), we provide quick and accurate sentiment analysis to help you understand the emotional tone of any message. Try it now and gain valuable insights from your text!</p>
        <div className="file-upload-container">
            <div className="file-upload-box">
                <div className="main-card">
                  <p className='card-title'>Intesidade do Sentimento - </p>
                  <p className='sentiment'>07</p>
                </div>
                <p className="classification">O sentimento é classificado como negativo</p>
            </div>
        </div>
        <div className="results-subtitle">
            <div className="subtitle-div">
                <div className="intensity-column">
                  <p className='card-title'>Intesidade</p>
                  <p className='positive-sentiment'>0</p>
                  <p className='negative-sentiment'>10</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="2" height="174" viewBox="0 0 2 174" fill="none">
                    <path d="M1 0V174" stroke="#9CACD9"/>
                </svg>
                <div className="sentiment-column">
                  <p className='card-title'>Sentimento</p>
                  <p className='positive-sentiment'>Positivo</p>
                  <p className='negative-sentiment'>Negativo</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

// Substitua esta função pela sua função real de envio ao banco de dados
function sendDataToDatabase(data) {
  console.log('Sending to database:', data);
  // Aqui você faria a chamada à API ou ao método para inserir no banco de dados
}

export default Results;
