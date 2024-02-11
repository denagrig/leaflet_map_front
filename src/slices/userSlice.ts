import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Role } from "src/data"
import { LoginAndPassword, User } from "src/types"
import { getUser, logInUser, logOutUser, postUser } from "src/slices/userStorage"

export interface UserState {
  userData: User;
}

const initialState: UserState = {
  userData: {
    Login: "",
    Password: "",
    Role: Role.Unloaded,
    Name: "",
    Phone: 0,
    Email: "",
  },
}

export const logIn = createAsyncThunk<User, LoginAndPassword>(
  "userSlice/logIn",
  async (loginAndPassword: LoginAndPassword, thunkAPI) => {
    try {
      return await logInUser(loginAndPassword)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const logOut = createAsyncThunk<User, void>(
  "userSlice/logOut",
  async (params: void, thunkAPI) => {
    try {
      return await logOutUser()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const loadUser = createAsyncThunk<User, void>(
  "userSlice/load",
  async (params: void, thunkAPI) => {
    try {
      return await getUser()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const registerUser = createAsyncThunk<void, User>(
  "userSlice/register",
  async (userData: User, thunkAPI) => {
    try {
      return await postUser(userData)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.userData = action.payload
      console.log("user logged in")
    }),
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.userData = action.payload
      console.log("user loaded")
    }),
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.userData = action.payload
      console.log("user logged out")
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log("user registred out")
    })
  },
})

export default userSlice.reducer
