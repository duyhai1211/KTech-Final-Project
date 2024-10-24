import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Banner from '../../assets/Food/Banner'
import { useState, useEffect } from 'react';
import './ImageBoard.scss'
const ImageBoard = () => {
    const [activeIndex, setActiveIndex] = useState(0);


    useEffect(() => {
        const timer = setTimeout(() => {
            slideNext();
        }, 2000); // Change image every 1 seconds
        return () => clearTimeout(timer); // Cleanup the timeout
    }, [activeIndex]);

    const slideNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % Banner.length);
    };

    return (
        <Container className="image-board-container">
            <Image src={Banner[activeIndex].img} rounded className="banner-img img-fluid" />
      </Container>
    )
}
export default ImageBoard