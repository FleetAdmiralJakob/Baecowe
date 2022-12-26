import React, {useContext} from 'react'
import {Store} from "../utils/Store";
import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

function CartScreen() {
    const router = useRouter();

    const { state, dispatch } = useContext(Store);

    const {
        cart: { cartItems },
    } = state;

    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <Layout title="Shopping Cart">
            <h1 className="mb-4 text-xl">Shopping Cart</h1>
            {
                cartItems.length === 0 ? (
                    <div>Cart is empty. <Link href="/" className="underline">Go Shopping</Link></div>
                ) : (
                    <div className="grid md:grid-cols-4 md:gap-5">
                        <div className="overflow-x-auto md:col-span-3">
                            <table className="min-w-full">
                                <thead className="border-b">
                                <tr>
                                    <th className="px-5 text-left">Item</th>
                                    <th className="p-5 text-right">Quantity</th>
                                    <th className="p-5 text-right">Price</th>
                                    <th className="p-5">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.slug}>
                                        <td>
                                            <Link href={`/product/${item.slug}`}>
                                                <div className="flex items-center">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                    ></Image>
                                                    &nbsp;
                                                    <a>{item.name}</a>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="p-5 text-right">{item.quantity}</td>
                                        <td className="p-5 text-right">{item.price === 0 ? "Free" : `${item.price}€`}</td>
                                        <td className="p-5 text-center">
                                            <button className="text-red-500" onClick={() => removeItemHandler(item)}>
                                                <XCircleIcon className="h-5 w-5"></XCircleIcon>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card p-5">
                            <ul>
                                <li>
                                    <div className="p-3 text-xl">
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}): {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}€
                                    </div>
                                </li>
                                <li>
                                    <div className="flex justify-between">
                                        <div>Shipping</div>
                                        <div>Free</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex justify-between">
                                        <div>Tax</div>
                                        <div>0€</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex justify-between">
                                        <div>
                                            <strong>Order Total</strong>
                                        </div>
                                        <div>
                                            <strong>{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}€</strong>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <button onClick={() => router.push('/shipping')} className="primary-button w-full" type="button">Proceed to Checkout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            }
        </Layout>
    )
}

export default CartScreen;