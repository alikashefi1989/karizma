// module
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { BsSunFill, BsMoonStars } from 'react-icons/bs';
// custom
import routes from '../routes/routes';
import { RouteModel } from "../models/route";
import useStore from "../state-management/store";
import { Store } from "../models/store";
import { ROUTES } from "../routes/routes.enum";

const Header = () => {
    const { pathname } = useLocation();
    const darkMode = useStore((store: Store) => store.darkMode);
    const navigate = useNavigate();
    const setDarkMode = useStore((store: Store) => store.setDarkMode);

    return (
        <HeaderWrapper>
            <Nav>
                {
                    routes.filter((item: RouteModel) => item.path !== ROUTES.NOT_FOUND).map((item: RouteModel) => (
                        <NavItem
                            key={item.path}
                            isMatch={pathname === item.path}
                            onClick={() => pathname !== item.path && navigate(item.path)}
                        >{item.name}</NavItem>
                    ))
                }
            </Nav>
            <DarkMode onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <BsSunFill size='25px' /> : <BsMoonStars size='25px' />}
            </DarkMode>
        </HeaderWrapper>
    );
};

export default Header;

const HeaderWrapper = styled.div<any>(({ theme }) => ({
    position: 'fixed',
    top: 0,
    width: '100%',
    height: theme.styleConfig.headerHeight,
    backgroundColor: theme.palette.headerBgColor,
    color: theme.palette.headerColor,
    paddingBlock: '10px',
    paddingInline: '35px',
    margin: 0,
    zIndex: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    transition: 'all 1s linear',
}));

const Nav = styled.div(() => ({
    width: 'max-content',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '15px',
}));

const NavItem = styled.div<any>(({ isMatch, theme }) => ({
    boxSizing: 'border-box',
    width: 'max-content',
    height: '100%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: isMatch ? `1px solid ${theme.palette.headerColor}` : 'none',
    fontSize: '16px',
    fontWeight: 600,
    textTransform: 'capitalize',
    cursor: isMatch ? 'default' : 'pointer',
    ':hover': {
        fontWeight: 900,
        color: 'greenyellow',
        borderBottomColor: 'greenyellow',
    },
}));

const DarkMode = styled.div(() => ({
    boxSizing: 'border-box',
    width: 'max-content',
    height: '100%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
}))