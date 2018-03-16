import React,{Component} from 'react'
import { fetchWeatherOf } from '../actions'
import { tencentLbsKey } from '../config'
import { PropTypes } from 'prop-types'

class CitySelector extends Component {
    constructor(props){
        super(props)
        this.initProvinces = this.initProvinces.bind(this)
        this.onProvinceChange = this.onProvinceChange.bind(this)
        this.updateWeather = this.updateWeather.bind(this)
        this.state = {
            provincelist:[],
            curCity:'none',
            citylist:[],
        }
    }
    render(){
        return(
            <div>
                <select onChange={this.onProvinceChange}>
                {
                    [<option value='none' >请选择对应省份...</option>,
                    ...this.state.provincelist.map( (item)=>(
                        <option value={item.id}>{item.fullname}</option>
                    ))]
                }
                </select>
                <select onChange={this.updateWeather}>
                {
                    [<option value='none' selected={this.state.curCity === "none"}>请选择城市...</option>,
                    ...this.state.citylist.map( (item)=>(
                        <option selected={this.state.curCity === item.name} value={item.name}>{item.fullname}</option>
                    ))]
                }
                </select>
            </div>
        )
    }
    componentDidMount(){
        this.initProvinces()
    }
    onProvinceChange = async (event) =>{
        const apiUrl = `./ws/district/v1/getchildren?id=${event.target.value}&key=${tencentLbsKey}`
        try {
            const response = await fetch(apiUrl)
            if(response.status !== 200){
                throw new Error(`Fail to get response with status ${response.status}`)
            }
            const data = await response.json()
            this.setState({
                curCity: 'none',
                citylist: data.result[0]
            })
            this.context.store.dispatch(fetchWeatherOf())
        }catch (err) {
            console.error(err)
        }
    }
    initProvinces = async () => {
        const apiUrl = `./ws/district/v1/list?key=${tencentLbsKey}`
        try {
            const response = await fetch(apiUrl)
            if(response.status !== 200){
                throw new Error(`Fail to get response with status ${response.status}`)
            }
            const data = await response.json()
            this.setState({
                provincelist:data.result[0]
            })
        }catch (err) {
            console.error(err)
        }
    }
    updateWeather = (event) => {
        const city = event.target.value
        this.context.store.dispatch(fetchWeatherOf(city))
        this.setState({
            curCity: event.target.value
        })
    }
}


CitySelector.contextTypes = {
    store: PropTypes.object
}

export default CitySelector
