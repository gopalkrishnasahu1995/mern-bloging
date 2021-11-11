import React, { lazy, Suspense } from 'react'
import { Route,Switch } from 'react-router-dom'

const HomePage = lazy(() => import('./pages/homePage'));
const RegisterPage = lazy(() => import('./pages/auth/register'));
const LoginPage = lazy(() => import('./pages/auth/login'));

const App = () => {
  return (
    <Suspense fallback={() => (<div>...loading</div>)}>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/login' component={LoginPage} />
      </Switch>
    </Suspense>
  )
}


export default App
