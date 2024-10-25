import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { CiSearch } from "react-icons/ci";
const Search = () => {

    return (
        <>

            <Container fluid className='container w-200'>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success" className='btn rounded'><CiSearch size={20} /></Button>
                </Form>

            </Container>

        </>

    )
}

export default Search