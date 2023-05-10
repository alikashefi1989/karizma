// module
import { Global, ThemeProvider } from '@emotion/react';
import styled from "@emotion/styled";
// custom
import useStore from '../state-management/store';
import { Store } from '../models/store';
import appTheme from './theme';
import Header from './header';

export interface LayoutProps {
    children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = (props) => {
    const nightMode: boolean = useStore((store: Store) => store.darkMode);

    return (
        <ThemeProvider theme={nightMode ? appTheme.darkMode : appTheme.lightMode}>
            <Global
                styles={{
                    body: {
                        margin: 0,
                        padding: 0,
                    }
                }}
            />
            <Header />
            <LayoutWrapper>
                {props.children}
            </LayoutWrapper>
        </ThemeProvider>
    )
}

export default Layout;

const LayoutWrapper = styled.div<any>(({ theme }) => ({
    display: 'block',
    backgroundColor: `${theme.palette.backgroundColor}`,
    color: `${theme.palette.color}`,
    padding: 0,
    paddingInline: '35px',
    margin: 0,
    width: '100%',
    minHeight: '100vh',
    paddingTop: theme.styleConfig.headerHeight,
    overflowY: 'auto',
    zIndex: 1,
    boxSizing: 'border-box',
    transition: 'all 1s linear',
}));