import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/NewOrder/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/NewOrder/Checkout/Checkout';
import { Switch, Route, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (      
        <div>
          <Layout>
            <Switch>
              <Route path="/burgerbuilder" component={BurgerBuilder} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Redirect from="/" to="/burgerbuilder" />
            </Switch>
          </Layout>
        </div>      
        // <div>
        //    <Layout>             
        //       <BurgerBuilder />
        //       <Checkout />             
        //    </Layout>
        //  </div>      
    );
  }
}

export default App;
