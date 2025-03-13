const ACCESS_KEY = process.env.EXCHANGE_API_KEY as string;
const RATES_API_URL = process.env.RATES_API_URL as string;
const CURRENCY_API_URL = process.env.CURRENCY_API_URL as string;

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
