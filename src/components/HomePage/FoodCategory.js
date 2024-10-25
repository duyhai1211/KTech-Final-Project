import Banner from "../../assets/Food/Banner"
import Card from 'react-bootstrap/Card';
import { Row, Col, Container } from "react-bootstrap";
const FoodCategory = () => {

    return (
        <>
            <Container>
                <div>
                    <h2>Category</h2>
                </div>

                <Row sm={1} md={2} lg={6}>
                    {
                        Banner.map(item =>
                            <Col fluid>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.img} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }

                </Row>
            </Container>

        </>

    )

}
export default FoodCategory