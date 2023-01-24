import React from 'react';

interface ErrorFallbackProps{
  onReset:()=>void
  message?:string
}
function ErrorFallback({onReset, message=''}:ErrorFallbackProps) {
  return (
    <div className={'p-30'}>
      <p>{message}</p>
      <p>There was an error!</p>
      <button className={'btn-default'} onClick={onReset}>Try again</button>
    </div>
  );
}

export default ErrorFallback;