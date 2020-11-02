import React from "react";
import PropTypes from "prop-types";

import { Row, Col } from "react-bootstrap";
import PageSection from "components/PageSection";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const ContactUs = ({ className, frontmatter }) => {
  if (!frontmatter) {
    return null;
  }

  const { anchor, header, formData } = frontmatter;

  const anchorStrippedHash = anchor.replace("#", "");

  return (
    <PageSection className={className} id={anchorStrippedHash}>
      <Row className="justify-content-center">
        <Col lg={8} className="text-center">
          <h2 className="mt-0">{header}</h2>
          <hr className="divider my-4" />
        </Col>
      </Row>
      <Row>
        <form method="post" action={formData.submiturl} style={{ width: "100%" }}>
          <TextField
            id="Name"
            label={formData.nameLabel}
            style={{ margin: 8 }}
            placeholder={formData.nameEmptyText}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            name="name"
          />
          <TextField
            id="Email"
            label={formData.emailLabel}
            style={{ margin: 8 }}
            placeholder={formData.emailEmptyText}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            name="_replyto"
          />
          <FormControl variant="outlined" fullWidth margin="normal" style={{ margin: 8 }}>
            <InputLabel id="package-label" >{formData.packageLabel}</InputLabel>
            <Select
              labelId="package-label"
              id="package"
              label={formData.packageLabel}
              name="package"
            >
              {formData.packageList.map(packageName => (
                <MenuItem value={packageName} key={packageName}>{packageName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="Message"
            label={formData.messageLabel}
            style={{ margin: 8 }}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            placeholder={formData.messageEmptyText}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            name="message"
          />
          <input type="text" name="_gotcha" style={{ display: "none" }} />
          <Button variant="outlined" type="submit" style={{ margin: 8 }}>{formData.buttonText}</Button>
        </form>
      </Row>
    </PageSection>
  );
};

ContactUs.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

ContactUs.defaultProps = {
  className: null,
  frontmatter: null,
};

export default ContactUs;
