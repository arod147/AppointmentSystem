import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';


export interface State {
    username: string | null
};

const initialState: State = {
  username: localStorage.getItem('username')
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, userName: PayloadAction<string> ) => {
      localStorage.setItem('username', userName.payload);
      state.username = localStorage.getItem('username')
    },
}
});

export const { setUserName } = userSlice.actions;

export const selectUserName = (state: RootState) => state.user.username

export default userSlice.reducer;


