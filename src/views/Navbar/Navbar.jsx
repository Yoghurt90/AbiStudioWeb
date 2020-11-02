import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { Navbar, Container, Nav } from "react-bootstrap";

import useWindowOnScroll from "hooks/useWindowOnScroll";
import useSmoothScrollTo from "hooks/useSmoothScrollTo";
import Icon from "components/Icon";
import NavItem from "components/NavItem";

import "./Navbar.scss";

const MyNavbar = ({ anchors, frontmatter, extraItems, langKey, defaultLang }) => {
  const { brand, menuText } = frontmatter;

  const handleScrollToTop = useSmoothScrollTo(0);

  const [expanded, setExpanded] = React.useState(false);
  const toggleMenu = React.useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);
  const closeMenu = React.useCallback(() => {
    setExpanded(false);
  }, []);
  const handleBrandClick = React.useCallback(() => {
    closeMenu();
    handleScrollToTop();
  }, [closeMenu, handleScrollToTop]);

  const [shrink, setShrink] = React.useState(false);
  const handleWindowScroll = React.useCallback(() => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    setShrink(scrollTop > 100);
  }, []);
  useWindowOnScroll(handleWindowScroll);

  const anchorsGrouped = new Map();
  const usedAnchorGroups = new Set();
  anchors.forEach(anchor => {
    if (anchor.anchorGroup) {
      if (!anchorsGrouped.has(anchor.anchorGroup)) {
        anchorsGrouped.set(anchor.anchorGroup, []);
      }
      anchorsGrouped.get(anchor.anchorGroup).push(anchor.anchor);
    }
  });

  return (
    <Navbar
      className={clsx("navbar-root", { "navbar-shrink": shrink })}
      expand="lg"
      fixed="top"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand className="cursor-pointer" onClick={handleBrandClick}>
          {brand}
        </Navbar.Brand>
        <Navbar.Toggle onClick={toggleMenu} aria-label="Toggle navigation">
          {menuText}
          <Icon iconName="BarsIcon" />
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className="text-uppercase ml-auto">
            {anchors.map((anchor) => {
              if (!anchor.anchorGroup) {
                return (<NavItem key={anchor.anchor} to={anchor.anchor} onClick={closeMenu} langKey={langKey} defaultLang={defaultLang} />);
              } 
              if (!usedAnchorGroups.has(anchor.anchorGroup)){
                usedAnchorGroups.add(anchor.anchorGroup);
                return (<NavItem key={anchor.anchorGroup} to={anchor.anchorGroup} anchors={anchorsGrouped.get(anchor.anchorGroup)} onClick={closeMenu} langKey={langKey} defaultLang={defaultLang} />);
              }
              return null;
            })}
          </Nav>
          {extraItems}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

MyNavbar.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.object),
  frontmatter: PropTypes.object,
  extraItems: PropTypes.any,
  langKey: PropTypes.string,
  defaultLang: PropTypes.string,
};

MyNavbar.defaultProps = {
  anchors: [],
  frontmatter: {},
  extraItems: null,
  langKey: "",
  defaultLang: "",
};

export default MyNavbar;
