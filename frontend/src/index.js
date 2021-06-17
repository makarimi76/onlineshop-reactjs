import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from "@material-ui/core/styles"

import App from './App'
import { defaultTheme } from './theme/default'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <div dir="rtl">
        <App />
      </div>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)