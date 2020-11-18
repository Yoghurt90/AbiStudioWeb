import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Row } from "react-bootstrap";
import SectionHeader from "components/SectionHeader";
import { makeStyles } from '@material-ui/core/styles';
import PageSection from "components/PageSection";
import Typography from '@material-ui/core/Typography';
import { useStaticQuery, graphql  } from "gatsby";

const useStyles = makeStyles({
  title: {
    fontSize: 27,
    textAlign: "left",
    color: "white",
  },
  divider: {
    marginBottom: 25,
    margin: "auto",
    width: "25%",
    backgroundColor: "black",
  },
});

const Cinematography = ({ className, frontmatter }) => {
  const imageData = useStaticQuery(
    graphql`
      query {
        allFile {
          nodes {
            name
            publicURL
            relativePath
          }
        }
      }
    `,
  );
  const classes = useStyles();

  if (!frontmatter) {
    return null;
  }

  const { header, subheader, content, pageBackgroundImage } = frontmatter;

  const image = imageData.allFile.nodes.find((n) => n.relativePath.includes(pageBackgroundImage));

  return (
    <PageSection className={clsx("portfolio-section", className)} style={{ backgroundImage: "url(" + image.publicURL + ")", backgroundSize: "cover"}}> 
      <Row>
        <SectionHeader header={header} subheader={subheader} subheaderClassName={clsx("section-subheading-low-margin", "section-subheading-mute-fixed")}/>
      </Row>
      <Row>
        <Typography className={classes.title} gutterBottom variant="caption" component="h2">
          {content}
        </Typography>
      </Row>
    </PageSection>
  );
};

Cinematography.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

Cinematography.defaultProps = {
  className: null,
  frontmatter: null,
};

export default Cinematography;
