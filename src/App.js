import React, { Component } from "react";

import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RouteWithLayout from "./Layout/RouteWithLayout";
import { HomeScreen } from "./Home/index";
import { FullLayoutComponent } from "./Layout/FullLayout/FullLayout";
import EmptyLayout from "./Layout/EmptyLayout/EmptyLayout";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard";
import QRCode from "./Pages/QRCode";
// import Product from "./Pages/ProcessingUnit/Product/Product";
import ChoclateProducts from "./Pages/ProcessingUnit/Product/Choclates/Product";
import FruitProducts from "./Pages/ProcessingUnit/Product/Fruits/Product";

import ProductInWH from "./Pages/ShippingUnit/Product/index";
//below fetch api will change
import ShippingProducts from "./Pages/ShippingUnit/ShippingToDistributer/index";
import TrackToShipment from "./Pages/ShippingUnit/ShippedToDistributer/index";
import FetchCartonDetails from "./Pages/FetchCartonDetails/index";
//CartonPackedProd
import CartonList from "./Pages/ShippingUnit/CartonList/index";
import DistributorList from "./Pages/ShippingUnit/DistributorList";
import RetailerList from "./Pages/RetailerList";
import CreateDistributor from "./Pages/Admin/Distributor/index";
import CreateRetailer from "./Pages/Admin/Retailer/index";

import TrackDistList from "./Pages/TrackShipment/DistributorList";
// import TrackRetailList from "./Pages/TrackShipment/RetailerList";

import TrackRetailUnit from "./Pages/RetailerUnit/index";
//below fetch api will change
import CreateShipmentForDistributor from "./Pages/Admin/CreateShipmentForDistributor";

import CreateShipmentForRetailer from "./Pages/Admin/CreateShipmentForRetailer";

//CreateShipmentForRetailer
//TrackRetail
class App extends Component {
  componentDidMount() {
    this.props.hideLoader();
  }
  render() {
    return (
      <Router>
        <Switch>
          <RouteWithLayout
            layout={EmptyLayout}
            path="/"
            exact
            component={Login}
          />
          <RouteWithLayout
            layout={EmptyLayout}
            path="/login"
            exact
            component={Login}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/dashboard"
            component={Dashboard}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/product/choclate"
            component={ChoclateProducts}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/product/fruits"
            component={FruitProducts}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/QRCode"
            component={QRCode}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/ProductInWH"
            component={ProductInWH}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/Shipping"
            component={ShippingProducts}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/CartonPackedProd"
            component={CartonList}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/distList"
            component={DistributorList}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/retailerList"
            component={RetailerList}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/CreateDistributor"
            component={CreateDistributor}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/CreateRetailer"
            component={CreateRetailer}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/CreateShipmentForDistributor"
            component={CreateShipmentForDistributor}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/CreateShipmentForRetailer"
            component={CreateShipmentForRetailer}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/TrackDistList"
            component={TrackDistList}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/TrackRetailUnit"
            component={TrackRetailUnit}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/TrackShipment"
            component={TrackToShipment}
          />
          <RouteWithLayout
            layout={FullLayoutComponent}
            path="/FetchCartonDetails/:cartoonid"
            component={FetchCartonDetails}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
