const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "9cnfp5",
  defaultCommandTimeout: 8000,
  reporter: "junit",
  reporterOptions: {
    mochaFile: "cypress/results/junit-results-[hash].xml",
    toConsole: true
  },
  e2e: {
    baseUrl: "https://www.edgewordstraining.co.uk/webdriver2/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      username: "edgewords",
      password: "edgewords123"
    }
  },
});
