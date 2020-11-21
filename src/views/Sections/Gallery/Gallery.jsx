import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { Row, Col } from "react-bootstrap";
import SectionHeader from "components/SectionHeader";
import PageSection from "components/PageSection";
import Video from "components/Video";
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { default as PhotoGallery } from "react-photo-gallery"; // eslint-disable-line import/no-named-default
import { useStaticQuery, graphql  } from "gatsby";
import { motion } from "framer-motion"
import clsx from "clsx";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import "./Gallery.scss";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {children}
      {/* {value === index && (
        <React.Fragment key={index}>
          {children}
        </React.Fragment>
      )} */}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  image: {
    margin: 2,
    border: "2px solid #777",
  },
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
  },
  tabButton: {
    backgroundColor: "#212529",
    fontSize: 21,
    margin: 2,
    color: "white",
    opacity: "unset",
    outline: "unset",
  },
  sectionRoot: {
    paddingTop: 70,
  },
  indicator: {
    backgroundColor: "#e6b302",
  },
  tabSelected: {
    color: "#e6b302",
    outline: "unset",
  },
}));

const Gallery = ({ className, frontmatter }) => {
  const youtubeData = useStaticQuery(
    graphql`
      query {
        allYoutubeVideo {
          nodes {
            thumbnails {
              default {
                height
                url
                width
              }
              high {
                height
                url
                width
              }
              maxres {
                height
                url
                width
              }
              medium {
                height
                url
                width
              }
              standard {
                height
                url
                width
              }
            }
            title
            playlist {
              id
            }
            id
          }
        }
      }
    `,
  );

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [videoURL, setVideoURL] = React.useState("");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const openVideo = useCallback((photo) => {
    setOpen(true);
    setVideoURL("https://www.youtube-nocookie.com/embed/" + photo.videosrc);
  }, []);

  const imageRenderer = useCallback(
    ({ photo }) => (
      <motion.div whileHover={{ scale: 1.1 }} onClick={(e) => openVideo(photo)}>
        <img
          alt=""
          {...photo}
          className={clsx("cursor-pointer", classes.image)}
        />
      </motion.div>
    ),
    [classes.image, openVideo]
  );

  const handleClose = () => {
    setOpen(false);
  };

  if (!frontmatter) {
    return null;
  }

  const {
    anchor,
    header: rootHeader,
    clipHeader,
    eventHeader,
    eventSubHeader,
    weddingPlaylistId,
    clipPlaylistId,
    eventPlaylistId,
  } = frontmatter;

  let weddingthumbnails = [];
  let clipthumbnails = [];
  let eventthumbnails = [];

  weddingthumbnails = youtubeData.allYoutubeVideo.nodes.filter(n => n.playlist.id === weddingPlaylistId).map((n) => { 
    if (n.thumbnails.maxres) {
      return {
        width: n.thumbnails.maxres.width,
        height: n.thumbnails.maxres.height,
        src: n.thumbnails.maxres.url,
        videosrc: n.id,
      }
    } 
    if (n.thumbnails.standard) {
      return {
        width: n.thumbnails.standard.width,
        height: n.thumbnails.standard.height,
        src: n.thumbnails.standard.url,
        videosrc: n.id,
      }
    } 
    if (n.thumbnails.high) {
      return {
        width: n.thumbnails.high.width,
        height: n.thumbnails.high.height,
        src: n.thumbnails.high.url,
        videosrc: n.id,
      }
    } 
    if (n.thumbnails.medium) {
      return {
        width: n.thumbnails.medium.width,
        height: n.thumbnails.medium.height,
        src: n.thumbnails.medium.url,
        videosrc: n.id,
      }
    }
    return {
      width: n.thumbnails.default.width,
      height: n.thumbnails.default.height,
      src: n.thumbnails.default.url,
      videosrc: n.id,
    }
  });

  clipthumbnails = youtubeData.allYoutubeVideo.nodes.filter(n => n.playlist.id === clipPlaylistId).map((n) => { 
    if (n.thumbnails.maxres) {
      return {
        width: n.thumbnails.maxres.width,
        height: n.thumbnails.maxres.height,
        src: n.thumbnails.maxres.url,
        videosrc: n.id,
      }
    } 
    if (n.thumbnails.standard) {
      return {
        width: n.thumbnails.standard.width,
        height: n.thumbnails.standard.height,
        src: n.thumbnails.standard.url,
        videosrc: n.id,
      }
    } 
    if (n.thumbnails.high) {
      return {
        width: n.thumbnails.high.width,
        height: n.thumbnails.high.height,
        src: n.thumbnails.high.url,
        videosrc: n.id,
      }
    } 
    if (n.thumbnails.medium) {
      return {
        width: n.thumbnails.medium.width,
        height: n.thumbnails.medium.height,
        src: n.thumbnails.medium.url,
        videosrc: n.id,
      }
    }
    return {
      width: n.thumbnails.default.width,
      height: n.thumbnails.default.height,
      src: n.thumbnails.default.url,
      videosrc: n.id,
    }
  });

  eventthumbnails = youtubeData.allYoutubeVideo.nodes.filter(n => n.playlist.id === eventPlaylistId).map((n) => { 
    if (n.thumbnails.maxres) {
      return {
        width: n.thumbnails.maxres.width,
        height: n.thumbnails.maxres.height,
        src: n.thumbnails.maxres.url,
        videosrc: n.id,
      }
    } 
    if (n.thumbnails.standard) {
      return {
        width: n.thumbnails.standard.width,
        height: n.thumbnails.standard.height,
        src: n.thumbnails.standard.url,
        videosrc: n.id,
      }
    } 
    if (n.thumbnails.high) {
      return {
        width: n.thumbnails.high.width,
        height: n.thumbnails.high.height,
        src: n.thumbnails.high.url,
        videosrc: n.id,
      }
    } 
    if (n.thumbnails.medium) {
      return {
        width: n.thumbnails.medium.width,
        height: n.thumbnails.medium.height,
        src: n.thumbnails.medium.url,
        videosrc: n.id,
      }
    }
    return {
      width: n.thumbnails.default.width,
      height: n.thumbnails.default.height,
      src: n.thumbnails.default.url,
      videosrc: n.id,
    }
  });

  while(eventthumbnails.length < 4) { eventthumbnails.push(eventthumbnails[0])}

  clipthumbnails = clipthumbnails.reverse();
  weddingthumbnails = weddingthumbnails.reverse();
  eventthumbnails = eventthumbnails.reverse();

  return (
    <PageSection className={clsx(classes.sectionRoot, className)} id={anchor}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
        classes={{indicator: classes.indicator}}
      >
        <Tab label={rootHeader} {...a11yProps(0)} className={classes.tabButton} classes={{selected: classes.tabSelected}}/>
        <Tab label={clipHeader} {...a11yProps(1)} className={classes.tabButton} classes={{selected: classes.tabSelected}}/>
        <Tab label={eventHeader} {...a11yProps(2)} className={classes.tabButton} classes={{selected: classes.tabSelected}}/>
      </Tabs>
      <SwipeableViews 
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} 
        index={value} 
        onChangeIndex={handleChangeIndex} 
        disableLazyLoading={true}
        style={{overflow: "visible"}} 
        containerStyle={{overflow: "visible"}} 
        slideStyle={{overflow: "visible"}}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Row style={{marginTop: 50}}>
            <SectionHeader header={rootHeader}/>
          </Row>
          <Row>
            <PhotoGallery photos={weddingthumbnails} renderImage={imageRenderer}/>
          </Row>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Row style={{marginTop: 50}}>
            <SectionHeader header={clipHeader}/>
          </Row>
          <Row>
            <PhotoGallery photos={clipthumbnails} renderImage={imageRenderer}/>
          </Row>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Row style={{marginTop: 50}}>
            <SectionHeader header={eventHeader} />
          </Row>
          <Row>
          <motion.div whileHover={{ scale: 1.1 }} onClick={(e) => openVideo(eventthumbnails[0])}>
            <img
              alt=""
              src={eventthumbnails[0].src}
              width="100%"
              className={clsx("cursor-pointer", classes.image)}
            />
          </motion.div>
            {/* <PhotoGallery photos={eventthumbnails} renderImage={imageRenderer} columns={1}/> */}
          </Row>
        </TabPanel>
      </SwipeableViews>
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
            <Video videoSrcURL={videoURL}/>
          </div>
        </Fade>
      </Modal>
    </PageSection>
  );
};

Gallery.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

Gallery.defaultProps = {
  className: null,
  frontmatter: null,
};

TabPanel.propTypes = {
  children: PropTypes.object,
  value: PropTypes.any,
  index: PropTypes.any,
};

TabPanel.defaultProps = {
  children: null,
  value: 0,
  index: 0,
};

export default Gallery;
