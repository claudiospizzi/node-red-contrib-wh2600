import { Node, NodeDef } from "node-red";
import { WH2600ConfigNode } from "../../wh2600-config/modules/types";
import { WH2600StatusOptions } from "../shared/types";

export interface WH2600StatusNodeDef extends NodeDef, WH2600StatusOptions {}

export interface WH2600StatusNode extends Node {
  wh2600: WH2600ConfigNode;
}
