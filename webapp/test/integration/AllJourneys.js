sap.ui.define([
  "sap/ui/test/Opa5",
  "blogs/ui5Websockets/test/integration/arrangements/Startup",
  "blogs/ui5Websockets/test/integration/BasicJourney"
], function(Opa5, Startup) {
  "use strict";

  Opa5.extendConfig({
    arrangements: new Startup(),
    pollingInterval: 1
  });

});
