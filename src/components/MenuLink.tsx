// components/MenuLink.tsx
import { MenuItem } from '@mui/material';
import Link from 'next/link';

const MenuLink = ({ href, children, onClick }) => {
  return (
    <MenuItem onClick={onClick}>
      <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        {children}
      </Link>
    </MenuItem>
  );
};

export default MenuLink;
