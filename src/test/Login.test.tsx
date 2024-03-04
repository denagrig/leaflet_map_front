import { act, fireEvent, screen, waitFor } from "@testing-library/react"

import "@testing-library/jest-dom"
import { renderWithProviders } from "../utils/test-utils"
import { testDeviceData, testErrorUserData, testUserAdmin, testUserLoggedOut, testUserUser } from "src/data"
import Login from "src/pages/Login/Login"
import { BrowserRouter } from "react-router-dom"

const defaultState = {
  user: {
    userData: testUserLoggedOut
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

const adminState = {
  user: {
    userData: testUserAdmin
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


describe("Login page tests", () => {
  it("should coontain login buttons", () => {
    renderWithProviders(<BrowserRouter><Login /></BrowserRouter>, {
      preloadedState: defaultState,
    })
    const loginButton = screen.getByText("Войти")
    expect(loginButton).toBeInTheDocument()
  })
  it("should display error on render with wrong user", async () => {
    renderWithProviders(<BrowserRouter><Login /></BrowserRouter>, {
      preloadedState: hasErrorState,
    })
    jest.spyOn(window,"alert").mockImplementation()
    const alertMock = jest.spyOn(window,"alert").mockImplementation(() => {})
    await waitFor(() => expect(alertMock).toHaveBeenCalledTimes(1))
  })
  it("should redirect admin to admin page", async () => {
    renderWithProviders(<BrowserRouter><Login /></BrowserRouter>, {
      preloadedState: adminState,
    })
    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledTimes(1))
  })
  it("should redirect user to user page", async () => {
    renderWithProviders(<BrowserRouter><Login /></BrowserRouter>, {
      preloadedState: userState,
    })
    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledTimes(1))
  })
  it("should display error if credentials are wrong", async () => {
    renderWithProviders(<BrowserRouter><Login /></BrowserRouter>, {
      preloadedState: defaultState,
    })
    
    const loginButton = screen.getByText("Продолжить")
    act(() => {
      fireEvent.click(loginButton)

    })
    jest.spyOn(window,"alert").mockImplementation()
    const alertMock = jest.spyOn(window,"alert").mockImplementation(() => {})
    await waitFor(() => expect(alertMock).toHaveBeenCalledTimes(1))
  })
  it("should move to different page after login", async () => {
    renderWithProviders(<BrowserRouter><Login /></BrowserRouter>, {
      preloadedState: defaultState,
    })
    
    const loginInput = screen.getByTestId("logininput")
    const passwordInput = screen.getByTestId("passwordinput")
    const loginButton = screen.getByText("Продолжить")
    act(() => {
      fireEvent.change(loginInput, {target: {value: "testtest"}})
      fireEvent.change(passwordInput, {target: {value: "testtest"}})
      fireEvent.click(loginButton)
    })
    jest.spyOn(window,"alert").mockImplementation()
    const alertMock = jest.spyOn(window,"alert").mockImplementation(() => {})
    await waitFor(() => expect(alertMock).toHaveBeenCalledTimes(0))
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1))
  })
})


