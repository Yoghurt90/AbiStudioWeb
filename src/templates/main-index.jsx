import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Navbar from "views/Navbar";
import Top from "views/Top";
import Footer from "views/Footer";
import * as Sections from "views/Sections";
import SEO from "components/SEO";
import LanguageSelector from "components/LanguageSelector";

import "utils/fixFontAwesome";
import breakDownAllNodes from "utils/breakDownAllNodes";
import fileNameToSectionName from "utils/fileNameToSectionName";

import "../style/main.scss";

/**
 * get file name list from content/sections folder
 */
export const query = graphql`
  query IndexQuery($langKey: String!) {
    site {
      siteMetadata {
        keywords
        description
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { order: ASC, fields: [fields___directoryName, fields___fileName] }
    ) {
      nodes {
        frontmatter {
          brand
          anchor
          anchorGroup
          hideInNavbar
          content
          copyright
          header
          imageFileName
          jumpToAnchor
          jumpToAnchorText
          menuText
          pageBackgroundImage
          sections {
            header
            subheader
            contentImageFileName
            contentImageText
            content
            teamMember {
              header
              imageFileName
              subheader
            }
          }
          privacyHref
          privacyText
          services {
            content
            header
            imageFileName
            serviceActionHref
          }
          social {
            facebook
            github
            linkedin
            medium
            twitter
          }
          subheader
          termsHref
          termsText
          title
          partnersHeader
          partners {
            partnerName
            partnerType
            partnerIcon
            partnerIconLink
          }
          contactsHeader
          contactsPhone
          contactsMail
          contactsLogo
          contacts {
            contactIcon
            contactText
            contactUserName
          }
          packages {
            packageSectionHeader
            packageName
            packageBackground
            packageActionName
            packageActionHref
            packageNameToSelect
            packageContent {
              content
              subcontent
            }
          }
          extras {
            headers {
              headerTitle
            }
            rows {
              rowContent {
                content
              }
            }
          }
          weddingPlaylistId
          clipPlaylistId
          clipHeader
          formData {
            requiredFieldInvalidText
            nameLabel
            nameEmptyText
            emailLabel
            emailEmptyText
            phoneLabel
            phoneEmptyText
            dateLabel
            messageLabel
            messageEmptyText
            messageHelperText
            privacyPolicyMessage
            privacyErrorText
            buttonText
            submiturl
            packageLabel
            packageList
          }
        }
        fields {
          fileName
          directoryName
        }
      }
    }
  }
`;

const IndexPage = ({ location, data, pathContext: { langKey, defaultLang, langTextMap, allowedSections, needsTop } }) => {
  const {
    site: {
      siteMetadata: { keywords, description },
    },
    allMarkdownRemark: { nodes },
  } = data;

  const { topNode, navBarNode, anchors, footerNode, sectionsNodes } = breakDownAllNodes(nodes);

  let langSelectorPart;
  if (langTextMap != null && Object.keys(langTextMap).length > 1) {
    langSelectorPart = (
      <LanguageSelector langKey={langKey} defaultLang={defaultLang} langTextMap={langTextMap} />
    );
  }

  let index = -1;

  return (
    <>
      <SEO lang={langKey} title="Top" keywords={keywords} description={description} />
      <Navbar
        anchors={anchors}
        frontmatter={navBarNode.frontmatter}
        extraItems={langSelectorPart}
        langKey={langKey}
        defaultLang={defaultLang}
      />
      { needsTop ? <Top frontmatter={topNode.frontmatter} /> : null}
      {
        sectionsNodes.map(({ frontmatter, fields: { fileName } }) => {
          const sectionComponentName = fileNameToSectionName(fileName);
          const SectionComponent = Sections[sectionComponentName];
          if (!allowedSections.includes(sectionComponentName)) {
            return null;
          }
          index += 1;
          return SectionComponent ? (
            <SectionComponent
              location={location}
              key={sectionComponentName}
              className={index % 2 === 1 ? "bg-light" : null}
              frontmatter={frontmatter}
            />
          ) : null;
        })
      }
      <Footer frontmatter={footerNode.frontmatter} />
    </>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object,
};

IndexPage.defaultProps = {
  location: null,
  pathContext: {
    langKey: "en",
    defaultLang: "en",
    langTextMap: {},
    allowedSections: [],
    needsTop: true,
  },
};

export default IndexPage;
