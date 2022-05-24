import React, { useState } from 'react'
/// React router dom
import {Switch, Route } from 'react-router-dom'
/// Css
import './index.css'
import './chart.css'
import './step.css'

/// Layout
import Nav from './layouts/nav'
import Footer from './layouts/Footer'


//allfin otc
//accounts
import Accounts from "./components/Okapago/accounts-manager"
import RegisteredAccounts from "./components/Okapago/ExternalAccounts/RegisteredAccounts"
//orders
import CreateSell from "./components/Okapago/Orders/CreateSell";
//import CreateBuy from "./components/Okapago/Orders/CreateBuy";
import CreateBuy from "./components/Okapago/Orders/CreateBuy";
//testing
import Testing from "./components/Okapago/testing"
//market
import MarketBuy from "./components/Okapago/Market/MarketBuy";
import MarketSell from "./components/Okapago/Market/MarketSell";
import OrderBook from "./components/Okapago/Market/OrderBook";
/// Dashboard
import Dashboard from "./components/Okapago/Dashboard/Dashboard"
import DashboardTrades from "./components/Okapago/DashboardTrades/DashboardTrades";
import MultiDashboard from "./components/Okapago/MultiDashboard/MultiDashboard";


/// Pages
import Registration from './pages/Registration'
import Login from './pages/Login'
import Logout from './layouts/nav/Logout'
import Recovery from './pages/ForgotPassword'
import LockScreen from './pages/LockScreen'
import Error400 from './pages/Error400'
import Error403 from './pages/Error403'
import Error404 from './pages/Error404'
import Error500 from './pages/Error500'
import Error503 from './pages/Error503'
import Todo from './pages/Todo';

//Scroll To Top
import ScrollToTop from './layouts/ScrollToTop';



const Markup = () => {
  let path = window.location.pathname
  path = path.split('/')
  path = path[path.length - 1]
  let pagePath = path.split('-').includes('page')
  const [activeEvent, setActiveEvent] = useState(!path)

  const routes = [
    //allfin-otc
      //accounts
    { url: 'agregar-cuenta', component: Accounts},
    { url: 'cuentas-registradas', component: RegisteredAccounts},
      //orders
    {url: 'orden-compra', component: CreateBuy},
    {url: 'orden-venta', component: CreateSell},
      //market
    {url: 'comprar-rsv', component: MarketBuy},
    {url: 'vender-rsv', component: MarketSell},
    {url: 'order-book', component: OrderBook},
      //testing
    {url: 'test', component: Testing},

    /// Dashboard
    { url: 'dashboard', component: Dashboard },
    { url: 'trades', component: DashboardTrades },
    { url: 'new-dashboard', component: MultiDashboard },


    /// pages
    { url: 'page-register npm install --save @fortawesome/free-solid-svg-icons', component: Registration },
    { url: 'page-lock-screen', component: LockScreen },
    { url: 'page-recovery', component: Recovery},
    { url: 'page-login', component: Login },
    { url: 'logout', component: Logout },
    { url: 'page-error-400', component: Error400 },
    { url: 'page-error-403', component: Error403 },
    { url: 'page-error-404', component: Error404 },
    { url: 'page-error-500', component: Error500 },
    { url: 'page-error-503', component: Error503 },
    { url: 'todo', component: Todo },
  ]

  return (
       <> 
          <div
            id={`${!pagePath ? 'main-wrapper' : ''}`}
            className={`${!pagePath ? 'show' : 'mh100vh'}`}
          >
            {!pagePath && (
              <Nav
                onClick={() => setActiveEvent(!activeEvent)}
                activeEvent={activeEvent}
                onClick2={() => setActiveEvent(false)}
                onClick3={() => setActiveEvent(true)}
              />
            )}
            <div
              className={` ${!path && activeEvent ? 'rightside-event' : ''} ${
                !pagePath ? 'content-body' : ''
              }`}
            >
              <div
                className={`${!pagePath ? 'container-fluid' : ''}`}
                style={{ minHeight: "100%"}}
              >
                <Switch>
                  {routes.map((data, i) => (
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                  ))}
                </Switch>
              </div>
            </div>
            {!pagePath && <Footer />}
          </div>
         <ScrollToTop />
       </>
  )
}

export default Markup
