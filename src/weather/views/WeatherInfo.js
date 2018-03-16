import React,{Component} from 'react'
import {connect} from 'react-redux'
import * as statusTypes from '../status.js'
import {fetchWeatherOf} from '../actions.js'



class WeatherInfo extends Component {
    render(){
       const {status} = this.props.weather
        switch(status){
            case statusTypes.LOADING: {
                return (<div>天气信息加载中...</div>)
            }
            case statusTypes.SUCCESS: {
                const {info:{city,weather,temp,wind}} = this.props.weather
                return (<div>{city}今天{weather}，当前气温{temp}℃，{wind}</div>)
            }
            case statusTypes.FAILURE: {
                return (<div>请选择你所在的城市...</div>)
            }
            default: {
                throw new Error(`unexpected status ${status}`)
            }
        }
    }
    componentDidMount(){
        this.props.fetchWeather()
    }
}

const mapStateToProps = (state, ownProps) => ({
    weather : state.weather
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchWeather: () => dispatch(fetchWeatherOf())
})

export default connect(mapStateToProps,mapDispatchToProps)(WeatherInfo)