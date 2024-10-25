import axios from "axios";

const instance = axios.create({
    // 여기서 baseURL 앞부분을 적어주시고 services 폴더 => apiServices.js에서
    // 나머지 api부분을 적어주시면됩니다
    // 이 방법을 하면 나중에 api를 바꿔더라도 여기만 수정하고 힘들게 찾아서
    // 수정 필요없습니다

    //baseURL: http://localhost:8081/api/v1  // 예시

    //수정이나 삭제금지
    baseURL: process.env.REACT_APP_API_URL
    // baseURL: 'http://localhost:8081/'
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    console.log("interceptors", response)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default instance