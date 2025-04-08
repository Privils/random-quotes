import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [quote, setQuote] = useState(null); // start with null instead of []

  const getQuotes = async () => {
    const url = `https://api.api-ninjas.com/v1/quotes`;
    const apiKey = process.env.REACT_APP_API_KEY;

    try {
      const response = await fetch(url, {
        headers: {
          'X-Api-Key': apiKey
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const quoteData = data[0];
      console.log(quoteData);
      setQuote(quoteData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = () => {
    getQuotes();
  };

  return (
    <>
      <section className="main">
        <div className="container">
          {quote ? (
            <div>
              <p className="quote">{quote.quote}</p>
              <p className="author">- {quote.author}</p>
              <div className="button-container">
                <button className="btn" onClick={handleClick}>
                  Get Random Quote
                </button>
              </div>
            </div>
          ) : (
            <div className="button-container">
              <button className="btn" onClick={handleClick}>
                Load First Quote
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;

