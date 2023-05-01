sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "com/sap/lmui5tutorial/utils/filterUtils",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, filterUtils, JSONModel) {
    "use strict";

    return Controller.extend("com.sap.lmui5tutorial.controller.Main", {
      onInit: function () {
        // Setting the view model for busy indicators
        let viewModel = new JSONModel({
          busy: false,
          delay: 0,
          currency: "USD",
        });

        this.getView().setModel(viewModel, "viewModel");
        this._viewModel = this.getView().getModel("viewModel");

        this._mainModel = this.getOwnerComponent().getModel();
        this._northwindModel =
          this.getOwnerComponent().getModel("northwindModel");
        this._filterArray = filterUtils.getFilterArray(this);
      },

      /***********************************************************************************************/
      /*		FILTER BAR EVENT HANDLERS
        /***********************************************************************************************/

      onFilterBarChange: function () {
        this._filterArray = filterUtils.getFilterArray(this);
      },

      onBeforeRebindTable: function (oEvent) {
        let bindingParams = oEvent.getParameter("bindingParams");
        bindingParams.filters = filterUtils.getFilterArray(this);

        this._mainModel.refresh();
      },

      /***********************************************************************************************/
      /*		FOOTER EVENT HANDLERS
      /***********************************************************************************************/

      onSubmit: function () {
        console.log(
          "No need to do anything...  JSON Model is set for Two way binding by default !!"
        );
        let products = this._northwindModel.getData();
        console.log(
          `Discontinued flag for Product ID - ${products.Products[0].ProductID} is set to ${products.Products[0].Discontinued}`
        );
      },
    });
  }
);
