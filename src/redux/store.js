import { configureStore } from "@reduxjs/toolkit";
import { applicantAuthSlice } from "./features/applicant/ApplicantAuthSlice";
import { verifyAadhaarSlice } from "./features/verify/VerifyAadhaarSlice";
import { masterDataSlice } from "./features/masterdata/MasterDataSlice";
import { applicantSlice } from "./features/applicant/ApplicantSlice";
import { coApplicantSlice } from "./features/coApplicant/CoApplicantSlice";
import { PreferencesSlice } from "./features/preferences/PreferencesSlice";
import { applicantFamilyInfoSlice } from "./features/applicant/ApplicantFamilyInfoSlice";
import { fileUploadSlice } from "./features/file/FileUploadSlice";
import { projectDataSlice } from "./features/projectdata/ProjectDataSlice";
import { applicationSlice } from "./features/application/ApplicationSlice";
import stepperReducer from "./features/stepper/StepperSlice";
import { documentsSlice } from "./features/file/DocumentsSlice";
import { transactionSlice } from "./features/transaction/TransactionSlice";
import { eStampingSlice } from "./features/transaction/EstampingSlice";
import { agentAuthSlice } from "./features/agent/AgentAuthSlice";
import { agentApplicationsSlice } from "./features/agent/AgentApplicationsSlice";
import { agentAnalDashboardSlice } from "./features/agent/AgentAnalDashboardSlice";
import { managerDashboardSlice } from "./features/agent/AgentManagerDashboardSlice";
import { agentProjectDataSlice } from "./features/agent/AgentProjectDataSlice";
import { agentProfileSlice } from "./features/agent/AgentProfileSlice";
import { estampDocumentsSlice } from "./features/file/EstampingDocSlice";
import { docDeclarationSlice } from "./features/file/DocDeclarationSlice";
import { grievanceSlice } from "./features/Grievance/GrievanceSlice";
import { myProfileSlice } from "./features/myProfile/MyProfileSlice";
import { pmaySlice } from "./features/pmayNonPmay/pmayNonPmaySlice";
import { razorpayPaymentGatewaySlice } from "./features/transaction/RazorpayPaymentSlice";
import { helpDeskSlice } from "./features/helpDesk/HelpDeskSlice";
import { agentLeadSlice } from "./features/agent/AgentLeadSlice";
import { ApplicantStepperSlice } from "./features/ApplicantStepper/ApplicantStepperSlice";
import { UnControlledFormSlice } from "./features/uncontrolledForm/UncontrolledForm";
import { NocSlice } from "./features/noc/NocSlice";
import { AgentApplicantsSlice } from "./features/agent/AgentApplicantsSlice";
import { UtilsSlice } from "./features/UttilSlice/genericOtpSlice";
import { CancelBookingSlice } from "./features/cancelBookingSlice/cancelBookingSlice";
import { GenericDocSlice } from "./features/UttilSlice/genericDocumentSlice";
import { GenericReqSlice } from "./features/UttilSlice/genericUpdateReqSlice";
import { GenericTransactionSlice } from "./features/UttilSlice/genericTransactionSlice";
import { NotificationSlice } from "./features/Notifications/notificationSlice";
import { InstallmentSlice } from "./features/installments/installmentSlice";
import { eauctionSlice } from "./features/eauction/eauctionSlice";
import { liveBidSlice } from "./features/eauction/liveBidSlice";
import { bankDetailsSlice } from "./features/UttilSlice/bankDetailSlice";
import { projectStepperSlice } from "./features/eauction/projectStepperSlice";
import { nonIndividualSlice } from "./features/eauction/nonIndividualSlice";
import { applyProjectSlice } from "./features/eauction/applyProjectSlice";
import { dashboardCountSlice } from "./features/dashboard/DashboardCountsSlice";
import { countTimerSlice } from "./features/eauction/countTimerSlice";
import { registrationStepperSlice } from "./features/registration/registrationStepperSlice";
export default configureStore({
  reducer: {
    applicantAuth: applicantAuthSlice.reducer,
    verifyAadhaar: verifyAadhaarSlice.reducer,
    masterData: masterDataSlice.reducer,
    applicant: applicantSlice.reducer,
    coApplicant: coApplicantSlice.reducer,
    preferences: PreferencesSlice.reducer,
    applicantFamilyInfo: applicantFamilyInfoSlice.reducer,
    fileUpload: fileUploadSlice.reducer,
    projectsData: projectDataSlice.reducer,
    application: applicationSlice.reducer,
    stepper: stepperReducer,
    documents: documentsSlice.reducer,
    transaction: transactionSlice.reducer,
    eStamping: eStampingSlice.reducer,
    agentAuth: agentAuthSlice.reducer,
    agentLead: agentLeadSlice.reducer,
    agentApplications: agentApplicationsSlice.reducer,
    agentApplicants: AgentApplicantsSlice.reducer,
    agentAnalDashboard: agentAnalDashboardSlice.reducer,
    agentProjectsData: agentProjectDataSlice.reducer,
    managerDashboard: managerDashboardSlice.reducer,
    agentProfile: agentProfileSlice.reducer,
    estamp: estampDocumentsSlice.reducer,
    docDeclaration: docDeclarationSlice.reducer,
    grievance: grievanceSlice.reducer,
    myProfile: myProfileSlice.reducer,
    PmayNonPmay: pmaySlice.reducer,
    razorpayPaymentGateway: razorpayPaymentGatewaySlice.reducer,
    helpDesk: helpDeskSlice.reducer,
    applicantStepper: ApplicantStepperSlice.reducer,
    uncontrolledForm: UnControlledFormSlice.reducer,
    noc: NocSlice.reducer,
    utils: UtilsSlice.reducer,
    cancelBooking: CancelBookingSlice.reducer,
    genericDocuments: GenericDocSlice.reducer,
    genericRequest: GenericReqSlice.reducer,
    genericTransaction: GenericTransactionSlice.reducer,
    notification: NotificationSlice.reducer,
    installments: InstallmentSlice.reducer,
    eauction: eauctionSlice.reducer,
    liveBid: liveBidSlice.reducer,
    bankDetails:bankDetailsSlice.reducer,
    projectStepper:projectStepperSlice.reducer,
    nonIndividual: nonIndividualSlice.reducer,
    applyProject: applyProjectSlice.reducer,
    dashboardCount: dashboardCountSlice.reducer,
    countTimer:countTimerSlice.reducer,
registrationStepper:registrationStepperSlice.reducer,
    
  },
});
