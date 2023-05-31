import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import './AnimatedCarousel-styles.scss';

const AnimatedCarousel = ({ transitionTime, arrayImages }) => {
  const images = JSON.parse(arrayImages);

  console.log(images);
  return (
    <Carousel>
      {images.map((image) => {
        return (
          <Carousel.Item key={image.id} interval={transitionTime}>
            <Link to={`/produtos/${encodeURIComponent(image.id)}`}>
              <img
                className="d-block w-100 imgCarousel"
                src={image.src}
                alt={image.alt}
              />
              <Carousel.Caption>
                <p className="carouselText">{image.name}</p>
                <p className="carouselText">{image.shortDescription}</p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default AnimatedCarousel;
