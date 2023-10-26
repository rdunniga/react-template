import { useEffect, useState } from 'react'

// server = getApiServer(),
// authorization = getAuthorizationJwtToken(),
// const { data: { customers } = {}, errorStatus } = useFetch(...)
// const { data: word, errorStatus } = useFetch(...)
// const { data: [{ meanings: word }] = [{}], errorStatus } = useFetch(...)

function useFetch({
  method = 'GET',
  headers = { "Content-type": "application/json", },
  mode = 'cors',
  cache = 'no-cache',
  credentials = 'same-origin',
  redirect = 'follow',
  referrerPolicy = 'no-referrer',
  body = null,
  url = null,
  getAllPages = true,
} = {}) {

  const [fetchReceived, setFetchReceived] = useState();
  const [fetchError, setFetchError] = useState();
  const [fetchHeader, setFetchHeader] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchStatus, setFetchStatus] = useState();
  const [fetchUrl, setFetchUrl] = useState(url);
  const [fetchGetAllPages, setFetchGetAllPages] = useState(getAllPages);

  const init = {
    method,
    mode,
    cache,
    credentials,
    redirect,
    referrerPolicy,
    headers: headers,
    body:
      body && method !== "GET" && method !== "HEAD"
        ? JSON.stringify(body)
        : null,
  };

  const fetchRequest = async (url, purgeReceived = false) => {
    try {
      if (! url) { return; }
      setFetchLoading(true);
      setFetchStatus('');
      setFetchError('');
      
      if (getAllPages === false) {
        setFetchReceived('');
      }
      //console.log('fetching', url);
      await fetch(url, init)
        .then((response) => {
          // console.log('fetch response header', ...response.headers);
          // for (var pair of response.headers.entries()) {
          //   console.log('response header pair', pair[0], pair[1]);
          // }
          // console.log('fetch response', response);
          setFetchHeader(JSON.parse(response.headers.get('x-pagination')));
          setFetchStatus(response.status);
          if (!response.ok) {
            throw response.status;
          }
          return response.json();
        })
        .then((d) => {
          setFetchReceived(((purgeReceived === false) && (getAllPages === true) && (fetchReceived?.length > 0)) ? fetchReceived.concat(d) : d);
          setFetchError();
        })
        .catch((e) => {
          console.log('e', e);
          setFetchError(e);
          //throw e;
        });
    } catch (e) {
      //setFetchError(e);
      setFetchStatus(e);
      setFetchReceived();
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchRequestBody = ({body}) => {
    init.body = body ? JSON.stringify(body) : null;
    setFetchReceived();
    fetchRequest(fetchUrl);
  };

  const fetchRefresh = (id, reload) => {
    if (id) {
      if (reload && reload === true) {
        console.log('reload');
        setFetchReceived(null);
      }
    //console.log('refreshing...', id);
      url = id;
      fetchRequest();
    }
  };

  useEffect(() => {
    //console.log("pagination", fetchHeader);
    //console.log(`received count: ${fetchReceived?.length} pagination: ${fetchHeader?.CurrentPage} of ${fetchHeader?.TotalPages}; url: ${fetchUrl}`);
    if (! fetchGetAllPages) { return; }
    if (fetchHeader) {
      if (fetchHeader.CurrentPage < fetchHeader.TotalPages) {
        //console.log('here');
        url = fetchUrl.concat(fetchUrl.includes('?') ? '&' : '?', `PageNumber=${fetchHeader.CurrentPage + 1}`);
        fetchRequest(url);
        //setFetchUrl(url);
      }
    }
  }, [fetchReceived]);

  return {
    fetchRequest,
    fetchRequestBody,
    fetchRefresh,
    setFetchGetAllPages,
    fetchError,
    fetchHeader,
    fetchLoading,
    fetchReceived,
    fetchStatus,
    fetchUrl,
  };
}

export default useFetch;