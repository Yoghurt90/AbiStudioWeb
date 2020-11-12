import React from "react";
import PropTypes from "prop-types";

import { Row } from "react-bootstrap";
import PageSection from "components/PageSection";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import SectionHeader from "components/SectionHeader";

const ContactUs = ({ location, className, frontmatter }) => {
  const { anchor, header, formData } = frontmatter;

  const [selectedDate, setSelectedDate] = React.useState();
  const [emailErrorText, setEmailErrorText] = React.useState("");
  const [policyAccepted, setPolicyAccepted] = React.useState(false);
  const [privacyErrorText, setPrivacyErrorText] = React.useState(formData.privacyErrorText);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const setCustomValidity = React.useCallback((event) => {
    event.target.setCustomValidity(formData.requiredFieldInvalidText);
  }, [formData]);

  const clearCustomValidity = React.useCallback((event) => {
    event.target.setCustomValidity("");
  }, []);

  const validateEmail = React.useCallback((event) => {
    if(event.target.value.match(/\S+@\S+\.\S+/)) {
      setEmailErrorText("");
    } else {
      setEmailErrorText("HIBAS EMAIL");
    }
  }, []);

  const handlePolicyAcceptedChange = React.useCallback((event) => {
    setPolicyAccepted(event.target.checked);
    if (!event.target.checked) {
      setPrivacyErrorText(formData.privacyErrorText);
    } else {
      setPrivacyErrorText("");
    }
  }, [setPolicyAccepted, setPrivacyErrorText, formData.privacyErrorText]);

  const handleSubmit = React.useCallback((event) => {
    if (emailErrorText !== "" || privacyErrorText !== "") {
      event.preventDefault();
    }
  }, [emailErrorText, privacyErrorText]);

  const anchorStrippedHash = anchor.replace("#", "");

  return (
    <PageSection className={className} id={anchorStrippedHash}>
      <Row className="justify-content-center">
        <SectionHeader header={header}/>
        {/* <Col lg={8} className="text-center">
          <h2 className="mt-0">{header}</h2>
          <hr className="divider my-4" />
        </Col> */}
      </Row>
      <Row>
        <form method="post" action={formData.submiturl} style={{ width: "100%" }} onSubmit={handleSubmit}>
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
                helperText={emailErrorText}
                error={emailErrorText.length > 0}
                onChange={validateEmail}
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
          <Grid container justify="space-around" style={{ margin: 8 }}>
            <Grid item xs style={{ marginRight: 8 }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  disablePast
                  autoOk
                  inputVariant="outlined"
                  variant="inline"
                  style={{ marginTop: 8 }}
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
            </Grid>
            <Grid item xs={9} >
              <FormControl variant="outlined" fullWidth margin="normal" style={{ marginTop: 8 }}>
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
            </Grid>
          </Grid>
          <FormHelperText style={{margin: "8px"}}>{formData.messageHelperText}</FormHelperText>
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
          <FormControl style={{marginTop: 4}} required error={privacyErrorText.length > 0}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={policyAccepted}
                  onChange={handlePolicyAcceptedChange}
                  name="privacypolicy"
                  color="primary"
                />
              }
              label={formData.privacyPolicyMessage}
            />
            <FormHelperText>{privacyErrorText}</FormHelperText>
          </FormControl>
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
