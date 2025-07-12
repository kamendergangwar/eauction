import { makeStyles } from '@material-ui/styles'

export const AppointmentSucessfulStyle = makeStyles((theme) => ({
   AppoinetmentContainer: {
      backgroundColor: '#fff', borderRadius: '5px', padding: 20
   },
   headContainer: {
      textAlign: 'center'
   },
   Heading: {
      color: '#0F2940', fontWeight: 800, fontSize: 22
   },
   subHeading: {
      color: '#4C5C6D', fontSize: 14, marginTop: 15
   },
   CalnFontsize: {
      fontSize: '1em'
   },
   AppoinButton: {
      marginTop: 30
   },

   detailsContainer: {
      width: '80%',
      margin: '30px auto!important',
      padding: '10px 20px',
      backgroundColor: '#fff',
      boxShadow: '0 0 11px 1px #0038c026',
      borderRadius: '8px',
      [theme.breakpoints.down("sm")]: {
         width: '100%',
      }
   },
   noteIcon: {
      color: "#65707D", fontSize: 20, marginRight: 10
   },
   textIcon: {
      color: "#65707D",
   },

   validIcon: {
      color: '#219653',
      fontFamily: 'Poppins',
      fontWeight: '600',
      // fontSize: "0.75rem",
      marginRight: 10
   },
   iconHeader: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 10
   },
   iconHeader1: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'end',
      paddingBottom: 10
   },
   fontstyle: {
      fontWeight: 'bold',
      fontSize: "0.875rem",
      lineHeight: "18px",
   },
   details: {
      color: '#65707D',
      fontSize: '14px',
      paddingBottom: 20
   },
   detailcontain: {
      borderRight: "1px dashed #eee", padding: 10,

      "& .MuiTypography-subtitle1": {
         fontWeight: "700",
         fontSize: "1rem",
         color: "#00437E",
         lineHeight: "18px",
         letterSpacing: "0.08em",
         paddingBottom: theme.spacing(1.5),
      }
   },
   detailcontain1: {
      padding: '10px 20px',
   },
   centerAddress: {
      display: 'flex',
      alignItems: 'center', marginBottom: 10,

   },
   fontBoldStyle: {
      color: "#0038C0",
      fontWeight: 700,
      fontFamily: 'Noto Sans',
      fontSize: "0.875rem",
   },
   button: {
      fontWeight: 700
   },

   instructionContainer: {
      width: '80%',
      margin: '30px auto!important',
      padding: '10px 20px',
      backgroundColor: 'rgba(230, 234, 249, 0.6);',
      boxShadow: '0 0 11px 1px #0038c026',
      borderRadius: '8px', border: '1px solid #E6EAF9',
      [theme.breakpoints.down("sm")]: {
         width: '100%',
      }
   },
   insList: {
      color: '#4C5C6D', fontSize: 14, marginTop: 20,
   },
   li: {
      marginBottom: 20,
   }
}))