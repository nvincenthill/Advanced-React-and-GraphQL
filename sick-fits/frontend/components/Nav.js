import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';
import SignOut from './SignOut';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="./shop">
          <a>Shop</a>
        </Link>
        {me && (
          <React.Fragment>
            <Link href="./sell">
              <a>Sell</a>
            </Link>
            <Link href="./orders">
              <a>Orders</a>
            </Link>
            <Link href="./me">
              <a>My Account</a>
            </Link>
            <SignOut />
          </React.Fragment>
        )}
        {!me && (
          <Link href="./signup">
            <a>Sign In</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
