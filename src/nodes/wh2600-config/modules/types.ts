import { Node, NodeDef } from "node-red";
import { WH2600ConfigOptions } from "../shared/types";

export interface WH2600ConfigNodeDef extends NodeDef, WH2600ConfigOptions {}

export interface WH2600ConfigNode extends Node {
  address: string;
}
