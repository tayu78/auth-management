
const PageContainer = ({title,children}) => {
  return (
    <div className='w-4/5 m-auto   mt-10 sm:w-full sm:p-5 sm:border-0  '>
     {/* <div className='w-4/5 m-auto border-2 p-16 mt-10 sm:w-full sm:p-5 sm:border-0 '> */}
      <h1 className='text-3xl mb-5'>{title}</h1>
      <div className="flex gap-20 sm:block">
          {children}

      </div>
   </div>
  )
}

export default PageContainer