import { NavLink, Button, Row, Form, Container, Col, Image } from 'react-bootstrap';
import "./LogginView.scss"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import Banner from '../../assets/Food/Banner';

import { useSelector } from "react-redux";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Paper } from '@mui/material';
import CustomerSignUp from './CustomerSignUp';
import Nav from 'react-bootstrap/Nav';
import RestaurantSignUp from './RestaurantSignUp';
const SignUpPage = () => {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showFindPwModal, setFindPwShowModal] = useState(false);
    const [email, setEmail] = useState('') //will disable
    const [userImage, setUserImage] = useState('')
    const [username, setUserName] = useState('') //change to Name, setName
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(''); // change to division later, (환자, 봉사자, 의료진)
    const [phoneNum, setPhoneNum] = useState('')
    const [birth, setBirth] = useState('') // change to Age?
    const [isUsable, setIsUsable] = useState(false)
    // const dispatch = useDispatch();

    // const [User_Id,setUser_Id]=useState('')
    const userInfo = useSelector(state => state.user.account)
    const [validated, setValidated] = useState(false);
    const [isLoggin, setIsLoggin] = useState(false);
    // const { handleSubmit: handleSubmitSignUp } = useHandleSubmit(postCreateNewUser, "User created successfully!", "Something went wrong!")
    // const { handleSubmit: handleSubmitLoggin } = useHandleSubmit(postLoggin, "Login successfully!", "Something went wrong!")
    // const { handleSubmit: handleSubmitCheckId } = useHandleSubmit(postUserId, "이 ID 사용 가능합니다", " 이 ID 사용 불가합니다")
    const [showPw, setShowPw] = useState(false);
    const handleShowPassword = () => {
        setShowPw(!showPw)
    }
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'username':
                setUserName(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'userImage':
                setUserImage(files[0]);
                break;
            case 'role':
                setRole(value);
                break;
            case 'phone':
                setPhoneNum(value)
                break;
            case 'birth':
                const formattedDate = dayjs(value).format('YYYY/MM/DD')
                setBirth(formattedDate);
                break;
            default:
                break;
        }
        console.log(name, " ", value)
    };

    const handleSignUpSubmit = () => {

    }
    const handleCheckId = () => {

    }

    return (
        <>
            <Container className=' align-self-center'>
                <Row >
                    <Col>
                        <Row>
                            <Image src={Banner[3].img} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} rounded />
                        </Row>


                    </Col>
                    <Col>
                        <Nav fill variant="tabs" defaultActiveKey="/home">
                            <Nav.Item>
                                <Nav.Link eventKey="link-1"
                                    onClick={() => setRole("customer")}
                                >일반 회원</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2"
                                    onClick={() => setRole("restaurant")}
                                >식당 회원</Nav.Link>
                            </Nav.Item>

                        </Nav>

                        {role === "customer" &&
                            <CustomerSignUp
                                handleChange={handleChange}
                                handleSignUpSubmit={handleSignUpSubmit}
                                handleCheckId={handleCheckId}
                                handleShowPassword={handleShowPassword}
                                showPw={showPw}
                                validated={validated}
                            />
                        }
                        {role === "restaurant" &&
                            <RestaurantSignUp
                                handleChange={handleChange}
                                handleSignUpSubmit={handleSignUpSubmit}
                                handleCheckId={handleCheckId}
                                handleShowPassword={handleShowPassword}
                                showPw={showPw}
                                validated={validated}
                            />}

                    </Col>
                </Row>


            </Container>


        </>
    )
}
export default SignUpPage