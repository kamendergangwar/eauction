import {
    Box,
    Button,
    DialogContent,
    Grid,
    Tooltip,
    Typography,
    withStyles,
} from "@material-ui/core";
import {
    DownloadIcon,
    EditWhiteICon,
    InfoIcon,
    VerifiedDocIcon,
} from "../SvgIcons/SvgIcons";
import { DocumentUploadBoxStyle } from "./DocumentUploadBox.styles";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useEffect, useState } from "react";
import { ApiEndPoint } from "../../../utils/Common";
import Loading from "../Loading/Loading";

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

const ErrorTooltip = withStyles((theme) => ({
    arrow: {
        color: 'rgba(200, 0, 0, 0.87)',
    },
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(200, 0, 0, 0.87)',
        boxShadow: "0 0 20px rgba(223 19 19 / 50%)",
        fontSize: 11,
    },
}))(Tooltip);

const CancelDocumentBox = (props) => {
    const { documentCardList, setSelectedDialog, setDocumentDialogBoxOpen, inVerication, setAllDocVerified } = props;
    const classes = DocumentUploadBoxStyle();
    const { t } = useTranslation("DocumentsPageTrans");
    const history = useHistory();
    const dispatch = useDispatch();
    const [downloadLoading, setdownloadLoading] = useState(false)
    const [docData, setDocData] = useState([]);

    const handleClickOpen = (name, key) => {
        let docId = name.DocumentId;
        setSelectedDialog(docId);
        setDocumentDialogBoxOpen(true);
    };

    const downloadSampleFile = (docElement) => {
        setdownloadLoading(true);
        fetch(`${ApiEndPoint}/DocumentDownload/${docElement.DocumentId}`, {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("jwtToken"),
            },
        }).then((response) => response.blob()).then((blob) => {
            setdownloadLoading(false);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${docElement.DocumentName}.pdf'`;
            document.body.append(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(link.href), 300);
        }).catch(error => {
            setdownloadLoading(false);
            alert(error, "error");
        });
    };

    useEffect(() => {
        if (documentCardList) {
            const updatedData = documentCardList.map((item) => {
                const IsUploaded = 1;
                const isResubmitted = item.IsResubmitted;
                const IsApproved = item.VerifiedFlag == 1;
                const IsRejected = item.VerifiedFlag == 2;
                const DocVerificationMsg = item.VerifiedReason;
                return { ...item, isResubmitted, IsApproved, IsRejected, DocVerificationMsg, IsUploaded };
            });
            const allDocVerified = updatedData.every(item => item.IsApproved);
            setDocData(updatedData);
            setAllDocVerified(allDocVerified);
        }
    }, [documentCardList]);

    const truncateContent = (content, charLimit) => {
        if (content.length > charLimit) {
            return content.slice(0, charLimit) + '...';
        }
        return content;
    };

    return (
        <Grid container justifyContent="space-around">
            {downloadLoading && <Loading isOpen={downloadLoading} />}
            {docData.map((docElement, index) => {
                return (
                    <Grid
                        item
                        xs={12}
                        md={4}
                        sm={6}
                        key={index}
                        className={classes.docsBox}
                        style={{ padding: 8 }}
                    >
                        <Box className={`${classes.docsCard} ${docElement.IsUploaded === 1 && inVerication == false ? "done" : ""}
                                        ${docElement.IsUploaded === 1 && docElement.IsApproved == true ? "verified" : ""}
                                        ${inVerication == true && docElement.IsApproved == false && docElement.IsRejected == false ? "disable" : ""}
                                        ${docElement.IsApproved == false && docElement.IsRejected == true ? "rejected" : ""}`}
                            style={{ width: "100%", justifyContent: "space-evenly" }}
                        >
                            {docElement.IsUploaded === 1 && !docElement.IsApproved && (
                                <Box className={classes.tikIconBox}>
                                    <CheckCircleIcon
                                        fontSize="small"
                                        style={{ color: "#FFFFFF" }}
                                    />
                                </Box>
                            )}

                            <Box className={classes.downloadBtnArea}>
                                {(docElement.IsUploaded === 0 && docElement.Sample) && (
                                    <Box>
                                        <Button
                                            startIcon={<DownloadIcon />}
                                            color="primary"
                                            className={classes.downloadBtn}
                                            onClick={() => downloadSampleFile(docElement)}
                                        >
                                            {t("sampleTxt")}
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                            <Box>
                                <Typography className={`${classes.docNameTxt} ${docElement.IsUploaded === 1 && inVerication == false ? "done" : ""}
                                            ${docElement.IsUploaded === 1 && docElement.IsApproved ? "verified" : ""}`} >
                                    {docElement.DocumentName}
                                    {docElement.IsRequired == 1 && (
                                        <span style={{ color: "rgb(249, 61, 92)" }}> *</span>
                                    )}
                                    {docElement.docInfo && (
                                        <CustomTooltip
                                            enterTouchDelay={0}
                                            title={
                                                <DialogContent className={classes.castDropDown}>
                                                    <span
                                                        style={{ fontSize: 15, lineHeight: 1.2 }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: docElement.docInfo,
                                                        }}
                                                    />
                                                </DialogContent>
                                            }
                                            style={{
                                                display: "inline-block",
                                                paddingLeft: "12px",
                                                lineHeight: "10px",
                                            }}
                                        >
                                            <Typography className={classes.toolTipTittle}>
                                                <InfoIcon
                                                    className={`${classes.infoToolTipIcon} ${docElement.IsUploaded === 1 && inVerication == false ? "done" : ""
                                                        } ${docElement.IsUploaded === 1 && docElement.IsApproved
                                                            ? "verified"
                                                            : ""
                                                        }`}
                                                />
                                            </Typography>
                                        </CustomTooltip>
                                    )}
                                </Typography>
                            </Box>
                            <Box>
                                {docElement.IsApproved && docElement.IsUploaded === 1 ? (
                                    <Box className={classes.verifiedBox}>
                                        <VerifiedDocIcon />
                                        <span>{t("docVerifiedTxt")}</span>
                                    </Box>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disableRipple
                                        className={`${classes.docsBtn} ${docElement.IsUploaded === 1 && inVerication == false ? "done" : ""
                                            }`}
                                        size="small"
                                        startIcon={
                                            docElement.IsUploaded === 0 && inVerication == false ||
                                                docElement.IsResubmitted == 1 ? (
                                                ""
                                            ) : (
                                                <EditWhiteICon fontSize="small" />
                                            )
                                        }
                                        onClick={() => handleClickOpen(docElement, index)}
                                        disabled={(inVerication &&
                                            docElement.IsRejected == false) ||
                                            docElement.IsResubmitted == 1
                                        }
                                    >
                                        {docElement.IsResubmitted != 1 && (
                                            <span className={classes.docBtnTxt}>
                                                {!docElement.IsRejected
                                                    ? docElement.IsUploaded === 0 && inVerication == false
                                                        ? t("addBtn")
                                                        : t("Verification in process")
                                                    : t("documentsForm.reuploadTxt")}
                                            </span>
                                        )}
                                        {docElement.IsResubmitted == 1 && (
                                            <span
                                                className={classes.docBtnTxt}
                                                style={{ color: "black" }}
                                            >
                                                {t("reUploadSuccessTxt")}
                                            </span>
                                        )}
                                    </Button>
                                )}
                            </Box>
                            {/* <Box>
                                {docElement.DocumentId != "22" &&
                                    docElement.DocumentId != "23" && (
                                        <Typography
                                            className={`${classes.docNameTxt} ${docElement.IsUploaded === 1 ? "done" : ""
                                                } ${docElement.IsUploaded === 1 && docElement.IsApproved
                                                    ? "verified"
                                                    : ""
                                                }`}
                                            style={{
                                                fontWeight: 500,
                                                margin: "20px,0,0,0",
                                                fontSize: 11,
                                            }}
                                        >
                                            {t("selfAttestedTxt")}
                                        </Typography>
                                    )}
                            </Box> */}
                            {docElement.IsRejected && (
                                <Box mt={1} color="black">
                                    {t("rejectionReasonTxt")}{" "}
                                    <ErrorTooltip title={docElement.DocVerificationMsg} arrow placement="bottom-start">
                                        <span style={{ fontWeight: "700" }}>
                                            {truncateContent(docElement.DocVerificationMsg, 50)}
                                        </span>
                                    </ErrorTooltip>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                );
            })}
        </Grid >
    );
};

export default CancelDocumentBox;
