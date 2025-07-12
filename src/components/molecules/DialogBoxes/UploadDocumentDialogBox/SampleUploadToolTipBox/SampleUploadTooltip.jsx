import React from "react";
import { useTranslation } from "react-i18next";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { Tooltip } from "@material-ui/core";

const CustomTooltip = withStyles({
  tooltip: {
    backgroundColor: "#FFFFFF",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06);",
    borderRadius: "8px",
    border: "1px solid rgba(0, 56, 192, 1)",
  },
  arrow: {
    "&:before": {
      border: "1px solid rgba(0, 56, 192, 1)",
    },
    color: "#FFFFFF",
  },
})(Tooltip);

export const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
  docNameTxt: {
    color: "#263238",
    fontSize: "0.8rem",
    fontWeight: 400,
    marginBottom: theme.spacing(1),
    display: "inline-block",
    "&.done": {
      color: "white",
      textShadow: "-0.5px -0.5px 0 black, 0.5px -0.5px 0 black, -0.5px 0.5px 0 black, 0.5px 0.5px 0 black",
    },
    "&.verified": {
      color: "#263238",
      fontWeight: 400,
    },
    "&.DoneHoverTxt": {
      color: "#FFFFFF",
      fontWeight: "700",
    },
    "&.VerifiedHoverTxt": {
      color: "rgba(0, 56, 192, 1)",
      fontWeight: "700",
    },
  },
  orderList: {
    color: "#65707D",
    margin: theme.spacing(2, 0, 0, 0),
    paddingLeft: theme.spacing(2),
    lineHeight: "26px",
    fontSize: "0.9rem",
  },
  tooltipTittle: {
    color: "#0038C0",
    fontSize: "0.8rem",
    fontWeight: "700",
  },
}));

const SampleUploadTooltip = (props) => {
  const { isUploaded, isVerified, reservationId, DocumentId, isPaymentDone } = props;
  const classes = useStyles();
  const { t } = useTranslation("DocumentsPageTrans");

  const staticDocData = {
    "StateGovernmentEmployees": {
      DocumentId: "9",
      DocumentName: "FORM D",
      DocumentDetail:
      t("journalistBracketTxt")
    },
    "CidcoEmployees": {
      DocumentId: "9",
      DocumentName: "FORM D",
      DocumentDetail:
      t("CIDCOBracketTxt")
    },
    "Journalist": {
      DocDetailHeadLine: "DGIPR certificate",
      DocumentDetail:
      t("JournalistBracketTxt")
    },
    "ReligiousMinorites": {
      DocumentId: "9",
      DocumentName: "FORM F",
      DocDetailHeadLine: "Affidavit",
      DocumentDetail:
      t("ReligiousMinoritesBracketTxt")
    },
    "General": {
      DocumentId: '17',
      DocumentName: 'FORM C',
      DocumentDetail: 
      t("AffidavitBracketTxt")
    },
    "OtherCaste": {
      DocumentId: '17',
      DocumentName: 'FORM C',
      DocumentDetail: t("AffidavitBracketTxt")
    }
  };

  return (
    <>
      {DocumentId == 9 && <Typography
        className={`${classes.docNameTxt} 
        ${isUploaded === 1 && isVerified ? "verified" : ""}
        ${isUploaded === 1 && !isVerified ? "done" : ""}`}
      >
        {reservationId == 9 && <span style={{ fontSize: "12px" }}>({staticDocData.CidcoEmployees.DocumentDetail})</span>}
      </Typography>}
      {DocumentId == 9 && <Typography
        className={`${classes.docNameTxt} 
        ${isUploaded === 1 && isVerified ? "verified" : ""}
        ${isUploaded === 1 && !isVerified ? "done" : ""}`}
      >
        {reservationId == 7 && <span style={{ fontSize: "12px" }}>({staticDocData.StateGovernmentEmployees.DocumentDetail})</span>}
      </Typography>}
      {DocumentId == 17 && <Typography
        className={`${classes.docNameTxt} 
        ${isUploaded === 1 && isVerified ? "verified" : ""}
        ${isUploaded === 1 && !isVerified ? "done" : ""}`}
      >
        {/* {reservationId == 1 && <span style={{ fontSize: "12px" }}>{staticDocData.General.DocumentDetail}</span>} */}
      </Typography>}
      {DocumentId == 17 && <Typography
        className={`${classes.docNameTxt} 
        ${isUploaded === 1 && isVerified ? "verified" : ""}
        ${isUploaded === 1 && !isVerified ? "done" : ""}`}
      >
        {/* {(reservationId == (2 || 3 || 4 || 5)) && <span style={{ fontSize: "12px" }}>{staticDocData.OtherCaste.DocumentDetail}</span>} */}
      </Typography>}
      {DocumentId == 8 && <Typography
        className={`${classes.docNameTxt} 
        ${isUploaded === 1 && isVerified ? "verified" : ""}
        ${isUploaded === 1 && !isVerified ? "done" : ""}`}
      >
        {/* {(reservationId == 8) && <span style={{ fontSize: "12px" }}>({staticDocData.Journalist.DocumentDetail}){" "}</span>} */}
        {/* <CustomTooltip
          arrow
          enterTouchDelay={0}
          title={
            <DialogContent>
              <Typography className={classes.tooltipTittle}>
              {staticDocData.Journalist.DocumentDetail}
              </Typography>
            </DialogContent>
          }
        >
          <Typography
            className={`${classes.docNameTxt} 
            ${isUploaded === 1 && isVerified ? "VerifiedHoverTxt" : ""}
            ${isUploaded === 1 && !isVerified ? "DoneHoverTxt" : "VerifiedHoverTxt"}
            ${isPaymentDone === 1} ? VerifiedHoverTxt : ""`}
          >
            {t("Know more")}
          </Typography>
        </CustomTooltip> */}
      </Typography>}
      {DocumentId == 13 && <Typography
        className={`${classes.docNameTxt} 
        ${isUploaded === 1 && isVerified ? "verified" : ""}
        ${isUploaded === 1 && !isVerified ? "done" : ""}
       `}
      >
        {/* {(reservationId == 6) && <span style={{ fontSize: "12px" }} >({staticDocData.ReligiousMinorites.DocumentDetail}){" "}</span>} */}
      </Typography>}
    </>
  );
};

export default SampleUploadTooltip;
