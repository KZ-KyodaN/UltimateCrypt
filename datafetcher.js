const API_KEY = "TYPEYOURAPIHERE"; // Type your TwelveData's API key here

export async function fetchStockData(symbols = ["AAPL", "GOOGL", "MSFT", "NVDA", "AMZN"]) {
  const results = [];

  for (const symbol of symbols) {
    try {
      const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.values || !data.values[0]) throw new Error("there is no data bro");
      results.push(`${symbol}:${data.values[0].close}`);
    } catch (err) {
      console.error(`Receiving error ${symbol}:`, err);
      results.push(`${symbol}:ERROR`);
    }
  }

  return results;
}

export async function fetchCryptoData(symbols = ["BTC/USD", "ETH/USD", "SOL/USD"]) {
  const results = [];

  for (const symbol of symbols) {
    try {
      const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.values || !data.values[0]) throw new Error("there is no data bro");
      results.push(`${symbol}:${data.values[0].close}`);
    } catch (err) {
      console.error(`Receiving error ${symbol}:`, err);
      results.push(`${symbol}:ERROR`);
    }
  }

  return results;
}


export async function fetchWeatherData() {
  const cities = [
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    { name: "London", lat: 51.5072, lon: -0.1276 },
    { name: "Almaty", lat: 43.2567, lon: 76.9286 },
  ];

  const results = await Promise.all(
    cities.map(async (c) => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current_weather=true`;
        const response = await fetch(url);
        const data = await response.json();
        const w = data.current_weather;
        return `${c.name}:${w.temperature}:${w.windspeed}`;
      } catch (e) {
        console.error(`Receiving error ${c.name}:`, e);
        return `${c.name}:ERROR`;
      }
    })
  );

  return results;
}
