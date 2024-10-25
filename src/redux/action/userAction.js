export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS'
export const doLoggin = (data) => {
    return (
        {
            type: FETCH_USER_LOGIN_SUCCESS,
            payload: data
        }
    )
}