import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  srcDir: 'src/app',
  globalStyle: 'src/app/global/app.css',
  globalScript: 'src/app/global/app.ts',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'https://myapp.local/'
    }
  ]
};
