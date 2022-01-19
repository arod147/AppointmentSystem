// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Homepage from "./components/homepage";
import Header from "./components/header";
import Footer from "./components/footer";
import CreateAppointment from "./components/createAppoinment";
import ManagerPage from "./companyComponents/managerPage";
import EmployeePage from "./companyComponents/employeePage";
import Signup from "./companyComponents/signup";
import Login from "./companyComponents/login";
import CreateSchedule from "./companyComponents/createSchedule";


const App = () => {
  return (
    <div>
      <Header />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/createAppoinment' element={<CreateAppointment />}/>
        <Route path='/employeePage' element={<EmployeePage />}/>
        <Route path='/managerPage' element={<ManagerPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/createSchedule' element={<CreateSchedule />}/>
      </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
