const style = {
  overlay : {
    position        : "fixed",
    display         : "flex",
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : "rgba(0, 0, 0, 0.6)",
    zIndex          : 10,
    width           : "100%",
    padding         : 0,
    margin          : 0,
    border          : 0,
    justifyContent  : "center"
  },
  content : {
    background      : "#fff",
    position        : "fixed",
    zIndex          : 11,
    padding         : 0,
    boxShadow       : "0 2px 6px 0 rgba(0,0,0,.44)",
    borderRadius    : "3px",
    maxWidth        : "520px",
    height          : "100%",
    maxHeight       : "675px",
    width           : "100%",
    margin          : "30px 0"
  }
};

export default style;
