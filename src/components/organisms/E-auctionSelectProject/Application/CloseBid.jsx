import React, { useRef } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Grid, Box, Typography, Hidden, DialogContent, DialogActions, InputAdornment } from '@material-ui/core';
import FormControl from '../../../molecules/FormControl/FormControl';
import { ToWords } from "to-words";
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { ApplyProjectSelector, clearSaveDeclerationState, saveDecleration } from '../../../../redux/features/eauction/applyProjectSlice';
import { EauctionSelector, getSingleAuctionProject } from '../../../../redux/features/eauction/eauctionSlice';
import { useEffect } from 'react';
import FormCard from '../../../molecules/Cards/FormCard/FormCard';
import FormTitleBox from '../../../atoms/FormTitleBox/FormTitleBox';
import StepperBar from '../../../atoms/StepperBar/StepperBar';
import { MakePaymentIcon } from '../../../atoms/SvgIcons/SvgIcons';
const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  },
});

const CloseBid = ({ onNext }) => {
  const formikRef = useRef();
  useEffect(() => {
    dispatch(getSingleAuctionProject());
  }, [])

  const { singleprojectData } = useSelector(EauctionSelector);
  const { isFetchingSaveDecleration,
    isSuccessSaveDecleration,
    isErrorSaveDecleration,
    saveDeclerationData,
    errorMessageSaveDecleration } = useSelector(ApplyProjectSelector);


  const initialValues = {
    tenderPrice: singleprojectData ? singleprojectData?.auctionBasePrice : 0,
    bidAmount: '',
    finalAmount: '',
    finalAmountInWords: '',
  };


 
  const validationSchema = yup.object().shape({
    bidAmount: yup.number()
      .min(initialValues.tenderPrice, `Bid amount must be at least ${initialValues.tenderPrice}`)
      .required('Bid amount is required'),
    // finalAmount: yup.number()
    //   .min(1, 'Final amount must be at least 1')
    //   .required('Final amount is required'),
    // finalAmountInWords: yup.string().required('Final amount in words is required'),
  });
  const dispatch = useDispatch();
  const onSubmit = (values, { setSubmitting }) => {
    const reqdata = {
      type: "FinantialBid",
      FinBidAmount: values.bidAmount
    }
    dispatch(saveDecleration(reqdata))
    console.log(values);
  };
  useEffect(() => {
    if (isSuccessSaveDecleration) {
      //dispatch(getProjectProgress());
      //window.location.reload();
      onNext();
    }
    dispatch(clearSaveDeclerationState());

  }, [isSuccessSaveDecleration])
  const amountToWords = (amount_val) => {
    if (amount_val) {
      return toWords.convert(amount_val);
    } else return ""
  };

  const numberWithCommas = (amount_val) => {
    return isNaN(amount_val)
      ? "0"
      : amount_val.toString().split(".")[0].length > 3
        ? amount_val
          .toString()
          .substring(0, amount_val.toString().split(".")[0].length - 3)
          .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
        "," +
        amount_val
          .toString()
          .substring(amount_val.toString().split(".")[0].length - 3)
        : amount_val.toString();
  };

  return (
    <FormCard>
      
      <Hidden smDown>
        <FormTitleBox
          title="Submit Close Bid"
          // backUrl="back"
          titleIcon={<MakePaymentIcon fontSize="large" />}
        />
      </Hidden>
      <Hidden mdUp>
        <StepperBar
          callingForMobileIs={true}
          title="Submit Close Bid"
        // backUrl="/select-projects"
        />
      </Hidden>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formikRef}
        enableReinitialize
      >
        {({ submitForm, setFieldValue, isSubmitting, values }) => (
          <Form noValidate autoComplete="off">
            <DialogContent style={{ paddingTop: 50, paddingBottom: 50 }} dividers>
              <Grid container justifyContent='center' spacing={2}>
                <Grid container alignItems='center' xs={8}  >
                  {/* <FormControl
                  control='input'
                  name="tenderPrice"
                  id="tenderPrice"
                  label="Tender (Base) Price"
                  variant="outlined"
                  type='text'
                  size='small'
                  disabled
                /> */}
                  <Typography variant='h6' component='span'>Tender (Base) Price :&nbsp;</Typography>
                  <Typography variant='h5' component='span'>₹ {numberWithCommas(initialValues.tenderPrice)} </Typography>
                </Grid>
                <Grid item xs={8}>
                  <FormControl
                    control='input'
                    name="bidAmount"
                    id="bidAmount"
                    label="Enter Bid Amount"
                    variant="outlined"
                    type='number'
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><b>₹</b></InputAdornment>,
                    }}
                  />
                </Grid>
                {/* <Grid item xs={5} style={{ marginRight: 10 }}>
                <FormControl
                  control='input'
                  name="finalAmount"
                  id="finalAmount"
                  label="Final Amount"
                  variant="outlined"
                  type='number'
                  size='small'
                  value={values.bidAmount}
                  disabled
                />
              </Grid>
              <Grid item xs={5}>
                <FormControl
                  control='input'
                  name="finalAmountInWords"
                  id="finalAmountInWords"
                  label="Final Amount In Words"
                  variant="outlined"
                  size='small'
                  type='text'
                  value={amountToWords(values.bidAmount)}
                />
              </Grid> */}
                <Grid item xs={8}>
                  {values.bidAmount &&
                    <Grid container >
                      <Grid item xs={3}>
                        <Typography>Amount In words :</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <span>{amountToWords(values.bidAmount)}</span>
                      </Grid>
                    </Grid>}
                </Grid>
                <Grid xs={8}>
                  <Alert severity='info'><strong>Note:</strong> Enter close bid amount greater than base price.</Alert>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              {/* <Button variant="outlined" color="primary" style={{ marginRight: '5px' }}>
                Back
              </Button> */}
              <Button type="submit" variant="contained" color="primary">
                Bid And Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </FormCard>
  );
};

export default CloseBid;
