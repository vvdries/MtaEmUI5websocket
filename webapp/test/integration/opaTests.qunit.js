/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
  "use strict";

  sap.ui.require([
    "blogs/ui5Websockets/test/integration/AllJourneys"
  ], function() {
    QUnit.start();
  });
});
