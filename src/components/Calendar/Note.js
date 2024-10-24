import { useState } from "react";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from 'react-bootstrap/Card';
import "./Note.scss"
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { TextField } from "@mui/material"

const Note = ({ noteList, setNoteList, note, setNote, newValue }) => {
    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleEdit = (index) => {
        setEditIndex(index);
        setNote(noteList[index].noteContent);
        setShowModal(true);
    }
    const handleClose = () => {
        setShowModal(false);
        setEditIndex(null);
    };

    const handleSubmit = () => {
        if (note.trim()) {
            const updatedNoteList = [...noteList];
            updatedNoteList[editIndex] = {
                noteDate: noteList[editIndex].noteDate,
                noteContent: note
            };
            setNoteList(updatedNoteList);
            setNote("");
            setShowModal(false);

        } else {
            alert("내용을 입력해주세요.");
        }
    };

    const handleDelete = (index) => {
        setNoteList(prev => prev.filter((_, i) => i !== index))
    }


    return (


        <div className="note-card" >

            {noteList.map((item, index) =>
                <Card body className="card-item" style={{ marginBottom: 10 }} key={item.noteDate + index}>
                    <Row>
                        <Col sm={8}>
                            <p>{item.noteDate}</p>
                        </Col>
                        <Col>
                            <Button variant="success"
                                onClick={() => handleEdit(index)}
                            ><MdEdit size={20} /></Button>
                            <Button variant="danger"
                                onClick={() => handleDelete(index)}
                            ><MdDeleteForever size={20} /></Button>
                        </Col>
                    </Row>

                    <p>{item.noteContent}</p>
                </Card>
            )}

            <Modal show={showModal} onHide={handleClose} style={{ minHeight: '300px' }}>
                <Modal.Header closeButton>
                    <Modal.Title>{noteList[editIndex]?.noteDate}</Modal.Title>
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
                    <Button onClick={() => { handleSubmit() }}>수정</Button>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>


    )

}

export default Note