import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
    <Toaster />
      <AuthContextProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
