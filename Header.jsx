import logo from '../images/logo.jpg';
import '../styles/header.css';

export default function Header({ children }) {
  return (
    <div className="header-container">
      <img src={logo} alt="Logo" />
      {children}
    </div>
  );
}
