import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
import { ExchangeRecord } from "../hooks/useExchangeHistory";
import {
  fetchCurrencyNames,
  fetchExchangeRates,
} from "../services/ExchangeRateService";

interface Rates {
  [key: string]: number;
}

interface State {
  dispatch: React.Dispatch<Action>;
  history: ExchangeRecord[];
  ratesData: Rates;
  currencyNames: { [key: string]: string };
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  convertedAmount: string;
}

const initialState: State = {
  ratesData: {},
  currencyNames: {},
  amount: "1",
  fromCurrency: "EUR",
  toCurrency: "USD",
  convertedAmount: "",
  history: [],
  dispatch: () => {},
};

type Action =
  | { type: "SET_RATES_DATA"; payload: Rates }
  | { type: "SET_CURRENCY_NAMES"; payload: { [key: string]: string } }
  | { type: "SET_AMOUNT_FROM"; payload: string }
  | { type: "SET_AMOUNT_TO"; payload: string }
  | { type: "SET_FROM_CURRENCY"; payload: string }
  | { type: "SET_TO_CURRENCY"; payload: string }
  | { type: "ADD_EXCHANGE_RECORD"; payload: ExchangeRecord };

export const CurrencyContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  lastUpdated: string;
}>({ state: initialState, dispatch: () => undefined, lastUpdated: "" });

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case "SET_RATES_DATA":
          return {
            ...state,
            ratesData: action.payload,
            convertedAmount: convertCurrency(
              state.amount,
              state.fromCurrency,
              state.toCurrency,
              action.payload
            ),
          };
        case "SET_CURRENCY_NAMES":
          return { ...state, currencyNames: action.payload };
        case "SET_FROM_CURRENCY":
        case "SET_TO_CURRENCY":
          return {
            ...state,
            [action.type === "SET_FROM_CURRENCY"
              ? "fromCurrency"
              : "toCurrency"]: action.payload,
            convertedAmount: convertCurrency(
              state.amount,
              state.fromCurrency,
              state.toCurrency,
              state.ratesData
            ),
          };
        case "SET_AMOUNT_FROM":
          return {
            ...state,
            amount: action.payload,
            convertedAmount: convertCurrency(
              action.payload,
              state.fromCurrency,
              state.toCurrency,
              state.ratesData
            ),
          };
        case "SET_AMOUNT_TO":
          return {
            ...state,
            convertedAmount: action.payload,
            amount: convertCurrency(
              action.payload,
              state.toCurrency,
              state.fromCurrency,
              state.ratesData,
              true
            ),
          };
        case "ADD_EXCHANGE_RECORD":
          return {
            ...state,
            history: [action.payload, ...state.history],
          };
        default:
          return state;
      }
    },
    initialState,
    (initial) => {
      const storedHistory = localStorage.getItem("exchangeHistory");
      return {
        ...initial,
        history: storedHistory ? JSON.parse(storedHistory) : [],
      };
    }
  );

  const [lastUpdated, setLastUpdated] = useState("");

  const fetchAndSetRates = async () => {
    const response = await fetchExchangeRates();
    dispatch({ type: "SET_RATES_DATA", payload: response.rates });
    setLastUpdated(new Date().toLocaleString());
  };

  useEffect(() => {
    if (state.convertedAmount && parseFloat(state.convertedAmount) > 0) {
      const newRecord: ExchangeRecord = {
        fromCurrency: state.fromCurrency,
        toCurrency: state.toCurrency,
        amount: state.amount,
        convertedAmount: state.convertedAmount,
        date: new Date().toISOString(),
      };

      console.log("Dispatching new record:", newRecord); // Debugging log
      const updatedHistory = [newRecord, ...state.history];

      dispatch({ type: "ADD_EXCHANGE_RECORD", payload: newRecord });

      // Save history to local storage
      localStorage.setItem("exchangeHistory", JSON.stringify(updatedHistory));
    }
  }, [
    state.amount,
    state.fromCurrency,
    state.toCurrency,
    state.convertedAmount,
  ]);

  useEffect(() => {
    fetchAndSetRates();

    const interval = setInterval(() => {
      fetchAndSetRates();
    }, 72000000); // Fetch rates every 20 hours

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const names = await fetchCurrencyNames();
      dispatch({ type: "SET_CURRENCY_NAMES", payload: names });
    };
    fetchData();
  }, []);

  return (
    <CurrencyContext.Provider value={{ state, dispatch, lastUpdated }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => useContext(CurrencyContext);

function convertCurrency(
  amount: string,
  fromCurrency: string,
  toCurrency: string,
  rates: Rates,
  reverse = false
): string {
  const amountFloat = parseFloat(amount);
  if (amount === "" || isNaN(amountFloat) || amountFloat === 0) return "0";

  let result;

  if (fromCurrency === toCurrency) {
    result = amountFloat;
  } else if (fromCurrency === "EUR") {
    result = amountFloat * (rates[toCurrency] || 1);
  } else if (toCurrency === "EUR") {
    result = amountFloat / (rates[fromCurrency] || 1);
  } else {
    result =
      (amountFloat / (rates[fromCurrency] || 1)) * (rates[toCurrency] || 1);
  }

  return result.toFixed(2);
}
