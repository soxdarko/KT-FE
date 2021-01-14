import Link from 'next/link';
import logo from '../../assets/img/logo.png';

const Logo = () => (
  <Link href="/">
    <img src={logo} alt="Kliktermin" />
  </Link>
);

export default Logo;
