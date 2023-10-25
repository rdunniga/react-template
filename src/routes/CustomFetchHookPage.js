import React from 'react';
import FetchHook from '../components/Template/FetchHook';
import { apiEndPointRmsTiburonSsctab, apiEndPointReds, apiEndPointWmpPersonnalInfo } 
  from '../utils/apiEndpoint';

function CustomFetchPage() {
  return (
    <>
      <h2 className='title'>Custom Fetch Hook</h2>
      <FetchHook url={apiEndPointRmsTiburonSsctab + '/n*'} />
      <FetchHook url={`${apiEndPointWmpPersonnalInfo}?filter=workAddress=1500 Castellano Rd.`} />
      <FetchHook url={apiEndPointReds} />
    </>
  )
}

export default CustomFetchPage;