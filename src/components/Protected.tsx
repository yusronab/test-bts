import { Drawer, IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import { HiBars3 } from "react-icons/hi2";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { isAuthorize } from "../utils/auth";

const Protected = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const currentUser = isAuthorize();

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    if (!currentUser) return <Navigate to="/login" />;

    return (
        <div className="min-h-screen max-w-screen bg-blue-gray-50 flex gap-8 p-6">
            <Drawer open={isDrawerOpen} onClose={closeDrawer}>
                <Sidebar />
            </Drawer>
            <div className="hidden lg:block">
                <Sidebar />
            </div>
            <div className="w-full">
                <IconButton variant="text" size="lg" className="lg:hidden" onClick={openDrawer}>
                    {isDrawerOpen ? (
                        <HiX className="h-8 w-8 stroke-2" />
                    ) : (
                        <HiBars3 className="h-8 w-8 stroke-2" />
                    )}
                </IconButton>
                <Outlet />
            </div>
        </div>
    );
};

export default Protected;