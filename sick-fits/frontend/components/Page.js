import React from "react";
import styled, { ThemeProvider, injectGlobal } from "styled-components";
import Header from "../components/Header";
import Meta from "../components/Meta";

const theme = {
  red: "#FF0000",
  green1: "#059033",
  green2: "#93CB56",
  green3: "#7BAA47",
  green4: "#355A30",
  black: "#393939",
  grey: "#3A3A3A",
  white: "white",
  lightGrey: "#E1E1E1",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  largeBreakPoint: "1300px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};

const StyledPage = styled.div`
  background: ${props => props.theme.white};
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

injectGlobal`
  @font-face {
    font-family: radnika_next;
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: radnika_next;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`;

class Page extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
