import { EditorRED } from "node-red";
import { WH2600ConfigEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<WH2600ConfigEditorNodeProperties>("wh2600-config", {
  category: "config",
  defaults: {
    name: {
      value: "",
      required: true,
    },
    address: {
      value: "",
      required: true,
    },
  },
  label: function () {
    return this.name || "wh2600 config";
  },
});
