import { useCallback, useEffect, useState } from "react"
import { InputContainer, LeftSideContainer, LoginButton, LoginDiv, LoginForm, LoginHeader, LoginInput, LoginLabel, LoginText, PurpleLoginText, RightSideContainer } from "./Login.styled"
import { LoginAndPassword, User } from "src/types"
import { logIn } from "src/slices/userSlice"
import { AppDispatch } from "src/store"
import { useDispatch } from "react-redux"
import { useAppSelector } from "src/hooks"
import { Role } from "src/data"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const curUser: User = useAppSelector((state) => state.user.userData)
  const [userData, setUserData] = useState<LoginAndPassword>({
    login: "",
    password: "",
  })

  useEffect(() => {
    if(curUser.Role == Role.HasErrors) {
      alert("Введены неверные данные!")
    }
    else if (curUser.Role == Role.User) navigate("/map")
    else if (curUser.Role == Role.Admin) navigate("/admin/users")
  }, [curUser.Role, navigate])
  

  const handleLogin = () => {
    if (userData.login == "" || userData.password == "") {
      alert("Пожалуйста введите все данные")
    } else {
      dispatch(logIn(userData))
    }
  }

  const handleInputLogin = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newUserData = Object.assign({}, userData)
      newUserData.login = event.target.value
      setUserData(newUserData)
    },
    [userData]
  )

  const handleInputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newUserData = Object.assign({}, userData)
      newUserData.password = event.target.value
      setUserData(newUserData)
    },
    [userData]
  )

  
  return (
    <>
      <LeftSideContainer>
        <LoginDiv>
          <LoginForm>
            <LoginHeader>Войти</LoginHeader>
            <InputContainer>
              <LoginInput type="text" onChange={handleInputLogin}></LoginInput>
              <LoginLabel>Логин</LoginLabel>
            </InputContainer>
            <InputContainer>
              <LoginInput type="password" onChange={handleInputPassword}></LoginInput>
              <LoginLabel>Пароль</LoginLabel>
            </InputContainer>
            <LoginButton onClick={handleLogin}>Продолжить</LoginButton>
          </LoginForm>
        </LoginDiv>
      </LeftSideContainer>
      <RightSideContainer>
        <LoginText>
          GPS 
          <PurpleLoginText> Tracking </PurpleLoginText>
          System
        </LoginText>
      </RightSideContainer>
    </>
  )
}

export default Login
