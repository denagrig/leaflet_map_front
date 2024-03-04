import { testEmptyUser } from "src/data"
import { getUser, logOutUser } from "src/slices/userStorage"

describe("User slice tests", () => {
  it("getUser", (done) => {
    getUser().then((response) => {
      expect(response).toEqual([])
      done()
    })
  })
  it("logoutUser", (done) => {
    logOutUser().then((response) => {
      expect(response).toEqual(testEmptyUser)
      done()
    })
  })
})
