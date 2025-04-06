import { defineConfig } from "cypress";
import mochawesome from 'cypress-mochawesome-reporter/plugin.js';
import * as path from 'path';
import * as fs from 'fs';

const getConfigFile = (env) => {
  const configFilePath = path.join('cypress', 'fixtures', 'configFiles', `cypress.${env || 'dev'}.config.json`);
  return (fs.readFileSync(configFilePath)).toString()
}

export default defineConfig({
  retries:{
    runMode: 1, 
    openMode: 0
  },
  //  video: true,
  viewportHeight: 1000,
  viewportWidth: 1200,
  reporter: "cypress-mochawesome-reporter",
  reporterOption: {
    reportDir: 'mochawesome-report',
    reportFilename: "[status]_[datetime]-[name]-report",
    overwrite: false,
    html: true,
  //   // generate intermediate JSON reports
    json: true
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.test.{js,jsx,ts,tsx}',
    // specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'https://qauto.forstudy.space',
    defaultCommandTimeout: 5000,

    setupNodeEvents(on, config) {
      mochawesome(on)
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      });
      // implement node event listeners here
      const configOverrides = getConfigFile(config.env.TEST_ENV)
      config = {...config, ...JSON.parse(configOverrides)}
      return config;
    },
  },
});