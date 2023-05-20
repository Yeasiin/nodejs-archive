import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiBuilder = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: () => ({}),
});
