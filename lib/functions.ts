export const fetchWeather = async () => {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}&q=Benin%20City,Nigeria&days=3&aqi=no`,
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching weather:", err);
  }
};
