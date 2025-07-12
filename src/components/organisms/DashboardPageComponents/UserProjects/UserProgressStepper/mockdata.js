import {
  Settings,
  GroupAdd,
  VideoLabel,
  Dashboard,
  AccountCircle,
  VerifiedUser,
  AccountBalance,
  GroupAddOutlined,
  PersonAdd,
  LocalAtm,
  AssignmentTurnedIn,
  Apartment,
  Timer,
  PaymentOutlined,
  EmojiPeople,
} from "@material-ui/icons";
import CheckIcon from "@material-ui/icons/Check";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  ApplicationFeeIcon,
  CheckedOutlinedIcon,
  VerifiedSuccessIcon,
} from "../../../../atoms/SvgIcons/SvgIcons";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
export const getSteps = () => {
  return [
    "Applicant SignUp",
    "KYC",
    "Personal details",
    "Add Co-applicant",
    "Category Details",
    "Documents Upload",
    "Application payment",
    "Document Verification",
    "Select Flat",
    "Flat Payment",
    "Book Appointment",
    "Physical Doc Verification"
    // "LOI Genration",
    // "10% Booking Amount",
    // "NOC/Allotment letter GEnration",
    // "EMI Progress",
  ];
};

export const getStepsWithDetails = () => {
  return [
    {
      StepName : "Applicant Sign Up",
      StepIcon : <ExitToAppIcon style={{color:"#219653",fontSize:'xx-large'}}/>
    },
    {
      StepName : "KYC",
      StepIcon : <VerifiedUser style={{color:"#219653",fontSize:'xx-large'}}/>
    },
    {
      StepName : "Personal details",
      StepIcon : <AccountCircle style={{color:"#219653",fontSize:'xx-large'}}/>
    },
    {
      StepName : "Add Co-applicant",
      StepIcon : <GroupAdd style={{color:"#219653",fontSize:'xx-large'}}/>
    },
    {
      StepName : "Category Details",
      StepIcon : <CategoryOutlinedIcon style={{color:"#219653",fontSize:'xx-large'}}/>
    },
    {
      StepName : "Documents Upload",
      StepIcon : <DescriptionOutlinedIcon style={{color:"#219653",fontSize:'xx-large'}}/>
    },
    {
      StepName : "Application payment",
      StepIcon : <PaymentOutlined style={{color:"#219653",fontSize:'xx-large'}}/>
    },
    {
      StepName : "Document Verification",
      StepIcon : <CheckCircleOutlinedIcon style={{color:"#219653",fontSize:'xx-large'}}/>
    },
    {
      StepName : "Select Flat",
      StepIcon : <Apartment style={{color:"#219653",fontSize:'xx-large'}}/>
    },
    {
      StepName : "Flat Payment",
      StepIcon : <AccountBalance style={{color:"#219653",fontSize:'xx-large'}}/>
    },
    {
      StepName : "LOI Generation",
      StepIcon : <EmojiPeople style={{color:"#219653",fontSize:'xx-large'}}/>
    },
    {
      StepName : "Allotment Letter",
      StepIcon : <CheckCircleOutlinedIcon style={{color:"#219653",fontSize:'xx-large'}}/>     
    },
    {
      StepName : "NOC",
      StepIcon : <CheckCircleOutlinedIcon style={{color:"#219653",fontSize:'xx-large'}}/>     
    },
    {
      StepName : "EMIs",
      StepIcon : <CheckCircleOutlinedIcon style={{color:"#219653",fontSize:'xx-large'}}/>     
    }
    // "LOI Genration",
    // "10% Booking Amount",
    // "NOC/Allotment letter GEnration",
    // "EMI Progress",
  ];
};

export const icons = {
  1: <ExitToAppIcon />,
  2: <VerifiedUser />,
  3: <AccountCircle />,
  4: <GroupAdd />,
  5: <CategoryOutlinedIcon />,
  6: <DescriptionOutlinedIcon />,
  7: <PaymentOutlined />,
  8: <CheckCircleOutlinedIcon />,
  9: <Apartment />,
  10: <AccountBalance />,
  11: <EmojiPeople />,
  // 12: <Timer />,
};
export const checkicons = {
  1: <CheckIcon />,
  2: <CheckIcon />,
  3: <CheckIcon />,
  4: <CheckIcon />,
  5: <CheckIcon />,
  6: <CheckIcon />,
  7: <CheckIcon />,
  8: <CheckIcon />,
  9: <CheckIcon />,
  10: <CheckIcon />,
  11: <CheckIcon />,
  // 12: <Timer />,
};
