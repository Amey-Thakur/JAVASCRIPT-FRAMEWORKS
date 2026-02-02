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
      type: 'www',
      baseUrl: '/JAVASCRIPT-FRAMEWORKS-TODO-APPS/Stencil-Todo-App/',
      serviceWorker: null, // disable service workers
      copy: [
        { src: 'assets' }
      ]
    },
  ],
  devServer: {
    port: 3007,
    openBrowser: false,
  },
  testing: {
    browserHeadless: true,
  },
};
