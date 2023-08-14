import { presetIcons } from 'unocss';
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer';
import presetWeapp from 'unocss-preset-weapp';

const { presetWeappAttributify, transformerAttributify } = extractorAttributify();

export default {
  presets: [presetWeapp(), presetWeappAttributify(), presetIcons()],
  transformers: [transformerAttributify(), transformerClass()]
};
