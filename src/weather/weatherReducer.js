import {FETCH_STARTED,FETCH_SUCCESS,FETCH_FAILURE} from './actionTypes.js'
import * as statusTypes from './status.js'

export default (state={},action) => {
    switch(action.type){
        case FETCH_STARTED: {
            return {status: statusTypes.LOADING}
        }
        case FETCH_SUCCESS: {
            let data = action.result.HeWeather6[0]
            return {...state, 
                    status: statusTypes.SUCCESS, 
                    info: {
                        city: data.basic.location,
                        weather: data.now.cond_txt,
                        temp: data.now.tmp,
                        wind: data.now.wind_dir
                    }
                }
        }
        case FETCH_FAILURE: {
            return {status: statusTypes.FAILURE}
        }
        default: {
            return state
        }
    }
}