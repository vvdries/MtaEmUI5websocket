sap.ui.define([
  "blogs/ui5Websockets/controller/BaseController",
  "sap/ui/core/ws/WebSocket",
  "sap/m/MessageToast"
], function (Controller, WebSocket, MessageToast) {
  "use strict";

  return Controller.extend("blogs.ui5Websockets.controller.Error", {
    onInit: function () {
      var connection = new WebSocket("/NodeWS");
      // connection opened
      connection.attachOpen(function (oControlEvent) {
        console.log(oControlEvent.getParameter("data"));
      });

      // server messages
      connection.attachMessage(function (oControlEvent) {
        var msg = JSON.parse(oControlEvent.getParameter("data"));
        console.log(JSON.stringify(msg));
        MessageToast.show(msg.message || msg.errorMessage);
      });

      // error handling
      connection.attachError(function (oControlEvent) {
        console.log(oControlEvent.getParameter("data"));
      });

      // onConnectionClose
      connection.attachClose(function (oControlEvent) {
        console.log(oControlEvent.getParameter("data"));
      });
    }
  });
});
