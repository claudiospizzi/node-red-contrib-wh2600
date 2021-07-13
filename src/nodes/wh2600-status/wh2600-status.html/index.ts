import { EditorRED } from "node-red";
import { WH2600StatusEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<WH2600StatusEditorNodeProperties>("wh2600-status", {
  category: "wh2600",
  color: "#f5f5dc",
  defaults: {
    name: {
      value: "",
    },
    wh2600: {
      value: "",
      type: "wh2600-config",
      required: true,
    },
  },
  inputs: 1,
  outputs: 1,
  icon: "status.png",
  paletteLabel: "status",
  label: function () {
    return this.name || "wh2600 status";
  },
});
