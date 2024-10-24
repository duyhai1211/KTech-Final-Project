import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, birth, phoneNum, role, userImage) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);
    formData.append('birth', birth);
    formData.append('phoneNum', phoneNum);
    formData.append('role', role);
    if (userImage) {
        formData.append('userImage', userImage);
    }
    //return axios.post(`/...`, formData);
    // return axios.post(`/participant`, formData);
    // return axios.post(`/signup`, formData)
}

const getAllUsers = () => {
    // return axios.get(`/.../...`);
    // return axios.get(`/participant/all`);
}

//개인정보 수정 (pw 아님)
const putEditUserData = (id, username, role, userImage) => {
    const formData = new FormData();
    formData.append('id', id);
    if (username) {
        formData.append('username', username);
    }
    formData.append('role', role)
    if (userImage) {
        formData.append('userImage', userImage);
    }
    //return axios.put(`/...`)
    // return axios.put(`/participant`, formData)
}

//로그인
const postLoggin = (email, password) => {
    const formData = new FormData();
    formData.append('email', email)
    formData.append('password', password)

    return axios.post(`/login`, formData)
}
//ID check
const postUserId = (email) => {
    // return axios.get(`/email/{email}`)
    const formData = new FormData();
    formData.append('email', email)

    // return axios.post(`/idcheck`, formData);
}
export { postCreateNewUser, getAllUsers, putEditUserData, postLoggin, postUserId }