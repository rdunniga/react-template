export const getApiServer = () => {
  //return 'https://rsoapi.riversidesheriff.org';
  //return 'https://rsoapi-demo.riversidesheriff.org';
  return 'https://rsoapi-dev.riversidesheriff.org';
  //return 'https://rsoapi-test.riversidesheriff.org';
  //return 'https://localhost:44363';
};

export const apiEndPointAdSearch = `${getApiServer()}/api/ad/search`;
export const apiEndPointAdUser = `${getApiServer()}/api/ad/user`;
export const apiEndPointAuthenticate = `${getApiServer()}/api/ad/authenticate`;
export const apiEndPointReds = `${getApiServer()}/api/reds/audits`;
export const apiEndPointRmsTiburonSsctab = `${getApiServer()}/api/RmsTiburon/ssctab`;
export const apiEndPointWmpPersonnalInfo = `${getApiServer()}/api/wmpluspersonnelinfo`;

export const httpResponseStatusCode = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  internalServerError: 500,
}