import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Nav, NavDropdown  } from "react-bootstrap";
import {AnchorLink } from "gatsby-plugin-anchor-links";

import "./NavItem.scss";

const NavItem = ({ to, anchors, langKey, defaultLang, children }) => {  
  if (!to) {
    return null;
  }
  const langKeyPrefix = langKey === defaultLang ? "" : (`/${langKey}`);
  const toStrippedHash = to.replace("#", "");
  if (anchors && anchors.length > 0) {
    return (
      <NavDropdown title={toStrippedHash} id="nav-dropdown">
        {anchors.map((dropDownAnchorItem) => (
          <NavDropdown.Item key={dropDownAnchorItem}>
            <AnchorLink 
              className={clsx("dropdown-item")}
              activeClass="active"
              to={`${langKeyPrefix}/${dropDownAnchorItem}`}
            >
              {children || dropDownAnchorItem}
            </AnchorLink>
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    );
  }
  return (
    <Nav.Item>
      <AnchorLink 
        className="nav-link cursor-pointer"
        activeClass="active"
        to={`${langKeyPrefix}/${to}`}
      >
        {children || toStrippedHash}
      </AnchorLink>
    </Nav.Item>
  );
};

NavItem.propTypes = {
  to: PropTypes.string,
  anchors: PropTypes.array,
  children: PropTypes.any,
  langKey: PropTypes.string,
  defaultLang: PropTypes.string,
};

NavItem.defaultProps = {
  to: "",
  anchors: null,
  children: null,
  langKey: "",
  defaultLang: "",
};

export default NavItem;
