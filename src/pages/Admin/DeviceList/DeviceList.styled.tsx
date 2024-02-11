import { TableHead, Typography } from "@mui/material"
import { MRT_GlobalFilterTextField } from "material-react-table"
import styled from "styled-components"

export const UserListPageContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const UserSearchTableContainer = styled.div`
  position: relative;
  width: 80%;
  height: 20%;
  top: 10px;
  left: 20px;
`

export const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const UserListHeader = styled(Typography)`
  position: relative;
  width: 378px;
  height: 75px;
  top: -10px;
  font-family: "Inter", sans-serif;
`

export const UserSearchInput = styled(MRT_GlobalFilterTextField)`
  font-family: inherit;
  position: relative;
  top: -10px;
  border: 0px;
  background: none;
  height: 1em;
  min-width: 0px;
  width: 100%;
  animation-duration: 10ms;
  padding: 15px 15px 15px 15px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(229, 231, 235);
  &:focus {
    background-color: transparent;
    box-shadow: rgb(99, 102, 241) 0px 0px 0px 2px;
  }
`

export const UserSearchLabel = styled.img`
  width: 20px;
  height: 20px;
  position: relative;
  top: 10px;
  left: 10px;
`

export const UserSearchTableHead = styled(TableHead)`
	padding: 10px;
	font-weight: 500;
	font-size: 16px;
	line-height: 20px;
	text-align: left;
	color: #444441;
  background-color: rgb(248, 249, 250);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`
