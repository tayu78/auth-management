import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useEffect } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const ShowMsg = ({ status, msg, setShowMsg, absolute }) => {
  useEffect(() => {
    const st = setTimeout(() => {
      setShowMsg(false);
    }, 3000);
    return () => clearTimeout(st);
  }, []);

  return (
    <div
      className={` p-3 rounded flex mb-5 ${
        absolute && "absolute"
      } right-0 top-20 ${status === "error" ? "bg-rose-100" : "bg-lime-100"}`}
    >
      {status === "error" ? (
        <ErrorOutlineIcon className="text-rose-500" />
      ) : (
        <CheckCircleOutlineIcon className="text-lime-500" />
      )}
      <div className="ml-5">
        <span
          className={`${
            status === "error" ? "text-rose-600" : "text-lime-600"
          }`}
        >
          {msg}
        </span>
      </div>
    </div>
  );
};

export default ShowMsg;
