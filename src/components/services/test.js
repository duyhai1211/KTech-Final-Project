import { Button, Row, Col, Container, Form, FormControl } from "react-bootstrap"
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from '../utils/firebase.config'; // adjust the path accordingly
import { auth } from "../utils/firebase.config";

const Test = () => {
    const [phone, setPhone] = useState('')
    const [showOTP, setShowOTP] = useState(false)
    const [authCode, setAuthCode] = useState('')
    const [user, setUser] = useState(null)
    const auth = getAuth(app);
    auth.useDeviceLanguage()
    console.log(auth)
    useEffect(() => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
                'size': 'invisible',
                'callback': (response) => {
                    console.log("ReCaptcha solved:", response);
                },
                'expired-callback': () => {
                    alert("Recaptcha expired. Please try again.");
                }
            });
        }
    }, [auth]);
    
    let phone1 = phone;

    // Check if the first character is '0' and remove it
    if (phone1.startsWith("0")) {
        phone1 = phone1.slice(1);
    }

    console.log(phone1);  // Output: "10 xxxxxxx"

    const handleCheckPhone = (e) => {
        e.preventDefault();
        if (!phone) {
            alert("Please type a phone number");
            return;
        }

        console.log(`OTP sent to phone 1: +${phone}`, phone);
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+${phone}`, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log("OTP sent to phone:", phone);
                setShowOTP(true);
            }).catch((error) => {
                console.error("Error during signInWithPhoneNumber", error);
                alert("Failed to send OTP. Try again.");
            });
    };


    const handlePhoneChange = (value) => {
        // Check if the phone number starts with "0"
        let phone = value;
        if (phone.startsWith(0)) {
            // Remove the leading "0"
            phone = phone.slice(1);
        }

        // Set the processed phone number back into the state
        setPhone(phone);

        // Log the processed phone number for debugging
        console.log(phone);
    };

    const handleCheckCode = async () => {
        const confirmationResult = window.confirmationResult;
        if (!confirmationResult || !authCode) {
            alert("Invalid code or verification process");
            return;
        }

        try {
            const result = await confirmationResult.confirm(authCode);
            setUser(result.user);
            console.log("Phone verified, user:", result.user);
            alert("Phone number verified successfully!");
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("Invalid OTP, please try again.");
        }
    };
    return (
        <>
            test page
            <div className="container w-200">
                <Form >
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <h1>{phone}</h1>
                        <PhoneInput className="container "
                            country={'kr'}
                            value={phone}
                            onChange={handlePhoneChange}
                            inputProps={{
                                //pattern: "^(\d{2,3})-(\d{3,4})-(\d{4})$",
                                type: "tel",
                                name: 'phone',
                                required: true,
                                autoFocus: true,
                                placeholder: "010-XXXX-XXXX"
                            }}
                        />
                        <Button className="btn btn-sm"
                            onClick={handleCheckPhone}>Check</Button>
                    </Form.Group>
                    {
                        showOTP &&
                        (<Form.Group>
                            <h1>{authCode}</h1>
                            <Row>
                                <Col><Form.Label>OTP Code</Form.Label></Col>
                                <Col><Form.Control type="number" name='auth-phone'
                                    onChange={e => setAuthCode(e.target.value)} /></Col>
                                <Col>
                                    <Button className="btn btn-sm"
                                        onClick={handleCheckCode}
                                    >Check</Button>
                                </Col>
                            </Row>

                        </Form.Group>)
                    }
                    <Button type="submit" className="btn btn-success">Send</Button>
                </Form>
                <div id="sign-in-button"></div> {/* Recaptcha verifier */}
            </div>

        </>)

}
export default Test