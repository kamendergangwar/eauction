import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Link
} from '@material-ui/core';
import * as yup from 'yup';
import UploadDoc from '../../../../../assets/SvgIcons/UploadDoc.svg';
import uploadicon from '../../../../../assets/SvgIcons/uploadicon.svg';
import { FileUploadIcon } from '../../../../atoms/SvgIcons/SvgIcons';
import { BorderStyle } from '@material-ui/icons';
import { useHistory } from 'react-router-dom'

const validationSchema = yup.object().shape({
  aadharCard: yup
    .string()
    .required('Applicant AadharCard is required')
    .matches(/^[0-9]{12}$/, 'Aadhar Card must be 12 digits'),
  panCard: yup
    .string()
    .required('Applicant PanCard is required')
    .matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, 'Invalid PAN format'),
  profileImage: yup.mixed().required('Applicant Profile Image is required'),
  acknowledgment: yup.boolean().oneOf([true], 'You must acknowledge this field'),
});

const initialValues = {
  aadharCard: '',
  panCard: '',
  profileImage: null,
  acknowledgment: false,
};

const UploadDocument = () => {

  const history = useHistory();
  const handleSubmit = (values) => {
    // Simulate uploading files
    console.log('Uploading files...', values);
    history.push('/bidhome');
  };

  return (
    <Formik initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      <Form>

        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', alignContent: 'space-between', borderRadius: 4, border: 4, background: '#FDFCFF', borderStyle: 'dashed', borderColor: "#F1F0F4" }}>
            <Field name="aadharCard">
              {({ field, form }) => (
                <Box>
                  <img src={UploadDoc} alt="Logo" />

                  <input
                    {...field}
                    type="file"
                    id="aadharCard"
                    style={{ display: 'none' }}
                    accept=".jpg, .jpeg, .png, .pdf"
                    onChange={(event) => {
                      form.setFieldValue(field.name, event.currentTarget.files[0]);
                    }}
                  />
                  {form.errors.aadharCard && form.touched.aadharCard && (
                    <div>{form.errors.aadharCard}</div>
                  )}
                </Box>
              )}
            </Field>
            <Box> <Typography variant='h6' fontWeight={500} fontSize={16} ml={2}>Applicant Aadhar card</Typography>
              <Typography variant='subtitle2' fontWeight={500} fontSize={12} ml={2}>
                You can upload <Typography fontWeight={600} component={'span'}>JPG</Typography> or <Typography fontWeight={600} component={'span'}>PNG</Typography> documents, under <Typography fontWeight={600} component={'span'}>2MB</Typography> in size.<Link href="#" underline="always">
                  {'Get Sample Doc.'}
                </Link>
              </Typography>
              <Typography variant='body2' fontSize={14} ml={2} mt={1}>Status : Pending</Typography>
            </Box>
            <Box sx={{ mt: 2, ml: 2, mr: 2 }}>
              <Button endIcon={<FileUploadIcon />} variant='outlined'>Upload</Button>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignContent: 'space-between', borderRadius: 4, border: 4, mt: 1, background: '#FDFCFF', borderStyle: 'dashed', borderColor: "#F1F0F4" }}>
            <Field name="pan">
              {({ field, form }) => (
                <Box>
                  <img src={UploadDoc} alt="Logo" />

                  <input
                    {...field}
                    type="file"
                    id="pan"
                    accept=".jpg, .jpeg, .png, .pdf"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      form.setFieldValue(field.name, event.currentTarget.files[0]);
                    }}
                  />
                  {form.errors.pan && form.touched.pan && (
                    <div>{form.errors.pan}</div>
                  )}
                </Box>
              )}
            </Field>
            <Box> <Typography variant='h6' fontWeight={500} fontSize={16} ml={2}>Applicant Pan card</Typography>
              <Typography variant='subtitle2' fontWeight={500} fontSize={12} ml={2}>
                You can upload <Typography fontWeight={600} component={'span'}>JPG</Typography> or <Typography fontWeight={600} component={'span'}>PNG</Typography> documents, under <Typography fontWeight={600} component={'span'}>2MB</Typography> in size.<Link href="#" underline="always">
                  {'Get Sample Doc.'}
                </Link>
              </Typography>
              <Typography variant='body2' fontSize={14} ml={2} mt={1}>Status : Pending</Typography>
            </Box>
            <Box sx={{ mt: 2, ml: 2, mr: 2 }}>
              <Button variant='outlined' endIcon={<FileUploadIcon />}>Upload</Button>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignContent: 'space-between', borderRadius: 4, border: 4, mt: 1, background: '#FDFCFF', borderStyle: 'dashed', borderColor: "#F1F0F4" }}>
            <Field name="profileimage">
              {({ field, form }) => (
                <Box>
                  <img src={UploadDoc} alt="Logo" />

                  <input
                    {...field}
                    type="file"
                    id="profileimage"
                    accept=".jpg, .jpeg, .png, .pdf"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      form.setFieldValue(field.name, event.currentTarget.files[0]);
                    }}
                  />
                  {form.errors.profileimage && form.touched.profileimage && (
                    <div>{form.errors.profileimage}</div>
                  )}
                </Box>
              )}
            </Field>
            <Box> <Typography variant='h6' fontWeight={500} fontSize={16} ml={2}>Applicant Profile Image</Typography>
              <Typography variant='subtitle2' fontWeight={500} fontSize={12} ml={2}>
                You can upload <Typography fontWeight={600} component={'span'}>JPG</Typography> or <Typography fontWeight={600} component={'span'}>PNG</Typography> documents, under <Typography fontWeight={600} component={'span'}>2MB</Typography> in size.<Link href="#" underline="always">
                  {''}{'Get Sample Doc.'}
                </Link>
              </Typography>
              <Typography variant='body2' fontSize={14} ml={2} mt={1}>Status : Pending</Typography>
            </Box>

            <Box sx={{ mt: 2, ml: 2, mr: 2 }}>
              <Button endIcon={<FileUploadIcon />} variant='outlined'>Upload</Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox name="acknowledgment" color="primary" />}
              label="I certify that all the documents uploaded are true and correct to best of my knowledge. I give my consent to the use of the  document for verification"
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Button type="submit" variant="contained" background='linear-gradient( #2B51D6, #119BF7)'>
                  Save & Continue
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Formik>

  );
};

export default UploadDocument;
