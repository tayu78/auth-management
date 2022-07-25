import React, { useState }  from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const ExpandableRow = ({ children,key }) => {
    const [isExpand, setIsExpand] = useState(false);

    const handleExpand = () => {
        setIsExpand(prev => !prev);
    }
        
    
    
    return (
        <>
          <tr className='bg-slate-100' key={key}>     
            <td className="w-3" onClick={handleExpand}>{ isExpand ? <ArrowDropDownIcon /> : <ArrowRightIcon /> }</td>
                {children} 
        </tr>
        {
           isExpand && (
                    <tr >
                        <td></td>
                        <td>hello</td>
                    </tr>
   
        )}
        </>
      
        
        
        
  )
}

export default ExpandableRow