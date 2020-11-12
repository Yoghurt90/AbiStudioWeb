import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Container, Card } from "react-bootstrap";
import "./ImageCard.scss";
import webintromp4 from "content/assets/videos/web_intro.mp4";

const ImageCard = ({ className, header, subheader, extraInfo }) => {
  return (
    <Card className={clsx("image-card bg-dark text-white text-center", className)}>
      {/* <Image className="image" fileName={imageFileName} alt={imageAlt || header || subheader} /> */}
      <Container className="videoContainer">
        <video autoPlay={true} loop={true} muted={true} className="video">
          <source src={webintromp4} type="video/mp4" />
        </video>
      </Container>
      <Card.ImgOverlay className="no-padding">
        <Container>
          <div className="intro-text">
            <div className="intro-lead-in">{subheader}</div>
            <div className="intro-heading text-uppercase">{header}</div>
            {extraInfo}
          </div>
        </Container>
      </Card.ImgOverlay>
    </Card>
  );
};

ImageCard.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string,
  subheader: PropTypes.string,
  extraInfo: PropTypes.any,
};

ImageCard.defaultProps = {
  className: null,
  header: "",
  subheader: "",
  extraInfo: null,
};

export default ImageCard;
