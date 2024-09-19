import { Alert, Button, Input, Spinner } from "@material-tailwind/react";
import { SyntheticEvent, useCallback, useState } from "react";
import { BsCheck2Circle, BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import { Navigate, useNavigate } from "react-router-dom";
import { doLogin, doRegister, isAuthorize } from "../utils/auth";

const Login = () => {
    const navigate = useNavigate();
    const currentUser = isAuthorize();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState({ isOpen: false, isError: false, message: '' });
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);
    const [variant, setVariant] = useState<'login' | 'register'>('login');

    if (currentUser) return <Navigate to="/" />;

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        if (variant === 'register') {
            doRegister(username, password, email)
                .then(() => setVariant('login'))
                .catch(err => setSnackbar({ isOpen: true, isError: true, message: err.message }))
                .finally(() => setLoading(false))
        }

        if (variant === 'login') {
            doLogin(username, password)
                .then(() => navigate("/"))
                .catch(err => setSnackbar({ isOpen: true, isError: true, message: err.message }))
                .finally(() => setLoading(false))
        }
    };

    const toggleVariant = useCallback(() => {
        if (variant === 'login') {
            setVariant('register')
        } else {
            setVariant('login')
        }
    }, [variant]);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-blue-gray-50">
            <div className="min-h-[35vh] w-[90vw] md:w-auto mx-auto md:mx-6 mt-6 rounded-xl bg-[url(https://lh3.googleusercontent.com/p/AF1QipPiy7ypA15I3e4ySCVo6JMe23wn6VKMX4iq4KBL=s680-w680-h510)] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
            </div>
            <div className="w-[90vw] sm:[70vw] md:w-[50vw] xl:w-[30vw] bg-white rounded-xl p-6 shadow-md relative mx-auto -my-24">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 bg-blue-600 p-4 rounded-lg w-3/4 mx-auto">
                    <div className="text-lg text-white font-bold text-center">Welcome Back</div>
                </div>
                <div className="mt-6">
                    <div>{variant === 'login' ? 'Login' : 'Register'}</div>
                    <div className="mt-2 text-sm text-[#687176]">Please enter email and password to access your account.</div>
                </div>
                {snackbar.isOpen && (
                    <Alert
                        icon={snackbar.isError ? <CiWarning className="my-auto w-6 h-6" /> : <BsCheck2Circle className="my-auto w-6 h-6" />}
                        className={`${snackbar.isError ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-green-500/10 border-green-500 text-green-500'} rounded-none border-l-4 font-medium my-4`}
                        action={
                            <Button
                                variant="text"
                                color="white"
                                size="sm"
                                className="!absolute top-3 right-3 text-blue-gray-500"
                                onClick={() => setSnackbar({ isOpen: false, isError: false, message: '' })}
                            >
                                Close
                            </Button>
                        }
                    >
                        {snackbar.message}
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    {variant === 'register' && (
                        <Input
                            type="email"
                            placeholder="email"
                            name="email"
                            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                            labelProps={{ className: "hidden" }}
                            containerProps={{ className: "min-w-[100px] my-4" }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    )}
                    <Input
                        type="text"
                        placeholder="username"
                        name="username"
                        className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{ className: "hidden" }}
                        containerProps={{ className: "min-w-[100px] my-4" }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{ className: "hidden" }}
                        containerProps={{ className: "min-w-[100px] mb-8" }}
                        icon={
                            showPassword ?
                                <BsEyeSlash onClick={() => setShowPassword(!showPassword)} className="cursor-pointer" /> :
                                <BsEyeFill onClick={() => setShowPassword(!showPassword)} className="cursor-pointer" />
                        }
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        className="mt-6 flex justify-center items-center gap-2"
                        fullWidth type="submit"
                        color={isLoading ? "blue-gray" : "blue"}
                        variant="gradient"
                    >
                        {isLoading ? (
                            <>
                                <Spinner className="h-4 w-4" />
                                Loading
                            </>
                        ) : (
                            variant === 'login' ? 'Login' : 'Register'
                        )}
                    </Button>
                </form>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === 'login' ? 'New to BTS Notes?' : 'Already have an account?'}
                    </div>
                    <div onClick={toggleVariant} className="underline cursor-pointer">
                        {variant === 'login' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;