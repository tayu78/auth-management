import React, { useContext, useEffect } from "react";
import MenuItem from "../../common/MenuItem";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import GroupIcon from "@mui/icons-material/Group";
import KeyIcon from "@mui/icons-material/Key";
import { useUserContext } from "../../hooks/useUserContext";

const Home = () => {
  const { user } = useUserContext();

  return (
    <>
      {/* <h1>Hello, {user?.name}</h1> */}
      <div>
        <ul className="grid grid-cols-auto-fit justify-center gap-10 p-10 w-4/5 m-auto">
          <MenuItem
            url={"userManagement"}
            title={"User Management"}
            icon={<ManageAccountsOutlinedIcon className="menu-icon" />}
          />
          <MenuItem
            url={"roleManagement"}
            title={"Role Management"}
            icon={<GroupIcon className="menu-icon" />}
          />
          <MenuItem
            url={"permissionManagement"}
            title={"Permission Management"}
            icon={<KeyIcon className="menu-icon" />}
          />
        </ul>
      </div>
    </>
  );
};

export default Home;
