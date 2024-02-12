import Sidebar from "src/components/Sidebar/Sidebar"
import {
  UserListHeader,
  UserListPageContainer,
  UserSearchInput,
  UserSearchTableContainer,
  UserSearchTableHead,
} from "src/pages/Admin/UserList/UserList.styled"
import { useEffect, useMemo } from "react"
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  flexRender,
} from "material-react-table"
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material"
import { DeviceData, User, deviceTableItem } from "src/types"
import { Page, Role } from "src/data"
import { useAppSelector } from "src/hooks"
import { useNavigate } from "react-router-dom"

const AdminUsersList = () => {
  const navigate = useNavigate()
  const curUser: User = useAppSelector((state) => state.user.userData)
  const devicesData: DeviceData[] = useAppSelector((state) => state.device.devicesData)

  const convertData = (deviceData : DeviceData[]) =>{
    const deviceTableData: deviceTableItem[] = []
    deviceData.map((device: DeviceData) => {
      const deviceTableRow: deviceTableItem = {
        id: device.id,
        curCords: device.curCords.latitude + " " +  device.curCords.longitude,
        prevCords: device.previousCords[0].latitude + " " +  device.previousCords[0].longitude,
        status: device.status,
      }
      deviceTableData.push(deviceTableRow)
    })
    return deviceTableData
  }

  useEffect(() => {
    if (curUser.Role == Role.User) navigate("/map")
    if (curUser.Role == Role.LoggedOut || curUser.Role == Role.HasErrors) navigate("/login")
  }, [curUser.Role, navigate])

  const columns = useMemo<MRT_ColumnDef<deviceTableItem>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "curCords",
        header: "Текущие координаты",
      },
      {
        accessorKey: "prevCords",
        header: "Предыдущие координаты",
      },
      {
        accessorKey: "status", 
        header: "Статус",
      },
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data: convertData(devicesData),
    enableRowSelection: false,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      showGlobalFilter: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [10],
      variant: "outlined",
      showRowsPerPage: false,
    },
    paginationDisplayMode: "pages",
  })

  return (
    <UserListPageContainer>
      <Sidebar curPage = {Page.deviceData} />
      <UserSearchTableContainer>
        <Stack sx={{ m: "2rem 0" }}>
          <UserListHeader variant="h3">Устройства</UserListHeader>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <UserSearchInput placeholder= {"Поиск устройства"} table={table} />
            <MRT_TablePagination table={table} />
          </Box>
          <TableContainer>
            <Table>
              <UserSearchTableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell align="center" variant="head" key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.Header ??
                                header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </UserSearchTableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} selected={row.getIsSelected()}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell width = "20%" align="center" variant="body" key={cell.id}>
                        <MRT_TableBodyCellValue cell={cell} table={table} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
        </Stack>
      </UserSearchTableContainer>
    </UserListPageContainer>
  )
}

export default AdminUsersList
