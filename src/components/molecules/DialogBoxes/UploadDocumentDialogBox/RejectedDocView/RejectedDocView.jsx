import { useTranslation } from "react-i18next";
import { UploadDocumentStyles } from "../UploadDocument.Style";
import UserPDFViewDialogBox from "../../UserPDFViewDialogBox/UserPDFViewDialogBox";
import { useState } from "react";
import { Box, CardMedia } from "@material-ui/core";
import imageGallery from "../../../../../assets/imageGallery.png"
import pdfIcon from "../../../../../assets/pdfIcon.png";
import { Alert, AlertTitle } from "@material-ui/lab";

const RejectedDocview = (props) => {
    const { imageUrl, rejectionReason, isUploaded } = props;
    const classes = UploadDocumentStyles();
    const { t } = useTranslation("DocumentsPageTrans");
    const [docPreviewDialogOpenIs, setDocPreviewDialogOpen] = useState(false);
    const docPreviewDialogCloseFun = () => {
        setDocPreviewDialogOpen(false);
    };
    return (
        <>
            <Box className={classes.rejectSection}>
                <Alert severity="error" style={{ marginBottom: 20 }}
                    action=
                    {imageUrl && <>
                        <CardMedia
                            component="img"
                            className={classes.cover}
                            style={{ height: 90, width: 90, position: "relative", }}
                            image={imageUrl.includes(".pdf") ? pdfIcon : imageUrl}
                            title={'Rejected Document'}
                            referrerPolicy="no-referrer"
                        />
                        <Box className={classes.overlayBtn} onClick={(e) => { setDocPreviewDialogOpen(true); e.stopPropagation() }} >
                            <img src={imageGallery} alt="" />
                            <span>{t("documentsForm.preview")}</span>
                        </Box>
                    </>}>
                    <AlertTitle style={{ fontSize: 14, fontWeight: 500 }}>{t("documentsForm.docRejectTxt")}</AlertTitle>
                    <strong style={{ color: '#f44336' }}>{rejectionReason}</strong>
                </Alert>
                <Alert severity="warning"><strong>{t("documentsForm.noteTxt")}</strong>{t("documentsForm.docRejNoteTxt")}</Alert>
            </Box >
            {imageUrl && <UserPDFViewDialogBox showDownload={false} open={docPreviewDialogOpenIs} onClose={docPreviewDialogCloseFun} fileUrl={imageUrl} />}
        </>
    )
};

export default RejectedDocview;