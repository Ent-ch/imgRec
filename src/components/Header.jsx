const Header = props => <header className="container--baseline">
<h1 className="m--1 g--6">Navigation</h1>
<nav className="g--6 nav--horizontal">
  <ul>
    <li><a href="http://www.google.com">Nav link</a></li>
    <li><a href="http://www.google.com">Hello</a></li>
    <li><a href="http://www.google.com">Contact</a></li>
    <li className="dropdown"><a href="http://www.g.com">Dropdown</a>
      <ul>
        <li><a href="http://www.google.com">D Link</a></li>
        <li><a href="http://www.google.com">D Link</a></li>
        <li><a href="http://www.google.com">D Link</a></li>
        <li><a href="http://www.google.com">D Link</a></li>
      </ul>
    </li>
    <li><a href="http://www.google.com">Portfolio</a></li>
  </ul>
</nav>
</header>;

export default Header;
