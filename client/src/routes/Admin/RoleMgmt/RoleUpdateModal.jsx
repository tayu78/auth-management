import { useState, useMemo } from "react";
import Modal from "../../../common/Modal";
import FormInput from "../../../common/Form/FormInput";
import MultipleSelectDropDown from "../../../common/Select/MultipleSelectDropDown";
import { SERVER_DOMAIN } from "../../../cons/Cons";

const RoleUpdateModal = ({
  setIsModalOpen,
  permissions,
  updatingRole,
  fetchRoles,
  requestAndShowMsg,
}) => {
  const [roleName, setRoleName] = useState(updatingRole.name);
  const [selectedPermissions, setSelectedPermissions] = useState(
    updatingRole.Permissions.map((permission) => {
      const { rolesPermissions, ...rest } = permission;
      return { ...rest };
    })
  );

  const initialValue = useMemo(() => {
    return selectedPermissions.map((permission) => {
      return { ...permission, value: permission.name, label: permission.name };
    });
  }, [selectedPermissions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data =
      updatingRole.name === roleName
        ? { selectedPermissions }
        : { name: roleName, selectedPermissions };

    const requestOption = {
      method: "put",
      url: `${SERVER_DOMAIN}/roles/${updatingRole.id}`,
      data,
    };
    requestAndShowMsg(requestOption, fetchRoles);
    setIsModalOpen(false);
  };

  return (
    <Modal setIsOpen={setIsModalOpen}>
      <h1>Update Role</h1>
      <form className="mt-5" onSubmit={handleSubmit}>
        <FormInput
          label="name"
          value={roleName}
          handleChange={(e) => setRoleName(e.target.value)}
        />
        <div>
          <MultipleSelectDropDown
            options={permissions}
            keyName="name"
            setSelectedOptions={setSelectedPermissions}
            initialValue={initialValue}
          />
        </div>
        <div className="text-right">
          <button className="border-2 p-2 mt-5" type="submit">
            Update role
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RoleUpdateModal;
