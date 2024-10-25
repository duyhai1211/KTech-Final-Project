import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { TextField } from "@mui/material"
const NoteModal = ({ handleClose, newValue, note, handleSubmit, showModal, setNote, value }) => {
    return (
        <Modal show={showModal} onHide={handleClose} style={{ minHeight: '300px' }}>
            <Modal.Header closeButton>
                <Modal.Title>{newValue.format('YYYY년 MM월 DD일')}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ minHeight: '200px' }}>
                <TextField
                    label="내용을 입력해주세요"
                    fullWidth
                    multiline
                    value={note} type="text"
                    onChange={e => setNote(e.target.value)}

                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { handleSubmit() }}>추가</Button>
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default NoteModal