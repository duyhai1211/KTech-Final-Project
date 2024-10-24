import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import PhoneAuth from './PhoneAuth';

const FindPwModal = ({ userInfo, show, handleFindPwClose }) => {
    const [isChecked, setIsChecked] = useState(false)
    const minutes = 5
    const handlePhoneAuth = () => {
        PhoneAuth()
    }
    const handleChecked = () => {
        setIsChecked(prevState => !prevState);
        console.log(isChecked);
    };
    return (
        <Modal show={show} onHide={handleFindPwClose}>
            <Modal.Header closeButton>
                <Modal.Title>비밀번호 찾기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicId">
                        <Form.Label column sm="3">ID</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" placeholder="TopazIoT6" />
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                        <Form.Label column sm="3">
                            이름
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextAge">
                        <Form.Label column sm="3">
                            생년월일
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="date" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextAge">
                        <Form.Label column sm="3">
                            전화번호
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control type="phone" />
                        </Col>
                        <Col sm="2">
                            <Button style={{ padding: '6px 11px' }}
                                onClick={handleChecked}
                            >체크</Button>
                        </Col>
                    </Form.Group>
                    {
                        isChecked &&
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextAge">
                            <Form.Label column sm="3">
                                코드
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="numberic" />
                            </Col>
                            <Col sm="2">
                                <Button style={{ padding: '6px 11px' }}
                                >확인</Button>
                            </Col>
                        </Form.Group>
                    }

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleFindPwClose}>
                    Close
                </Button>

                <Button variant="primary" onClick={handleFindPwClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FindPwModal;

