import React, { useContext, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { UserContext } from '../../context/UserContext';
import { apiEndPointReds, httpResponseStatusCode } from '../../utils/apiEndpoint';

const Example = ({ }) => {
  const navigate = useNavigate();
  const { fetchRequest, fetchRefresh, fetchReceived, fetchHeader, fetchLoading, fetchError, fetchStatus, fetchUrl
  } = useFetch({ url: apiEndPointReds, getAllPages: true });
  const { userContext } = useContext(UserContext);

  useEffect(() => {
    //if ((!userContext) || (!userContext.validCredentials)) { navigate('/login'); }
    fetchRequest(fetchUrl);
    //setUserId('loaded');
  }, [fetchUrl]);

  useEffect(() => {
    //console.log('Example', dataFetched, fetchHeader, fetchLoading, fetchError);
    //console.log('Example fetchHeader', fetchHeader);
  }, [fetchReceived, fetchHeader, fetchLoading, fetchError]);

  return (
    <>
      <div className="border">
        <h4>Example - '{userContext?.username}'</h4>
        <h4>url {fetchUrl} </h4>
        <h4>fetch status {fetchStatus} record count {fetchReceived?.length}</h4>
        {fetchLoading && <h4>fetching...</h4>}
        {fetchError && <h4>fetch error {fetchError}</h4>}
        {
          fetchReceived &&
          fetchReceived.map((x, i) => {
            return (<p key={i}>{x?.RcKey}</p>);
          })
        }
      </div>
    </>
  )
}

export default Example;