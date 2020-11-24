import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import { Container } from "react-bootstrap";

import "./PageSectionBackground.scss";

const PageSectionBackground = ({ children, className, fileName, ...restProps }) => {
  const data = useStaticQuery(
    graphql`
      query BackgroundImageQuery {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(quality: 90, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    `)

  const image = data.images.edges.find((n) => n.node.relativePath.includes(fileName));
  const imageData = image.node.childImageSharp.fluid;

  const backgroundFluidImageStack = [
    imageData,
    "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7))",
  ].reverse()

  const asd = (
    <BackgroundImage
      Tag="section"
      className={clsx("page-section", className)}
      fluid={backgroundFluidImageStack}
      backgroundColor="#040e18"
      {...restProps}>
      <Container>{children}</Container>
    </BackgroundImage>
  );
  return asd;
};

PageSectionBackground.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  fileName: PropTypes.string,
};

PageSectionBackground.defaultProps = {
  children: null,
  className: null,
  fileName: null,
};

export default PageSectionBackground;
