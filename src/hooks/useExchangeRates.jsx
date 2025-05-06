import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useExchangeRates = () => {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "44f0c05370ca94a9c84ec0da";

  const fetchRates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
      );

      if (response.data.result === "success") {
        setRates(response.data.conversion_rates);
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
  }, [baseCurrency]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates, baseCurrency]);

  return {
    rates,
    baseCurrency,
    setBaseCurrency,
    loading,
    error,
    fetchRates,
  };
};
