import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Row } from "react-bootstrap";
import SectionHeader from "components/SectionHeader";
import { makeStyles } from '@material-ui/core/styles';
import PageSection from "components/PageSection";
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStaticQuery, graphql  } from "gatsby";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  root: {
    width: "100%",
  },
}));

const Faq = ({ className, frontmatter }) => {
  const classes = useStyles();

  if (!frontmatter) {
    return null;
  }

  const { header, questionsData } = frontmatter;

  return (
    <PageSection className={clsx("portfolio-section", className)}> 
      <Row>
        <SectionHeader header={header} subheaderClassName={clsx("section-subheading-low-margin", "section-subheading-mute-fixed")}/>
      </Row>
      <Row>
        {questionsData.map(({ question, answer }) => (
          <Accordion key={question} className={classes.root}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content">
              <Typography className={classes.heading}>{question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Row>
    </PageSection>
  );
};

Faq.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

Faq.defaultProps = {
  className: null,
  frontmatter: null,
};

export default Faq;
