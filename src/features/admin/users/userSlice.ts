import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// import { RootState } from "../../../store";

// какие типы данных для юзера?
interface IUser {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  isBlocked: boolean;
}

interface UsersState {
  list: IUser[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<IUser[]>(
  "users/fetchUsers",
  async () => {
    const response = await axios.get("/api/users"); // api для получения юзеров?
    return response.data;
  }
);

export const blockUser = createAsyncThunk<void, number>(
  "users/blockUser",
  async (userId) => {
    await axios.post(`/api/users/${userId}/block`);
  }
);

export const upgradeUser = createAsyncThunk<void, number>(
  "users/upgradeUser",
  async (userId) => {
    await axios.post(`/api/users/${userId}/upgrade`);
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.list = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Не удалось загрузить пользователей";
    });

    
    builder.addCase(blockUser.fulfilled, (state, action) => {
      const index = state.list.findIndex((user) => user.id === action.meta.arg);
        if (index !== -1) {
            state.list[index].isBlocked = true;
      }
    });

   
    builder.addCase(upgradeUser.fulfilled, (state, action) => {
      const index = state.list.findIndex((user) => user.id === action.meta.arg);
      if (index !== -1) {
        state.list[index].isAdmin = true;
      }
    });
  },
});

export default userSlice.reducer;
