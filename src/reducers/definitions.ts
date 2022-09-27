import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const definitionsApi = createApi({
  reducerPath: 'definitions',
  baseQuery: fetchBaseQuery({
    baseUrl: '/definitions/'
  }),
  endpoints: builder => ({
    getDefinitions: builder.query({
      query: plane => ({
        url: `${plane}.txt`,
        responseHandler: rsp => rsp.text()
      }),
      transformResponse: (text: string) => text.split('\n').map(line => {
        const [start] = line.split('.', 1);
        return {
          start: parseInt(start),
          definition: line
        };
      })
    })
  })
});


export const {useGetDefinitionsQuery} = definitionsApi;
