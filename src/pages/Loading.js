import React from 'react';

function Loading() {
  return <div><div className='flex justify-center pt-10'><span className="loading loading-infinity w-64"></span></div><p className="text-center text-xl lg:text-2xl">Chargement...</p></div>;
}

export default Loading;
