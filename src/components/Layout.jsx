import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background text-text-main font-sans selection:bg-primary selection:text-white">
            <Navbar />
            <main className="flex-grow pt-4">
                <Outlet />
            </main>
            <footer className="border-t border-border bg-surface py-8 mt-auto">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-text-muted text-sm">
                        Copyright © {new Date().getFullYear()} - All rights reserved by <span className="text-white font-semibold">PetVivid</span>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
