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
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { navigate, useStaticQuery, graphql  } from "gatsby";

import "./Prices.scss";

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "sandybrown",
    color: "black",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    backgroundColor: "white",
    '&:nth-of-type(odd)': {
      backgroundColor: "lightgrey",
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
    marginBottom: "unset",
  },
  pos: {
    marginBottom: 12,
  },
  table: {
    minWidth: 400,
    marginTop: 10,
  },
  cardLink: {
    color: "black",
  },
  cardActions: {
    justifyContent: "center",
  },
  cardContent: {
    padding: "unset",
  },
  actionButton: {
    width: "100%",
    background: "sandybrown",
  },
  listItem: {
    textAlign: "center",
    backgroundColor: "white",
    '&:nth-child(4n-3)': {
      backgroundColor: "lightgrey",
    },
  }
});

const Prices = ({ className, frontmatter }) => {
  const imageData = useStaticQuery(
    graphql`
      query {
        allFile {
          nodes {
            name
            publicURL
            relativePath
          }
        }
      }
    `,
  );

  const classes = useStyles();

  const onPackageActionClick = React.useCallback((packageActionHref, packageNameToSelect) => {
    navigate(packageActionHref,
      {
        state: {selectedPackage: packageNameToSelect},
      })
  }, []);

  if (!frontmatter) {
    return null;
  }

  const { anchor, header: rootHeader, subheader: rootSubHeader, packages, extras, pageBackgroundImage } = frontmatter;

  const image = imageData.allFile.nodes.find((n) => n.relativePath.includes(pageBackgroundImage));

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
    <PageSection className={className} id={anchor} style={{ backgroundImage: "url(" + image.publicURL + ")", backgroundSize: "100%"}}>
      <Row>
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
      </Row>
      <Row>
        <Grid container spacing={3}>
          {packages.map(({ packageSectionHeader, packageName, packageActionName, packageActionHref, packageNameToSelect, packageContent }) => (
            <React.Fragment key={packageName}>
              {packageSectionHeader ? (
                <Grid item xs={12} key={packageSectionHeader}>
                  <SectionHeader header={packageSectionHeader} />
                </Grid>
              ) : null}
              <Grid item xs>
                <Card className={classes.root} variant="outlined">
                  <CardContent className={classes.cardContent}>
                    <div style={{ backgroundColor: "sandybrown" }}>
                      <Typography className={classes.title} gutterBottom variant="caption" component="h2">
                        {packageName}
                      </Typography>
                    </div>
                    <Divider/>
                    <List dense={true} style={{paddingTop: "0px"}}>
                      {packageContent.map(({ content, subcontent }) => (
                        <React.Fragment key={packageName+content}>
                          <ListItem alignItems="center" className={classes.listItem}>
                            <ListItemText primary={content} secondary={subcontent} />
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </List>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Button className={classes.actionButton} variant="outlined" onClick={() => onPackageActionClick(packageActionHref, packageNameToSelect)}> 
                      {packageActionName}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </React.Fragment>
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
