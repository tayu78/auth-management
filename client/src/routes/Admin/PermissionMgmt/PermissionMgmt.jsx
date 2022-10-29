import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { SERVER_DOMAIN } from "../../../cons/Cons";

import useFetch from "../../../hooks/useFetch";
import PermissionUpdateModal from "./PermissionUpdateModal";
import FormInput from "../../../common/Form/FormInput";
import FormSubmitBtn from "../../../common/Form/FormSubmitBtn";
import PageContainer from "../../../common/PageContainer";
import ShowMsg from "../../../common/ShowMsg";
import useRequestAndShowMsg from "../../../hooks/useRequestAndShowMsg";

const PermissionMgmt = () => {
  const [permissionName, setPermissionName] = useState("");
  const [updatingPermission, setUpdatingPermission] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    status,
    msg,
    showMsg,
    setMsg,
    setStatus,
    setShowMsg,
    requestAndShowMsg,
  } = useRequestAndShowMsg();

  const { data: permissions, fetchData: fetchPermissions } =
    useFetch("permissions");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!permissionName) {
      setMsg("Plese fill permission name");
      setStatus("error");
      return;
    }
    const requestOption = {
      method: "post",
      url: `${SERVER_DOMAIN}/permissions`,
      data: {
        name: permissionName,
      },
    };
    await requestAndShowMsg(requestOption, fetchPermissions);
    setPermissionName("");
  };

  const handleEdit = (permission) => {
    setIsModalOpen(true);
    setUpdatingPermission(permission);
  };

  const handleDelete = async (name) => {
    const requestOption = {
      method: "delete",
      url: `${SERVER_DOMAIN}/permissions/${name}`,
    };
    await requestAndShowMsg(requestOption, fetchPermissions);
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
          requestAndShowMsg={requestAndShowMsg}
        />
      )}
    </>
  );
};

export default PermissionMgmt;
