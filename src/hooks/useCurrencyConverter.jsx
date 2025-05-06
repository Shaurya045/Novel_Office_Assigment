import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useCurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "44f0c05370ca94a9c84ec0da";

  const fetchRates = useCallback(async (baseCurrency = "USD") => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
      );

      if (response.data.result === "success") {
        setRates(response.data.conversion_rates);
        setCurrencies(Object.keys(response.data.conversion_rates));
      } else {
        throw new Error("Failed to fetch exchange rates");
      }

      setLoading(false);
    } catch (err) {
      setError(
        "Failed to fetch exchange rates: " + (err.message || "Unknown error")
      );
      setLoading(false);
      console.error("Error fetching exchange rates:", err);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const convertCurrency = useCallback(
    async (amount, fromCurrency, toCurrency) => {
      if (fromCurrency === toCurrency) return amount;

      if (Object.keys(rates).length === 0) {
        await fetchRates();
      }

      if (rates[fromCurrency] && rates[toCurrency]) {
        let amountInUSD = amount;
        if (fromCurrency !== "USD") {
          amountInUSD = amount / rates[fromCurrency];
        }

        if (toCurrency === "USD") {
          return amountInUSD;
        } else {
          return amountInUSD * rates[toCurrency];
        }
      }
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
        );

        if (response.data.result === "success") {
          return response.data.conversion_result;
        } else {
          throw new Error("Failed to convert currency");
        }
      } catch (err) {
        console.error("Error converting currency:", err);
        return amount;
      }
    },
    [rates, fetchRates]
  );

  return {
    rates,
    currencies,
    loading,
    error,
    fetchRates,
    convertCurrency,
  };
};
