import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconTitle from "../../../../atoms/IconTitle/IconTitle";
import { useHistory, useLocation } from "react-router-dom";
import { IncomeDetailsIcon, ApplicationEditIcon } from "../../../../atoms/SvgIcons/SvgIcons";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { ApplicationDetailsViewStyles } from "../../ApplicationDetailsView.styles";
import Image from "../../../../../assets/Profile.jpg";
import { getDocumentsList, docDeclarationSelector } from "../../../../../redux/features/file/DocDeclarationSlice"; 
import PngIcon from "../../../../../assets/pngIcon.png";
import JpgIcon from "../../../../../assets/jpgIcon.png";
import PdfIcon from "../../../../../assets/pdfIcon.png";
import othericon from "../../../../../assets/otherFile.png";
import Hidden from "@material-ui/core/Hidden";
import { IconButton } from "@material-ui/core";

const UploadedDocuments = (props) => {
    const { width, applicantData } = props;
    const { t } = useTranslation("MyApplicationDetailsPageTrans");
    const classes = ApplicationDetailsViewStyles();
    const [myDocumentRecords, setMyDocumentRecords] = React.useState([]);
    const currentPathName = useLocation().pathname;
    const history = useHistory();
    const dispatch = useDispatch();
    
    const {
        isFetchingGetDocsList,
        isSuccessResGetDocsList,
        getDocsListData
    } = useSelector(docDeclarationSelector);
    
    useEffect(() => {
        dispatch(getDocumentsList());
    }, [t]);
    
    
    useEffect(() => {
        if (isSuccessResGetDocsList && getDocsListData) {
            let set_val = false;
            let documentObject = [];
            for (let u = 0; u < getDocsListData.length; u++) {
                const element = getDocsListData[u];
                if (element.IsUploaded === 0) {
                    set_val = true;
                    break;
                } else {
                    set_val = false;
                }
            }
            getDocsListData.forEach(element => {
                let new_obj = {
                    ...element,
                    imageIs: "jpg" === element.DocumentValue.split('.').pop() || "jpeg" === element.DocumentValue.split('.').pop() || "png" === element.DocumentValue.split('.').pop() ? true : false,
                    fileType: element.DocumentValue.split('.').pop()
                }
                documentObject.push(new_obj);
            });
            setMyDocumentRecords(documentObject);
        }
    }, [isSuccessResGetDocsList, getDocsListData]);

    return (
        <Box className={classes.sectionCard}>
            <Box className={classes.secCardHeader}>
                <Grid container alignItems="center">
                    <Grid item md xs={12}>
                        <IconTitle
                            icon={<IncomeDetailsIcon fontSize="large" />}
                            title={t("myDocumentsDetails.title")}/>
                    </Grid>
                    <Grid item md="auto" xs={12}>
                        {currentPathName == "/application-details" && (<Button color="primary" variant="outlined" className={classes.editIconBtn} startIcon={<ApplicationEditIcon />} onClick={() => history.push("/upload-documents")}>{t("incomeDetails.editButtonText")}</Button>)}
                    </Grid>
                </Grid>
            </Box>
            <Box className={classes.secCardContent}>
                {myDocumentRecords.length > 0 ? (myDocumentRecords.map((element, i) => (
                    <Box className={classes.tableRow} key={i}>
                        <Grid container alignItems="center">
                            <Grid item md="auto">
                                {element.fileType === "png" ? (
                                    <img src={PngIcon} alt={element.DisplayName} className={classes.fileFormatIcon} />
                                ) : (element.fileType === "pdf" ? (
                                    <img src={PdfIcon} alt={element.DisplayName} className={classes.fileFormatIcon} />
                                ) : (element.fileType === "jpeg" || element.fileType === "jpg" ? (
                                    <img src={JpgIcon} alt={element.DisplayName} className={classes.fileFormatIcon} />
                                ) : (<img src={othericon} alt={element.DisplayName} className={classes.fileFormatIcon} />)))
                                }
                            </Grid>
                            <Grid item md="auto">
                                <Typography className={classes.fullNameCol}>{element.DisplayName}</Typography>
                            </Grid>
                            <Grid item md="auto">
                                <CheckCircleIcon fontSize="small" style={{ color: "#219553", fontSize: "1.5rem", marginLeft: "10px", marginBottom: "-5px" }} />
                            </Grid>
                        </Grid>
                    </Box>
                ))) : (false ? (<h1 className={classes.notFound}>{t("myDocumentSec.documentNotFoundTxt")}</h1>) : false)}
            </Box>
        </Box>
    );
};

export default withWidth()(UploadedDocuments);
