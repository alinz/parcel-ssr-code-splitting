import React from 'react'
import Loadable from 'react-loadable'

const Hello = Loadable({
  loader: () => import('./Hello.js'),
  loading: () => <div>Loading...</div>
})

const App = props => {
  return (
    <div>
      <Hello />
    </div>
  )
}

export default App
