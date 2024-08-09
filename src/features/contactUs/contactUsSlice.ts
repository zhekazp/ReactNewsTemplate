import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";



export interface IForm {
    name: string;
    email: string;
    message: string;
}

export interface InitialFormState {
    form: IForm;
    status: null | 'loading' | 'success' | 'error';
    errorMessage: string | null;

}
const initialState: InitialFormState = {
    form: {
        name: '',
        email: '',
        message: '',
    },
    status: null,
     errorMessage: null
}

export const sendForm = createAsyncThunk<void, IForm, {state:RootState}>('form/sendForm',
    async (form, { rejectWithValue}) => {
        try {
            const response = await axios.post('/api/contact', form, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch(error) {
            // throw new Error(error.response.data.message || 'Something went wrong');
            let errorMessage = 'Etwas ist schief gelaufen';
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data.message || errorMessage;
            }
            return rejectWithValue(errorMessage);
        }
    }
)

const contactUsSlice = createSlice({
    name: 'contactForm',
    initialState,
    reducers: {
        updateForm(state, action: PayloadAction<IForm>){
            state.form = {
                ...state.form,
                ...action.payload,
              };
        },
        clearForm(state){
            state.form = {name: '', email: '', message: ''};

        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendForm.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(sendForm.fulfilled, (state) =>{
            state.status = 'success'
            state.form = {
                name: '',
                email: '',
                message: '',
              };
        })
        .addCase(sendForm.rejected, (state) => {
            state.status = 'error'
        })
    }
})

export const { updateForm, clearForm } = contactUsSlice.actions;

export default contactUsSlice.reducer;