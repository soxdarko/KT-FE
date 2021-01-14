import Link from 'next/link';

const NavItem = (props) => (
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  <li
    onClick={props.onClick}
    className={props.className}
    style={{ display: props.display, marginLeft: props.marginLeft }}
  >
    <Link href={props.link}>{props.children}</Link>
  </li>
);

export default NavItem;
