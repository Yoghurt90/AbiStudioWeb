const path = require("path");
const getBaseUrl = require("./src/utils/getBaseUrl");
const getPageName = require("./src/utils/getPageName");
const fileNameToSectionName = require("./src/utils/fileNameToSectionNameImplementation");
const { defaultPage, defaultLang, langTextMap = {} } = require("./config/site");

/**
 * add fileName to node for markdown files
 */
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const fileName = path.basename(node.fileAbsolutePath, ".md");
    const pageName = getPageName(fileName, node.frontmatter.anchor, node.frontmatter.separatePage);
    const distinctKey = node.fields.langKey + "/" + pageName;
    const sectionName = fileNameToSectionName(fileName);
    console.log("FileName: " + fileName);
    console.log("PageName: " + pageName);
    console.log("DistinctKey: " + distinctKey);
    console.log("SectionName: " + sectionName);
    createNodeField({
      node,
      name: "fileName",
      value: fileName,
    });

    createNodeField({
      node,
      name: "directoryName",
      value: path.basename(path.dirname(node.fileAbsolutePath)),
    });

    createNodeField({
      node,
      name: "pageName",
      value: pageName,
    });

    createNodeField({
      node,
      name: "distinctKey",
      value: distinctKey,
    });

    createNodeField({
      node,
      name: "sectionName",
      value: sectionName,
    });
  }
};

/**
 * define nullable items
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = [
    "type MarkdownRemark implements Node { frontmatter: Frontmatter }",
    `type Frontmatter {
      anchor: String
      jumpToAnchor: String
      jumpToAnchorText: String
      social: Social
      services: [Service]
      teamMember: [TeamMember]
    }`,
    `type TeamMember {
      social: Social
    }`,
    `type Service {
      iconName: String
      imageFileName: String
      header: String
      content: String
    }`,
    `
    type Social {
      twitter: String
      facebook: String
      linkedin: String
      medium: String
      github: String
    }
    `,
  ];

  createTypes(typeDefs);
};

/**
 * generate i18n top pages
 */
exports.createPages = ({ graphql, actions: { createPage } }) => {
  const mainIndex = path.resolve("./src/templates/main-index.jsx");

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              distinct(field: fields___distinctKey)
              nodes {
                fields {
                  distinctKey
                  sectionName
                }
              }
            }
          }
        `,
      ).then(({ errors, data }) => {
        if (errors) {
          console.log(errors);
          reject(errors);
        }

        data.allMarkdownRemark.distinct.forEach((distinctKey) => {
          console.log(distinctKey);
          const keySplit = distinctKey.split("/");
          const langKey = keySplit[0];
          const pageKey = keySplit[1].length > 0 ? keySplit[1] : defaultPage;
          console.log(keySplit);
          console.log(langKey);
          console.log(pageKey);
          const path = getBaseUrl(defaultLang, langKey, defaultPage, pageKey);
          console.log(path);
          const sectionsData = data.allMarkdownRemark.nodes.filter(node => node.fields.distinctKey === distinctKey);
          const allowedSections = sectionsData.map(section => section.fields.sectionName);
          createPage({
            path: path,
            component: mainIndex,
            context: {
              langKey,
              defaultLang,
              langTextMap,
              allowedSections,
              needsTop: defaultPage === pageKey,
            },
          });
        });

        return null;
      }),
    );
  });
};
