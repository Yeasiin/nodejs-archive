import { styled } from "styled-components";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Wrapper>
      <div className="container">
        <div className="nav">
          <div className="logo">
            <Link to="/">Cookie Auth</Link>
          </div>
          <div>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register"> Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .container {
    max-width: 1200px;
    margin-inline: auto;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    margin-block: 20px;
  }

  .logo {
    font-size: 20px;
    font-weight: 700;
  }

  .nav ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    gap: 10px;
  }
`;
