import { makeStyles } from "@material-ui/core/styles";

export const LiveBidStyles = makeStyles((theme) => ({
  highBidHead: {
    background: '#f44336'
  },
  highBidCell: {
    fontWeight: 600,
    color: '#fff'
  },
  bidTextBox: {
    // color: 'brown',
    fontWeight: 600,
    minHeight: 40,
    // width: 250,
    border: '1px solid',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    background: 'beige',
    '& span': {
      marginLeft: 5
    },
    '&.large' :{
      fontSize: '1.2rem'
    }
  },
  rotate: {
    animation: '$rotation 2s infinite linear',
  },
  '@keyframes rotation': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },

}));
