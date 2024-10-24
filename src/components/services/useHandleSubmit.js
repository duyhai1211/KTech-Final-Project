import { useState } from "react"


export const useHandleSubmit = (submitCallback, successMes, errorMes) => {
    const [validated, setValidated] = useState(false)

    const handleSubmit = async (e, ...parameters) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        console.log('running handle submit1')
        if (form.checkValidity() === false) {
            console.log('running checkValidity() === false')
            setValidated(true)
            return;
        }
        console.log('running handle submit2')
        setValidated(true)
        try {
            const data = await submitCallback(...parameters);
            console.log("Response data:", data);
            if (data && data.EC === 0) {
                alert(successMes);
                return data;
            } else {
                alert(data?.EM || errorMes)
                return null;
            }
        } catch (error) {
            alert("An Error Occurred. Please try again")
            console.log(error)
            return null
        }
    };
    return { validated, handleSubmit }
}
