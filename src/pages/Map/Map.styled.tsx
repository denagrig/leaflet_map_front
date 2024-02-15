import styled from "styled-components"

export const MainPageContainer = styled.div`
  display:flex;
`

export const ShowMoreButton = styled.button`
  position: relative;
  left: 38%;
`


export const MarkerButton = styled.button`
  position: relative;
  left: 50%;
`

export const MarkerLi = styled.li`
  display:flex;
  width: 100%;
`


export const ExportButton = styled.button`
  position: relative;
  border: 0px;
  cursor: pointer;
  vertical-align: middle;
  font-weight: 600;
  font-family: "Inter", sans-serif;
  font-size: 0.9375rem;
  line-height: 1.75;
  width: 100%;
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
