import React, { useState } from 'react'
import './WeatherApp.css'


export const WeatherApp = () => {


  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState('')

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = 'd239b2633da2ee617128264335cebd3c'
  const diffKelvin = 273.15

  const fetchWeatherData = async () => {
    try {
      if(!city.trim()) {
        setError('Por favor, ingrese una ciudad')
        window.alert("Por favor, ingrese una ciudad")
        return
      }

      const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
      const data = await response.json()
      setWeatherData(data)

      if (data.cod == 404){
        setError("Ingrese una ciudad válida")
        window.alert("Ingrese una ciudad válida")
        setWeatherData(null)
      } else{
        setWeatherData(data)
        setError('')
      }
    } catch (error) {
      console.error('Ha ocurrido un error: ', error)

    }
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchWeatherData();

  }


  return (
    <div className='container'>
      <h1>Aplicación del Clima</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Ingresa una ciudad'
          value={city}
          onChange={handleCityChange}
        />
        <button type='submit'>Buscar</button>
      </form>

      {weatherData && (
        <div>
          <h2>{weatherData.name},  {weatherData.sys.country}</h2>
          <p>La temperatura actual es de:  {Math.floor(weatherData.main.temp - diffKelvin)}ºC</p>
          <p>La condición meteorológica es: {weatherData.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description} />
        </div>
      )}
    </div>
  )
}
