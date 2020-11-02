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
import CircleIcon from "components/CircleIcon";
import CircleFAButton from "components/CircleFAButton";

const useStyles = makeStyles({
  title: {
    fontSize: 27,
    textAlign: "center",
  },
  listRoot: {
      width: "100%",
  }
});

const Contacts = ({ className, frontmatter }) => {
  const classes = useStyles();

  if (!frontmatter) {
    return null;
  }

  const { partnersHeader, partners, contactsHeader, contacts } = frontmatter;

  return (
    <PageSection className={clsx("portfolio-section", className)}>
      <Row>
        <SectionHeader header={partnersHeader}/>
      </Row>
      <Row>
        <List dense={true} className={classes.listRoot}>
          {partners.map(({ partnerName, partnerType, partnerIcon, partnerIconLink }) => (
            <ListItem key={partnerName}>
              <ListItemIcon>
                {partnerIcon === "FB" ? <SocialIcons.Facebook userName={partnerIconLink} /> : null}
                {partnerIcon === "INSTA" ? <SocialIcons.Instagram userName={partnerIconLink} /> : null}
              </ListItemIcon>
              <ListItemText primary={partnerName} secondary={partnerType} />
            </ListItem>
          ))}
        </List>
      </Row>
      <Row>
        <SectionHeader header={contactsHeader}/>
      </Row>
      <Row>
        <List dense={true} className={classes.listRoot}>
          {contacts.map(({ contactIcon, contactText, contactUserName }) => (
            <ListItem key={contactText}>
              <ListItemIcon>
                {contactIcon === "PHONE" ? <CircleFAButton iconName="PhoneIcon" /> : null}
                {contactIcon === "MAIL" ? <CircleFAButton iconName="EnvelopIcon" /> : null}
                {contactIcon === "FB" ? <SocialIcons.Facebook userName={contactUserName} /> : null}
                {contactIcon === "INSTA" ? <SocialIcons.Instagram userName={contactUserName} /> : null}
              </ListItemIcon>
              <ListItemText primary={contactText} />
            </ListItem>
          ))}
        </List>
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
