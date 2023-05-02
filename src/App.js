import ChatRoom from './components/ChatRoom';
import Login from './components/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route element={<Login></Login>} path="/login"></Route>
            <Route element={<ChatRoom></ChatRoom>} path="/"></Route>
          </Routes>
          <AddRoomModal></AddRoomModal>
          <InviteMemberModal></InviteMemberModal>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
