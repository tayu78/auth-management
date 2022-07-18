import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "./index.css";
import Header from "./common/Header";
import Home from "./routes/Admin/Home";
import UserMgmt from './routes/Admin/UserMgmt';
import RoleMgmt from './routes/Admin/RoleMgmt';
import PermissionMgmt from './routes/Admin/PermissionMgmt';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="userManagement" element={<UserMgmt />} />
        <Route path="roleManagement" element={<RoleMgmt />} />
        <Route path="permissionManagement" element={<PermissionMgmt />} />
        <Route path="*" element={ <div>404 Page Not found</div>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
