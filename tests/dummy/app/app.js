import Application from "@ember/application";
import loadInitializers from "ember-load-initializers";
import Resolver from "ember-resolver";

import config from "./config/environment";

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  engines = {
    "ember-alexandria": {
      dependencies: {
        services: [
          "session",
          "intl",
          "notification",
          { config: "alexandria-config" },
        ],
      },
    },
  };
}

loadInitializers(App, config.modulePrefix);
