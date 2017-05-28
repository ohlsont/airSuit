import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as injectTapEventPlugin from 'react-tap-event-plugin'

import { Hello } from './components/Hello'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

ReactDOM.render(
    <MuiThemeProvider>
        <Hello compiler="TypeScript" framework="React" />
    </MuiThemeProvider>,
    document.getElementById('app'),
)
