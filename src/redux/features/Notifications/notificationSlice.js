import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiEndPoint } from "../../../utils/Common";
import axios from "axios";

export const getNotifications = createAsyncThunk(
    "Notifications/get",
    async (page, thunkAPI) => {
        try {
            const response = await axios.get(
                `${ApiEndPoint}/ApplicantNotifications/${localStorage.getItem("applicantId")}?Lang=${localStorage.getItem("i18nextLng")}&page=${page}&perpage=6`
            );
            let responseData = await response.data;
            if (response.status === 200) {
                const notifications = responseData.data[0]?.Notifications || [];
                return {
                    notifications,
                    otherData: responseData.data[0]
                };
            } else {
                return thunkAPI.rejectWithValue(responseData);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const updateNotification = createAsyncThunk(
    "Notifications/update",
    async (requestData, thunkAPI) => {
        try {
            const response = await axios.patch(
                `${ApiEndPoint}/ApplicantNotifications/MarkRead/${localStorage.getItem("applicantId")}`, requestData);
            let responseData = await response.data;
            if (response.status === 200) {
                return responseData;
            } else {
                return thunkAPI.rejectWithValue(responseData);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const clearNotificationOverlay = () => (dispatch) => {
    dispatch(NotificationSlice.actions.clearNotificationState());
};


export const NotificationSlice = createSlice({
    name: "notification",
    initialState: {
        isFetchingNotification: false,
        isSuccessNotification: false,
        isErrorNotification: false,
        errorMessageNotification: "",
        notificationData: {
            Notifications: [],
            OtherData: []
        },
        isNewNotification: false,
        isNewUnreadNotification: false,

        isFetchingUpdateNotification: false,
        isSuccessUpdateNotification: false,
        isErrorUpdateNotification: false,
        updateNotificationData: "",
        errorMessageUpdateNotification: "",
    },
    reducers: {
        clearNotificationState: (state) => {
            state.isFetchingNotification = false;
            state.isSuccessNotification = false;
            state.isErrorNotification = false;
            state.errorMessageNotification = "";
        },
        clearNotificationData: (state) => {
            state.isNewNotification = false;
            state.isNewUnreadNotification = false;
            state.notificationData = {
                Notifications: [],
                OtherData: []
            };
        },
        clearUpdateNotificationState: (state) => {
            state.isFetchingUpdateNotification = false;
            state.isSuccessUpdateNotification = false;
            state.isErrorUpdateNotification = false;
            state.errorMessageUpdateNotification = "";
        },
    },
    extraReducers: {
        [getNotifications.fulfilled]: (state, { payload }) => {
            state.isFetchingNotification = false;
            state.isErrorNotification = payload.error;
            state.errorMessageNotification = payload.message;
            state.isSuccessNotification = payload.success;
            state.notificationData.Notifications = state.notificationData.Notifications.concat(payload.notifications);
            state.notificationData.OtherData = payload.otherData;
            if (payload.notifications.some(notification => notification.Type === 'new')) {
                state.isNewNotification = true;
            };
            if (payload.notifications.some(notification => notification.IsRead === '0')) {
                state.isNewUnreadNotification = true;
            }
        },
        [getNotifications.pending]: (state) => {
            state.isFetchingNotification = true;
        },
        [getNotifications.rejected]: (state, { payload }) => {
            state.isFetchingNotification = false;
            state.errorMessageNotification = payload.message;
            state.isErrorNotification = payload.error;
        },
        [updateNotification.fulfilled]: (state, { payload }) => {
            state.isFetchingUpdateNotification = false;
            state.isErrorUpdateNotification = payload.error;
            state.errorMessageUpdateNotification = payload.message;
            state.isSuccessUpdateNotification = payload.success;
            state.updateNotificationData = payload.data;
        },
        [updateNotification.pending]: (state) => {
            state.isFetchingUpdateNotification = true;
        },
        [updateNotification.rejected]: (state, { payload }) => {
            state.isFetchingUpdateNotification = false;
            state.isErrorUpdateNotification = payload.error;
            state.errorMessageUpdateNotification = payload.message;
        },
    },
});

export const { clearNotificationState, clearNotificationData, clearUpdateNotificationState } =
    NotificationSlice.actions;

export const NotificationSliceSelector = (state) => state.notification;
