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
import Divider from '@material-ui/core/Divider';
import "./AboutUs.scss";

const useStyles = makeStyles({
  title: {
    fontSize: 21,
    letterSpacing: 2.0,
    textAlign: "left",
  },
  divider: {
    marginTop: 30,
    marginBottom: 55,
    margin: "auto",
    width: "33%",
    border: 0,
    height: 1,
    backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))",
  },
  sectionRoot: {
    paddingTop: 60,
    paddingBottom: 60,
  }
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
    <PageSection className={clsx("portfolio-section", classes.sectionRoot, className)} id={anchorStrippedHash}>
      {rootSections.map(
        ({ content, contentImageFileName, contentImageHeader, contentImageText, header, subheader, teamMember }) => {
          let imagePart;
          if (contentImageFileName) {
            imagePart = (
              <Grid item xs={3} style={{minWidth:225}}>
                <Image
                  className="mx-auto circle rounded-circle"
                  fileName={contentImageFileName}
                />
                <h4 style={{textAlign: "center", marginTop: 25, marginBottom: 0}}>{contentImageHeader}</h4>
                <p className="text-muted" style={{textAlign: "center", marginTop: 0}}>{contentImageText}</p>
              </Grid>
            )
          }

          let teamMemberPart;
          if (teamMember) {
            teamMemberPart = (
              <React.Fragment key={teamMember}>
                <Divider className={classes.divider} variant="middle"/>
                <Row style={{marginTop: "20px"}}>
                  {teamMember.map(({ memberHeader, ...tmProps }) => (
                    <Col sm={4} key={header}>
                      <TeamMember header={memberHeader} {...tmProps} />
                    </Col>
                  ))}
                </Row>
              </React.Fragment>
            )
          }

          i += 1;
          return (
            <React.Fragment key={content}>
              <Row>
                <SectionHeader header={header} subheader={subheader} subheaderClassName="section-subheading-low-margin" className={i > 1 ? headerClassName : null} />
              </Row>
              <Row>
                <Grid container spacing={3} justify="center" >
                  {imagePart}
                  <Grid item xs={9}>
                    <Typography className={classes.title} gutterBottom variant="caption" component="p">
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
