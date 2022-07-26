import React, { useState,useEffect }  from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import useFetch from '../../hooks/useFetch';

const ExpandableRow = ({ children,key,endpoint }) => {
    const [isExpand, setIsExpand] = useState(false);

    const handleExpand = () => {
        setIsExpand(prev => !prev);
    }
    
    const { data } = useFetch(endpoint)
    
    
    return (
        <>
          <tr className='bg-slate-100 hover:bg-slate-200 ' key={key}>     
            <td className="w-3" onClick={handleExpand}>{ isExpand ? <ArrowDropDownIcon /> : <ArrowRightIcon /> }</td>
                {children} 
        </tr>
        {
                isExpand && (
                    data.map(d => {
                        return (
                            <tr key={d}>
                                <td></td>
                                <td>{d}</td>
                            </tr>
                      )  
                    })  
        )}
        </>
  )
}

export default ExpandableRow