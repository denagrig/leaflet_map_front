import { screen, waitFor } from "@testing-library/react"

import "@testing-library/jest-dom"
import { renderWithProviders } from "../utils/test-utils"
import { testDeviceData, testDeviceDataError, testUserLoggedOut } from "src/data"
import App from "src/App"

const defaultState = {
  user: {
    userData: testUserLoggedOut
  },
  device: {
    devicesData: testDeviceData,
  }
}

const deviceErrorState = {
  user: {
    userData: testUserLoggedOut
  },
  device: {
    devicesData: testDeviceDataError,
  }
}

jest.mock("axios")
jest.mock("react-leaflet")
jest.useFakeTimers()
const mockDispatch = jest.fn()

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch.mockReturnValueOnce(true)
}))


describe("Whole app tests", () => {
  it("should render login page first", async() => {
    renderWithProviders(<App />, {
      preloadedState: defaultState,
    })

    jest.advanceTimersByTime(50000)
    await waitFor(() => expect(mockDispatch).toHaveBeenCalled)
    const loginButton = screen.getByText("Войти")
    expect(loginButton).toBeInTheDocument()
  })
  it("should load devices if defaul state is empty", async() => {
    renderWithProviders(<App />, {
      preloadedState: deviceErrorState,
    })
    await waitFor(() => expect(mockDispatch).toHaveBeenCalled)
  })
})