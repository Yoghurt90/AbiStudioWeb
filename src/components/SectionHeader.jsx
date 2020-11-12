import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import { Col } from "react-bootstrap";
import "./SectionHeader.scss";

const useStyles = makeStyles({
  divider: {
    marginBottom: 25,
    margin: "auto",
    width: "25%",
    backgroundColor: "black",
  },
});

const SectionHeader = ({ header, subheader, subheaderClassName, className, ...restProps }) => {
  const classes = useStyles();
  const subheaderPart = subheader ? (
    <h3 className={clsx("section-subheading", "text-muted", subheaderClassName)}>{subheader}</h3>
  ) : null;

  return (
    <Col lg={12} className={clsx("section-header", "text-center", className)} {...restProps}>
      <h2 className={clsx("section-heading text-uppercase", className)}>{header}</h2>
      {subheaderPart}
      <Divider className={classes.divider} variant="middle"/>
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
