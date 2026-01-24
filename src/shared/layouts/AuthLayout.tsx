import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-6">
                <Outlet />
            </div>
        </div>
    );
};
