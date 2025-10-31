import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* reset เบาๆ */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background: #f5f5f5;
    color: #222;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    display: block;
  }

  /* utility นิดหน่อย */
  .favorites-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    padding: 20px;
  }
`;

export default GlobalStyle;
