import React, { useState, useReducer, useEffect, useCallback } from "react";
import { SERVER_DOMAIN } from "../../../cons/Cons";
import reducer from "../../../utils/reducer";
import useFetch from "../../../hooks/useFetch";
import useRequestAndShowMsg from "../../../hooks/useRequestAndShowMsg";
import Form from "../../../common/Form";
import Table from "../../../common/Table";
import MultipleSelectDropDown from "../../../common/Select/MultipleSelectDropDown";
import ExpandableRow from "../../../common/Table/ExpandableRow";
import RoleUpdateModal from "./RoleUpdateModal";
import PageContainer from "../../../common/PageContainer";
import ShowMsg from "../../../common/ShowMsg";

const RoleMgmt = () => {
  // const [roleName, setRoleName] = useState("");
  const [formData, dispatch] = useReducer(reducer, {
    name: "",
  });
  const [updatingRole, setUpdatingRole] = useState({});
  const [selectedPermissions, setSelectedPermissions] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: permissions } = useFetch("permissions");
  const { data: roles, fetchData: fetchRoles } = useFetch("roles");

  const {
    status,
    msg,
    showMsg,
    setMsg,
    setStatus,
    setShowMsg,
    requestAndShowMsg,
  } = useRequestAndShowMsg();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setMsg("Plese fill role name");
      setStatus("error");
      return;
    }

    const requestOption = {
      method: "post",
      url: `${SERVER_DOMAIN}/roles`,
      data: {
        name: formData.name,
        selectedPermissions,
      },
    };
    await requestAndShowMsg(requestOption, fetchRoles);
    // setRoleName("");
    dispatch({
      type: "UPDATE_DATA",
      payload: {
        data: "",
        key: "name",
      },
    });
    setSelectedPermissions(null);
  };

  const handleEdit = (role) => {
    setUpdatingRole(role);
    setIsModalOpen(true);
  };

  const handleDelete = async (name) => {
    const requestOption = {
      method: "delete",
      url: `${SERVER_DOMAIN}/roles/${name}`,
    };
    await requestAndShowMsg(requestOption, fetchRoles);
  };

  const rowPropsArray = roles.map((role) => {
    return {
      key: role.id,
      endpoint: `roles/${role.name}`,
      fetchTriggerData: role,
    };
  });

  return (
    <>
      <PageContainer title="Role Management">
        <div className=" flex-1">
          <div className="page-item">
            <Form
              handleSubmit={handleSubmit}
              datas={formData}
              dispatch={dispatch}
              Select={useCallback(() => {
                return (
                  <MultipleSelectDropDown
                    options={permissions}
                    keyName="name"
                    setSelectedOptions={setSelectedPermissions}
                  />
                );
              }, [])}
            />
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
            <Table
              datas={roles}
              Row={(props) => <ExpandableRow {...props} />}
              theads={["name"]}
              rowPropsArray={rowPropsArray}
              primary={"name"}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </PageContainer>
      {isModalOpen && (
        <RoleUpdateModal
          setIsModalOpen={setIsModalOpen}
          permissions={permissions}
          updatingRole={updatingRole}
          fetchRoles={fetchRoles}
          requestAndShowMsg={requestAndShowMsg}
        />
      )}
    </>
  );
};

export default RoleMgmt;
