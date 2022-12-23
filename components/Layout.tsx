import React, {useContext} from 'react';
import Head from "next/head";
import Link from "next/link";
import {Store} from "../utils/Store";

function Layout({ title, children }) {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    return (
        <>
            <Head>
                <title>{title ? title + " | Baecowe" : "Baecowe"}</title>
                <meta name="description" content="BAsic E COmmerce WEbsite" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex min-h-screen flex-col justify-between">
                <header>
                    <nav className="flex h-12 item-center justify-between px-4 shadow-md">
                        <div className="flex items-center">
                        <Link href="/">
                            <div className="text-lg font-bold">Baecowe</div>
                        </Link>
                        </div>
                        <div className="inline-flex">
                            <Link href="/cart"><div className="p-2 font-bold">Cart
                                {cart.cartItems.length > 0 && (
                                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                    </span>
                                )}
                                </div>
                            </Link>
                            <Link href="/login"><div className="p-2 font-bold">Login</div></Link>
                        </div>
                    </nav>
                </header>
                <main className="container m-auto mt-4 ml-0 px-4">{children}</main>
                <footer className="flex h-10 justify-center items-center shadow-inner">
                    <div className="text-ms font-semibold">Baecowe &copy; 2022 by <a href="https://www.roessner.tech" className="underline">Jakob Rössner</a></div>
                </footer>
            </div>
        </>
    )
}
export default Layout;