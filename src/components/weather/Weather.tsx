import React, { FC, useState, useEffect } from "react";

const Weather: FC = () => {
	const [weatherData, setWeatherData] = useState<any>(null);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		const apiKey = "498baaca66930fc0407277fa1609008d";
		const lat = 37.7749;
		const lon = -122.4194;
		const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => setWeatherData(data))
			.catch((error) => setError(error));
	}, []);

	console.log(weatherData);

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!weatherData) {
		return <div>Downloading...</div>;
	}

	return (
		<div>
			<h1>{weatherData.name} weather forecast</h1>
			<p>Temperature: {weatherData.timezone}</p>
			<p>Description: {weatherData.weather[0].description}</p>
		</div>
	);
};

export default Weather;
