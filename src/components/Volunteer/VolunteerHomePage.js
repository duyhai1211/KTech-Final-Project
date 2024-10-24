import UserInfo from '../User/UserInfo'
import Calendar from '../Calendar/Calendar'
import { Row,Col } from 'react-bootstrap'
const VolunteerHome = () => {
    return (
        <>
            Volunteer Home Page 
            user's role 
            <Row>
                <Col sm={8}>
                <Calendar/>
                </Col>
                <Col>
                <UserInfo />
                </Col>
            </Row>
            
           

        </>

    )
}
export default VolunteerHome
