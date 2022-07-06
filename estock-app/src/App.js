import './App.css';
import { Provider } from 'react-redux'
import store from "./services/index"

import Login from "./pages/Login";

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <Login></Login>
          </div>
      </Provider>

  );
}

export default App;
