import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';



const SelectDropDown = ({selectedData,setSelectedData,selectOptions,initialOption}) => {
  const [isDropdownHidden, setIsDropdownHidden] = useState(true);
  const handleSelect = (e) => {
    setSelectedData(e.target.textContent);
    setIsDropdownHidden(true);
  }
    
  const handleDropdownOpen = ()=> {
    setIsDropdownHidden(prev => !prev);
  }
  return (
    <div>
    <div className='relative w-3/5 sm:w-4/5 '> 
      <p onClick={handleDropdownOpen} className='relative border p-2  rounded  appearance-none cursor-pointer' onChange={handleSelect}>
        {selectedData || initialOption}
        {isDropdownHidden ? <KeyboardArrowDownIcon class="absolute top-3 right-4 w-5 " /> : <KeyboardArrowRightIcon class="absolute top-3 right-4 w-5" />}
      </p>

      <div className={isDropdownHidden ?  'hidden  mt-2  rounded absolute ' : ' mt-2 max-h-40 overflow-scroll rounded absolute w-full bg-white border'}>
      <ul className='rounded  cursor-pointer' >
        {selectOptions.map(option => {
            return <li key={option.id + option.name} onClick={handleSelect} className="align-middle p-3  hover:bg-slate-100" >{option.name}</li>
          })}
        </ul>
     </div> 
  
          </div>
    </div>      
  )
}

export default SelectDropDown