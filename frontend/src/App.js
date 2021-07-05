import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Toast from 'components/Toast'

import HomePage from 'pages/shop/home/Home.page'
import ShopRoute from 'routes/Shop.route'
import AdminRoute from 'routes/Admin.route'
import NotFoundPage from 'pages/NotFound.page'

const App = () => {
  return (
    <Provider store={store}>
      <Toast open={true} />
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopRoute} />
          <Route path='/admin' component={AdminRoute} />
          <Route component={NotFoundPage}></Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App