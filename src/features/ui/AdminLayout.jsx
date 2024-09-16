import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AdminLayout() {
  return (
    <div className="m-auto flex h-full w-full  flex-row justify-start rounded-md">
      <div className="h-full">
        <Sidebar />
      </div>
      <div className=" h-[90vh] w-full overflow-auto bg-stone-100 p-10 ">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
