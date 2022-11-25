import { useEffect } from "react";
import FormInput from "./FormInput";

const Form = ({ handleSubmit, datas, dispatch, Select }) => {
  useEffect(() => {
    console.log("datas in Form component", datas);
  }, [datas]);
  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      {Object.keys(datas).map((key) => {
        return (
          <FormInput
            label={key}
            value={datas[key]}
            handleChange={(e) =>
              dispatch({
                type: "UPDATE_DATA",
                payload: {
                  data: e.target.value,
                  key,
                },
              })
            }
          />
        );
      })}
      <div>
        <Select />
      </div>
      <div className="text-right">
        <button className="border-2 p-2 mt-5" type="submit">
          Create
        </button>
      </div>
    </form>
  );
};

export default Form;
