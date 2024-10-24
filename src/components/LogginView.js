import { NavLink, Button, Form } from 'react-bootstrap';
import "./LogginView.scss"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignUpModal from './SignUpModal';
import FindPwModal from './FindPwModal';
import { postCreateNewUser, postLoggin, postUserId } from './services/apiServices';
import dayjs from 'dayjs';
import { useHandleSubmit } from './services/useHandleSubmit';
import { useDispatch } from 'react-redux';
import { doLoggin } from '../redux/action/userAction'
import { useSelector } from "react-redux";

const LogginView = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showFindPwModal, setFindPwShowModal] = useState(false);
    const [email, setEmail] = useState('') //will disable
    const [userImage, setUserImage] = useState('') //will disable
    const [username, setUserName] = useState('') //change to Name, setName
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(''); // change to division later, (환자, 봉사자, 의료진)
    const [phoneNum, setPhoneNum] = useState('')
    const [birth, setBirth] = useState('') // change to Age?
    const [isUsable, setIsUsable] = useState(false)
    const dispatch = useDispatch();
    // const [SSN,setSSN] =useState('')
    // const [User_Id,setUser_Id]=useState('')
    const userInfo = useSelector(state => state.user.account)
    const [validated, setValidated] = useState(false);
    const [isLoggin, setIsLoggin] = useState(false);
    const { handleSubmit: handleSubmitSignUp } = useHandleSubmit(postCreateNewUser, "User created successfully!", "Something went wrong!")
    const { handleSubmit: handleSubmitLoggin } = useHandleSubmit(postLoggin, "Login successfully!", "Something went wrong!")
    const { handleSubmit: handleSubmitCheckId } = useHandleSubmit(postUserId, "이 ID 사용 가능합니다", " 이 ID 사용 불가합니다")

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

    const handleValidated = (e) => {
        e.preventDefault(); // Ngăn submit form tự động
        e.stopPropagation(); // Ngăn việc xử lý event tiếp tục lan ra các phần tử khác
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true); // Bật cờ validated lên nếu form không hợp lệ
            return;
        }
        if (isUsable) {
            alert('사용가능 ID를 입력해주세요')
            return;
        }
        console.log('handle submit clicked')
    }

    const handleSignUp = () => {
        setShowModal(true);
    }

    const handleSignUpClose = () => {
        setShowModal(false);

    }

    const handleFindPw = () => {
        setFindPwShowModal(true);
    }

    const handleFindPwClose = () => {
        setFindPwShowModal(false);
    }
    //회원가입의 response처리
    const handleSignUpSubmit = (e) => {
        handleValidated()
        if (isUsable) {
            alert('사용가능 ID를 입력해주세요')
            return;
        }
        console.log('handle submit clicked')
        handleSubmitSignUp(e, email, password, username, birth, phoneNum, role, userImage)
            .then((data) => {
                if (data) {
                    setShowModal(false)
                }
            })
    }

    //로그인 기능
    useEffect(() => {
        if (isLoggin) {
            console.log(userInfo.role);

            if (userInfo.role === "USER" || userInfo.role === "user") {
                navigate('/UserHome');
            }
            else if (userInfo.role === "ADMIN" || userInfo.role === "Medical") {
                navigate('/MedicalHome');
            }
            else {
                navigate('/VolunteerHome');
            }
        }
    }, [isLoggin, navigate, userInfo.role]);

    const handleLogginSubmit = (e) => {
        handleSubmitLoggin(e, email, password)
            .then((data) => {
                if (data) {
                    setIsLoggin(true)
                    dispatch(doLoggin(data))
                }
            })
    };

    //Id 사용가능 여부 체크
    const handleCheckId = (e) => {
        if (!email) {
            alert("ID를 입력해주세요");
            return;
        }
        handleSubmitCheckId(e, email)
            .then((data) => {
                if (data) {
                    setIsUsable(true);
                }
            })
    };



    return (
        <Form onSubmit={handleLogginSubmit} noValidate validated={validated}>
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
                <NavLink onClick={handleFindPw} >비밀번호 찾기</NavLink>
                <FindPwModal
                    show={showFindPwModal}
                    handleFindPwClose={handleFindPwClose}
                />
            </div>
            <div className='signUp-container'>
                <Form.Text className="text-muted" size="sm">

                    계정이 없으세요?
                </Form.Text>
                <NavLink onClick={handleSignUp} >회원가입</NavLink>
                <SignUpModal
                    show={showModal}
                    handleSignUpClose={handleSignUpClose}
                    handleSignUpSubmit={handleSignUpSubmit}
                    handleChange={handleChange}
                    validated={validated}
                    handleCheckId={handleCheckId}
                    isUsable={isUsable}
                />
            </div>
        </Form>
    );
}

export default LogginView;