import { useState } from 'react';
import { NavLink, Button, Row, Form, Container, Col, Image, Card } from 'react-bootstrap';
import { ReserList } from './ReserList';
import ReserDetails from './ReserDetails';
import Nav from 'react-bootstrap/Nav';
import { Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Calendar from '../Calendar/Calendar';
const Reservation = () => {
    const [status, setStatus] = useState('')
    const resultList = ReserList.filter(list => list.status === `${status}`);
    return (
        <>
            <Container>
                <Nav fill variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link eventKey="link-1"
                            onClick={() => setStatus("pending")}
                        >Pending Reservation</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2"
                            onClick={() => setStatus("accepted")}
                        >Accepted Reservation</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-3"
                            onClick={() => setStatus("canceled")}
                        >Canceled Reservation</Nav.Link>
                    </Nav.Item>

                </Nav>

                <Container>
                    <Row><Calendar/></Row>

                    {
                        resultList.map(item =>
                            <Card className='mb-3'>
                                <Card.Body>
                                    <Card.Title>{item.date}</Card.Title>
                                    <Card.Text>
                                        <p>Customer: {item?.cusID}</p>
                                        <p>Attendances Number: {item?.attendanceNum}</p>
                                        <p>Table ID: {item?.tableId}</p>
                                        <p> Room: {item?.room}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    }
                </Container>

                {/* {
                    status === "pending"
                    &&
                    <ReserDetails
                        listCard={ReserList.filter(ReserList.status === "pending")}
                    />
                } */}
                {/* {
                    status === "accepted"
                    &&
                    <ReserDetails
                        listCard={ReserList.filter(ReserList.status === "accepted")}
                    />
                }
                {
                    status === "canceled"
                    &&
                    <ReserDetails
                        listCard={ReserList.filter(ReserList.status === "canceled")}
                    />
                } */}
            </Container>
        </>
    )

}
export default Reservation