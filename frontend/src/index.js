import React from 'react'
import ReactDOM from 'react-dom'
import { create } from 'jss'
import rtl from 'jss-rtl'

import { StylesProvider, jssPreset, ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from '@material-ui/core/CssBaseline'

import App from './App'
import { defaultTheme } from './theme/default'

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider jss={jss}>
      <ThemeProvider theme={defaultTheme}>
        <div dir="rtl">
          <CssBaseline />
          <App />
        </div>
      </ThemeProvider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
)