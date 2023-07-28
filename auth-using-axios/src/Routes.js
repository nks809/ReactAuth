import React from "react";
import App from "./App";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Account } from "./components/Account";
import { Manage } from "./components/Manage";
import { Admin } from "./components/Admin";
import { Unauthorized } from "./components/Unauthorized";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { RequireAuth } from "./components/RequireAuth";
import { Missing } from "./components/Missing";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                {/*public route */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="unauthorised" element={<Unauthorized />} />
                <Route path="/" element={<Home />} />

                {/* Protected Routes */}
                <Route element={<RequireAuth allowedRoles={['admin']} />}>
                    <Route path="admin" element={<Admin />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={['manager']} />}>
                    <Route path="manage" element={<Manage />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={['account']} />}>
                    <Route path="account" element={<Account />} />
                </Route>

                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    )
}
