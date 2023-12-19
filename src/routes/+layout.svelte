<nav>
  <ul>
    <li><a href="/">Poképedia</a></li>
    <!-- Implement slider for light / dark mode -->
  </ul>
</nav>

<slot></slot>

<style>
  nav {
    width: 100%;
    height: 75px;
    background: darkgrey;
  }

  ul {
    font-size: 35px;
    margin: 0;
    padding: 0;
    height: 100%;
    list-style: none;
    display: flex;
    justify-content: right;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: white;
    padding: 15px;
  }
</style>