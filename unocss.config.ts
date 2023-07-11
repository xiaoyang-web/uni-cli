import { presetIcons } from 'unocss';
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer';
import presetWeapp from 'unocss-preset-weapp';

const { presetWeappAttributify, transformerAttributify } = extractorAttributify();

export default {
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
    // attributify autocomplete
    presetWeappAttributify(),
    presetIcons()
  ],
  shortcuts: [
    {
      center: 'flex justify-center items-center'
    }
  ],
  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass()
  ]
};
