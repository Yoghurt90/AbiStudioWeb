import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Row } from "react-bootstrap";
import SectionHeader from "components/SectionHeader";
import { makeStyles } from '@material-ui/core/styles';
import PageSection from "components/PageSection";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import * as SocialIcons from "components/SocialIcons";
import CircleFAButton from "components/CircleFAButton";
import Grid from '@material-ui/core/Grid';
import Image from "components/Image";

const useStyles = makeStyles({
  title: {
    fontSize: 27,
    textAlign: "center",
  },
  listRoot: {
    width: "100%",
  },
  logo: {
    maxWidth: 150,
    maxHeight: 150,
    margin: "auto",
  },
  socialRow: {
    marginTop: 15,
  },
  lowPaddingSection: {
    paddingTop: 25,
    paddingBottom: 25,
  },
  noFlexWrap: {
    flexWrap: "unset",
    minWidth: 250,
    marginLeft: 5,
    marginRight: 0,
  },
  logoContainer: {
    paddingLeft: 16
  }
});

const Contacts = ({ className, frontmatter }) => {
  const classes = useStyles();

  if (!frontmatter) {
    return null;
  }

  const { partnersHeader, partners, contactsHeader, contactsPhone, contactsSlovakPhone, contactsMail, contactsLogo, contacts } = frontmatter;

  let partnersPart;
  if (partnersHeader !== "") {
    partnersPart = (
      <fragment>
        <Row>
          <SectionHeader header={partnersHeader} className="section-heading-smaller-text" />
        </Row>
        <Row>
          <Grid container spacing={3}>
            {partners.map(({ partnerName, partnerType, partnerIcon, partnerIconLink }) => (
              <Grid item xs key={partnerName}>
                <h4 style={{ textAlign: "center" }}>{partnerType}</h4>
                <Row className={clsx("justify-content-md-center", classes.noFlexWrap)}>
                  {partnerIcon === "FB" ? <SocialIcons.Facebook userName={partnerIconLink} /> : null}
                  {partnerIcon === "INSTA" ? <SocialIcons.Instagram userName={partnerIconLink} /> : null}
                  {partnerIcon === "FB" ? <a href={`https://facebook.com/${partnerIconLink}`} target="_blank" rel="noopener noreferrer">
                    <p className="text-muted" style={{ marginTop: "5px" }}>{partnerIconLink}</p>
                  </a> : null}
                  {partnerIcon === "INSTA" ? <a href={`https://www.instagram.com/${partnerIconLink}`} target="_blank" rel="noopener noreferrer">
                    <p className="text-muted" style={{ marginTop: "5px" }}>{partnerIconLink}</p>
                  </a> : null}
                </Row>
              </Grid>
            ))}
          </Grid>
        </Row>
      </fragment>
    );
  }

  return (
    <PageSection className={clsx(classes.lowPaddingSection, className)}>
      {partnersPart}
      <Row>
        <SectionHeader header={contactsHeader} className="section-heading-large-top-margin" />
      </Row>
      <Row>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs>
            <Grid container spacing={3} alignItems="center" justify="center" className={classes.logoContainer}>
              <Grid item xs>
                <Image
                  className={classes.logo}
                  fileName={contactsLogo}
                />
              </Grid>
              <Grid item xs>
                {contacts.map(({ contactIcon, contactUserName }) => (
                  <React.Fragment key={contactIcon}>
                    <Row className={clsx(classes.socialRow, classes.noFlexWrap)}>
                      {contactIcon === "FB" ? <SocialIcons.Facebook userName={contactUserName} /> : null}
                      {contactIcon === "INSTA" ? <SocialIcons.Instagram userName={contactUserName} /> : null}
                    </Row>
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <List dense={true} className={classes.listRoot}>
              <ListItem button component="a" href={"tel:" + contactsPhone}>
                <ListItemIcon>
                  <CircleFAButton iconName="PhoneIcon" />
                </ListItemIcon>
                <ListItemText primary={contactsPhone} />
              </ListItem>
              <ListItem button component="a" href={"tel:" + contactsSlovakPhone}>
                <ListItemIcon>
                  <CircleFAButton iconName="PhoneIcon" />
                </ListItemIcon>
                <ListItemText primary={contactsSlovakPhone} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs>
            <List dense={true} className={classes.listRoot}>
              <ListItem button component="a" href={"mailto:" + contactsMail}>
                <ListItemIcon>
                  <CircleFAButton iconName="EnvelopIcon" />
                </ListItemIcon>
                <ListItemText primary={contactsMail} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Row>
    </PageSection>
  );
};

Contacts.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

Contacts.defaultProps = {
  className: null,
  frontmatter: null,
};

export default Contacts;
