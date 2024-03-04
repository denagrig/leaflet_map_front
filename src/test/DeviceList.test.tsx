import { screen, waitFor } from "@testing-library/react"

import "@testing-library/jest-dom"
import { renderWithProviders } from "../utils/test-utils"
import { testDeviceData, testUserAdmin, testUserLoggedOut, testUserUser } from "src/data"
import { BrowserRouter } from "react-router-dom"
import DeviceList from "src/pages/Admin/DeviceList/DeviceList"

const adminState = {
  user: {
    userData: testUserAdmin
  },
  device: {
    devicesData: testDeviceData,
  }
}

const loggedOut = {
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


describe("DeviceList page tests", () => {
  it("should render", () => {
    renderWithProviders(<BrowserRouter><DeviceList/></BrowserRouter>, {
      preloadedState: adminState,
    })
    const deviceListHeader = screen.getAllByText("Устройства")
    expect(deviceListHeader[0]).toBeInTheDocument()
  })
  it("should redirect user to user page", async () => {
    renderWithProviders(<BrowserRouter><DeviceList /></BrowserRouter>, {
      preloadedState: userState,
    })
    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledTimes(1))
  })
  it("should redirect logged out user to login page", async () => {
    renderWithProviders(<BrowserRouter><DeviceList /></BrowserRouter>, {
      preloadedState: loggedOut,
    })
    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledTimes(1))
  })
})


