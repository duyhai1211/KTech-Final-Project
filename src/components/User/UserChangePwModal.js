import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const UserInfoUpdateModal = ({ userInfo, show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>개인 정보 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">비밀번호</Form.Label>
                        <Col sm="9">
                            <Form.Control type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    저장
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export default UserInfoUpdateModal;