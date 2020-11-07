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
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

const ContactUs = ({ location, className, frontmatter }) => {
  const { anchor, header, formData } = frontmatter;

  const [selectedDate, setSelectedDate] = React.useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const setCustomValidity = React.useCallback((field) => {
    field.target.setCustomValidity(formData.requiredFieldInvalidText);
  }, [formData]);

  const clearCustomValidity = React.useCallback((field) => {
    field.target.setCustomValidity("");
  }, []);

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
            required
            onInvalid={setCustomValidity}
            onInput={clearCustomValidity}
          />
          <Grid container justify="space-around" style={{ margin: 8 }}>
            <Grid item xs style={{ marginRight: 8 }}>
              <TextField
                id="Email"
                label={formData.emailLabel}
                placeholder={formData.emailEmptyText}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                name="_replyto"
                required
                onInvalid={setCustomValidity}
                onInput={clearCustomValidity}
              />
            </Grid>
            <Grid item xs >
              <TextField
                id="Phone"
                label={formData.phoneLabel}
                placeholder={formData.phoneEmptyText}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                name="phone"
                required
                onInvalid={setCustomValidity}
                onInput={clearCustomValidity}
              />
            </Grid>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              disablePast
              autoOk
              inputVariant="outlined"
              variant="inline"
              style={{ margin: 8 }}
              format="yyyy/MM/dd"
              id="datum"
              label={formData.dateLabel}
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <FormControl variant="outlined" fullWidth margin="normal" style={{ margin: 8 }}>
            <InputLabel id="package-label" >{formData.packageLabel}</InputLabel>
            <Select
              labelId="package-label"
              id="package"
              label={formData.packageLabel}
              name="package"
              value={location.state ? location.state.selectedPackage : null}
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
  location: PropTypes.object,
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

ContactUs.defaultProps = {
  location: null,
  className: null,
  frontmatter: null,
};

export default ContactUs;
