import { act, fireEvent, screen, waitFor } from "@testing-library/react"

import "@testing-library/jest-dom"
import { renderWithProviders } from "../utils/test-utils"
import { testDeviceData, testDeviceDataInactiveMarker, testUserUser } from "src/data"
import { BrowserRouter } from "react-router-dom"
import Map from "src/pages/Map/Map"

const defaultState = {
  user: {
    userData: testUserUser
  },
  device: {
    devicesData: testDeviceData,
  }
}

const inactiveMarker = {
  user: {
    userData: testUserUser
  },
  device: {
    devicesData: testDeviceDataInactiveMarker,
  }
}



jest.mock("axios")
const mockedUsedNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}))

jest.useFakeTimers()
const mockDispatch = jest.fn()

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch.mockReturnValueOnce(true)
}))

describe("Map page tests", () => {
  it("should render map", () => {
    renderWithProviders(<BrowserRouter><Map /></BrowserRouter>, {
      preloadedState: defaultState,
    })
    const map = screen.getByTestId("MapContainer")
    expect(map).toBeInTheDocument()
  })
  it("should render popup", () => {
    renderWithProviders(<BrowserRouter><Map /></BrowserRouter>, {
      preloadedState: defaultState,
    })
    const marker = screen.getByTestId("Marker")
    act(() => {
      fireEvent.click(marker)
    })
    const markerPopup = screen.getByText("id: 1")
    expect(markerPopup).toBeInTheDocument()
  })
  it("click on show more should expand popup", () => {
    renderWithProviders(<BrowserRouter><Map /></BrowserRouter>, {
      preloadedState: defaultState,
    })
    const marker = screen.getByTestId("Marker")
    act(() => {
      fireEvent.click(marker)
    })
    const showMore = screen.getByTestId("ShowMoreButton")
    act(() => {
      fireEvent.click(showMore)
    })
    const prevCords = screen.getByText("4, 5")
    expect(prevCords).toBeInTheDocument()
    act(() => {
      fireEvent.click(showMore)
    })
    expect(prevCords).toBeInTheDocument()
  })
  it("should add marker on click", async () => {
    renderWithProviders(<BrowserRouter><Map /></BrowserRouter>, {
      preloadedState: defaultState,
    })
    
    const addMarker = screen.getAllByTestId("addAdditionalMarker")
    const addMarkerFirstButton = screen.getByTestId("firstaddAdditionalMarker")
    act(() => {
      fireEvent.click(addMarker[0])
      fireEvent.click(addMarkerFirstButton)
    })
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(2))
  })
  it("export data on click", async () => {
    renderWithProviders(<BrowserRouter><Map /></BrowserRouter>, {
      preloadedState: inactiveMarker,
    })
    
    const exportData = screen.getByText("Экспортировать данные")
    act(() => {
      fireEvent.click(exportData)
    })
    const openSpy =  jest.spyOn(window, "open")

    open()
  
    await waitFor(() => expect(openSpy).toHaveBeenCalled())
  })
  it("export data on click (inactive marker)", async () => {
    renderWithProviders(<BrowserRouter><Map /></BrowserRouter>, {
      preloadedState: defaultState,
    })
    
    const exportData = screen.getByText("Экспортировать данные")
    act(() => {
      fireEvent.click(exportData)
    })
    const openSpy =  jest.spyOn(window, "open")

    open()
  
    await waitFor(() => expect(openSpy).toHaveBeenCalled())
  })
})

