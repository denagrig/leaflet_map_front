import {act, fireEvent, screen, waitFor } from "@testing-library/react"

import "@testing-library/jest-dom"
import { renderWithProviders } from "../utils/test-utils"
import { testDeviceData, testErrorUserData, testUserAdmin, testUserUser } from "src/data"
import { BrowserRouter } from "react-router-dom"
import Register from "src/pages/Admin/Register/Register"


const defaultState = {
  user: {
    userData: testUserAdmin
  },
  device: {
    devicesData: testDeviceData,
  }
}

const userState = {
  user: {
    userData: testUserUser
  },
  device: {
    devicesData: testDeviceData,
  }
}


const hasErrorState = {
  user: {
    userData: testErrorUserData
  },
  device: {
    devicesData: testDeviceData,
  }
}


jest.mock("axios")
jest.mock("react-leaflet")
window.alert = jest.fn()
const mockDispatch = jest.fn()

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch.mockReturnValueOnce(true)
}))

const mockedUsedNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}))


describe("Register page tests", () => {
  it("should coontain register button", () => {
    renderWithProviders(<BrowserRouter><Register /></BrowserRouter>, {
      preloadedState: defaultState,
    })
    const registerButton = screen.getByText("Зарегистрировать")
    expect(registerButton).toBeInTheDocument()
  })
  it("should redirect user to user page", async () => {
    renderWithProviders(<BrowserRouter><Register /></BrowserRouter>, {
      preloadedState: userState,
    })
    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledTimes(1))
  })
  it("should redirect logged out user to login page", async () => {
    renderWithProviders(<BrowserRouter><Register /></BrowserRouter>, {
      preloadedState: hasErrorState,
    })
    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledTimes(1))
  })
  it("should display error if credentials are empty", async () => {
    renderWithProviders(<BrowserRouter><Register /></BrowserRouter>, {
      preloadedState: defaultState,
    })
    
    const registerButton = screen.getByText("Зарегистрировать")
    act(() => {
      fireEvent.click(registerButton)
    })
    jest.spyOn(window,"alert").mockImplementation()
    const alertMock = jest.spyOn(window,"alert").mockImplementation(() => {})
    await waitFor(() => expect(alertMock).toHaveBeenCalledTimes(1))
  })
  it("should display error if credentials contain wrong symbol", async () => {
    renderWithProviders(<BrowserRouter><Register /></BrowserRouter>, {
      preloadedState: defaultState,
    })
    
    const loginInput = screen.getByTestId("logininput")
    const passwordInput = screen.getByTestId("passwordinput")
    const nameInput = screen.getByTestId("nameinput")
    const roleinput = screen.getByTestId("roleinput")
    const phoneInput = screen.getByTestId("phoneinput")
    const mailInput = screen.getByTestId("mailinput")
    const registerButton = screen.getByText("Зарегистрировать")
    act(() => {
      fireEvent.change(loginInput, {target: {value: "testtest/"}})
      fireEvent.change(passwordInput, {target: {value: "testtest"}})
      fireEvent.change(nameInput, {target: {value: "testtest"}})
      fireEvent.change(roleinput, {target: {value: "Администратор"}})
      fireEvent.change(phoneInput, {target: {value: "testtest"}})
      fireEvent.change(mailInput, {target: {value: "testtest"}})
      fireEvent.click(registerButton)
    })
    jest.spyOn(window,"alert").mockImplementation()
    const alertMock = jest.spyOn(window,"alert").mockImplementation(() => {})
    await waitFor(() => expect(alertMock).toHaveBeenCalledTimes(1))
  })
  it("should display error if credentials are too short", async () => {
    renderWithProviders(<BrowserRouter><Register /></BrowserRouter>, {
      preloadedState: defaultState,
    })
    
    const loginInput = screen.getByTestId("logininput")
    const passwordInput = screen.getByTestId("passwordinput")
    const nameInput = screen.getByTestId("nameinput")
    const roleinput = screen.getByTestId("roleinput")
    const phoneInput = screen.getByTestId("phoneinput")
    const mailInput = screen.getByTestId("mailinput")
    const registerButton = screen.getByText("Зарегистрировать")
    act(() => {
      fireEvent.change(loginInput, {target: {value: "test"}})
      fireEvent.change(passwordInput, {target: {value: "testtest"}})
      fireEvent.change(nameInput, {target: {value: "testtest"}})
      fireEvent.change(roleinput, {target: {value: "Администратор"}})
      fireEvent.change(phoneInput, {target: {value: "testtest"}})
      fireEvent.change(mailInput, {target: {value: "testtest"}})
      fireEvent.click(registerButton)
    })
    jest.spyOn(window,"alert").mockImplementation()
    const alertMock = jest.spyOn(window,"alert").mockImplementation(() => {})
    await waitFor(() => expect(alertMock).toHaveBeenCalledTimes(1))
  })
  it("should display alert on correct credentials", async () => {
    renderWithProviders(<BrowserRouter><Register /></BrowserRouter>, {
      preloadedState: defaultState,
    })
    
    const loginInput = screen.getByTestId("logininput")
    const passwordInput = screen.getByTestId("passwordinput")
    const nameInput = screen.getByTestId("nameinput")
    const roleinput = screen.getByTestId("roleinput")
    const phoneInput = screen.getByTestId("phoneinput")
    const mailInput = screen.getByTestId("mailinput")
    const registerButton = screen.getByText("Зарегистрировать")
    act(() => {
      fireEvent.change(loginInput, {target: {value: "testtest"}})
      fireEvent.change(passwordInput, {target: {value: "testtest"}})
      fireEvent.change(nameInput, {target: {value: "testtest"}})
      fireEvent.change(roleinput, {target: {value: "Администратор"}})
      fireEvent.change(phoneInput, {target: {value: "testtest"}})
      fireEvent.change(mailInput, {target: {value: "testtest"}})
      fireEvent.click(registerButton)
    })
    jest.spyOn(window,"alert").mockImplementation()
    const alertMock = jest.spyOn(window,"alert").mockImplementation(() => {})
    await waitFor(() => expect(alertMock).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1))
  })
  it("should display alert on correct credentials (last test, but for user role)", async () => {
    renderWithProviders(<BrowserRouter><Register /></BrowserRouter>, {
      preloadedState: defaultState,
    })
    
    const loginInput = screen.getByTestId("logininput")
    const passwordInput = screen.getByTestId("passwordinput")
    const nameInput = screen.getByTestId("nameinput")
    const roleinput = screen.getByTestId("roleinput")
    const phoneInput = screen.getByTestId("phoneinput")
    const mailInput = screen.getByTestId("mailinput")
    const registerButton = screen.getByText("Зарегистрировать")
    act(() => {
      fireEvent.change(loginInput, {target: {value: "testtest"}})
      fireEvent.change(passwordInput, {target: {value: "testtest"}})
      fireEvent.change(nameInput, {target: {value: "testtest"}})
      fireEvent.change(roleinput, {target: {value: "Пользователь"}})
      fireEvent.change(phoneInput, {target: {value: "testtest"}})
      fireEvent.change(mailInput, {target: {value: "testtest"}})
      fireEvent.click(registerButton)
    })
    jest.spyOn(window,"alert").mockImplementation()
    const alertMock = jest.spyOn(window,"alert").mockImplementation(() => {})
    await waitFor(() => expect(alertMock).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1))
  })
})


