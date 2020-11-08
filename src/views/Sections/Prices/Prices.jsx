import React from "react";
import PropTypes from "prop-types";

import { Row } from "react-bootstrap";
import SectionHeader from "components/SectionHeader";
import PageSection from "components/PageSection";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { navigate  } from "gatsby"

import "./Prices.scss";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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
  cardLink: {
    color: "black",
  },
  cardActions: {
    justifyContent: "center",
  }
});

const Prices = ({ className, frontmatter }) => {
  const classes = useStyles();

  const onPackageActionClick = React.useCallback((packageActionHref, packageNameToSelect) => {
    console.log("ONCLICKEVENTPACKAGEACTIONHREF: " + packageActionHref);
    console.log("ONCLICKEVENTpackageNameToSelect: " + packageNameToSelect);
    navigate(packageActionHref,
      {
        state: {selectedPackage: packageNameToSelect},
      })
  }, []);

  if (!frontmatter) {
    return null;
  }

  const { anchor, header: rootHeader, subheader: rootSubHeader, packages, extras } = frontmatter;

  let extrasPart;
  if (extras) {
    extrasPart = (
      <Row>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {extras.headers.map(({ headerTitle }) => (
                <StyledTableCell key={headerTitle}>{headerTitle}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {extras.rows.map(({ rowContent }) => (
              <StyledTableRow key={rowContent[0].content}>
                {rowContent.map(({ content }) => (
                  <StyledTableCell component="th" scope="row" key={content}>{content}</StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Row>
    )
  }

  return (
    <PageSection className={className} id={anchor}>
      <Row>
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
      </Row>
      <Row>
        <Grid container spacing={3}>
          {packages.map(({ packageName, packageBackground, packageActionName, packageActionHref, packageNameToSelect, packageContent }) => (
            <Grid item xs key={packageName}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <div style={{ backgroundColor: packageBackground }}>
                    <Typography className={classes.title} gutterBottom variant="caption" component="h2">
                      {packageName}
                    </Typography>
                  </div>
                  <Divider/>
                  <List dense={true}>
                    {packageContent.map(({ content, subcontent }) => (
                      <React.Fragment key={packageName+content}>
                        <ListItem >
                          <ListItemIcon>
                            <AddCircleOutlineIcon/>
                          </ListItemIcon>
                          <ListItemText primary={content} secondary={subcontent}/>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button variant="outlined" onClick={() => onPackageActionClick(packageActionHref, packageNameToSelect)}> 
                    {packageActionName}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Row>
      {extrasPart}
    </PageSection>
  );
};

Prices.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

Prices.defaultProps = {
  className: null,
  frontmatter: null,
};

export default Prices;
