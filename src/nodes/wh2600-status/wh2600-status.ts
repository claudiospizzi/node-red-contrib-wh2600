import { NodeInitializer } from "node-red";
import { WeatherStation } from "../../modules/wh2600";
import { WH2600ConfigNode } from "../wh2600-config/modules/types";
import { WH2600StatusNode, WH2600StatusNodeDef } from "./modules/types";

const nodeInit: NodeInitializer = (RED): void => {
  function WH2600StatusNodeConstructor(this: WH2600StatusNode, config: WH2600StatusNodeDef): void {
    RED.nodes.createNode(this, config);
    this.wh2600 = RED.nodes.getNode(config.wh2600) as WH2600ConfigNode;

    this.on("input", (msg, send, done) => {
      this.status({ fill: "blue", shape: "dot", text: "running" });

      new WeatherStation(this.wh2600.address)
        .getWeatherData()
        .then((response) => {
          this.status({ fill: "green", shape: "dot", text: "successful" });

          msg.payload = {
            name: this.wh2600.name,
            address: this.wh2600.address,
            indoorTemperature: response.indoorTemperature,
            indoorHumidity: response.indoorHumidity,
            outdoorTemperature: response.outdoorTemperature,
            outdoorHumidity: response.outdoorHumidity,
            absolutePressure: response.absolutePressure,
            relativePressure: response.relativePressure,
            windDirection: response.windDirection,
            windSpeed: response.windSpeed,
            windGust: response.windGust,
            solarRadiation: response.solarRadiation,
            uv: response.uv,
            uvi: response.uvi,
            hourlyRain: response.hourlyRain,
            dailyRain: response.dailyRain,
            weeklyRain: response.weeklyRain,
            monthlyRain: response.monthlyRain,
            yearlyRain: response.yearlyRain,
          };

          send(msg);
          done();
        })
        .catch((error) => {
          this.status({ fill: "red", shape: "dot", text: "failed" });

          done(error);
        });
    });
  }

  RED.nodes.registerType("wh2600-status", WH2600StatusNodeConstructor);
};

export = nodeInit;
