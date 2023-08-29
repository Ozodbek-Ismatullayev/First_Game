import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import data1 from './components/signs';
import './Datas.css'

export default function Datas() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [count, setCount] = useState(0);
  const [currentImageId, setCurrentImageId] = useState('');
  const [randomImage, setRandomImage] = useState(null);
  const [lastRandomImageId, setLastRandomImageId] = useState(null);
  const [previousImageTitles, setPreviousImageTitles] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);


  const queryParams = new URLSearchParams(location.search);
  const difficultyValue = queryParams.get('difficulty');
  const timeValue = queryParams.get('time');

  useEffect(() => {
    let totalSeconds = parseInt(timeValue) * 60;
    const timer = setInterval(() => {
      if (totalSeconds > 0) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        setMinute(minutes);
        setSecond(seconds);
        totalSeconds--;
      } else {
        clearInterval(timer);
      }
    }, 1000);

    let numImagesToShow = 0;
    if (difficultyValue === 'easy') numImagesToShow = 20;
    else if (difficultyValue === 'medium') numImagesToShow = 50;
    else if (difficultyValue === 'difficult') numImagesToShow = 80;
    else if (difficultyValue === 'all') numImagesToShow = 100;
    const filteredData = data1.slice(0, numImagesToShow);
    setData(filteredData);

    const initialRandomIndex = Math.floor(Math.random() * filteredData.length);
    setRandomImage(filteredData[initialRandomIndex]);
    setLastRandomImageId(filteredData[initialRandomIndex].id);

    return () => clearInterval(timer);
  }, [difficultyValue, timeValue]);

  const handleImageClick = (imageId) => {
    const filteredData = data.filter((item) => item.id !== lastRandomImageId);

    const availableTitles = filteredData
      .filter((item) => !previousImageTitles.includes(item.symbol_title))
      .map((item) => item.symbol_title);

    if (availableTitles.length === 0) {
      setPreviousImageTitles([]);
    }

    const randomIndex = Math.floor(Math.random() * availableTitles.length);
    const randomTitle = availableTitles[randomIndex];
    const newRandomImage = filteredData.find((item) => item.symbol_title === randomTitle);

    setRandomImage(newRandomImage);
    setLastRandomImageId(newRandomImage.id);

    if (imageId === lastRandomImageId) {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }

    if (imageId === lastRandomImageId) {
      setShowOverlay(true);
      setCount(count + 1);
    } else {
      setShowOverlay(false);
      setCount(count - 1);
    }
    setPreviousImageTitles([...previousImageTitles, randomTitle]);
  };

  return (
    <div className="all">
      <div className="header">
        <h3 className='header-1'>{minute}:{second < 10 ? '0' + second : second}</h3>
        {randomImage && <h2>{randomImage.symbol_title}</h2>}
        <h3 className='header-2'>Count: {count}</h3>
      </div>


      <div className="col-md-8 offset-2">
        <ul>
          {data.map((item, index) => (
            <li key={index} onClick={() => handleImageClick(item.id)}>
              <img alt="IMG" width="100" src={item.symbol_img}onLoad={() => {
                  setCurrentImageId(item.id);}}/>

              {showOverlay && item.id === lastRandomImageId && (
                <div className="overlay-image">
                  <img
                    alt="Overlay"
                    width="50"
                    src="./images/checkmark.gif"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
