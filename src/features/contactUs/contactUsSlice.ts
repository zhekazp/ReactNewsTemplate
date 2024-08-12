import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";



export interface IForm {
    contactName: string;
    contactEmail: string;
    contactMessage: string;
}

export interface InitialFormState {
    form: IForm;
    status: null | 'loading' | 'success' | 'error';
    errorMessage: string | null;

}
const initialState: InitialFormState = {
    form: {
        contactName: '',
        contactEmail: '',
        contactMessage: '',
    },
    status: null,
     errorMessage: null
}

export const sendForm = createAsyncThunk<void, IForm, {state:RootState}>('form/sendForm',
    async (form, { rejectWithValue}) => {
        console.log('Sending form data:', form);
        try {

            const response = await axios.post('/api/contact', form, {

                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response:', response.data);
            return response.data;
        } catch(error) {
            // throw new Error(error.response.data.message || 'Something went wrong');

            let errorMessage = 'Etwas ist schief gelaufen';

            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data.message || errorMessage;
            }
            console.log('Error:', errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
)

const contactUsSlice = createSlice({
    name: 'contactForm',
    initialState,
    reducers: {
        updateForm(state, action: PayloadAction<Partial<IForm>>){
            state.form = {
                ...state.form,
                ...action.payload,
              };
        },
        clearForm(state){
            state.form = {contactName: '', contactEmail: '', contactMessage: ''};
            state.status = null;
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendForm.pending, (state) => {
            state.status = 'loading';
            state.errorMessage = null;
        })
        .addCase(sendForm.fulfilled, (state) =>{
            state.status = 'success'
            state.form = {
                contactName: '',
                contactEmail: '',
                contactMessage: '',
              };
        })
        .addCase(sendForm.rejected, (state, action) => {
            state.status = 'error';
            state.errorMessage = action.payload as string;
        })
    }
})

export const { updateForm, clearForm } = contactUsSlice.actions;

export default contactUsSlice.reducer;
