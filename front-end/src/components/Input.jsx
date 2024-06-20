import React, { useState } from 'react';
import './style/Input.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Input() {
  const [inputText, setInputText] = useState(''); // Estado para armazenar o valor do input
  const [responseMessage, setResponseMessage] = useState(''); // Estado para armazenar a mensagem de resposta
  const [loading, setLoading] = useState(false); // Estado para gerenciar o carregamento
  const [error, setError] = useState(null); // Estado para gerenciar erros

  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir o comportamento padrão do formulário
    console.log('Enviando texto:', inputText); // Log para desenvolvimento, substituir pela chamada ao banco de dados

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/pipeline", { text: inputText });
      setResponseMessage(response.data.prediction);
    } catch (err) {
      console.error('Erro ao enviar texto:', err);
      setError('Erro ao enviar texto. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
      setInputText('');
    }
  };

  // Função para atualizar o estado com o valor do input
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmitUpload = async (event) => {
    event.preventDefault();
    setLoading(true); // Indicando que a requisição está sendo feita

    const formData = new FormData();
    formData.append('file', file); // Certificando-se de que a chave seja "file"

    try {
      const response = await axios.post("http://localhost:8000/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }); 
      setResponseMessage(response.data.message || 'Arquivo enviado com sucesso!');
    } catch (err) {
      console.error('Erro ao enviar arquivo:', err);
      setError('Erro ao enviar arquivo. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <div className="input-container">
        <h1 className="title-light">Boot sentiment analyst</h1>
        <h2 className="title-bold">Jäger</h2>
        <p className="description">Simply input your text, and our tool will instantly classify it as positive, negative, or neutral. Using advanced Natural Language Processing (NLP), we provide quick and accurate sentiment analysis to help you understand the emotional tone of any message. Try it now and gain valuable insights from your text!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Put here the tweet"
            className="input-box"
            value={inputText}
            onChange={handleInputChange}
          />
          <button className='submit-button' type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Submit'}
          </button>
        </form>
        <div className="file-upload-container">
            <div className="file-upload-box">
                <div className="main-card">
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
                  <p className='card-title'>Drag and drop files here</p>
                </div>
                <p className="limit-text">Limit 200MB per file</p>
                  <form onSubmit={handleSubmitUpload}>
                  <label htmlFor="file-upload" className="custom-file-upload">
                    Escolher arquivo
                  </label>
                  <input id="file-upload" type="file" accept=".csv" onChange={handleFileChange} />
                    <button className='submit-button' type="submit" disabled={loading}>Enviar</button>
                  </form>
                  {loading && <p>Enviando arquivo...</p>}
                  {error && <p>{error}</p>}
                  {responseMessage && <p>Resposta do servidor: {responseMessage}</p>}
            </div>
        </div>
        <div className="results-subtitle">
            <div className="subtitle-div">
                <div className="intensity-column">
                  <p className='card-title'>Frase</p>
                  <p className='positive-sentiment'>That, my friend, is why The Mighty Swift Radio Cars of Stalybridge retain my costume.</p>
                  <p className='negative-sentiment'>Uber broke laws, duped police and secretly lobbied governments, leak reveals</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="2" height="174" viewBox="0 0 2 174" fill="none">
                    <path d="M1 0V174" stroke="#9CACD9"/>
                </svg>
                <div className="sentiment-column">
                  <p className='card-title'>Sentimento</p>
                  <p className='positive-sentiment'>1</p>
                  <p className='negative-sentiment'>0</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}


export default Input;
