import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App'
import { defaultTheme } from './theme/default'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <div dir="rtl">
        <CssBaseline />
        <App />
      </div>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)