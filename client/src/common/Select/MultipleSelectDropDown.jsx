import React, {useState} from 'react'
import Select from "react-select";

const MultipleSelectDropDown = ({options, keyName,setSelectedOptions }) => {
    const ops = options.map((el) => {
        return {...el,value: el[keyName],label:el[keyName] }
    })
    const [value, setValue] = useState(null);

    const handleChange = (ops => {
        setValue(ops.map((op) => {
            return op
        }))
        setSelectedOptions(ops.map((op) => {
            const {value,label,...rest} = op
            return rest
        }))
    })

  return (
    <Select
      defaultValue={value}
      onChange={handleChange}
      options={ops}
      isMulti
    />

  )
}

export default MultipleSelectDropDown