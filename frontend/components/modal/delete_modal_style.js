const style = {
  overlay : {
    position        : "fixed",
    display         : "flex",
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : "#fff",
    zIndex          : 10,
    width           : "100%",
    padding         : 0,
    margin          : 0,
    border          : 0,
    justifyContent  : "center",
    alignItems      : "center"
  },
  content : {
    background      : "#fff",
    position        : "fixed",
    top             : "none",
    left            : "none",
    right           : "none",
    bottom          : "none",
    zIndex          : 11,
    padding         : 0,
    borderRadius    : "3px",
    maxWidth        : "520px",
    textAlign       : "center",
    display         : "flex",
    flexDirection   : "column",
    verticalAlign   : "middle",
    fontSize        : "24px",
    lineHeight      : "1.6",
    fontWeight      : "700"
  }
};

export default style;
