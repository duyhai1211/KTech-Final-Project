import { useEffect, useState } from "react"
import { getAllUsers } from "./apiServices"

const useFetchUser = () => {
    const [listUser, setListUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const handleFetchAllUser = async () => {
        try {
            let res = await getAllUsers()
            console.log(res)
            if (res.EC === 0) {
                setListUser(res.DT)
            } else {
                setError('Error Fetching User Data')
            }
        }
        catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => { handleFetchAllUser() }, [])
    return { listUser, isLoading, error };

}
export { useFetchUser }