import React from 'react';
import { Form } from './components/Form';
import { Info } from './components/Info';
import { Weather } from './components/Weather';

const API_KEY = "3eb05bc02bfb690ed63b136edaecb96f"
class App extends React.Component {
  // изначально создаем пустой стейт
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    wind: undefined,
    sunset: undefined,
    error: undefined,
  }

  getWeather = async (e) => {
    // для того, чтобы страница не перезагружалась
    e.preventDefault();

    // создаем переменную город, в которую мы будем получать, тот город, который пользователь запишет в форму
    const city = e.target.elements.city.value;

    // делаем проверку на введение информации в поле
    if (city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();
      console.log(data)
      // для изменения данные восхода солнца и заката из секунд в нормальное время
      var sunset = data.sys.sunset;
      var date = new Date();
      date.setTime(sunset);
      var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      // при нажатии на кнопку будем присваивать эти значение в стейт
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        sunset: sunset_date,
        error: undefined,
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        wind: undefined,
        sunset: undefined,
        error: "Enter the name of the city",
      })
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='main'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-5 info'>
                <Info />
              </div>
              <div className='col-sm-7 form'>
                <Form getWeather={this.getWeather} />
                <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  pressure={this.state.pressure}
                  wind={this.state.wind}
                  sunset={this.state.sunset}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
