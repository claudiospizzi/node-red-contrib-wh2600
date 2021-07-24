import axios from 'axios';
import { parse as parseHtml, HTMLElement } from 'node-html-parser';

/**
 * Class representing the current weather data for the weather station.
 */
export class WeatherData {
  public indoorTemperature: number | undefined;
  public indoorHumidity: number | undefined;
  public outdoorTemperature: number | undefined;
  public outdoorHumidity: number | undefined;
  public absolutePressure: number | undefined;
  public relativePressure: number | undefined;
  public windDirection: number | undefined;
  public windSpeed: number | undefined;
  public windGust: number | undefined;
  public solarRadiation: number | undefined;
  public uv: number | undefined;
  public uvi: number | undefined;
  public hourlyRain: number | undefined;
  public dailyRain: number | undefined;
  public weeklyRain: number | undefined;
  public monthlyRain: number | undefined;
  public yearlyRain: number | undefined;
}

/**
 * Weather station class to query the current weather data.
 */
export class WeatherStation {
  private address: string;

  constructor(address: string) {
    this.address = address;
  }

  /**
   * Get the current weather data.
   * @returns The weather data.
   */
  async getWeatherData(): Promise<WeatherData> {
    const url = `http://${this.address}/livedata.htm`;
    const result = await axios.get(url);

    const document = parseHtml(result.data);

    const weatherData = new WeatherData();
    weatherData.indoorTemperature = WeatherStation.getWeatherDataNumber(document, 'inTemp');
    weatherData.indoorHumidity = WeatherStation.getWeatherDataNumber(document, 'inHumi');
    weatherData.outdoorTemperature = WeatherStation.getWeatherDataNumber(document, 'outTemp');
    weatherData.outdoorHumidity = WeatherStation.getWeatherDataNumber(document, 'outHumi');
    weatherData.absolutePressure = WeatherStation.getWeatherDataNumber(document, 'AbsPress');
    weatherData.relativePressure = WeatherStation.getWeatherDataNumber(document, 'RelPress');
    weatherData.windDirection = WeatherStation.getWeatherDataNumber(document, 'windir');
    weatherData.windSpeed = WeatherStation.getWeatherDataNumber(document, 'windspeed');
    weatherData.windGust = WeatherStation.getWeatherDataNumber(document, 'gustspeed');
    weatherData.solarRadiation = WeatherStation.getWeatherDataNumber(document, 'solarrad');
    weatherData.uv = WeatherStation.getWeatherDataNumber(document, 'uv');
    weatherData.uvi = WeatherStation.getWeatherDataNumber(document, 'uvi');
    weatherData.hourlyRain = WeatherStation.getWeatherDataNumber(document, 'rainofhourly');
    weatherData.dailyRain = WeatherStation.getWeatherDataNumber(document, 'rainofdaily');
    weatherData.weeklyRain = WeatherStation.getWeatherDataNumber(document, 'rainofweekly');
    weatherData.monthlyRain = WeatherStation.getWeatherDataNumber(document, 'rainofmonthly');
    weatherData.yearlyRain = WeatherStation.getWeatherDataNumber(document, 'rainofyearly');

    return weatherData;
  }

  /**
   * Parse the live data of the weather station.
   * @param document The weather station live data document.
   * @param name The name of the input value to return.
   * @returns The current number.
   */
  private static getWeatherDataNumber(document: HTMLElement, name: string): number | undefined {
    const element = document.querySelector(`input[name="${name}"]`);
    const attribute = element?.getAttribute('value');
    const value = parseFloat(attribute as string);
    if (isNaN(value)) {
      return undefined;
    } else {
      return value;
    }
  }
}
