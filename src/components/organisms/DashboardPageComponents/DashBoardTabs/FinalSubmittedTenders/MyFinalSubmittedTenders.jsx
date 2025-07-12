import { useDispatch, useSelector } from "react-redux";
import { EauctionSelector, clearFinalSubmitTenderData, getFinalSubmitTenderData } from "../../../../../redux/features/eauction/eauctionSlice";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import FinalSubmittedTenderCard from "./FinalSubmittedTenderCard/FinalSubmittedTenderCard";
import moment from "moment";
import Loading from "../../../../atoms/Loading/Loading";
import { Alert, Pagination } from "@material-ui/lab";

const FinalSubmittedTenders = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [page, setPage] = useState(1)
    const perPage = 5;

   
    useEffect(() => {
        dispatch(getFinalSubmitTenderData());
        return () => {
            dispatch(clearFinalSubmitTenderData());
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("finalsubmitPageNo", page);
        dispatch(getFinalSubmitTenderData());
      }, [page]);

    const {
        //MyProject Listing Variable state
      
        isFetchingFinalSubmitTenderData,
        isSuccessFinalSubmitTenderData,
        isErrorFinalSubmitTenderData,
        finalSubmitTenderData,
        errorMessageFinalSubmitTenderData,
    } = useSelector(EauctionSelector);

   
    return (
        <>
         {isFetchingFinalSubmitTenderData && <Loading isOpen={isFetchingFinalSubmitTenderData} />}
        <Box style={{ padding: "0 16px" }}>
        {isErrorFinalSubmitTenderData && <Alert severity="error">{errorMessageFinalSubmitTenderData}</Alert>}
            {finalSubmitTenderData?.length === 0 ?
                <Grid container justifyContent="space-between" style={{ padding: '36px 8px' }}>
                    <Typography variant="h6">There are currently final submitted tenders that you've applied for.</Typography>
                    <Button variant="contained" color="primary" onClick={() => history.push('/dashboard?tab=all-tenders')}>Apply for new Tender</Button>
                </Grid> : <></>}
            {finalSubmitTenderData?.map((product) => (
                <FinalSubmittedTenderCard projectDetails={product} stepperData={JSON.parse(product.project_stepper)} />
            ))}
        </Box>
        { finalSubmitTenderData?.total > perPage && <Box width='100%' justifyContent='center' display='flex' alignItems='center' m={2}>
        <Pagination
          // count={Math.ceil(projectData?.total / perPage)}
          count={2}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary" />
      </Box>}
        </>
    )
};

export default FinalSubmittedTenders;