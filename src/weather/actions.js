import {FETCH_STARTED,FETCH_SUCCESS,FETCH_FAILURE} from './actionTypes.js'
import { HeweatherKey } from './config' 


export const fetchWeatherStarted = () => ({
    type: FETCH_STARTED,
})

export const fetchWeatherSuccess = (res) => ({
    type: FETCH_SUCCESS,
    result: res
})

export const fetchWeatherFailure = (err) => ({
    type: FETCH_FAILURE,
    error: err
})


// export const fetchWeatherByOf = (city) =>{
//     return (dispatch,getState) => {
//         const apiUrl = `https://free-api.heweather.com/s6/weather/now?location=厦门&key=${weatherKey}`
//         dispatch(fetchWeatherStarted())
//         fetch(apiUrl).then((response)=>{
//             if(response.status !== 200){
//                 throw new Error(`Fail to get response with status ${response.status}`)
//             }
//             response.json().then((data)=>{
//                 dispatch(fetchWeatherSuccess(data))
//             })
//         }).catch((error)=>{
//             dispatch(fetchWeatherFailure(error))
//         })
//         // 以上这段代码不是太优雅，找时间改成async function
//     }
// }

export const fetchWeatherOf = (city) => {
    return async (dispatch,getState) => {
        const apiUrl = `https://free-api.heweather.com/s6/weather/now?location=${city}&key=${HeweatherKey}`
        dispatch(fetchWeatherStarted())
        try {
            let response = await fetch(apiUrl)
            if(response.status !== 200){
                throw new Error(`Fail to get response with status ${response.status}`)
            }
            let data = await response.json()
            dispatch(fetchWeatherSuccess(data))
        } catch (err) {
            dispatch(fetchWeatherFailure(err))
        }
    }
}
