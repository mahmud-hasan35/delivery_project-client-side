// components/AdminRoute.jsx
import { Navigate} from "react-router";

import UseAuth from "../Hook/useAuth";
import useUserRole from "../Hook/useUserRole";

const RiderRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const {role, roleLoading} = useUserRole();


  if (loading || roleLoading) {
        return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );; // or a loading message
  }

  if (!user && role !== "rider") {
    
    return <Navigate to="/forbidden" state={{ from: location?.pathname }} replace />;
  }

  return children;

 
};

export default RiderRoute;
