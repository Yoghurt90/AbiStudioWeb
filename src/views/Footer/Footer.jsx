import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';

import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    width: "80%",
    height: "80%",
    overflow: "auto",
  },
}));

const Footer = ({ frontmatter }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  if (!frontmatter) {
    return null;
  }

  const {
    copyright,
    privacyHref,
    privacyText,
    privacyContent,
    termsHref,
    termsText,
  } = frontmatter;

  return (
    <footer className="footer py-3">
      <Container>
        <Row className="align-items-center text-center">
          <Col lg={6} className="text-lg-left">
            {copyright}
          </Col>
          <Col lg={6} className="text-lg-right">
            <a className="mr-3" role="link" tabIndex={0} onClick={(e) => setOpen(true)} style={{cursor: "pointer"}}>
              {privacyText}
            </a>
            <a href={termsHref}>{termsText}</a>
          </Col>
        </Row>
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }} >
        <Fade in={open}>
          <div className={classes.paper}>
            {privacyContent.map(({ paragraphHeader, paragraphs }) => (
              <React.Fragment key={paragraphHeader}>
                <Typography gutterBottom variant="caption" component="h2" >
                  {paragraphHeader}
                </Typography>
                {paragraphs.map(({ paragraph }) => (
                  <Typography variant="body2" color="textSecondary" component="p" key={paragraph}>
                    {paragraph}
                  </Typography>
                ))}
              </React.Fragment>
            ))}
          </div>
        </Fade>
      </Modal>
    </footer>
  );
};

Footer.propTypes = {
  frontmatter: PropTypes.object,
};

Footer.defaultProps = {
  frontmatter: null,
};

export default Footer;
