import { Role } from "src/data"
import { LoginAndPassword, User } from "src/types"

export const logInUser = async (loginAndPassword: LoginAndPassword) => {
  return new Promise<User>((resolve) => {
    let curUser: User = {
      id: -1,
      Login: "",
      Password: "",
      Role: Role.HasErrors,
      Name: "",
      Phone: 0,
      Email: "",
    }

    const axios = require("axios")
    axios.get("http://localhost:8088/get/users").then(function (response: any) {
      const allUsers: User[] = response.data

      allUsers.map((user) => {
        if (
          loginAndPassword.login == user.Login &&
          loginAndPassword.password == user.Password
        ) {
          curUser = user
        }
      })

      localStorage.setItem("curUser", JSON.stringify(curUser))
      resolve(curUser)
    })
  })
}

export const getUser = async () => {
  return new Promise<User>((resolve) => {
    const curUser: User = JSON.parse(localStorage.getItem("curUser") || "[]")
    resolve(curUser)
  })
}

export const logOutUser = async () => {
  return new Promise<User>((resolve) => {
    const emptyUser: User = {
      id: -1,
      Login: "",
      Password: "",
      Role: Role.LoggedOut,
      Name: "",
      Phone: 0,
      Email: "",
    }

    localStorage.setItem("curUser", JSON.stringify(emptyUser))
    resolve(emptyUser)
  })
}

export const postUser = async (userData: User) => {
  return new Promise<void>((resolve) => {
    const allUsers: User[] = JSON.parse(
      localStorage.getItem("allUsers") || "[]"
    )
    let wrongLogin = 0

    allUsers.map((user) => {
      if (userData.Login == user.Login) {
        wrongLogin = 1
      }
    })
    if (wrongLogin == 0) {
      allUsers.push(userData)
    }
    localStorage.setItem("allUsers", JSON.stringify(allUsers))
    resolve()
  })
}

export const popUser = async (userId: number) => {
  return new Promise<void>((resolve) => {

    const axios = require("axios")
    axios.delete(`http://localhost:8088/post/user/${userId}`)
    const allUsers: User[] = JSON.parse(
      localStorage.getItem("allUsers") || "[]"
    )
    let deletePos = -1

    allUsers.map((user, index) => {
      if (userId== user.id) {
        deletePos = index
      }
    })
    allUsers.splice(deletePos, 1)
    localStorage.setItem("allUsers", JSON.stringify(allUsers))
    resolve()
  })
}