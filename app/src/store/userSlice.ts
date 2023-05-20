import { createSlice } from "@reduxjs/toolkit";
import { Loan } from "../typings";

interface userState {
  isLoggedIn: boolean,
  id: string | null,
  loans: Loan[],
  currentLoanId: string | null,
  selectedMenu: number
}

const initialState: userState = {
  isLoggedIn: false,
  id: null,
  loans: [],
  currentLoanId: null,
  selectedMenu: 1
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.id = action.payload.id;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.id = null;
      state.loans = [];
    },
    setLoans: (state, action) => {
      state.loans = action.payload;
    },
    setCurrentLoanId: (state, action) => {
      state.currentLoanId = action.payload;
    },
    setSelectedMenu: (state, action) => {
      state.selectedMenu = action.payload;
    }
  }
});

export const { loginUser, logoutUser, setLoans, setCurrentLoanId, setSelectedMenu } = userSlice.actions;
export default userSlice.reducer;
