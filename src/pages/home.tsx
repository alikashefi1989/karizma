// module
import { ReactNode } from "react";
import styled from "@emotion/styled";

const Home = (): ReactNode => {

    return (
        <HomeWrapper>
            <Title>home</Title>
            <Info>
                Hello dear
            </Info>
            <Info>
                The task considered from your side consists of 2 sections and accordingly, apart from the current page, two other pages are considered for each section and you can access the page of each section through the menu.
            </Info>
            <Info>
                Apart from the two pages mentioned above and the current page, another page has been created for undefined paths, which you can view by typing an undefined path in the address bar of the browser.
            </Info>
            <Info>
                Also, a color theme has been defined for day and night mode, and you can change the theme by clicking on the icon in the menu section (moon and sun icon).
            </Info>
            <Info>
                Thanks for reading this text. - Ali Kashefi
            </Info>
        </HomeWrapper>
    );
};

export default Home;

const HomeWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '10px',
}));

const Title = styled.h1(() => ({
    fontWeight: 900,
    fontSize: '35px',
    textTransform: 'capitalize',
}));

const Info = styled.p(() => ({
    width: '50%',
    fontWeight: 500,
    fontSize: '18px',
    transition: 'all 2s linear',
}));