SystemJS.config({
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  bundles: {
    "dist/oidc-token-manager.bundled.js": [
      "github:frankwallis/plugin-typescript@4.0.1.json",
      "npm:systemjs-plugin-babel@0.0.6.json",
      "npm:systemjs-plugin-babel@0.0.6/babel-helpers/classCallCheck.js",
      "npm:systemjs-plugin-babel@0.0.6/babel-helpers/createClass.js",
      "src/FrameLoader.ts",
      "src/OidcClient.ts",
      "src/OidcTokenManager.ts",
      "src/Token.ts",
      "src/Utils.ts",
      "src/index.ts"
    ]
  }
});
