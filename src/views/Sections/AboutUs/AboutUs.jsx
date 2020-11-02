import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Row } from "react-bootstrap";
import SectionHeader from "components/SectionHeader";
import { makeStyles } from '@material-ui/core/styles';
import PageSection from "components/PageSection";
import Typography from '@material-ui/core/Typography';
import "./AboutUs.scss";

const useStyles = makeStyles({
  title: {
    fontSize: 27,
    textAlign: "center",
  },
});

const AboutUs = ({ className, frontmatter }) => {
  const classes = useStyles();

  if (!frontmatter) {
    return null;
  }

  const { anchor, header: rootHeader, subheader: rootSubHeader, portfolios } = frontmatter;

  const anchorStrippedHash = anchor.replace("#", "");

  return (
    <PageSection className={clsx("portfolio-section", className)} id={anchorStrippedHash}>
      <Row>
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
      </Row>
      <Row>
        {portfolios.map(
          ({ content }) => (
            <Typography key={content} className={classes.title} gutterBottom variant="caption" component="h2">
              {content}
            </Typography>
          ),
        )}
      </Row>
    </PageSection>
  );
};

AboutUs.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

AboutUs.defaultProps = {
  className: null,
  frontmatter: null,
};

export default AboutUs;
