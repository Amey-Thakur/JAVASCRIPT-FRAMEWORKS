import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-todo-app',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  devServer: {
    port: 3007,
    openBrowser: false,
  },
  testing: {
    browserHeadless: "new",
  },
};
