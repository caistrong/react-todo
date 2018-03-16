import React from 'react'
import WeatherInfo from './WeatherInfo'
import CitySelector from './CitySelector';

const Weather = ()=>(
    <div>
        <CitySelector/>
        <WeatherInfo/>
    </div>
)

export default Weather