import styled from "styled-components"

export const RegisterPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`

export const RegisterContainer = styled.div`
  flex-direction: column;
  width: 80%;

`

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  position: relative;
  width : 80%;
  top: 100px;
  left: 200px;
`

export const RegisterHeader = styled.text`
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.2;
  position: relative;
  top: 60px;
  left: 440px;
`


export const InputContainer = styled.div`
  margin: 0px 40px 30px 0px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.4375em;
  font-family: "Inter", sans-serif;
  color: rgb(17, 25, 39);
  box-sizing: border-box;
  cursor: text;
  display: inline-flex;
  width: 40%;
  position: relative;
  background-color: transparent;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(85, 85, 85);
  &:focus-within {
    background-color: transparent;
    box-shadow: rgb(99, 102, 241) 0px 0px 0px 2px;
  }
`

export const RegisterButton = styled.button`
  position: relative;
  border: 0px;
  cursor: pointer;
  vertical-align: middle;
  left: 290px; 
  font-weight: 600;
  font-family: "Inter", sans-serif;
  font-size: 0.9375rem;
  line-height: 1.75;
  width: 30%;
  color: rgb(255, 255, 255);
  background-color: rgb(99, 102, 241);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 5px;
  border-radius: 12px;
  text-transform: none;
  padding: 11px 24px;
  transition:
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    background-color: rgb(43, 45, 168);
  }
`

export const RegisterInput = styled.input`
  font-family: inherit;
  border: 0px;
  background: none;
  height: 1.4375em;
  min-width: 0px;
  width: 100%;
  animation-name: mui-auto-fill-cancel;
  animation-duration: 10ms;
  padding: 25px 12px 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  &:focus {
    outline: 0px;
  }
`

export const RegisterLabel = styled.label`
  color: rgb(108, 115, 127);
  line-height: 1.4375em;
  font-family: "Inter", sans-serif;
  padding: 0px;
  font-size: 14px;
  font-weight: 500;
  display: block;
  transform-origin: left top;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(133% - 24px);
  position: absolute;
  transform: translate(12px, 7px) scale(0.75);
  pointer-events: auto;
  user-select: none;
  transition: 0.2s ease all;
  ${RegisterInput}:focus ~ & {
    color: rgb(43, 45, 168);
  }
`
