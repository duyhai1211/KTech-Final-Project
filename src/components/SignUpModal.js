import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const SignUpModal = ({ handleCheckId, show, handleSignUpClose, handleSignUpSubmit, validated, handleChange, isUsable }) => {
    const [showPw, setShowPw] = useState(false);
    const handleShowPassword = () => {
        setShowPw(!showPw)
    }


    return (
        <Modal show={show} onHide={handleSignUpClose}>
            <Modal.Header closeButton>
                <Modal.Title>회원가입</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSignUpSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail" hasvalidation="true">
                        <Form.Label column sm="3">ID</Form.Label>
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

                    <Form.Group as={Row} className="mb-3" hasvalidation="true">
                        <Form.Label column sm="3">
                            Division
                        </Form.Label>
                        <Col>
                            <div key={`inline-radio`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="일반 사용자"
                                    name="role"
                                    type="radio"
                                    value="Patient"
                                    id={`inline-radio-1`}
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    inline
                                    label="봉사자"
                                    name="role"
                                    type="radio"
                                    value="Volunteer"
                                    id={`inline-radio-2`}
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    inline
                                    label="의료진"
                                    name="role"
                                    type="radio"
                                    value="Medical"
                                    id={`inline-radio-3`}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">선택하셔야 합니다</Form.Control.Feedback>
                            </div>
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
                        <Col xs="auto">
                            <Button variant="secondary" onClick={handleSignUpClose}>
                                닫기
                            </Button>
                        </Col>

                    </Row>


                </Form>
            </Modal.Body>

        </Modal>
    );
};


export default SignUpModal;