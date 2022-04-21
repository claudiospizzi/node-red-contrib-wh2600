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
