import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * rowPropsArray is optionnal
 */

const Table = ({
  datas,
  theads,
  Row,
  rowPropsArray,
  primary,
  handleEdit,
  handleDelete,
}) => {
  useEffect(() => {
    console.log("datas in Table", datas);
  }, [datas]);
  return (
    <table className="mt-5 w-full border-y-2">
      <thead className="border-y-2 text-left">
        {theads.map((key) => {
          return <th>{key}</th>;
        })}
        <th></th>
      </thead>
      <tbody>
        {datas.length > 0 &&
          datas.map((data, index) => {
            return (
              <Row {...rowPropsArray[index]}>
                {theads.map((key, index) => {
                  return <td key={index}>{data[key] ? data[key] : ""}</td>;
                })}
                <td>
                  <EditIcon onClick={() => handleEdit(data)} />
                  <DeleteIcon
                    className="hover:bg-slate-300 "
                    onClick={() => handleDelete(data[primary])}
                  />
                </td>
              </Row>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
