import styled from "styled-components"

export const SidebarContainer = styled.div`
  width: 280px;
  padding: 24px, 0px, 24px, 0px;
  gap: 24px;
  height: 100vh;
  background: #111827;
`

export const SidebarLogo = styled.img`
  width: 35px;
  height: 43.79px;
  top: 31.37px;
  left: 25px;
  position: absolute;
`

export const SidebarLogoText = styled.p`
  width: 106px;
  height: 38px;
  top: 8px;
  left: 76px;
  font-family: "Inter", sans-serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
  position: absolute;
  color: #ffffff;
  white-space: nowrap;
`

export const SidebarPurpleLogoText = styled.span`
  color: #6366f1;
  white-space: wrap;
`

export const SidebarDivider = styled.hr`
  width: inherit;
  top: 112px;
  position: absolute;
  border: 1px;
  background: #9da4ae7d;
  border: 1px solid #9da4ae7d;
`

export const SidebarNavigation = styled.nav`
  width: 240px;
  position: absolute;
  top: 120px;
  left: -20px;
  height: Fill (978px);
  padding: 0px, 16px, 0px, 16px;
  gap: 16px;
`

export const SidebarNavigationList = styled.ul`
  position: absolute;
  width: inherit;
  height: 348px;
  list-style-type: none;
`

export const SidebarNavigationLi = styled.li`
  padding: 0 0 4px 0;
`

export const SidebarNavigationDestinationContainer = styled.a<{$isActive: boolean}>`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-block;
  background-color: ${(props) => props.$isActive ? "rgb(131, 131, 131)" : "transparent"};
  transition:
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    background-color: rgb(131, 131, 131);
  }
`

export const SidebarNavigationIcon = styled.img`
  height: 25px;
  width: 25px;
  padding-right: 10px;
  padding-left: 10px;
  text-align: center;
  position:relative;
  top:15%;

`

export const SidebarNavigationText = styled.span`
  position: relative;
  width: 100%;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0em;
  color: #dadada;
  white-space: nowrap
`

export const UserDataContainer = styled.div`
  width: 240px;
  height: 81px;
  bottom: 20px;
  left: 18px;
  position:absolute;
  border-radius: 10px;
  background: #252E3E;
  display:flex;
  flex-direction:row;
`

export const UserDataIcon = styled.img`
  height: 56px;
  width: 56px;
  text-align: center;
  position:relative;
  top: 15%;
  padding-left: 10px;
`

export const UserDataName = styled.span`
  width: 100%;
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0em;
  color: #dadada;
  white-space: wrap;
`

export const UserDataRole = styled.span`
  width: 100%;
  font-family: "Inter", sans-serif;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0em;
  color: grey;
`

export const UserDataTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 10px 10px 10px;
`