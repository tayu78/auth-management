import React, { useEffect, useState}  from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import useFetch from '../../hooks/useFetch';


const ExpandableRow = ({ children,key,endpoint,fetchTriggerData }) => {
    const [isExpand, setIsExpand] = useState(false);

    const handleExpand = () => {
        setIsExpand(prev => !prev);
    }
    
    const { data, setData,fetchData } = useFetch(endpoint);

    useEffect(() => {
       if(!Array.isArray(data)) setData([data])
    },[data, setData])
    
    useEffect(() => {
        fetchData();
    }, [fetchData, fetchTriggerData])
    
    
    return (
        <>
          <tr className='bg-slate-100 hover:bg-slate-200 ' key={key}>     
            <td className="w-3" onClick={handleExpand}>{ isExpand ? <ArrowDropDownIcon /> : <ArrowRightIcon /> }</td>
                {children} 
        </tr>
        {
                isExpand && Array.isArray(data) && (
                    data.map((d,index)=> {
                        return (
                            <tr key={d + index}>
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