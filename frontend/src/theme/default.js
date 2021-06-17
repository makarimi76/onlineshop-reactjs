import { createMuiTheme } from "@material-ui/core/styles"

import IRANYekanWebRegular from './fonts/IRANYekanWeb-Regular.woff'

const IRANYekan = {
    fontFamily: 'IRANYekan',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src: `
    url(${IRANYekanWebRegular}) format('woff')
  `
}

export const defaultTheme = createMuiTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#c62828',
        },
        secondary: {
            main: '#2196f3',
        },
        background: {
            default: "#ffffff"
        },
    },
    typography: {
        fontFamily: [
            'IRANYekan',
            'Roboto'
        ].join(','),
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [IRANYekan],
            },
        },
    },
});