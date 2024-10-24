import React from 'react';
import Card from 'react-bootstrap/Card';
import { Image, NavLink } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './DeviceView.scss'
import Devices from '../../assets/Devices/Devices';
import { RxVideo } from "react-icons/rx";
import { CiImageOn } from "react-icons/ci";
import noimg from '../../assets/Devices/noimg.png'

const DeviceView = () => {
  const devices = Devices

  return (
    <div className='container'>
      <Row xs={1} md={2} xl={4} className="g-4">
        {devices.map((device) =>
          <Col key={device.id}>
            <Card className="h-100 d-flex flex-column">
              <div className="card-img-container p-3">
                <Card.Img variant="top" src={device.img} />
              </div>
              <Card.Body className="d-flex flex-column flex-grow-1">
                <Card.Title>{device.name}</Card.Title>
                <Card.Text>
                  <Image src={device.imoticon ? device.imoticon : noimg} style={{ width: 100, height: 100 }} />
                  {device.des}


                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
                <NavLink href="#"><RxVideo size={20} />더보기</NavLink>
              </Card.Footer>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
}
export default DeviceView;
