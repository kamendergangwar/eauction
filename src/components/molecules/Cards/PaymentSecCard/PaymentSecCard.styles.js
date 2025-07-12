import { makeStyles } from "@material-ui/core/styles";

export const PaymentSecCardCardStyles = makeStyles((theme) => ({
  cardRoot: {
    backgroundColor: "#FFFFFF",
    borderRadius: "10px 10px 0 0",
    boxShadow: "none",
    position: "relative"
  },
  triangleCont: {
    // display: "flex",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -12
  },
  triangle: {
    /* borderColor: "#fff transparent transparent transparent",
    borderStyle: "solid",
    borderWidth: 11,
    height: 0,
    width: 0, */
    backgroundImage: "linear-gradient(319deg, #fff 16px, transparent 17px), linear-gradient(39deg, #fff 16px, transparent 17px)",
    backgroundSize: "25px 23px",
    backgroundRepeat: "repeat-x",
    transform: "rotate(-180deg)",
    height: 12
  }
}));
