import { createSlice } from "@reduxjs/toolkit";

export const UnControlledFormSlice = createSlice({
    name: "uncontrolledForm",
    initialState: {
      isReadInstruction: false,
      readInstructionErrorMessage: "",
    },
    reducers: {
        changeIsReadInstruction: (state) => {
            state.isReadInstruction = !state.isReadInstruction;
        },
        changeReadInstructionErrorMessage: (state,action) => {
            state.readInstructionErrorMessage = action.payload;
        },
    }
});



export const { changeIsReadInstruction,changeReadInstructionErrorMessage } = UnControlledFormSlice.actions;

export const uncontrolledFormSelector = (state) => state.uncontrolledForm;
