import React from 'react';
import Head from "next/head";
import Link from "next/link";

function Layout({ title, children }) {
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
                            <Link href="/cart"><div className="p-2 font-bold">Cart</div></Link>
                            <Link href="/login"><div className="p-2 font-bold">Login</div></Link>
                        </div>
                    </nav>
                </header>
                <main className="container m-auto mt-4 ml-0 px-4">{children}</main>
                <footer className="flex h-10 justify-center items-center shadow-inner">
                    <div className="text-ms font-semibold">Baecowe &copy; 2022 by Jakob Rössner</div>
                </footer>
            </div>
        </>
    )
}
export default Layout;