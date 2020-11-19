import React from 'react';

import { Link } from 'react-router-dom';

import { FiHome } from 'react-icons/fi';
import { Container } from './styles';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'small' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <nav>
        <Link to="/">
          <h1>Rede Social</h1>
          <p>
            <FiHome size={20} /> Home
          </p>
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
