import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create a context to store and provide currency data across components
export const CurrencyContext = createContext();

const ContextProvider = (props) => {
  // State variables for API data, input amount, currencies, and converted amount
  const [apiData, setApiData] = useState("");
  const [inputAmount, setInputAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState('');

  // Fetch currency data from the API when the component mounts
  useEffect(() => {
    let isMounted = true;

    axios.get('https://api.frankfurter.app/currencies')
      .then((res) => {
        if (isMounted) {
          setApiData(res.data); // Set the fetched data to apiData state
        }
      })
      .catch((error) => {
        console.log(error); // Log any errors
      });

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []);

  // Function to handle currency conversion
  const handleConvert = () => {
    axios.get(`https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`)
      .then((res) => {
        // Calculate the converted amount and set it to amount state
        setAmount((res.data.rates[toCurrency] * inputAmount).toFixed(2));
      })
      .catch((error) => {
        console.log(error); // Log any errors
      });
  };

  // Function to swap fromCurrency and toCurrency
  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  // Provide state variables and functions to children components
  return (
    <CurrencyContext.Provider value={{
      apiData, setApiData,
      inputAmount, setInputAmount,
      fromCurrency, setFromCurrency,
      toCurrency, setToCurrency,
      amount, setAmount, handleConvert, handleSwap
    }}>
      {props.children}
    </CurrencyContext.Provider>
  );
};

export default ContextProvider;
