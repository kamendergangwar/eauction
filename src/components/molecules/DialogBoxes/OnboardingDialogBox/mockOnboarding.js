import { ActiveAllotmentLetterImage, ActivePayApplicationFeeImage, ActiveProveEligibilityImage, ActiveSelectFlatImage, ActiveSignUpImage, ActiveUploadDocumentImage, AllotmentLetterImage, ApplyDetailImage, BookFlatImage, DocumentVerificationImage, LoiImage, PayApplicationFeeImage, ProveEligibilityImage, SelectFlatImage, UploadDocumentImage } from './OnboardingSvgImages';

export const getOnboardingSteps = activeStep =>{
    
    let titleImageStyle = {width:'110px',height:"106px"}
    return [
        {
            step: 1,
            name: 'Prove your Eligibility',
            icon: activeStep == 0 ? <ActiveProveEligibilityImage style={titleImageStyle} /> : <ProveEligibilityImage style={titleImageStyle} />,
            description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here`
        },
        {
            step: 2,
            name: 'Upload self attested documents & affidavits for verification',
            icon: activeStep == 1 ? <ActiveUploadDocumentImage style={titleImageStyle} /> : <UploadDocumentImage style={titleImageStyle} />,
            description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here`
        },
        {
            step: 3,
            name: 'Pay Application Fee',
            icon: activeStep == 2 ? <ActivePayApplicationFeeImage style={titleImageStyle} /> : <PayApplicationFeeImage style={titleImageStyle} />,
            description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here`
        },
        {
            step: 4,
            name: 'Select your Home & Pay booking amount',
            icon: activeStep == 3 ? <ActiveSelectFlatImage style={titleImageStyle} /> : <SelectFlatImage style={titleImageStyle} />,
            description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here`
        },
        {
            step: 5,
            name: 'Collect your allotment letter',
            icon: activeStep == 4 ? <ActiveAllotmentLetterImage style={titleImageStyle} /> : <AllotmentLetterImage style={titleImageStyle} />,
            description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here`
        },
    ];
}