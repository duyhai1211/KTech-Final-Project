import Modal from 'react-bootstrap/Modal';

const NoticeMeasure = ({ showNoticeModal, setNoticeModalShow, fullscreen }) => {
    return (
        <>
            <Modal show={showNoticeModal} fullscreen={fullscreen} onHide={() => setNoticeModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>주의할 요소</Modal.Title>
                </Modal.Header>
                <Modal.Body>Modal body content</Modal.Body>
            </Modal>
        </>
    );

}
export default NoticeMeasure