import { Col, Container, Row, Stack } from "react-bootstrap"
import './Home.scss'
import Content from "./Content"
import LogginView from "./LogginView"
const Home = () => {

  return (
    <Container className="homecontent-container" >
      <Row className="home-container border rounded shadow p-3 mb-5 " >
        <Col md={8} className="border-end" >
          <Content />
        </Col>
        <Col md={4} >
          <LogginView />
        </Col>
      </Row>
    </Container>


  )
}

export default Home