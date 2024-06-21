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
  const [predictions, setPredictions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const predictionsPerPage = 10;
  const [file, setFile] = useState(null);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir o comportamento padrão do formulário
    console.log('Sending text:', inputText); // Log para desenvolvimento, substituir pela chamada ao banco de dados

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("https://boot-api3.onrender.com/pipeline", { text: inputText });
      setResponseMessage(response.data);
    } catch (err) {
      console.error('Error sending text:', err);
      setError('Error sending text. Try again later.');
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
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file); // Certificando-se de que a chave seja "file"
    
    setLoading(true);
    setError('');
    setResponseMessage('');

    try {
      const response = await axios.post("https://boot-api3.onrender.com/predict_csv", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }); 
      setResponseMessage(response.data.message || 'File sent successfully!');
      console.log(response.data.predictions);
      setPredictions(response.data.predictions);
      setCurrentPage(1);  // Reset to the first page
    } catch (err) {
      console.error('Error sending file:', err);
      setError('Error sending file. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate the current predictions to display based on pagination
  const indexOfLastPrediction = currentPage * predictionsPerPage;
  const indexOfFirstPrediction = indexOfLastPrediction - predictionsPerPage;
  const currentPredictions = predictions.slice(indexOfFirstPrediction, indexOfLastPrediction);
  
  return (
    <div>
      <div className="input-container">
        <h1 className="title-light">Boot sentiment analyst</h1>
        <h2 className="title-bold">Jäger</h2>
        <p className="description">Simply input your text, and our tool will instantly classify it as positive and negative. Using advanced Natural Language Processing (NLP), we provide quick and accurate sentiment analysis to help you understand the emotional tone of any message. Try it now and gain valuable insights from your text!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Put here the tweet"
            className="input-box"
            value={inputText}
            onChange={handleInputChange}
          />
          <button className='submit-button' type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
        <div className="file-upload-container">
            <div className="file-upload-box">
                <div className="main-card">
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
                  <p className='card-title'>Drag and drop files here (csv with a column called 'comment')</p>
                </div>
                <p className="limit-text">Limit 200MB per file</p>
                  <form onSubmit={handleSubmitUpload}>
                  <label htmlFor="file-upload" className="custom-file-upload">
                    Choose File
                  </label>
                  <input id="file-upload" type="file" accept=".csv" onChange={handleFileChange} />
                    <button className='submit-button' type="submit" disabled={loading}>To send</button>
                  </form>
                  {loading && <p>Sending file...</p>}
                  {error && <p>{error}</p>}
                  {responseMessage && (
                    <>
                      <p>Prediction is: {responseMessage.prediction === 1 ? 'Negative' : responseMessage.prediction === 0 ? 'Positive' : ''}</p>
                      <p><strong>Decision score is: {(responseMessage.decision_score * 100).toFixed(2)}%</strong></p>
                      <p>Threshold: {responseMessage.threshold}</p>
                      <p><strong>Viral Score is: {(responseMessage.viral_score * 1).toFixed(2)}</strong></p>
                    </>
                  )}
                  {console.log(responseMessage)}
            </div>
        </div>
        <div className="results-subtitle">
            <div className="subtitle-div">
                <div className="intensity-column">
                  <p className='card-title'>Comment</p>
                  {currentPredictions.map((prediction, index) => (
                    <p key={index} className={prediction.prediction === 1 ? 'negative-sentiment' : 'positive-sentiment'}>{prediction.comment}</p>
                  ))}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="2" height="174" viewBox="0 0 2 174" fill="none">
                    <path d="M1 0V174" stroke="#9CACD9"/>
                </svg>
                <div className="sentiment-column">
                  <p className='card-title'>Sentiment</p>
                  {currentPredictions.map((prediction, index) => (
                    <p key={index} className={prediction.prediction === 1 ? 'negative-sentiment' : 'positive-sentiment'}>
                      {prediction.prediction === 1 ? 'Negative' : 'Positive'}
                    </p>
                  ))}
                </div>
            </div>
            {/* Pagination */}
            <div className="pagination">
              <button className='browse-button' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              <button className='browse-button' onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(predictions.length / predictionsPerPage)}>
                Next
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Input;
