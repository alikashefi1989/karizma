const styleConfig = {
    headerHeight: '60px',
};

const appTheme = {
    lightMode: {
        palette: {
            backgroundColor: 'white',
            color: 'black',
            headerBgColor: 'black',
            headerColor: 'white',
        },
        styleConfig,
    },
    darkMode: {
        palette: {
            backgroundColor: 'black',
            color: 'white',
            headerBgColor: 'white',
            headerColor: 'black',
        },
        styleConfig,
    },
};

export default appTheme;
