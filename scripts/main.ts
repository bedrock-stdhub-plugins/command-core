// Do not change this part - critical in plugin bundling
import { StdhubPluginApi } from 'stdhub-plugin-api';
export const pluginName = process.env.PLUGIN_NAME!;
export const api = new StdhubPluginApi(pluginName);

// Code below freely!