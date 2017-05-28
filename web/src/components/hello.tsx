import * as React from 'react'
import { AppBar } from 'material-ui'

export interface HelloProps {
  compiler: string
  framework: string
}

export class Hello extends React.Component<HelloProps, undefined> {
  render() {
    return <div>
        <AppBar
            title="Title ddd"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <h1>
            Hello kkps ee from {this.props.compiler} and {this.props.framework}!
        </h1>
    </div>
  }
}
