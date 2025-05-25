import React, { useState } from 'react'

interface ILoadingState {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
  
const useLoading = ():ILoadingState => {
  const [isLoading,setIsLoading] = useState(false);
  return {isLoading,setIsLoading};
}

export default useLoading