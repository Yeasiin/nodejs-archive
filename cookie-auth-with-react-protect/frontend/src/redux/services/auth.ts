import { setCredential } from "../slice/authSlice";
import { BASE_URL } from "./../../constants/url";
import { apiBuilder } from "./api";
import { toast } from "react-toastify";

const authApi = apiBuilder.injectEndpoints({
  endpoints: (builder) => ({
    showMe: builder.query({
      query: () => BASE_URL + "auth/profile",
    }),

    register: builder.mutation({
      query: (body) => ({
        url: BASE_URL + "auth/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          console.log("hai from this 2");
          dispatch(setCredential(data.data));
          console.log("hai from this");
        } catch (error) {
          toast.error(error.error.data.message, {
            draggable: true,
          });
        }
      },
    }),
  }),
});

export const { useShowMeQuery, useRegisterMutation } = authApi;
