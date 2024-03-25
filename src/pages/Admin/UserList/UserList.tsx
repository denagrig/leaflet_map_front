import Sidebar from "src/components/Sidebar/Sidebar"
import {
  UserListButton,
  UserListHeader,
  UserListPageContainer,
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
  MRT_GlobalFilterTextField,
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
import { User, UserTableItem } from "src/types"
import { Page, Role, users } from "src/data"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "src/hooks"
import { deleteUser } from "src/slices/userSlice"

const AdminUsersList = () => {
  const navigate = useNavigate()
  const curUser: User = useAppSelector((state) => state.user.userData)
  const allUsers: User[] = users
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (curUser.Role == Role.User) navigate("/map")
    if (curUser.Role == Role.LoggedOut || curUser.Role == Role.HasErrors) navigate("/login")
  }, [curUser.Role, navigate])

  const convertData = (userData : User[]) =>{
    const userTableData: UserTableItem[] = []
    userData.map((user: User) => {
      const userTableRow: UserTableItem = {
        name: user.Name,
        login: user.Login,
        gmail: user.Email,
        phoneNumber: user.Phone + "",
        role: user.Role == Role.Admin ? "Администратор" : "Пользоатель",
      }
      userTableData.push(userTableRow)
    })
    return userTableData
  }

  const deleteSelectedUser = (rowIndex: number) => {
    dispatch(deleteUser(allUsers[rowIndex].id))
  }

  const columns = useMemo<MRT_ColumnDef<UserTableItem>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Имя",
      },
      {
        accessorKey: "login",
        header: "Логин",
      },
      {
        accessorKey: "gmail",
        header: "Почта",
      },
      {
        accessorKey: "phoneNumber", 
        header: "Телефон",
      },
      {
        accessorKey: "role", 
        header: "Роль",
      },
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data: convertData(allUsers),
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
      <Sidebar curPage = {Page.userData}/>
      <UserSearchTableContainer>
        <Stack sx={{ m: "2rem 0" }}>
          <UserListHeader variant="h3">Пользователи</UserListHeader>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MRT_GlobalFilterTextField placeholder= {"Поиск пользователя"} table={table} />
            <MRT_TablePagination table={table} />
          </Box>
          <TableContainer>
            <Table>
              <UserSearchTableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell align="center" variant="head" key={header.id}>
                        { flexRender(
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
                {table.getRowModel().rows.map((row, index) => (
                  <TableRow key={row.id} selected={row.getIsSelected()}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell width = "20%" align="center" variant="body" key={cell.id}>
                        <MRT_TableBodyCellValue cell={cell} table={table} />
                      </TableCell>
                    ))}
                    <TableCell>
                      <UserListButton onClick = {() => deleteSelectedUser(index)}>Удалить</UserListButton>
                    </TableCell>
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
