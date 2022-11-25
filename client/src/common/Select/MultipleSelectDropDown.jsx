import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";

const MultipleSelectDropDown = ({
  options,
  keyName,
  setSelectedOptions,
  initialValue,
}) => {
  const ops = useMemo(() => {
    return options.map((el) => {
      return { ...el, value: el[keyName], label: el[keyName] };
    });
  }, [keyName, options]);

  const [value, setValue] = useState(null);

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

  return (
    <Select
      defaultValue={value}
      onChange={handleChange}
      options={ops}
      value={"hello"}
      isMulti
    />
  );
};

export default MultipleSelectDropDown;
