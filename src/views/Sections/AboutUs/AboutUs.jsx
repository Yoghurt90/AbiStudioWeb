import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Row, Col } from "react-bootstrap";
import SectionHeader from "components/SectionHeader";
import { makeStyles } from '@material-ui/core/styles';
import PageSection from "components/PageSection";
import Typography from '@material-ui/core/Typography';
import Image from "components/Image";
import Grid from '@material-ui/core/Grid';
import TeamMember from "components/TeamMember";
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

  const { anchor, sections: rootSections } = frontmatter;

  const anchorStrippedHash = anchor.replace("#", "");

  const headerClassName = "section-heading-large-top-margin";

  let i = 0;

  return (
    <PageSection className={clsx("portfolio-section", className)} id={anchorStrippedHash}>
      {rootSections.map(
        ({ content, contentImageFileName, header, subheader, teamMember }) => {
          let imagePart;
          if (contentImageFileName) {
            imagePart = (
              <Grid item xs={3} style={{minWidth:175}}>
                <Image
                  className="img-fluid"
                  fileName={contentImageFileName}
                />
              </Grid>
            )
          }

          let teamMemberPart;
          if (teamMember) {
            teamMemberPart = (
              <Row>
                {teamMember.map(({ memberHeader, ...tmProps }) => (
                  <Col sm={4} key={header}>
                    <TeamMember header={memberHeader} {...tmProps} />
                  </Col>
                ))}
              </Row>
            )
          }
          i += 1;
          return (
            <React.Fragment key={content}>
              <Row>
                <SectionHeader header={header} subheader={subheader} subheaderClassName="section-subheading-low-margin" className={i > 1 ? headerClassName : null} />
              </Row>
              <Row>
                <Grid container spacing={3}>
                  {imagePart}
                  <Grid item xs>
                    <Typography className={classes.title} gutterBottom variant="caption" component="h2">
                      {content}
                    </Typography>
                  </Grid>
                </Grid>
              </Row>
              {teamMemberPart}
            </React.Fragment>
          )
        }
      )}
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
