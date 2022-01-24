// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Homepage from "./components/homepage";
import Footer from "./components/footer";
import CreateAppointment from "./components/createAppoinment";
import ManagerPage from "./companyComponents/managerPage";
import EmployeePage from "./companyComponents/employeePage";
import Signup from "./companyComponents/signup";
import Login from "./companyComponents/login";
import CreateSchedule from "./companyComponents/createSchedule";
import EditSchedule from "./companyComponents/editSchedule";
import ConfirmationPage from "./components/confirmationPage";
import ScheduleView from "./companyComponents/scheduleView";
import CompanyHub from "./companyComponents/companyHub";

const App = () => {
  return (
    <div>
      <div>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/createAppoinment' element={<CreateAppointment />}/>
        <Route path='/employeePage' element={<EmployeePage />}/>
        <Route path='/managerPage' element={<ManagerPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/createSchedule' element={<CreateSchedule />}/>
        <Route path='/editSchedule' element={<EditSchedule />}/>
        <Route path='/confirmationPage' element={<ConfirmationPage />}/>
        <Route path='/scheduleView' element={<ScheduleView />}/>
        <Route path='/companyHub' element={<CompanyHub />}/>
      </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
