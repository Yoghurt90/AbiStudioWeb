import React from "react";
import PropTypes from "prop-types";

import { Row } from "react-bootstrap";

import SectionHeader from "components/SectionHeader";
import PageSection from "components/PageSection";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Image from "components/Image";
import { navigate } from "gatsby"
import { motion } from "framer-motion"
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 27,
    textAlign: "center",
  },
  pos: {
    marginBottom: 12,
  },
  table: {
    minWidth: 700,
    marginTop: 10,
  },
  media: {
    height: 140,
  },
  cardLink: {
    color: "black",
  },
  cardActions: {
    justifyContent: "center",
  },
  sectionRoot: {
    paddingTop: 60,
    paddingBottom: 60,
  }
});

const MyWork = ({ className, frontmatter }) => {
  const classes = useStyles();

  const onImageClick = React.useCallback((serviceActionHref) => {
    navigate(serviceActionHref)
  }, []);

  if (!frontmatter) {
    return null;
  }

  const { anchor, header: rootHeader, subheader: rootSubHeader, services } = frontmatter;

  const anchorStrippedHash = anchor.replace("#", "");

  return (
    <PageSection className={clsx("portfolio-section", classes.sectionRoot, className)} id={anchorStrippedHash}>
      <Row>
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
      </Row>
      <Row className="text-center">
        <Grid container spacing={3}>
          {services.map(({ imageFileName, header, content, serviceActionHref }) => (
            <Grid item xs key={header}>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Card className={clsx("cursor-pointer", classes.root)} variant="outlined" onClick={() => onImageClick(serviceActionHref)} >
                  <CardContent>
                    <Image
                      className="img-fluid"
                      fileName={imageFileName}
                      alt={header}
                    />
                    <Typography className={classes.title} gutterBottom variant="caption" component="h2">
                      {header}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {content}
                    </Typography>
                  </CardContent>
                  {/* <CardActions className={classes.cardActions}>
                    <Button variant="outlined">
                      <Link to={serviceActionHref} className={classes.cardLink}>{serviceActionName}</Link>
                    </Button>
                  </CardActions> */}
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Row>
    </PageSection>
  );
};

MyWork.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

MyWork.defaultProps = {
  className: null,
  frontmatter: null,
};

export default MyWork;
