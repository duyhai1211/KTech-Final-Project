import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const UserInfoUpdateModal = ({ validated, handleChange, show, handleClose, handleUpdateSubmit, userInfo }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>개인 정보 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated}>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail" >
                        <Form.Label column sm="3">이메일 또는 ID</Form.Label>
                        <Col sm="9">
                            <Form.Control type="email" name='email' value={userInfo?.email} disabled />
                        </Col>
                    </Form.Group>

                    {/* <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">비밀번호</Form.Label>
                        <Col sm="9">
                            <Form.Control type="password" placeholder="Password" />
                        </Col>
                    </Form.Group> */}

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                        <Form.Label column sm="3"> 이름</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" name='username' required onChange={handleChange} />
                        </Col>
                    </Form.Group>

                    {/* <Form.Group as={Row} className="mb-3" controlId="formPlaintextAge">
                        <Form.Label column sm="3">생년월일</Form.Label>
                        <Col sm="9">
                            <Form.Control type="date" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextAge">
                        <Form.Label column sm="3">전화번호</Form.Label>
                        <Col sm="7">
                            <Form.Control type="phone" />
                        </Col>
                        <Col sm="2">
                            <Button style={{ padding: '6px 11px' }} >체크</Button>
                        </Col>
                    </Form.Group> */}
                    <Form.Group controlId="formFile" className="mb-3" >
                        <Form.Label>이미지 수정</Form.Label>
                        <Form.Control type="file" name='userImage' onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button variant="primary" onClick={handleUpdateSubmit}>
                    저장
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export default UserInfoUpdateModal;