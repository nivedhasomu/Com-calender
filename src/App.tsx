import { BrowserRouter } from "react-router-dom"
import RoleRoutes from "./rbac/RoleRoutes"
import { Provider } from "react-redux"
import store from "./store"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer />
        <RoleRoutes />
      </Provider>
    </BrowserRouter>
  )
}

export default App