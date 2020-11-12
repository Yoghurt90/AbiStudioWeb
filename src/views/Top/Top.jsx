import React from "react";
import PropTypes from "prop-types";

import { Button } from "react-bootstrap";
import ImageCard from "components/ImageCard";
import { navigate } from "gatsby"

const Top = ({ frontmatter }) => {
  const handleButtonClick = React.useCallback((anchor) => {
    navigate("/" + anchor);
  }, []);

  if (!frontmatter) {
    return null;
  }

  const { header, subheader, imageFileName, jumpToAnchor, jumpToAnchorText } = frontmatter;

  let extraInfoPart;
  if (jumpToAnchor && jumpToAnchorText) {
    extraInfoPart = (
      <Button size="xl" variant="primary" className="text-uppercase" onClick={() => {handleButtonClick(jumpToAnchor)}}>
        {jumpToAnchorText}
      </Button>
    );
  }

  return (
    <ImageCard
      imageFileName={imageFileName}
      header={header}
      subheader={subheader}
      extraInfo={extraInfoPart}
    />
  );
};

Top.propTypes = {
  frontmatter: PropTypes.object,
};

Top.defaultProps = {
  frontmatter: null,
};

export default Top;
