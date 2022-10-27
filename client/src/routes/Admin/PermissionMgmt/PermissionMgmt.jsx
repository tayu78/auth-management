import React, { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { SERVER_DOMAIN } from "../../../cons/Cons";
import useFetch from "../../../hooks/useFetch";
import PermissionUpdateModal from "./PermissionUpdateModal";
import FormInput from "../../../common/Form/FormInput";
import FormSubmitBtn from "../../../common/Form/FormSubmitBtn";
import PageContainer from "../../../common/PageContainer";
import ShowMsg from "../../../common/ShowMsg";

const PermissionMgmt = () => {
  const [permissionName, setPermissionName] = useState("");
  const [updatingPermission, setUpdatingPermission] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");

  const { data: permissions, fetchData: fetchPermissions } =
    useFetch("permissions");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!permissionName) {
      setMsg("Plese fill permission name");
      setStatus("error");
      return;
    } //TODO: display error component

    try {
      await axios.post(`${SERVER_DOMAIN}/permissions`, {
        name: permissionName,
      });
      setMsg("New permission is successfully created");
      setStatus("success");
      await fetchPermissions();
    } catch (err) {
      setMsg("Something went wrong while creating new permission");
      setStatus("error");
    } finally {
      setShowMsg(true);
      setPermissionName("");
    }
  };

  const handleEdit = (permission) => {
    setIsModalOpen(true);
    setUpdatingPermission(permission);
  };

  const handleDelete = async (name) => {
    try {
      await axios.delete(`${SERVER_DOMAIN}/permissions/${name}`);
      await fetchPermissions();
      setStatus("success");
      setMsg("successfully deleted!");
    } catch (err) {
      setStatus("error");
      setMsg("something went wrong during deleting");
    } finally {
      setShowMsg(true);
    }
  };

  return (
    <>
      <PageContainer title="Permission Management">
        <div className="flex-1">
          <div className="page-item">
            <form onSubmit={handleSubmit}>
              <FormInput
                label="name"
                value={permissionName}
                handleChange={(e) => setPermissionName(e.target.value)}
              />
              <FormSubmitBtn>Create Permission</FormSubmitBtn>
            </form>
          </div>
        </div>

        <div className="flex-2">
          <div className="page-item table-container">
            {showMsg && (
              <ShowMsg
                status={status}
                msg={msg}
                setShowMsg={setShowMsg}
                absolute
              />
            )}
            <table className="mt-5 w-full border-y-2">
              <thead className="border-y-2 text-left">
                <th className="w-4/5">name</th>
                <th></th>
              </thead>
              <tbody>
                {permissions.map((permission) => {
                  return (
                    <tr key={permission.id}>
                      <td>{permission.name}</td>
                      <td className=" text-right pr-3">
                        <EditIcon
                          className="cursor-pointer"
                          onClick={() => handleEdit(permission)}
                        />
                        <DeleteIcon
                          className="cursor-pointer"
                          onClick={() => handleDelete(permission.name)}
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
        <PermissionUpdateModal
          setIsOpen={setIsModalOpen}
          updatingPermission={updatingPermission}
          fetchPermissions={fetchPermissions}
        />
      )}
    </>
  );
};

export default PermissionMgmt;
