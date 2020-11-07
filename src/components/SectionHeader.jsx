import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Col } from "react-bootstrap";
import "./SectionHeader.scss";

const SectionHeader = ({ header, subheader, subheaderClassName, className, ...restProps }) => {
  const subheaderPart = subheader ? (
    <h3 className={clsx("section-subheading", "text-muted", subheaderClassName)}>{subheader}</h3>
  ) : null;

  return (
    <Col lg={12} className={clsx("section-header", "text-center", className)} {...restProps}>
      <h2 className={clsx("section-heading text-uppercase", className)}>{header}</h2>
      {subheaderPart}
    </Col>
  );
};

SectionHeader.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string,
  subheaderClassName: PropTypes.string,
  className: PropTypes.string,
};

SectionHeader.defaultProps = {
  header: "",
  subheader: "",
  subheaderClassName: null,
  className: null,
};

export default SectionHeader;
