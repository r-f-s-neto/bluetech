import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import './AnimatedCarousel-styles.css';

const AnimatedCarousel = ({ transitionTime, arrayImages }) => {
  const images = JSON.parse(arrayImages);

  return (
    <Carousel>
      {images?.map((image) => {
        return (
          <Carousel.Item key={image.id} interval={transitionTime}>
            <Link to={`/produtos/${encodeURIComponent(image.id)}`}>
              <img
                className="d-block w-100 imgCarousel"
                src={
                  image?.images.length
                    ? image.images[0].filename
                    : 'https://www.hardware.com.br/wp-content/uploads/static/wp/2022/10/21/placa-mae.jpg'
                }
                alt={image.name}
              />
              <Carousel.Caption>
                <p className="carouselText">{image.name}</p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default AnimatedCarousel;
