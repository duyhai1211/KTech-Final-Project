import { NavLink, Button, Row, Form, Container, Col, Image } from 'react-bootstrap';
import "./LogginView.scss"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import Banner from '../../assets/Food/Banner';

import { useSelector } from "react-redux";

const LogginView = () => {
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
    // const [SSN,setSSN] =useState('')
    // const [User_Id,setUser_Id]=useState('')
    const userInfo = useSelector(state => state.user.account)
    const [validated, setValidated] = useState(false);
    const [isLoggin, setIsLoggin] = useState(false);
    // const { handleSubmit: handleSubmitSignUp } = useHandleSubmit(postCreateNewUser, "User created successfully!", "Something went wrong!")
    // const { handleSubmit: handleSubmitLoggin } = useHandleSubmit(postLoggin, "Login successfully!", "Something went wrong!")
    // const { handleSubmit: handleSubmitCheckId } = useHandleSubmit(postUserId, "이 ID 사용 가능합니다", " 이 ID 사용 불가합니다")

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

    const handleLoggin = () => {

    }

    return (
        <Container className=' align-self-center'>
            <Row>
                <Col md={5} lg={6}>
                    <Image src={Banner[3].img} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} rounded />
                </Col>
                <Col md={5} lg={6}>
                    <Form onSubmit={handleLoggin} noValidate validated={validated}>
                        <Form.Group className="mb-3" controlId="formBasicId">
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" placeholder="예제: topaziot6"
                                name="email" onChange={handleChange}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호 입력해주세요"
                                name="password" onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" >
                            로그인
                        </Button>
                        <div className='findPw-container'>
                            <Form.Text className="text-muted" size="sm">
                                비밀번호 잊으세요?
                            </Form.Text>
                            <NavLink  >비밀번호 찾기</NavLink>
                            {/* <FindPwModal
                    show={showFindPwModal}
                    handleFindPwClose={handleFindPwClose}
                /> */}
                        </div>
                        <div className='signUp-container'>
                            <Form.Text className="text-muted" size="sm">

                                계정이 없으세요?
                            </Form.Text>
                            <NavLink onClick={navigate("/SignUpPage")} >회원가입</NavLink>

                        </div>
                    </Form>
                </Col>
            </Row>


        </Container>

    );
}

export default LogginView;