import React, { useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { SERVER_DOMAIN } from "../../../cons/Cons";
import useFetch from "../../../hooks/useFetch";
import FormInput from "../../../common/Form/FormInput";
import SelectDropDown from "../../../common/Select/SelectDropDown";
import UserUpdateModal from "./UserUpdateModal";
import PageContainer from "../../../common/PageContainer";

const UserMgmt = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingUser, setUpdatingUser] = useState({});

  const { data: users, fetchData: fetchUsers } = useFetch("users");
  const { data: roles } = useFetch("roles");

  const handleEdit = (user) => {
    setIsModalOpen(true);
    setUpdatingUser(user);
  };

  const handleDelete = async (email) => {
    await axios.delete(`${SERVER_DOMAIN}/users/${email}`);
    await fetchUsers();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${SERVER_DOMAIN}/users`, {
      name: userName,
      email: userEmail,
      password: userPassword,
      userRole,
    });
    await fetchUsers();
  };

  return (
    <>
      <PageContainer title="User Management">
        <div className=" flex-1">
          <div className="page-item">
            <form className="mt-5" onSubmit={handleSubmit}>
              <FormInput
                label="name"
                value={userName}
                handleChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <FormInput
                label="email"
                value={userEmail}
                handleChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                type="email"
              />
              <FormInput
                label="password"
                value={userPassword}
                handleChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                type="password"
              />
              <SelectDropDown
                selectedData={userRole}
                setSelectedData={setUserRole}
                selectOptions={roles}
                initialOption="Choose User Role here"
              />
              <div className="text-right">
                <button className="border-2 p-2 mt-5" type="submit">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex-2">
          <div className="table-container page-item ">
            <table className="mt-5 w-full border-y-2 border-separate ">
              <thead className="border-y-2 text-left">
                <th>name</th>
                <th>email</th>
                <th>role</th>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role ? user.role.name : ""}</td>
                      <td className="sm:sticky sm:-right-5 sm:bg-white sm:border-l-2   ">
                        <EditIcon
                          className="cursor-pointer"
                          onClick={() => handleEdit(user)}
                        />
                        <DeleteIcon
                          onClick={() => handleDelete(user.email)}
                          className="hover:bg-slate-300 before:border-l "
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </PageContainer>

      {isModalOpen && (
        <UserUpdateModal
          setIsModalOpen={setIsModalOpen}
          updatingUser={updatingUser}
          roles={roles}
          fetchUsers={fetchUsers}
        />
      )}
    </>
  );
};

export default UserMgmt;
