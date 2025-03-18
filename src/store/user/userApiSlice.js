// import {apiSlice} from '../apiSlice';

// const USER_ENDPOINT = '/api/users';

// export const userAPISlice = apiSlice.injectEndpoints({
//   endpoints: builder => ({
//     loginAPI: builder.mutation({
//       query: data => ({
//         url: `${USER_ENDPOINT}/login`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     registerAPI: builder.mutation({
//       query: data => ({
//         url: `${USER_ENDPOINT}/register`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     verifyOTPAPI: builder.mutation({
//       query: data => ({
//         url: `${USER_ENDPOINT}/verifycode`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     resendOTPAPI: builder.mutation({
//       query: data => ({
//         url: `${USER_ENDPOINT}/resendcode`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//   }),
// });

// export const {
//   useLoginAPIMutation,
//   useRegisterAPIMutation,
//   useVerifyOTPAPIMutation,
//   useResendOTPAPIMutation,
// } = userAPISlice;
import { apiSlice } from '../apiSlice';

const USER_ENDPOINT = '/api/users';

export const userAPISlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    loginAPI: builder.mutation({
      query: data => ({
        url: `${USER_ENDPOINT}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    registerAPI: builder.mutation({
      query: data => ({
        url: `${USER_ENDPOINT}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    verifyOTPAPI: builder.mutation({
      query: data => ({
        url: `${USER_ENDPOINT}/verifycode`,
        method: 'POST',
        body: data,
      }),
    }),
    resendOTPAPI: builder.mutation({
      query: data => ({
        url: `${USER_ENDPOINT}/resendcode`,
        method: 'POST',
        body: data,
      }),
    }),
    forgotPasswordAPI: builder.mutation({
      query: data => ({
        url: `${USER_ENDPOINT}/forgotpassword`,
        method: 'POST',
        body: data,
      }),
    }),
    getUserProfileAPI: builder.query({
      query: () => ({
        url: `${USER_ENDPOINT}/profile`,
        method: 'GET',
      }),
    }),
    updateUserProfileAPI: builder.mutation({
      query: data => ({
        url: `${USER_ENDPOINT}/profile`,
        method: 'POST',
        body: data,
      }),
    }),
    updatePasswordAPI: builder.mutation({
      query: data => ({
        url: `${USER_ENDPOINT}/updatepassword`,
        method: 'POST',
        body: data,
      }),
    }),
    updateLanguageAPI: builder.mutation({
      query: data => ({
        url: `${USER_ENDPOINT}/preferredlanguage`,
        method: 'POST',
        body: data,
      }),
    }),
    saveStoryAPI: builder.mutation({
      query: data => ({
        url: `${USER_ENDPOINT}/savestory`,
        method: 'POST',
        body: data,
      }),
    }),
    removeStoryAPI: builder.mutation({
      query: data => ({
        url: `${USER_ENDPOINT}/removestory`,
        method: 'POST',
        body: data,
      }),
    }),
    getLibraryAPI: builder.query({
      query: () => ({
        url: `${USER_ENDPOINT}/library`,
        method: 'GET',
      }),
    }),
    getRefreshTokenAPI: builder.query({
      query: () => ({
        url: `${USER_ENDPOINT}/refreshtoken`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginAPIMutation,
  useRegisterAPIMutation,
  useVerifyOTPAPIMutation,
  useResendOTPAPIMutation,
  useForgotPasswordAPIMutation,
  useGetUserProfileAPIQuery,
  useUpdateUserProfileAPIMutation,
  useUpdatePasswordAPIMutation,
  useUpdateLanguageAPIMutation,
  useSaveStoryAPIMutation,
  useRemoveStoryAPIMutation,
  useGetLibraryAPIQuery,
  useGetRefreshTokenAPIQuery,
} = userAPISlice;
