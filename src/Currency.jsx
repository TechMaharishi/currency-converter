import React, { useContext } from 'react';
import DropDown from './DropDown'; // Import DropDown component
import { CurrencyContext } from './utils/Context'; // Import CurrencyContext

// Main component for currency conversion
const Currency = () => {
  // Destructure values and functions from CurrencyContext
  const {
    inputAmount,
    setInputAmount,
    amount,
    handleConvert,
    handleSwap
  } = useContext(CurrencyContext);

  // Handle input amount change
  const handleInputChange = (e) => {
    setInputAmount(e.target.value); // Update inputAmount state
  };

  return (
    <div className="w-full max-w-md p-8 rounded-lg shadow-2xl" style={{ backdropFilter: "blur(16px) saturate(200%)", backgroundColor: "rgba(17, 25, 40, 0.5)", border: "1px solid rgba(255, 255, 255, 0.125)" }}>
      <h1 className="mb-6 text-4xl font-bold text-center text-white">Currency Converter</h1>

      <div className="mb-6">
        <label className="block mb-2 text-white">Amount</label>
        <input
          type="number"
          value={inputAmount}
          onChange={handleInputChange}
          className="focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full px-4 py-2 border rounded-md"
          placeholder="Enter amount"
        />
      </div>

      <div className="flex items-center mb-4">
        {/* DropDown component for selecting the "From" currency */}
        <DropDown label="From" currencyType="from" />
        <button
          onClick={handleSwap}
          className="hover:rotate-180 mx-4 text-white transition-transform duration-200 transform"
        >
          &#x21C6; {/* Swap icon */}
        </button>
        {/* DropDown component for selecting the "To" currency */}
        <DropDown label="To" currencyType="to" />
      </div>

      <button
        onClick={handleConvert}
        className="hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 w-full py-2 mb-4 text-white transition duration-200 bg-yellow-500 rounded-md"
      >
        Convert
      </button>

      <div className="p-4 text-center text-gray-800 bg-gray-100 rounded">
        {/* Display the converted amount */}
        Converted Amount: <span className="font-bold">{amount}</span>
      </div>
    </div>
  );
};

export default Currency;
