// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Homepage from "./components/homepage";
import Header from "./components/header";
import Footer from "./components/footer";
import CreateAppointment from "./components/createAppoinment";


const App = () => {
  return (
    <div>
      <Header />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/createAppoinment' element={<CreateAppointment />}/>
      </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
