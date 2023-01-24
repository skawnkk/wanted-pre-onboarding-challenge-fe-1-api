import React from 'react';
import {Spinner} from "@chakra-ui/react";

function LoadingSpinner() {

  return (
    <div className={'absolute flex items-center justify-center bg-slate-400 bg-opacity-30 top-0 bottom-0 left-0 right-0 z-90'}>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </div>
  );
}

export default LoadingSpinner;