import React, { useMemo } from "react";
import Select from "react-select";

const MultipleSelectDropDown = ({
  options,
  keyName,
  setSelectedOptions,
  value,
  setValue,
}) => {
  const ops = useMemo(() => {
    return options.map((el) => {
      return { ...el, value: el[keyName], label: el[keyName] };
    });
  }, [keyName, options]);

  const handleChange = (ops) => {
    console.log("changed", ops);
    setValue(
      ops.map((op) => {
        return op;
      })
    );
    setSelectedOptions(
      ops.map((op) => {
        const { value, label, ...rest } = op;
        return rest;
      })
    );
  };

  return <Select onChange={handleChange} options={ops} value={value} isMulti />;
};

export default MultipleSelectDropDown;
