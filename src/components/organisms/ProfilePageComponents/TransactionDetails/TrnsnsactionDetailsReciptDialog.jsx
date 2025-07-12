import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, Hidden, IconButton, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { CloseIcon, DownloadPrimaryIcon, MenuTransactionDtlsIcon, TransSuccessIcon } from '../../../atoms/SvgIcons/SvgIcons'
import moment from 'moment'
import { TransactionDetailsStyles } from './TransactionDetails.style'
import { useTranslation } from 'react-i18next'
import ReciptHeader from "../../../../assets/images/New_Header_Image.png";
import Loading from '../../../atoms/Loading/Loading'

const TrnsnsactionDetailsReciptDialog = (props) => {
  const { open, handleClose, pdfLoading, numberWithCommas, getTransactionDetailsPdf, isSuccessReciptDetail, applicationReciptDetail } = props
  const classes = TransactionDetailsStyles();
  const { t } = useTranslation("ProfilePageTrans");
  const [transDetails, setTransDetails] = useState([])
  const [transnSummary, setTransnSummary] = useState([])

  useEffect(() => {
    if(isSuccessReciptDetail && applicationReciptDetail?.transDetail) {
      setTransDetails(applicationReciptDetail.transDetail)
    }
    if(isSuccessReciptDetail && applicationReciptDetail.transDetail?.projects) {
      setTransnSummary(applicationReciptDetail.transDetail.projects)
    }
  }, [applicationReciptDetail,isSuccessReciptDetail])
  
  return (
    <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open || false}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        className={classes.modelBoxContainer}
      >
        <DialogTitle id="max-width-dialog-title">
          {pdfLoading && (
            <Loading isOpen={pdfLoading} />
          )}
          <Box className={classes.cardHeader}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={6}>
              <Box className="headerleft">
                  <IconButton aria-label="delete" onClick={handleClose} className={classes.modalCloseIconBtn}>
                    <CloseIcon
                      className={classes.backIcon}
                    />
                  </IconButton>
                  <MenuTransactionDtlsIcon />
                  <Typography className={classes.TranIDTxt}>
                     {t(
                      "transactionDetails.transactionCards.transactionDetailsModel.receiptNumber"
                    )}{" "}
                    :{" "}
                    <span className={`${classes.primaryColor} IDValue`}>
                    {transDetails.projects ? `${transDetails.projects[0]?.FlatDetails.SBIReferenceNumber}` : "--"}
                  </span>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className={classes.headerRight}>
                  <Button
                    className={classes.downloadBtn}
                    startIcon={<DownloadPrimaryIcon />}
                    onClick={() => getTransactionDetailsPdf(transDetails)}
                  >
                    {t(
                      "transactionDetails.transactionCards.transactionDetailsModel.downloadReceipt"
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box className={classes.cardBody} marginX={5}>
              <Box className={classes.schemeBody}>
                <Grid container direction="column"
                  justifyContent="center"
                  alignItems="center">
                  <Grid item>
                    <img
                      src={ReciptHeader}
                      alt={"CIDCO Logo"}
                      width="100%"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{color:"#00437e",padding:"1rem 0"}}> Payment Receipt</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justify="space-between"
              >
                <Grid item xs={3}>
                <Typography className={classes.paidAmountTxt}>
                    {t("Applicant Id")}{" "}
                    :{" "}
                  </Typography>
                  <Typography className={classes.paidAmountVal} style={{textAlign:"left"}}>
                    {transnSummary[0]?.ApplicantId}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography className={classes.paidAmountTxt}>
                    {t("Applicant Name")}{" "}
                    :{" "}
                  </Typography>
                  <Typography className={classes.paidAmountVal} style={{textAlign:"left"}}>
                  {transnSummary[0]?.FirstName}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Box className={classes.bankDetails}>
                    <Typography className="fromTxt">
                      {" "}
                      {t(
                        "transactionDetails.transactionCards.transactionDetailsModel.sentFromLabel"
                      )}{" "}
                      :
                    </Typography>

                    <div className="bankLogoDiv" style={{padding:0}}>
                      <img
                        src={transDetails.BankIcon} alt="Bank Logo"
                        className={classes.bankLogo}
                        style={{width: "5rem"}}
                      />
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                    <Typography className={classes.paidAmountTxt}>
                      {t(
                        "transactionDetails.transactionCards.transactionDetailsModel.paidAmountLabel"
                      )}{" "}
                      :{" "}
                    </Typography>
                    <Typography className={classes.paidAmountVal} style={{textAlign:"left"}}>
                      ₹ {transDetails.TotalAmountPaid ? numberWithCommas(transDetails.TotalAmountPaid) : "--"}
                    </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box marginX={6.5}>
              <Typography variant='h6' style={{color:"#00437e"}}>Booking Details</Typography>
            </Box>
            {transnSummary.map((item, index) => (
              <Box
                className={classes.paymentDetailsCard}
                key={index}
                style={{marginLeft: "50px",marginRight: "50px"}}
              >
                <Box className={classes.paymentDetails}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} className="secDivider" style={{paddingTop:10}}>
                      <Box className={classes.paymentInfo}>
                        <Typography variant="h4" className={classes.paymentTitle} style={{color: "#014b9b",fontSize:"1rem",marginBottom:"8px"}}>
                          {transnSummary[0]?.ProjectName}
                        </Typography>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs="auto" md={3}>
                            <Typography className="infoLabel">
                              {t("transactionDetails.transactionCards.transactionDetailsModel.transactionlabel")}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs={12} md={8}>
                            <Typography className="infoValue" style={{ textAlign: "left" }}>
                              {transDetails.TransactionId ? `${transDetails.TransactionId}` : "--"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs="auto" md={3}>
                            <Typography className="infoLabel">
                              {t(
                                "transactionDetails.transactionCards.transactionDetailsModel.apnNoLabel"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs={12} md={8}>
                            <Box style={{width: "8rem"}} alignSelf="center">
                              <img
                                src={transDetails.barcodeFile} alt="Barcode"
                                style={{width:"100%"}}
                                className={classes.bankLogo}
                              />
                              <Typography className="infoValue" style={{ textAlign: "center",fontWeight:"bold" }}>
                                {transDetails.UniqId ? `#${transDetails.UniqId}` : "--"}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs="auto" md={3}>
                            <Typography className="infoLabel">
                              {t(
                                "Flat No"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs={12} md={8}>
                            <Typography className="infoValue" style={{ textAlign: "left" }}>
                            {item.FlatDetails.FlatNo ? `${item.FlatDetails.FlatNo}` : "--"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs="auto" md={3}>
                            <Typography className="infoLabel">
                              {t(
                                "Tower No"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs={12} md={8}>
                            <Typography className="infoValue" style={{ textAlign: "left" }}>
                            {item.FlatDetails.Wing ? `${item.FlatDetails.Wing}` : "--"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs="auto" md={3}>
                            <Typography className="infoLabel">
                              {t(
                                "transactionDetails.transactionCards.transactionDetailsModel.categorylabel"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs={12} md={8}>
                            <Typography className="infoValue" style={{ textAlign: "left" }}>
                              {item.ReservationCategoryName ? `${item.ReservationCategoryName}` : "--"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={classes.paymentSummary} style={{padding:0}}>
                        <Typography variant="h4" className={classes.paymentTitle} style={{color: "#014b9b",fontSize:"1rem",marginBottom:"8px"}}>
                          {t("transactionDetails.transactionCards.transactionDetailsModel.paymentSummaryLabel")}
                        </Typography>
                        <Grid container spacing={3} alignItems="center" justify="space-between">
                          <Grid item xs="auto" sm={5}>
                            <Typography className="infoLabel">
                              {t(
                                "Booking Fee"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs sm={6}>
                            <Box textAlign="right">
                              <Typography className={`paymentValue ${transDetails.LoanApplied === 1 ? "loanEmd" : ""}`}>
                                ₹ {item.Emd ? numberWithCommas(item.Emd) : "--"}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Grid container spacing={3} alignItems="center" justify="space-between">
                          <Grid item xs="auto" sm={5}>
                            <Typography className="infoLabel">
                              {t(
                                "transactionDetails.transactionCards.transactionDetailsModel.GSTLabel"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs sm={6}>
                            <Box textAlign="right">
                              <Typography className="paymentValue">
                                ₹ {item.Gst ? numberWithCommas(item.Gst) : "--"}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Box className="totalAmoutCon" style={{backgroundColor:"#f2f9ff",borderColor:"#45a1d6"}}>
                          <Grid container spacing={3} alignItems="center" justify="space-between">
                            <Grid item xs="auto" sm={5}>
                              <Typography className="totalLabel">
                                {t(
                                  "transactionDetails.transactionCards.transactionDetailsModel.totalLabel"
                                )}
                              </Typography>
                            </Grid>
                            <Hidden xsDown>
                              <Grid item xs="auto">
                                <Box className="colonTxt">:</Box>
                              </Grid>
                            </Hidden>
                            <Grid item xs sm={6}>
                              <Box textAlign="right">
                                <Typography className="totalValue" style={{color:'#0151cc'}}>
                                  ₹ {item.TotalAmount ? numberWithCommas(item.TotalAmount) : "--"}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            ))}
            {isSuccessReciptDetail && transnSummary.length == 0 && <h1 className={classes.notFound}>{t("transactionDetails.noTransSummryDataErrorMsg")}</h1>}
          </Box>
        </DialogContent>
      </Dialog>
  )
}

export default TrnsnsactionDetailsReciptDialog