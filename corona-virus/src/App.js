import React from 'react';
import Axios from 'axios';
import './index.css';
export default class App extends React.Component{
     constructor(props){
          super(props);
          this.getCountryData = this.getCountryData.bind(this);
     }
     state = {
          confirmed: 0,
          recovered: 0,
          deaths: 0,
          countries:[]
     }
     componentDidMount() {
          this.getData();
     }

     async getData() {
          const resApi = await Axios.get("https://covid19.mathdro.id/api");
          const resCountries = await Axios.get('https://covid19.mathdro.id/api/countries');
          const countries = []; 
          for(var i = 0; i <resCountries.data.countries.length; i++){
         countries.push(resCountries.data.countries[i].name);
          }
          this.setState({
               confirmed: resApi.data.confirmed.value,
               recovered: resApi.data.recovered.value,
               deaths: resApi.data.deaths.value,
               countries
          });
     }

     async getCountryData(e) {
          if(e.target.value === "Worldwide"){
          return this.getData();
          }
          try {
          const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`);
          this.setState({
               confirmed: res.data.confirmed.value,
               recovered: res.data.recovered.value,
               deaths: res.data.deaths.value
          })
     }
     catch (err) {
          if(err.response.status === 404)
          this.setState({
          confirmed: "no data available",
          recovered: "no data available",
          deaths: "no data available"
          });
     }
     }

     renderCountryOptions() {
          return this.state.countries.map((countries, i) => {
               return <option key={i}>{countries}</option>
          })
     }
     render() {
          return (
          <div className="container">

               <h1>Corona Update</h1>
               <br />
               <h1>به روزرسانی کرونا</h1>
               <select className="dropdown" onChange={this.getCountryData}>
                    <option>Worldwide</option>
                  {this.renderCountryOptions()}
               </select>

               <div className="flex">
               <div className="box confirmed">
                    <h3>Confirmed cases</h3> 
                    <br />
                    <h3>موارد تایید شده</h3>
          <h4>{this.state.confirmed}</h4>
               </div>
              <div className="box recovered">
               <h3>Recovered cases</h3>
               <br />
               <h3>موارد بهبود یافته</h3>
             
          <h4>{this.state.recovered}</h4>
               </div>

               <div className="box deaths">
               <h3>Deaths</h3>
               <br />
               <h3>موارد فوت شده</h3>
          <h4>{this.state.deaths}</h4>
               </div>
          </div>
          </div>
          );
     }
}


