import { makeStyles } from '@material-ui/styles'

export const RescheduleStyle = makeStyles((theme) => ({
   AppointmentContainer: {
      backgroundColor: '#fff', borderRadius: '5px', padding: 20
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
   subheadingContainer: {
      width: '80%',
      margin: '25px auto 10px auto',
      color: ' rgba(15, 41, 64, 0.6)'
   },

   detailsContainer: {
      boxShadow: '0 0 11px 1px #0038c026', margin: '20px auto 10px auto', width: '80%', padding: '10px 20px', backgroundColor: '#fff', borderRadius: '8px'
   },
   noteIcon: {
      color: "#65707D", fontSize: 20, marginRight: 10
   },
   textIcon: {
      color: "#65707D",
   },

   validIcon: {
      color: '#219653',
      fontWeight: 600,
      // fontSize: ' 0.75rem',
      marginRight: 10
   },
   errorIcon: {
      color: '#EB5757',
      fontFamily: 'Poppins',
      lineHeight: '22px',
      fontWeight: 600,
      // fontSize: '0.75rem',
      marginRight: 5
   },
   notArrivedIcon: {
      color: '#4C5C6D', fontWeight: 'bold', fontSize: 16, marginRight: 10
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
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: '18px'
   },
   details: {
      color: '#65707D', paddingBottom: 20
   },
   detailcontain: {
      borderRight: "1px dashed #eee", padding: 10,
   },
   detailcontain1: {
      padding: '10px 20px',
   },
   centerAddress: {
      display: 'flex',
      alignItems: 'center', marginBottom: 10,

   },
   fontBoldStyle: {
      fontWeight: 700,
   },
   fontTitle: {
      color: "#00437E",
      fontWeight: 700,
      fontFamily: 'Noto Sans',
      fontSize: "0.875rem",
   },
   button: {
      fontWeight: 700,
      fontSize: "0.875rem",
      marginRight: 15
   },

   dialogBox: {
      textAlign: 'center',
      margin: '0 auto',
      maxWidth: 500
   },
   dialogTitle: {
      fontWeight: 700,
      fontSize: '1.5rem',
   },
   dialogBoxButton: {
      justifyContent: 'center', padding: 40
   }

}))