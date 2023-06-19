import React, { Fragment, useEffect, useState } from 'react'
import Loading from './Loading';

const Preloader = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous operation
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after the operation is complete
    }, 2000); // Simulating a 2-second delay
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className='w-full h-screen flex justify-center items-center'><Loading /></div>
      ) : (

        <Fragment>
          {children}
        </Fragment>

      )}
    </div>
  )
}

export default Preloader