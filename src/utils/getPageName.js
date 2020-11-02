function getPageName(fileName, anchor, separatePage) {
    console.log(fileName);
    console.log("SEPARATEPAGE: " + separatePage);
    if (separatePage) {
      console.log("CREATING SEPARATE PAGE");
      return anchor;
    }
  
    return "";
  }
  
  module.exports = getPageName;