import { act, fireEvent, screen, waitFor } from "@testing-library/react"

import "@testing-library/jest-dom"
import { renderWithProviders } from "../utils/test-utils"
import { Page, testDeviceData, testUserAdmin, testUserUser } from "src/data"
import { BrowserRouter } from "react-router-dom"
import Sidebar from "src/components/Sidebar/Sidebar"

const adminState = {
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


describe("Sidebar component tests", () => {
  it("sidebar should render all navigation links", () => {
    renderWithProviders(<BrowserRouter><Sidebar curPage={Page.createUser}/></BrowserRouter>, {
      preloadedState: adminState,
    })
    const usersLink = screen.getByText("Пользователи")
    const devicesLink = screen.getByText("Устройства")
    const registerLink = screen.getByText("Регистрация пользователя")
    const mapLink = screen.getByText("Карта")
    expect(usersLink).toBeInTheDocument()
    expect(devicesLink).toBeInTheDocument()
    expect(registerLink).toBeInTheDocument()
    expect(mapLink).toBeInTheDocument()
  })
  it("rendering user sidebar should contain only map link", () => {
    renderWithProviders(<BrowserRouter><Sidebar curPage={Page.map}/></BrowserRouter>, {
      preloadedState: userState,
    })
    const mapLink = screen.getByText("Карта")
    expect(mapLink).toBeInTheDocument()
  })
  it("preessing log out should clear user & redirect to login", async () => {
    renderWithProviders(<BrowserRouter><Sidebar curPage={Page.userData}/></BrowserRouter>, {
      preloadedState: userState,
    })
    const logoutButton = screen.getByText("Выйти")
    act(() => {
      fireEvent.click(logoutButton)
    })
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledTimes(1))
  })
  it("pressing nav links should navigate", async () => {
    renderWithProviders(<BrowserRouter><Sidebar curPage={Page.deviceData}/></BrowserRouter>, {
      preloadedState: adminState,
    })
    const usersLink = screen.getByText("Пользователи")
    const devicesLink = screen.getByText("Устройства")
    const registerLink = screen.getByText("Регистрация пользователя")
    const mapLink = screen.getByText("Карта")
    act(() => {
      fireEvent.click(usersLink)
      fireEvent.click(devicesLink)
      fireEvent.click(registerLink)
      fireEvent.click(mapLink)
    })
    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledTimes(4))
  })
})


