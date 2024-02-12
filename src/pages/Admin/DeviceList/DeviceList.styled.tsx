import { TableHead, Typography } from "@mui/material"
import { MRT_GlobalFilterTextField } from "material-react-table"
import styled from "styled-components"

export const UserListPageContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const UserSearchTableContainer = styled.div`
  position: relative;
  width: 85%;
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


export const DeviceListButton = styled.button`
  position: relative;
  border: 0px;
  cursor: pointer;
  vertical-align: middle;
  font-weight: 600;
  font-family: "Inter", sans-serif;
  font-size: 0.9375rem;
  line-height: 1.75;
  width: 70%;
  color: rgb(255, 255, 255);
  background-color: rgb(99, 102, 241);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 5px;
  border-radius: 12px;
  text-transform: none;
  padding: 0px 24px;
  transition:
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    background-color: rgb(43, 45, 168);
  }
`