import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Weather from './components/weather.component';
import Form from './components/form.component';

// api call api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key = 'dd9acebbf3c87db7d1e79bddcf209095';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
      wrongData: false,
      isLoading: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }

  calcCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Dizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }

  closeAlert = () => {
    this.setState({
      wrongData: false,
      error: false
    });
  };


  getWeather = async (e) => {
    let api_call = null;
    let response = null;
    e.preventDefault();

    let city = e.target.elements.city.value;
    let country = e.target.elements.country.value;
    if (response === null || api_call === null) {
      if (city && country) {
        this.setState({ isLoading: true });
      }
    }

    if (city && country) {
      api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

      response = await api_call.json();
      this.setState({ isLoading: false });

      if (response.cod === '404') {
        this.setState({
          wrongData: true,
          error: false
        });
        setTimeout(this.closeAlert, [3000]);
        return;
      }

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        celsius: this.calcCelsius(response.main.temp),
        temp_max: this.calcCelsius(response.main.temp_max),
        temp_min: this.calcCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    } else {
      this.setState({
        wrongData: false,
        error: true
      })
      setTimeout(this.closeAlert, [3000]);
      return;
    }
  };

  onClose = () => {
    this.setState({
      city: undefined,
      country: undefined,
      icon: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: '',
      isLoading: false
    });
  };




  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} wrongData={this.state.wrongData} closing={this.state.closing} />
        <Weather city={this.state.city} country={this.state.country} temp_celsius={this.state.celsius} temp_max={this.state.temp_max} temp_min={this.state.temp_min} description={this.state.description} weatherIcon={this.state.icon} isLoading={this.state.isLoading} onClose={this.onClose} />
      </div>
    );
  }
}


export default App;
