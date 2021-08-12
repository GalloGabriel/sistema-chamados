import { Switch } from 'react-router-dom'; //Switch renderiza apenas 1 component por página
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Customers from '../pages/Customers';

export default function Routes(){
  return(
    <Switch> 
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/settings" component={Profile} isPrivate />
      <Route exact path="/customers" component={Customers} isPrivate />
    </Switch>
  );
}