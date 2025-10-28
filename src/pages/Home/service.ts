import { request } from '@umijs/max';

export async function getGridOneData(body: any, options?: { [key: string]: any }) {
  return request('/gateway-api/apiBridge/xpan-data/dsp-search/common/xpan/pre/data/GainPlanAgent/AreaProfitAmtChart', {
    method: 'POST',
    data: { ...body },
    headers: {
      Cookie: "nanoid=RPNIIFeEQ4qSpCd-AUT9D5MFFdEXTn-1759219874723; IOH_TOKEN_KEY=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI4MDAwODEwMCIsImV4cCI6MTc3NTg4OTExN30.boGiuMLnt_757nYGp8uhi68FZtB6fn5J9hjcgEK9JYU; a_authorization_login=80008100; authorization_login_dgw=80008100; sensorsdata2015session=%7B%7D; wxf=fc5d3d9d-9db1-4c3f-a089-e19198ea39a3; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2280008100%22%2C%22first_id%22%3A%2219999ad4a1e1204-0df989de25c914-26001c51-2073600-19999ad4a1f1a81%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22http%3A%2F%2Flocalhost%3A5175%2F%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTk5OTlhZDRhMWUxMjA0LTBkZjk4OWRlMjVjOTE0LTI2MDAxYzUxLTIwNzM2MDAtMTk5OTlhZDRhMWYxYTgxIiwiJGlkZW50aXR5X2xvZ2luX2lkIjoiODAwMDgxMDAifQ%3D%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%2280008100%22%7D%2C%22%24device_id%22%3A%2219999b28ca58f1-029e64b6e322582-26001c51-2073600-19999b28ca6124d%22%7D; uni_auth_session=s%3AVgjIo7lL_LUG49O8IJ5lvTJZ60taDCMM.OaDTSg5zoiokGG0AuEHrYc214ituP9oczObWOuEqMpo; JSESSIONID=node01h40u1nelanwknfliqgjkaevz56634.node0; a_authorization=da60f16c-d5a6-4d76-8366-fbc2c6438416/20e27ccf-d357-45b4-9370-d23719adf9e1/80CEEED868C02F041C5CE0188DFD0660; validate_key_auth=fd56115eac1e48ff95b615b1d9907f93; _TOKEN_KEY_=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI4MDAwODEwMCIsImV4cCI6MTc2MTY3NzY0M30.XfeBrZrQoJaMBLeBcSVIaWVwZJ28o-K27DdM8X3hhIU"
    },
    ...(options || {}),
  });
}