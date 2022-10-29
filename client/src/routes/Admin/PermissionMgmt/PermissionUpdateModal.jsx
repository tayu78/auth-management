import React, { useState } from "react";
import { SERVER_DOMAIN } from "../../../cons/Cons";
import Modal from "../../../common/Modal";
import FormInput from "../../../common/Form/FormInput";
import FormSubmitBtn from "../../../common/Form/FormSubmitBtn";

const UpdateModal = ({
  setIsOpen,
  updatingPermission,
  fetchPermissions,
  requestAndShowMsg,
}) => {
  const [permissionName, setPermissionName] = useState(updatingPermission.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updatingPermission.name !== permissionName) {
      const requestOption = {
        method: "put",
        url: `${SERVER_DOMAIN}/permissions/${updatingPermission.id}`,
        data: {
          name: permissionName,
        },
      };
      requestAndShowMsg(requestOption, fetchPermissions);
    }

    setIsOpen(false);
  };

  return (
    <Modal setIsOpen={setIsOpen}>
      <div className="flex justify-center items-center  ">
        <div>
          <h2 className="text-cente mb-5">Update Permission</h2>
          <form onSubmit={handleSubmit}>
            <FormInput
              label="name"
              value={permissionName}
              handleChange={(e) => {
                setPermissionName(e.target.value);
              }}
            />
            <FormSubmitBtn>Update Permission </FormSubmitBtn>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateModal;
