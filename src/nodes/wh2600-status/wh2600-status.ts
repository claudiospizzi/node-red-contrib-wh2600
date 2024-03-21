import { NodeInitializer } from 'node-red';
import { WeatherStation } from '../../modules/WeatherStation';
import { WH2600ConfigNode } from '../wh2600-config/modules/types';
import { WH2600StatusNode, WH2600StatusNodeDef } from './modules/types';

const nodeInit: NodeInitializer = (RED): void => {
  function WH2600StatusNodeConstructor(this: WH2600StatusNode, config: WH2600StatusNodeDef): void {
    RED.nodes.createNode(this, config);
    this.device = RED.nodes.getNode(config.device) as WH2600ConfigNode;

    this.on('input', async (msg, send, done) => {
      this.status({ fill: 'blue', shape: 'dot', text: 'running' });
      try {
        const weatherStation = new WeatherStation(this.device.address);
        const weatherData = await weatherStation.getWeatherData();

        msg.payload = {
          name: this.device.name,
          address: this.device.address,
          indoorTemperature: weatherData.indoorTemperature,
          indoorHumidity: weatherData.indoorHumidity,
          outdoorTemperature: weatherData.outdoorTemperature,
          outdoorHumidity: weatherData.outdoorHumidity,
          absolutePressure: weatherData.absolutePressure,
          relativePressure: weatherData.relativePressure,
          windDirection: weatherData.windDirection,
          windSpeed: weatherData.windSpeed,
          windAverage: weatherData.windAverage,
          windGust: weatherData.windGust,
          solarRadiation: weatherData.solarRadiation,
          uv: weatherData.uv,
          uvi: weatherData.uvi,
          hourlyRain: weatherData.hourlyRain,
          dailyRain: weatherData.dailyRain,
          weeklyRain: weatherData.weeklyRain,
          monthlyRain: weatherData.monthlyRain,
          yearlyRain: weatherData.yearlyRain,
        };

        this.status({ fill: 'green', shape: 'dot', text: 'successful' });
        send(msg);
        done();
      } catch (error) {
        this.status({ fill: 'red', shape: 'dot', text: 'failed' });
        done(error instanceof Error ? error : new Error(`Unknown: ${error}`));
      }
    });
  }

  RED.nodes.registerType('wh2600-status', WH2600StatusNodeConstructor);
};

export = nodeInit;
