import { NodeInitializer } from "node-red";
import { WH2600ConfigNode, WH2600ConfigNodeDef } from "./modules/types";

const nodeInit: NodeInitializer = (RED): void => {
  function WH2600ConfigNodeConstructor(this: WH2600ConfigNode, config: WH2600ConfigNodeDef): void {
    RED.nodes.createNode(this, config);
    this.address = config.address;
  }

  RED.nodes.registerType("wh2600-config", WH2600ConfigNodeConstructor);
};

export = nodeInit;
