import React, { useContext } from 'react';
import { CurrencyContext } from './utils/Context';

// DropDown component for selecting currencies
const DropDown = ({ label, currencyType }) => {
  // Use the context to get the currency data and state setters
  const { apiData, fromCurrency, toCurrency, setFromCurrency, setToCurrency } = useContext(CurrencyContext);

  // Handle the change event for the dropdown
  const handleChange = (e) => {
    // If the currencyType is 'from', update the fromCurrency state
    if (currencyType === 'from') {
      setFromCurrency(e.target.value);
    } else {
      // Otherwise, update the toCurrency state
      setToCurrency(e.target.value);
    }
  };

  // Determine which currency is currently selected based on the currencyType prop
  const selectedCurrency = currencyType === 'from' ? fromCurrency : toCurrency;

  return (
    <div className="w-1/2">
      {/* Label for the dropdown */}
      <label className="block mb-2 text-white">{label}</label>
      {/* Dropdown menu for selecting currency */}
      <select
        value={selectedCurrency}
        onChange={handleChange}
        className="focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full px-4 py-2 border rounded-md"
      >
        {/* Map over the apiData object keys to create an option element for each currency */}
        {Object.keys(apiData).map((currency) => (
          <option key={currency} value={currency}>
            {currency} - {apiData[currency]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
