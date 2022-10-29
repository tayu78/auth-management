import { useState } from "react";
import axios from "axios";

const useRequestAndShowMsg = () => {
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const requestAndShowMsg = async (requestOption, fetchFunc) => {
    try {
      const {
        data: { message },
      } = await axios(requestOption);
      setMsg(message);
      setStatus("success");
      await fetchFunc();
    } catch (err) {
      setMsg(err.response.data.message);
      setStatus("error");
    } finally {
      setShowMsg(true);
    }
  };

  return {
    status,
    msg,
    showMsg,
    setMsg,
    setStatus,
    setShowMsg,
    requestAndShowMsg,
  };
};

export default useRequestAndShowMsg;
