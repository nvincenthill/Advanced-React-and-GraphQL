import styled from "styled-components";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import Nav from "../components/Nav";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  // TODO: display error message to user
};

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.primaryColor};
    color: ${props => props.theme.white};
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: ${props => props.theme.largeBreakPoint}) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.div`
  .bar {
    border-bottom: 10px solid ${props => props.theme.primaryColor};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: ${props => props.theme.largeBreakPoint}) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
  .main-title-container {
    background: ${props => props.theme.primaryColor};
    margin: 0 auto;
    width: 35vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main-title {
    font-size: 4.5rem;
    line-height: 6rem;
  }
  .icon {
    height: 8vh;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <Link href="/">
            <div className="main-title-container">
              <img src="../static/skunk.png" alt="skunk.png" className="icon" />
              <a className="main-title">Zen Skunk</a>
            </div>
          </Link>
        </Logo>

        <Nav />
      </div>
      {/* <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>
        <p>Cart</p>
      </div> */}
    </StyledHeader>
  );
};

export default Header;
