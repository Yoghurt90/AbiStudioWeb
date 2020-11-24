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
    justifyContent: "center",
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
  }
});

const Contacts = ({ className, frontmatter }) => {
  const classes = useStyles();

  if (!frontmatter) {
    return null;
  }

  const { partnersHeader, partners, contactsHeader, contactsPhone, contactsMail, contactsLogo, contacts } = frontmatter;

  return (
    <PageSection className={clsx(classes.lowPaddingSection, className)}>
      <Row>
        <SectionHeader header={partnersHeader} className="section-heading-smaller-text"/>
      </Row>
      <Row>
        <Grid container spacing={3}>
          {partners.map(({ partnerName, partnerType, partnerIcon, partnerIconLink }) => (
            <Grid item xs key={partnerName}>
              <h4 style={{textAlign: "center"}}>{partnerType}</h4>
              <Row className={clsx("justify-content-md-center", classes.noFlexWrap)}>
                {partnerIcon === "FB" ? <SocialIcons.Facebook userName={partnerIconLink} /> : null}
                {partnerIcon === "INSTA" ? <SocialIcons.Instagram userName={partnerIconLink} /> : null}
                <p className="text-muted" style={{marginTop: "5px"}}>{partnerIconLink}</p>
              </Row>
            </Grid>
          ))}
        </Grid>
      </Row>
      <Row>
        <SectionHeader header={contactsHeader} className="section-heading-large-top-margin"/>
      </Row>
      <Row>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs>
            <Image
              className={classes.logo}
              fileName={contactsLogo}
            />
            <Row className={clsx("justify-content-md-center", classes.socialRow, classes.noFlexWrap)}>
              {contacts.map(({ contactIcon, contactUserName }) => (
                <React.Fragment key={contactIcon}>
                  {contactIcon === "FB" ? <SocialIcons.Facebook userName={contactUserName} /> : null}
                  {contactIcon === "INSTA" ? <SocialIcons.Instagram userName={contactUserName} /> : null}
                </React.Fragment>
              ))}
            </Row>
          </Grid>
          <Grid item xs>
            <List dense={true} className={classes.listRoot}>
              <ListItem>
                <ListItemIcon>
                  <CircleFAButton iconName="PhoneIcon" />
                </ListItemIcon>
                <ListItemText primary={contactsPhone}/>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CircleFAButton iconName="EnvelopIcon" />
                </ListItemIcon>
                <ListItemText primary={contactsMail}/>
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
