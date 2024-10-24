import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const expand = "sm";
    const navigate = useNavigate();
    return (
        <>
            <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                <Container fluid>
                    <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3 d-flex align-items-center"> {/* Adjusted here */}
                                <Nav.Link href="/SignInPage" className="nav-item">Sign In</Nav.Link>
                                <Nav.Link href="/SignUpPage" className="nav-item">Sign Up</Nav.Link>
                            </Nav>
                         
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
