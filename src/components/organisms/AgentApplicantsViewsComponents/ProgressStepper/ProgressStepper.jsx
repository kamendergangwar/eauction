import React from 'react'
import { Step, StepConnector, StepIcon, StepLabel, Stepper, makeStyles, withStyles } from '@material-ui/core';
import { AccountBalance, AccountCircle, Apartment, CategoryOutlined, CheckCircle, CheckCircleOutlined, CreditCard, DescriptionOutlined, EmojiPeople, ExitToApp, GroupAdd, MailOutlined, PaymentOutlined, VerifiedUser } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const ProgressStepper = (props) => {
    const {activeStep} = props
    const { t } = useTranslation("DashboardPageTrans");
    const useStyles = makeStyles({
        root: {
          backgroundColor: '#ccc',
          zIndex: 1,
          color: '#fff',
          display: 'flex',
          overflowX: 'auto',
          width: '100%',
          height: 'min-content',
          alignItems: 'center',
        },
        icon: {
          backgroundColor: '#ccc',
          zIndex: 1,
          color: '#fff',
          width: 50,
          height: 50,
          display: 'flex',
          borderRadius: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        active: {
          backgroundImage:
            'linear-gradient( 136deg, green 0%,green 50%, green 100%)',
          boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        },
        completed: {
          backgroundImage:
            'linear-gradient( 136deg, blue 0%,blue 50%, blue 100%)',
        },
    });

    // Custom StepIcon component
    const classes = useStyles();
    const CustomStepIcon = (props) => {
        const { active, completed } = props;
        const icons = {
            1: <ExitToApp />,
            2: <VerifiedUser />,
            3: <AccountCircle />,
            4: <GroupAdd />,
            5: <CategoryOutlined />,
            6: <DescriptionOutlined />,
            7: <PaymentOutlined />,
            8: <CheckCircleOutlined />,
            9: <Apartment />,
            10: <AccountBalance />,
            11: <EmojiPeople />,
            12: <MailOutlined />,
            13: <CreditCard />,
        };
        return (
            <div
                className={clsx(classes.icon, {
                [classes.active]: active,
                [classes.completed]: completed,
                })}
            >
            {completed && false ? <CheckCircle /> : icons[String(props.icon)]}
          </div>
        );
    };

    CustomStepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
        /**
         * The label displayed in the step icon.
         */
        icon: PropTypes.node,
    };

    const steps = [
        { label: t("userjourney.stepper.stage1.ApplicantSignUp"), icon: 1 },
        { label: "KYC", icon: 2 },
        { label: t("userjourney.stepper.stage2.Personaldetails"), icon: 3 },
        { label: t("userjourney.stepper.stage2.Addapplicant"), icon: 4 },
        { label: t("userjourney.stepper.stage2.CategoryDetails"), icon: 5 },
        { label: t("userjourney.stepper.stage3.DocumentsUpload"), icon: 6 },
        { label: t("userjourney.stepper.stage3.Applicationpayment"), icon: 7 },
        { label: t("userjourney.stepper.stage3.DocumentVerification"), icon: 8 },
        { label: t("userjourney.stepper.stage4.DocumentVerification"), icon: 9 },
        { label: t("userjourney.stepper.stage4.FlatPayment"), icon: 10 },
        { label: t("userjourney.stepper.stage4.LOIGeneration"), icon: 11 },
        { label: t("userjourney.stepper.stage5.AllotmentLetter"), icon: 12 },
        { label: t("userjourney.stepper.stage5.EMIs"), icon: 13 },
    ];

    const NewStepConnector = withStyles({
        alternativeLabel: {
          top: 22,
        },
        active: {
          '& $line': {
            backgroundImage:
              'linear-gradient( 95deg,green 0%,green 50%,green 100%)',
          },
        },
        completed: {
          '& $line': {
            backgroundImage:
              'linear-gradient( 95deg,blue 0%,blue 50%,blue 100%)',
          },
        },
        line: {
          height: 3,
          border: 0,
          backgroundColor: '#eaeaf0',
          borderRadius: 1,
        },
    })(StepConnector);
      
  const activeStepRef = React.useRef(null);

  React.useEffect(() => {
    // Scroll to active step on page load
    if (activeStepRef.current) {
      activeStepRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, []);

  return (
    <div className={classes.root}>
      <Stepper activeStep={Number(activeStep - 1)} alternativeLabel connector={<NewStepConnector />}>
        {steps.map((step, index) => (
          <Step key={index} ref={index-1 === Number(activeStep) ? activeStepRef : null}>
            <StepLabel StepIconComponent={CustomStepIcon} StepIconProps={{ icon: step.icon }}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default ProgressStepper