import { Container, Row, Col } from "react-bootstrap"
import SideBar from "./SideBar"
import UserTable from "./UserTable"
import './Admin.scss'


const MedicalHome = () => {
    return (
        <Container className="container admin-container ms-0 ps-0 mt-0">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-container">
                <Row>
                    <p>Header</p>
                </Row>
                <Row>
                    <UserTable />
                </Row>

            </div>
        </Container>







    )
}
export default MedicalHome