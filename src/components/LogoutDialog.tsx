import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutDialog = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    
    const handleLogout = async () => {
        setLoading(true);
        
        localStorage.removeItem('yusronTokenBts');
        navigate("/login");
        
        setLoading(false);
    };
    
    return (
        <>
            <Button variant="text" onClick={() => setOpen(true)} color="blue-gray" className="flex items-center gap-4 px-4 capitalize">
                <RiLogoutCircleLine className="h-5 w-5" />
                <Typography color="inherit" className="font-medium capitalize">Logout</Typography>
            </Button>
            <Dialog open={open} handler={() => setOpen(false)}>
                <DialogHeader>Confirmation Logout.</DialogHeader>
                <DialogBody className="flex flex-col gap-4">
                    <Typography>Are you sure want to logout?</Typography>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => setOpen(false)}
                        className="mr-1"
                        type="button"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        type="button"
                        disabled={isLoading}
                        onClick={handleLogout}
                    >
                        {isLoading ? 'Loading' : 'Confirm'}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default LogoutDialog;