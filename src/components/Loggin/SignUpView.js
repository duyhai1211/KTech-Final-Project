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
                        <Image src={Banner[3].img} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} rounded />

                    </Col>
                    <Col>
                        <Form noValidate validated={validated} onSubmit={handleSignUpSubmit}>
                            <Form.Group as={Row} className="mb-3" controlId="formBasicEmail" hasvalidation="true">
                                <Form.Label column sm="3">이메일</Form.Label>
                                <Col sm="7">
                                    <Form.Control type="text" //type="text"
                                        placeholder="TopazIoT6"
                                        name="email" //name="User_Id"
                                        required
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">ID를 입력해주세요</Form.Control.Feedback>
                                </Col>
                                <Col sm="2">
                                    <Button style={{ padding: '6px 11px' }}
                                        onClick={handleCheckId}
                                    >체크</Button>
                                </Col>

                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword" hasvalidation="true">
                                <Form.Label column sm="3">
                                    비밀번호
                                </Form.Label>
                                <Col sm="7">
                                    <Form.Control placeholder="Password"
                                        name="password" onChange={handleChange} required
                                        type={showPw ? "text" : "password"} />
                                    <Form.Control.Feedback type="invalid">비밀번호 입력해주세요</Form.Control.Feedback>
                                </Col>
                                <Col sm="2">
                                    <Button onClick={handleShowPassword}
                                        style={{ padding: '6px 11px' }}
                                    >{showPw ? <FaRegEyeSlash /> : <FaRegEye />}</Button>
                                </Col>

                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName" hasvalidation="true">
                                <Form.Label column sm="3">
                                    이름
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control required type="text" name="username" onChange={handleChange} />
                                    <Form.Control.Feedback type="invalid">이름을 입력해주세요</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextAge" hasvalidation="true">
                                <Form.Label column sm="3">
                                    생년월일
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control required type="date" name="birth" onChange={handleChange} />
                                    <Form.Control.Feedback type="invalid">생년월일을 입력해주세요</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPhone" hasvalidation="true">
                                <Form.Label column sm="3">
                                    전화번호
                                </Form.Label>
                                <Col sm="7">
                                    <Form.Control required type="phone" name="phone" onChange={handleChange} />
                                    <Form.Control.Feedback type="invalid">전화번호 입력해주세요</Form.Control.Feedback>
                                </Col>
                            </Form.Group>



                            {/* <Form.Group controlId="formFile" className="mb-3" >
                        <Form.Label>이미지</Form.Label>
                        <Form.Control type="file" name="userImage" onChange={handleChange} />
                    </Form.Group> */}
                            <Form.Group className="mb-3" hasvalidation="true">
                                <Form.Check
                                    required
                                    label="이용약관과 동의합니다"
                                    feedback="동의 체크 하셔야합니다"
                                    feedbackType="invalid"
                                />
                            </Form.Group>
                            <Row gap={3} className="justify-content-center">
                                <Col xs="auto" >
                                    <Button variant="primary" type='submit' >
                                        회원가입
                                    </Button>
                                </Col>


                            </Row>


                        </Form>
                    </Col>
                </Row>


            </Container>


        </>
    )
}
export default SignUpPage