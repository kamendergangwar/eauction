import React, { createRef, useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AadharPanForm from "./KYCDetailAndCategoryDetails/AadharPanForm";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import { Box, Button, Card, CardContent, CardHeader, Chip, Collapse, Container, FormControlLabel, IconButton, Paper, Radio, RadioGroup, Tooltip, Typography, makeStyles, withStyles } from "@material-ui/core";
import UploadDocuments from "../../SubmitDocumentsPageComponents/UploadDocuments/UploadDocuments";
import IncomeDetailsForm from "../../CategoryDetailsPageComponents/CategoryDetailsForm/IncomeDetailsForm";
import BidderSelectionForm from "./BidderSelecltion/BidderSelectionForm";
import { PendingDocIcon, VerifiedDocIcon, VerifiedDocIconGreen } from "../../../atoms/SvgIcons/SvgIcons";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import TimelineIcon from '@material-ui/icons/Timeline';
import { useSelector } from "react-redux";
import { RegistrationStepperSelector } from "../../../../redux/features/registration/registrationStepperSlice";
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 300,
    border: "1px solid rgba(211,211,211,0.6)",
    margin: theme.spacing(1, 2),
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '500',
    fontFamily: 'Poppins',
    lineHeight: '27px',
  },
  sectionNumber: {
    marginRight: theme.spacing(1),
    width: '28px',
    height: '28px',
    padding: theme.spacing(1),
    borderLeftColor: '#00437E',
    borderLeftStyle: 'solid',
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    background: 'rgba(0, 67, 126, 0.06)',
  },
  contentContainer: {
    height: '90%',
    lineHeight: 2,
    width: '100%',
  },
  verifiedBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "4px 8px 4px 6px",
    gap: "6px",
    borderRadius: "40px",
    background: "linear-gradient(113.08deg, #10BAEF -80.36%, #00A848 124.11%)",
    "& span": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFFFFF",
      fontSize: "11px",
      fontWeight: "700",
      width: "100px",
      height: "25px",
    },
  },
  PendingBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "4px 8px 4px 6px",
    gap: "6px",
    borderRadius: "40px",
    background: "linear-gradient(113.08deg, #efcb10 -80.36%, #8ea800 124.11%)",
    "& span": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFFFFF",
      fontSize: "11px",
      fontWeight: "700",
      width: "100px",
      height: "25px",
    },
  },
  progressChip: {
    background: "rgba(101, 112, 125, 0.1)",
    fontWeight: 700,
    color: "#4C5D6C",
    border: '1px solid',
    "&.done": {
      background: "rgba(33, 150, 83, 0.12)",
      color: "#219653",
    },
    "&.pending": {
      background: "#FDF7E5",
      color: "#F27807",
    },
    "&.overdue": {
      color: "#FD000D",
      background: "rgba(235, 87, 87, 0.06)",
    },
    '&.inProgress': {
      color: "#0038C0",
      background: "#EDF2FF",
    }
  },
}));
const CustomTooltip = withStyles({
  tooltip: {
    backgroundColor: "#FFFFFF",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06);",
    borderRadius: "8px",
    border: "1px solid rgba(0, 56, 192, 1)",
  },
  rootm: {
    height: '100%',


  },
  arrow: {
    "&:before": {
      border: "1px solid rgba(0, 56, 192, 1)",
    },
    color: "#FFFFFF",
  },
})(Tooltip);
export default function RegistrationForm({ section }) {
  const classes = useStyles();
  //  const [openSections, setOpenSections] = useState([false, false, false, false]);
  const history = useHistory();
  const sectionRefs = useRef([]);
  const { isFetchRegStepper,
    isSuccessgetRegStepper,
    getRegStepper,
    getRegActiveStep,
    isErrorgetRegStepper,
    getRegStepperData,
    errorMessagegetRegStepper,
    getRegTotalStep,
    isSuccessRegStepper,
  } = useSelector(RegistrationStepperSelector);
  const [openSection, setOpenSection] = useState(section);
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    setOpenSection(section);
  }, [section]);
  useEffect(() => {
    if (isSuccessgetRegStepper || getRegActiveStep) {
      setActiveStep(getRegActiveStep);

    }
  }, [isSuccessgetRegStepper, getRegActiveStep])
  // useEffect(()=>{
  // if(activeStep == 6){
  //   history.push("/dashboard");
  // }
  // },[activeStep])
  const handleToggle = (section) => {
    // const updatedSections = [...openSections];
    // updatedSections[section - 1] = !updatedSections[section - 1];
    // setOpenSections(updatedSections);
    setOpenSection((prevOpenSection) => (prevOpenSection === section ? null : section));

    // Scroll the active section into view
    const activeSectionRef = sectionRefs[section - 1];
    if (activeSectionRef && activeSectionRef.current) {
      activeSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };
  useEffect(() => {
    sectionRefs.current = Array(5).fill().map((_, i) => sectionRefs.current[i] || createRef());
  }, []);
  const preventCollapseClosing = (event) => {
    event.stopPropagation();
  };

  return (
    <  >

      {[1, 2, 3, 4, 5].map((section) => (

        <Card key={section} className={classes.card} ref={sectionRefs.current[section - 1]} onClick={() =>  handleToggle(section)}>
          <CardHeader
            title={
              <Typography variant="subtitle1" className={classes.cardTitle}>
                <Typography variant="span" className={classes.sectionNumber}>{section}</Typography> {getTitle(section)}
              </Typography>
            }




            action={
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                {/* <Box className={classes.verifiedBox}>
                   <VerifiedDocIcon />
                   <span>Completed</span>
                 </Box> */}
                {section < activeStep ? ( // Section completed
                  <Chip color={'secondary'} className={`${classes.progressChip} done`} icon={<VerifiedDocIconGreen />} label="Completed" />
                ) : section === activeStep ? ( // Active step
                  <Chip color={'secondary'} className={`${classes.progressChip} pending`} icon={<QueryBuilderIcon />} label="In Progress" />
                ) : ( // Section pending
                  <Chip color={'secondary'} className={`${classes.progressChip}`} icon={<PendingDocIcon style={{ fontSize: '1.3rem' }} />} label="Pending" />
                )}
                {section > activeStep ? <CustomTooltip arrow placement="top" title={"Please Complete Previous Step To Continue"}>
                  <span>
                    <IconButton size="small" disabled>
                      <LockTwoToneIcon size='small' />
                    </IconButton>
                  </span>
                </CustomTooltip> : <IconButton aria-label="expand" size="small">
                  {openSection === section ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>}

              </Box>
            }

          />
          {/* <Collapse in={openSections[section - 1]} timeout="auto" unmountOnExit> */}
          <Collapse in={openSection === section} timeout="auto" unmountOnExit>
            <CardContent onClick={preventCollapseClosing}>
              <Container className={classes.contentContainer}>
                {getSectionContent(section, activeStep)}
              </Container>
            </CardContent>
          </Collapse>
        </Card>
      ))}
      {activeStep == 6 && (
        <Box display="flex" justifyContent="flex-end" margin={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/dashboard")}
          >
            Proceed To Dashboard
          </Button>
        </Box>
      )}
    </>
  );
}

// Function to get the title for each section
function getTitle(section) {
  switch (section) {
    case 1:
      return "Bidder Selection";
    case 2:
      return "KYC Details";
    case 3:
      return "Personal Details & Bank Details";
    case 4:
      return "Category Details";
    case 5:
      return "Upload Documents";
    default:
      return "";
  }
}

// Function to get the content for each section
function getSectionContent(section, activeStep) {
  switch (section) {
    case 1:
      return (
        <BidderSelectionForm active={activeStep} />

      );
    case 2:
      return <AadharPanForm active={activeStep} />;
    case 3:
      return <PersonalDetails active={activeStep} />;
    case 4:
      return <IncomeDetailsForm active={activeStep} />;
    case 5:
      return <UploadDocuments active={activeStep} />;
    default:
      return null;
  }
}

