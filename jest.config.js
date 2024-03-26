module.exports = {
    // ... other Jest configuration options
    moduleNameMapper: {
      "^TextEncoder$": "<rootDir>/node_modules/text-encoding/text-encoding.min.js",
    },
    testEnvironment: "jsdom"
    };