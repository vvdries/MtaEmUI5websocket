sap.ui.define([
  "sap/ui/test/Opa5"
], function(Opa5) {
  "use strict";

  return Opa5.extend("blogs.ui5Websockets.test.integration.arrangements.Startup", {

    iStartMyApp: function () {
      this.iStartMyUIComponent({
        componentConfig: {
          name: "blogs.ui5Websockets",
          async: true,
          manifest: true
        }
      });
    }

  });
});
