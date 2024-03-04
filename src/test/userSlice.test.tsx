import { testEmptyUser, testUserLoggedOut, testUserUser } from "src/data"
import reducer, { loadUser, logIn, logOut, registerUser } from "src/slices/userSlice"

describe("User slice tests", () => {
  describe("reducers", () => {
    const initialState = { userData: testUserLoggedOut}
  
    it("login user", () => {
      const action = { type: logIn.fulfilled.type, payload: testUserUser}
      const state = reducer(initialState, action)
      expect(state).toEqual({ userData: testUserUser })
    })
    it("logout user", () => {
      const action = { type: logOut.fulfilled.type, payload: testEmptyUser}
      const state = reducer(initialState, action)
      expect(state).toEqual({ userData: testEmptyUser })
    })
    it("load user", () => {
      const action = { type: loadUser.fulfilled.type, payload: testUserUser}
      const state = reducer(initialState, action)
      expect(state).toEqual({ userData: testUserUser })
    })
    it("register user", () => {
      const action = { type: registerUser.fulfilled.type, payload: testUserUser}
      const state = reducer(initialState, action)
      expect(state).toEqual({ userData: testUserLoggedOut })
    })
  })
})