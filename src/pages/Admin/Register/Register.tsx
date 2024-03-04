import { Page, Role } from "src/data"
import Sidebar from "src/components/Sidebar/Sidebar"
import {
  RegisterPageContainer,
  RegisterHeader,
  RegisterForm,
  InputContainer,
  RegisterInput,
  RegisterLabel,
  RegisterContainer,
  RegisterButton,
} from "src/pages/Admin/Register/Register.styled"
import { User } from "src/types"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "src/hooks"
import { AppDispatch } from "src/store"
import { useDispatch } from "react-redux"
import { registerUser } from "src/slices/userSlice"

const Register = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const curUser: User = useAppSelector((state) => state.user.userData)

  useEffect(() => {
    if (curUser.Role == Role.User) navigate("/map")
    if (curUser.Role == Role.LoggedOut || curUser.Role == Role.HasErrors)
      navigate("/login")
  }, [curUser.Role, navigate])
  const [userData, setUserData] = useState<User>({
    Login: "",
    Password: "",
    Role: Role.HasErrors,
    Phone: -1,
    Email: "",
    Name: "",
  })

  const handleRegister = () => {
    if (
      userData.Login == "" ||
      userData.Password == "" ||
      userData.Role == Role.HasErrors ||
      userData.Phone == -1 ||
      userData.Email == "" ||
      userData.Name == ""
    ) {
      alert("Пожалуйста введите все данные")
    } else {
      if (
        !/^[a-zA-Zа-яА-я0-9]+$/.test(userData.Login) ||
        !/^[a-zA-Zа-яА-я0-9]+$/.test(userData.Password)
      )
        alert("Ошибка во введенных данных")
      else if (
        userData.Login.length > 15 ||
        userData.Login.length < 8 ||
        userData.Password.length > 15 ||
        userData.Password.length < 8
      )
        alert("Ошибка в длинне введенных данных")
      else {
        dispatch(registerUser(userData))
        alert("Пользователь успешно зарегестрирован")
      }
    }
  }

  const handleInputLogin = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newUserData = Object.assign({}, userData)
      newUserData.Login = event.target.value
      setUserData(newUserData)
    },
    [userData]
  )

  const handleInputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newUserData = Object.assign({}, userData)
      newUserData.Password = event.target.value
      setUserData(newUserData)
    },
    [userData]
  )

  const handleInputRole = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newUserData = Object.assign({}, userData)
      if (event.target.value == "Администратор") newUserData.Role = Role.Admin
      else if (event.target.value == "Пользователь")
        newUserData.Role = Role.User
      setUserData(newUserData)
    },
    [userData]
  )

  const handleInputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newUserData = Object.assign({}, userData)
      newUserData.Email = event.target.value
      setUserData(newUserData)
    },
    [userData]
  )

  const handleInputPhone = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newUserData = Object.assign({}, userData)
      newUserData.Phone = parseInt(event.target.value)
      setUserData(newUserData)
    },
    [userData]
  )

  const handleInputName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newUserData = Object.assign({}, userData)
      newUserData.Name = event.target.value
      setUserData(newUserData)
    },
    [userData]
  )

  return (
    <RegisterPageContainer>
      <Sidebar curPage={Page.createUser} />
      <RegisterContainer>
        <RegisterHeader> Регистрация пользователя</RegisterHeader>
        <RegisterForm>
          <InputContainer>
            <RegisterInput data-testid="nameinput" onChange={handleInputName} />
            <RegisterLabel>имя</RegisterLabel>
          </InputContainer>
          <InputContainer>
            <RegisterInput data-testid="phoneinput" onChange={handleInputPhone} />
            <RegisterLabel>телефон</RegisterLabel>
          </InputContainer>
          <InputContainer>
            <RegisterInput data-testid="mailinput" onChange={handleInputEmail} />
            <RegisterLabel>e-mail</RegisterLabel>
          </InputContainer>
          <InputContainer>
            <RegisterInput data-testid="roleinput" onChange={handleInputRole} />
            <RegisterLabel>роль</RegisterLabel>
          </InputContainer>
          <InputContainer>
            <RegisterInput data-testid="logininput" onChange={handleInputPassword} />
            <RegisterLabel>логин</RegisterLabel>
          </InputContainer>
          <InputContainer>
            <RegisterInput data-testid="passwordinput" onChange={handleInputLogin} />
            <RegisterLabel>пароль</RegisterLabel>
          </InputContainer>
          <RegisterButton onClick={handleRegister}>
            Зарегистрировать
          </RegisterButton>
        </RegisterForm>
      </RegisterContainer>
    </RegisterPageContainer>
  )
}

export default Register
