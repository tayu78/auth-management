
const PageContainer = ({title,children}) => {
  return (
    <div className='w-4/5 m-auto border-2 p-16 mt-10 sm:w-full sm:p-5 sm:border-0 '>
          <h1 className='text-3xl'>{title}</h1>
          {children}
   </div>
  )
}

export default PageContainer