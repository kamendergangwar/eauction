import { makeStyles } from "@material-ui/core/styles";

export const ApplicationDetailsViewStyles = makeStyles((theme) => ({
  pageHeader: {
    borderBottom: "1px solid #E7E7E7",
    padding: theme.spacing(2),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#fff"
    }
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  downArrow: {
    position: "fixed",
    top: "calc(100vh - 80px)",
    left: "calc(95% - 110px)",
    width: "0",
    height: "30px",
    animation: `$jumpInfinite 1.5s infinite`,

    "& .MuiSvgIcon-root": {
      fontSize: "5rem"
    },
    [theme.breakpoints.down("sm")]: {
      display: 'none',
    }
  },
  "@keyframes jumpInfinite": {
    "0%": {
      marginTop: "0"
    },
    "50%": {
      marginTop: "20px"
    },
    "100%": {
      marginTop: "0"
    }
  },

  "@keyframes move": {
    "25%": { opacity: 1 },
    "33%": { opacity: 1, transform: "translateY(30px)" },
    "67%": { opacity: 1, transform: "translateY(40px)" },
    "100%": { opacity: 0, transform: "translateY(55px) scale3d(0.5, 0.5, 0.5)" }
  },
  text: {
    display: "block",
    marginTop: "75px",
    marginLeft: "-30px",
    fontFamily: '"Helvetica Neue", "Helvetica", Arial, sans-serif',
    fontSize: "12px",
    color: "#fff",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    opacity: 0.25,
    animation: `$pulse 2s linear alternate infinite`
  },
  "@keyframes pulse": { to: { opacity: 1 } },

  text: {
    display: 'block',
    marginTop: '75px',
    marginLeft: '-30px',
    fontFamily: '"Helvetica Neue", "Helvetica", Arial, sans - serif',
    fontSize: '12px',
    color: '#fff',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    opacity: '.25',
    animation: 'pulse 2s linear alternate infinite',
  },
  backBtn: {
    position: "absolute",
    top: "50%",
    left: theme.spacing(2),
    transform: "translateY(-50%)",
  },
  pageTitle: {
    color: "#00437E",
    fontWeight: 700,
    marginLeft: theme.spacing(2),
    "& small": {
      color: "#7a7a7a"
    }
  },
  // ----------
  overviewRoot: {
    height: "100%",
    paddingTop: "60px"
  },
  formContainer: {
    height: "100%"
  },
  container: {
    height: "100%",
    overflow: "auto",
    paddingTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: 0
    }
  },
  applicatioInfoLabelCompleted: {
    display:'flex',
    color: '#219653',
    background: '#EDF7F1',
    padding: theme.spacing(0.5, 1),
    borderRadius: '44px',
    textAlign:'center',
  },
  applicantDtlsBar: { //
    background: 'rgba(0, 67, 126, 0.01)',
    border: '1px solid rgba(1, 81, 202, 0.1)',
    borderRadius: '8px',
    padding: theme.spacing(2, 1.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 2)
    }
  },
  applicatioNoView: {
    color: "#00437E",
    fontWeight: "bold",
    fontSize: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2.5)
    }
  },
  applicatioInfoView: {
    color: "#65707D",
    fontWeight: 500,
    fontSize: "0.8rem",
    "& strong": {
      color: "#0F2940"
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2.5)
    }
  },
  // --------
  formSection: {
    padding: theme.spacing(5, 10),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  sectionContainer: {
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
    },
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
    borderRadius: 10,
    overflow: "hidden",
    "&.applicantPersonal": {
      [theme.breakpoints.down("sm")]: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }
    }
  },
  secCardHeader: {
    borderBottom: "1px solid #EEEEEE",
    padding: theme.spacing(2.5, 8),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 2),
      "&.applicantPersonal": {
        borderBottom: "none"
      }
    }
  },
  editIconBtn: {
    backgroundColor: "transparent",
    "& .MuiSvgIcon-root": {
      fontSize: "1rem"
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2.5),
      float: "right"
    }
  },
  secCardContent: {
    padding: theme.spacing(1, 1),
    "& .aadhaarCardDtls": {
      paddingRight: theme.spacing(6.25),
      [theme.breakpoints.down("sm")]: {
        borderBottom: "1px solid #EEEEEE",
        paddingRight: 0,
        paddingBottom: theme.spacing(5)
      }
    },
    "& .panCardDtls": {
      paddingLeft: theme.spacing(6.25),
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 0,
        paddingTop: theme.spacing(5)
      }
    },
    "& .emailLabel": {
      wordWrap: "break-word"
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 2),
    }
  },
  profileImgCover: {
    // border: "1px solid #BBBBBB",
    borderRadius: 8,
    width: 160,
    height: 150,
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: 150
    }
  },
  applicantDetailsBox: {
    paddingLeft: theme.spacing(6.25),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingTop: theme.spacing(3)
    }
  },
  prsnlDtlsSideBox: {
    paddingLeft: theme.spacing(2)
  },
  dataRow: {
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    }
  },
  dataResCell: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    }
  },
  dataLabel: {
    color: "#65707D",
    fontWeight: 500,
    fontSize: "0.8rem",
    marginBottom: theme.spacing(2),
    "& .primary": {
      color: "#0151CA"
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1),
    }
  },
  applicatioInfoLabel: {
    color: "#65707D",
    fontWeight: 500,
    fontSize: "0.8rem",
    "& .primary": {
      color: "#0151CA"
    },
  },
  applicationProfileImgCover: {
    width: "42px",
    height: "42px",
    border: "1px solid #BBBBBB",
    borderRadius: "100px",
  },
  dataValView: {
    color: "#0F2940",
    fontWeight: 600,
    fontSize: "1rem",
    "& .primary": {
      color: "#0151CA"
    }
  },
  verifiedMsgView: {
    color: "#219653",
    fontWeight: 500,
    fontSize: "0.7rem",
    margin: theme.spacing(1.5, 0),
    "& .MuiSvgIcon-root": {
      verticalAlign: "middle",
      fontSize: "1rem"
    }
  },
  notverifiedMsgView: {
    color: "red",
    fontWeight: 500,
    fontSize: "0.7rem",
    margin: theme.spacing(1.5, 0),
    "& .MuiSvgIcon-root": {
      verticalAlign: "middle",
      fontSize: "1rem"
    }
  },
  docViewBox: {
    backgroundColor: "#FFFFFF",
    border: "1px dashed #D7D7D7",
    borderRadius: 8,
    textAlign: "center",
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
    "& img": {
      maxWidth: 320,
      maxHeight: 190,
      width: "100%"
    }
  },
  pdfPreviewBox: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
    borderRadius: 10,
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    "&:hover": {
      cursor: "pointer"
    }
  },
  fileNamePreviewBox: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
    borderRadius: 10,
    padding: theme.spacing(1.5, 7),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    "&:hover": {
      cursor: "pointer"
    }
  },
  pdfFileName: {
    maxWidth: "220px",
    color: "#0F2940",
    fontWeight: "bold",
    fontSize: "0.9rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginRight: theme.spacing(1),
    /* "& .MuiSvgIcon-root": {
      verticalAlign: "middle",
      marginRight: theme.spacing(0.9)
    } */
  },
  fileNamePreview: {
    maxWidth: "80%",
    color: "#0F2940",
    fontWeight: "bold",
    fontSize: "0.9rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    "& .MuiSvgIcon-root": {
      verticalAlign: "middle",
      marginRight: theme.spacing(2)
    }
  },
  fileSizeView: {
    color: "#BBBBBB",
    fontWeight: "bold",
    fontSize: "0.8rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.7rem"
    },
  },
  chipsList: {
    marginBottom: theme.spacing(1.25),
    "&:last-child": {
      marginBottom: 0
    }
  },
  catChipView: {
    backgroundColor: "#E1F4FF",
    borderRadius: 100,
    color: "#0151CA",
    display: "inline-block",
    fontWeight: 600,
    fontSize: "0.8rem",
    padding: theme.spacing(1, 1.5),
    "&.projCard": {
      [theme.breakpoints.down("sm")]: {
        backgroundColor: "#FFFFFF",
        color: "#00437E"
      }
    }
  },
  projectCard: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 40px rgba(0, 25, 121, 0.1)",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: theme.spacing(3),
    "&:last-child": {
      marginBottom: 0
    },
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#EAF2FC",
      boxShadow: "none",
      border: "1px solid #0151CA"
    }
  },
  projImgCover: {
    width: 200,
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: 200,
    }
  },
  projCardHeader: {
    borderBottom: "1px solid rgba(1, 81, 202, 0.1)",
    padding: theme.spacing(1, 2.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2)
    }
  },
  projectTitle: {
    color: "#0151CA",
    fontWeight: "bold",
    fontSize: "1rem"
  },
  projectPriceView: {
    color: "#0151CA",
    fontWeight: "bold",
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      color: "#fff",
      position: "absolute",
      bottom: theme.spacing(1),
      right: theme.spacing(2),
      zIndex: 1
    }
  },
  cardDataCont: {
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    }
  },
  scaleIconView: {
    fontSize: "2rem",
    marginRight: theme.spacing(1.5)
  },
  dataTitle: {
    color: "#65707D",
    fontWeight: 600,
    fontSize: "0.8rem",
    marginBottom: theme.spacing(0.5)
  },
  dataValue: {
    color: "#00437E",
    fontWeight: "bold",
    fontSize: "0.9rem"
  },
  cardChipsSec: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(3),
    }
  },
  sourceInfoSection: {
    // borderTop: "1px solid #EEEEEE",
    padding: theme.spacing(4, 22.5),
    "& .MuiFormControl-root": {
      margin: 0
    },
    [theme.breakpoints.down("sm")]: {
      border: "none",
      backgroundColor: "#fff",
      boxShadow: "0px 4px 20px 2px rgba(0, 0, 0, 0.1)",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      padding: theme.spacing(5, 2),
    }
  },
  gatherInfoQuestion: {
    color: "#263238",
    fontWeight: 600,
    fontSize: "0.9rem",
    "& .MuiSvgIcon-root": {
      verticalAlign: "middle",
      marginRight: theme.spacing(1)
    },
    [theme.breakpoints.down("sm")]: {
      color: "#0F2940",
      fontWeight: "bold",
      marginBottom: theme.spacing(3),
    }
  },
  termsAndConditionSec: {
    backgroundColor: "#EAF2FC",
    padding: theme.spacing(1, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 2.5),
    }
  },
  termsNdCondiCheckBoxLabel: {
    color: "#263238",
    fontWeight: 600,
    fontSize: "0.9rem",
    "& span": {
      color: "#0038c0",
      "&:hover": {
        textDecoration: "underline"
      }
    }
  },
  // ---------
  actionSection: {
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.1)",
    padding: theme.spacing(2, 4),
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#fff",
      padding: theme.spacing(2),
    },
  },

  Iconcontainer: {
    position: "relative",
  },
  subWrapper: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    bottom: '75px',
    transform: 'translate(-50%, -50%)',
  },

  chevron: {
    position: "fixed",
    width: "28px",
    height: "8px",
    opacity: 0,
    bottom: '80px',
    marginBottom: '10px',
    transform: "scale3d(0.5, 0.5, 0.5)",
    animation: "$move 3s ease-out infinite",

    [theme.breakpoints.down("md")]: {
      display: 'none',
    },

    "&:first-child": {
      animation: '$move 3s ease - out 1s infinite',
    },
    "&:nth-child(2)": {
      animation: `$move 3s ease - out 2s $infinite`,
    },
    "&:before, &:after": {
      content: ' ',
      position: 'absolute',
      top: '0',
      height: '100 %',
      width: '51%',
      background: '#0038c0b0',
    },
    "&:first-child": { animation: `$move 3s ease-out 1s infinite` },
    "&:nth-child(2)": { animation: `$move 3s ease-out 2s infinite` },
    "&:before,&:after": {
      content: "' '",
      position: "absolute",
      top: "0",
      height: "100%",
      width: "51%",
      background: "#0038c0b0"
    },
    "&:before": { left: "0", transform: "skew(0deg, 30deg)" },
    "&:after": {
      right: "0",
      width: "50%",
      transform: "skew(0deg, -30deg)"
    },
  },
  tableRow: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
    borderRadius: 10,
    padding: theme.spacing(1.5, 2.5),
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 1, 1, 1.5),
    },
  },
  fileFormatIcon: {
    maxWidth: 22,
    display: "block",
    marginRight: theme.spacing(2),
  },
  fullNameCol: {
    color: "#0F2940",
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  detailBoxContainer: {
    padding: theme.spacing(1),
    backgroundColor: '#FFFFFF',
    borderBottom:"1px solid rgba(1, 81, 202, 0.2)"
  },
  catChipCont: {
    marginTop: theme.spacing(1.5),
    display: "flex",
    justifyContent: "flex-start",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    },
    "& .MuiChip-root": {
      backgroundColor: "#fff",
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      "& .MuiChip-label": {
        color: "#00437E",
        fontSize: "0.8rem",
        fontWeight: 600,
        padding: theme.spacing(1, 2),
        maxWidth: 350,
      },
      "& .MuiChip-deleteIcon:hover": {
        color: "#FA3D5D",
      },
    },
  },
  selectedCatCont:{
    padding: theme.spacing(0,2),
  },
  selectedDetail: {
    display: "flex",
    alignItems: "center",
    padding: "2px 12px",
    background: "#FFFFFF",
    borderRadius: "40px",
    width: "fit-content",
    color: "#65707D",
    fontWeight: "600",
    fontSize: "12px",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    "& span": {
      color: "#00437E",
      fontWeight: "700",
      fontSize: "14px",
    },
  },
  projChipCard: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(3),
    }
  }
}));