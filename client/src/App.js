import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import Home from "./routes/Admin/Home";
import UserMgmt from "./routes/Admin/UserMgmt/UserMgmt";
import RoleMgmt from "./routes/Admin/RoleMgmt/RoleMgmt";
import PermissionMgmt from "./routes/Admin/PermissionMgmt/PermissionMgmt";
import SignForm from "./routes/Sign/SignForm";
import Landing from "./routes/Landing";
import { UserContext } from "./contexts/UserContext";
import ProtectedRoute from "./common/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/" element={<Home />} />
              <Route path="userManagement" element={<UserMgmt />} />
              <Route path="roleManagement" element={<RoleMgmt />} />
              <Route path="permissionManagement" element={<PermissionMgmt />} />
            </Route>
            <Route path="/landing" element={<Landing />} />
            <Route path="signin" element={<SignForm isLogin />} />
            <Route path="signup" element={<SignForm />} />
            <Route path="*" element={<div>404 Page Not found</div>} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
