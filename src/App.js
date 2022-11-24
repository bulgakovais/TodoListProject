
import React from 'react'
import { Header } from './component/Header/Header'
import { CreateTodo } from './component/CreateTodo/CreateTodo'
import { Provider } from 'react-redux';
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import './App.less'

function App() {

  return (<div className='container'>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Header />
        <CreateTodo />
      </PersistGate>
    </Provider>
  </div>
  )
}

export default App;