const { awscdk } = require("projen");

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  name: "npm_release_flow",
  eslint: false,
  deps: [],
  prettier: true,
});

project.synth();
