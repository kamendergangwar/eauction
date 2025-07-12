import { useDispatch, useSelector } from "react-redux";
import { EauctionSelector, clearPendingTenderData, getPendingTenderData } from "../../../../../redux/features/eauction/eauctionSlice";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import PendingTenderCard from "./PendingTenderCard/PendingTenderCard";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Loading from "../../../../atoms/Loading/Loading";
import { Alert, Pagination } from "@material-ui/lab";

const MyPendingTenders = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [pendingTender, setPendingTender] = useState([]);
    const [finalSubmittedTender, setFinalSubmittedTender] = useState([])
    const [page, setPage] = useState(1)
    const perPage = 5;


    useEffect(() => {
        dispatch(getPendingTenderData());
        return () => {
            dispatch(clearPendingTenderData());
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("pendingtenderPageNo", page);
        dispatch(getPendingTenderData());
      }, [page]);
    const {
        //MyProject Listing Variable state
        isFetchingPendingTenderData,
        isSuccessPendingTenderData,
        isErrorPendingTenderData,
        pendingTenderData,
        errorMessagePendingTenderData,
    } = useSelector(EauctionSelector);


    return (
        <>
            {isFetchingPendingTenderData && <Loading isOpen={isFetchingPendingTenderData} />}
            <Box style={{ padding: "0 16px" }}>
                {isErrorPendingTenderData && <Alert severity="error">{errorMessagePendingTenderData}</Alert>}
                {pendingTenderData.length === 0 ?
                    <Grid container justifyContent="space-between" style={{ padding: '36px 8px' }}>
                        <Typography variant="h6">There are currently no pending tenders that you've applied for.</Typography>
                        <Button variant="contained" color="primary" onClick={() => history.push('/dashboard?tab=all-tenders')}>Apply for new Tender</Button>
                    </Grid> : <></>}
                {pendingTenderData.map((product) => (
                    <PendingTenderCard projectDetails={product} stepperData={JSON.parse(product.project_stepper)} />
                ))}

            </Box>
            { pendingTenderData?.total > perPage && <Box width='100%' justifyContent='center' display='flex' alignItems='center' m={2}>
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

export default MyPendingTenders;