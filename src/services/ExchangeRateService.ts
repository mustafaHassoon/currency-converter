const ACCESS_KEY = "84d44ebe787c90781987cf6285bd2d2a";
const RATES_API_URL = "http://api.exchangeratesapi.io/v1/latest";
const CURRENCY_API_URL = "http://openexchangerates.org/api/currencies.json";

interface ExchangeRatesResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export const fetchExchangeRates = async (): Promise<ExchangeRatesResponse> => {
  try {
    const response = await fetch(`${RATES_API_URL}?access_key=${ACCESS_KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }
    const data: ExchangeRatesResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};

interface CurrencyMap {
  [code: string]: string;
}

export const fetchCurrencyNames = async (): Promise<CurrencyMap> => {
  try {
    const response = await fetch(CURRENCY_API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch currency names");
    }
    const data: CurrencyMap = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching currency names:", error);
    throw error;
  }
};
