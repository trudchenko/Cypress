import { defineConfig } from "cypress";

export default defineConfig({
  retries:{
    runMode: 1, 
    openMode: 0
  },
  // video: true,
  viewportHeight: 1000,
  viewportWidth: 1200,
  e2e: {
    specPattern: 'cypress/e2e/**/*.test.{js,jsx,ts,tsx}',
    // specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // baseUrl: 'https://example.cypress.io',
    baseUrl: 'https://qauto.forstudy.space',
    defaultCommandTimeout: 5000,

    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
      // implement node event listeners here
    },
  },
});