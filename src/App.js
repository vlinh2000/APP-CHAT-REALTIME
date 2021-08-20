import './App.css';
import Login from './components/Login';
import CharRoom from './components/ChatRoom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AuthProvider from './Context/AuthProvider';
import AddRoomModal from './components/Modals/addRoomModal';
import AppProvider from './Context/AppProvider';
import AddUserModal from './components/Modals/AddUserModal';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route path='/login' component={Login} />
            <Route exact path='/' component={CharRoom} />
          </Switch>
          <AddRoomModal />
          <AddUserModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )

}
