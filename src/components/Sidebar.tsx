import { Card, Typography, List, Button } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import LogoutDialog from "./LogoutDialog";

const sidebar = [
    {
        title: 'Dashboard',
        to: '/',
        icon: <BiHome className="w-5 h-5 text-inherit" />
    },
]

const Sidebar = () => {
    return (
        <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 border border-blue-gray-100">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    BTS Notes
                </Typography>
            </div>
            <List className="h-full">
                {sidebar.map((item, i) => (
                    <NavLink to={item.to} key={i}>
                        {({ isActive }) => (
                            <Button
                                variant={isActive ? "gradient" : "text"}
                                color={isActive ? "blue" : "blue-gray"}
                                className="flex items-center gap-4 px-4 capitalize"
                                fullWidth
                            >
                                {item.icon}
                                <Typography
                                    color="inherit"
                                    className="font-medium capitalize"
                                >
                                    {item.title}
                                </Typography>
                            </Button>
                        )}
                    </NavLink>
                ))}

                <LogoutDialog />
            </List>
        </Card>
    );
}

export default Sidebar;