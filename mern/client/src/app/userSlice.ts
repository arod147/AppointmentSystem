import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';


export interface State {
    username: string | null
    firstName: string | null
    position: string | null
};

const initialState: State = {
  username: localStorage.getItem('username'),
  firstName: localStorage.getItem('firstName'),
  position: localStorage.getItem('position')
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, userName: PayloadAction<string> ) => {
      localStorage.setItem('username', userName.payload);
      state.username = localStorage.getItem('username')
    },
    setFirstName: (state, name: PayloadAction<string> ) => {
      localStorage.setItem('firstName', name.payload);
      state.firstName = localStorage.getItem('firstName')
    },
    setPosition: (state, position: PayloadAction<string> ) => {
      localStorage.setItem('position', position.payload);
      state.position = localStorage.getItem('position')
    },
}
});

export const { setUserName, setFirstName, setPosition } = userSlice.actions;

export const selectUserName = (state: RootState) => state.user.username
export const selectFirstName = (state: RootState) => state.user.firstName
export const selectPosition = (state: RootState) => state.user.position

export default userSlice.reducer;


