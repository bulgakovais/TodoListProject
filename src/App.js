
import React from 'react'
import { Header } from './component/Header/Header'
import { CreateTodo } from './component/CreateTodo/CreateTodo'
import { Provider } from 'react-redux';
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

function App() {

  return (<>


    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Header />
        <CreateTodo />
      </PersistGate>
    </Provider>
  </>
  )
}

export default App;