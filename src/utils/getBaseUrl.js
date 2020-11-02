function getBaseUrl(defaultLang, lang, defaultPage, page) {
  if (defaultLang !== lang) {
    if (defaultPage !== page) {
      return `/${lang}/${page}/`;
    }
    return `/${lang}/`;
  }

  if (defaultPage !== page) {
    return `/${page}/`;
  }

  return '/';
}

module.exports = getBaseUrl;
