import React, { lazy, Suspense } from 'react'
import { Route,Switch } from 'react-router-dom'

const HomePage = lazy(() => import('./pages/homePage'));
const RegisterPage = lazy(() => import('./pages/auth/register'));
const LoginPage = lazy(() => import('./pages/auth/login'));
const ForgotPage = lazy(()=> import('./pages/auth/forgotPassword'))
const ResetPage = lazy(()=> import('./pages/auth/resetPassword'))

const App = () => {
  return (
    <Suspense fallback={() => (<div>...loading</div>)}>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/forgot' component={ForgotPage} />
        <Route exact path='/reset' component={ResetPage} />
      </Switch>
    </Suspense>
  )
}


export default App
