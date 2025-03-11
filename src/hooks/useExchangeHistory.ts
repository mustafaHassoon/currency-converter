import { useState, useCallback, useEffect, useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";

export interface ExchangeRecord {
  fromCurrency: string;
  toCurrency: string;
  amount: string; // Include amount as a string
  convertedAmount: string; // Include convertedAmount as a string
  date: string;
}

export const useExchangeHistory = () => {
  useContext(CurrencyContext);

  const [history, setHistory] = useState<ExchangeRecord[]>(() => {
    const storedHistory = localStorage.getItem("exchangeHistory");
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  const addExchangeRecord = useCallback((newRecord: ExchangeRecord) => {
    setHistory((prevHistory) => {
      const duplicate = prevHistory.some(
        (record) =>
          record.fromCurrency === newRecord.fromCurrency &&
          record.toCurrency === newRecord.toCurrency &&
          record.date.substring(0, 10) === newRecord.date.substring(0, 10)
      );
      if (!duplicate) {
        const updatedHistory = [newRecord, ...prevHistory];
        localStorage.setItem("exchangeHistory", JSON.stringify(updatedHistory));
        return updatedHistory;
      }
      return prevHistory;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("exchangeHistory", JSON.stringify(history));
  }, [history]);

  return {
    history,
    addExchangeRecord, // Ensure this is returned
  };
};
