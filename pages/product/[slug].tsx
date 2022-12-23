import React, {useState, useContext, useEffect} from 'react';
import Layout from "../../components/Layout";
import {useRouter} from "next/router";
import data from "../../utils/data";
import Link from "next/link";
import Image from "next/image";
import { Store } from "../../utils/Store";
import ErrorToast from "../../components/ErrorToast";

function ProductScreen() {
    const [errorMessage, setErrorMessage] = useState("");
    const [showToast, setShowToast] = useState(true);

    useEffect(() => {
        if (errorMessage !== '') {
            const timeoutId = setTimeout(() => {
                setShowToast(false);
            }, 5000); // remove toast after 5 seconds

            return () => clearTimeout(timeoutId);
        }
    }, [errorMessage]);

    const { state, dispatch } = useContext(Store);

    const { query } = useRouter();
    const { slug } = query;
    const product = data.products.find(x => x.slug === slug);
    if (!product) {
        return <div>Product Not Found</div>
    }

    /* This function is a handler for adding a product to the cart. It first checks if the product already exists in the cart.
    If it does, it checks if there is sufficient stock to increase the quantity by 1. If there is not the sufficient stock, it displays an alert to the user.
    If the product does not already exist in the cart or there is sufficient stock to increase the quantity, it dispatches an action to add the product to the cart with the specified quantity. */
    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        let quantity = 1;
        if (existItem) {
            if (product.countInStock == "Unlimited") {
                quantity = existItem.quantity + 1;
            }
            else if (product.countInStock > existItem.quantity) {
                quantity = existItem.quantity + 1;
            } else {
                setErrorMessage("Sorry, there is insufficient stock to add this item to your cart.");
                setShowToast(true);
                return;
            }
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    }

    return (
        <Layout title={product.name}>
            {showToast && errorMessage !== "" && <ErrorToast message={errorMessage} />}
            <div className="py-2">
                <Link href="/">Back to home</Link>
            </div>
            <div className="grid md:grid-cols-4 md:gap-3">
                <div className="md:col-span-2">
                    <Image src={product.image} alt={product.name} height={64} width={64} layout="responsive" >

                    </Image>
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className="text-lg">{product.name}</h1>
                        </li>
                        <li>Categories: {product.categories.map((x, index) => (
                            <div style={{ display: "inline-block" }}>
                                {x}
                                {index !== product.categories.length - 1 && ',\u00A0'}
                            </div>
                        ))}</li>
                        <li>Brand: {product.brand}</li>
                        <li>Rating: {product.rating} Stars ({product.numReviews} Reviews)</li>
                        <li>Description: {product.description}</li>
                    </ul>
                </div>
                <div>
                    <div className="card p-5">
                        <div className="mb-2 flex justify-between">
                            <div>Price</div>
                            <div>{product.price === 0 ? "Free" : `${product.price}€`}</div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <div>Status</div>
                            <div>{typeof product.countInStock === "string" ? product.countInStock : product.countInStock > 0 ? "In Stock" : "Out of Stock"}</div>
                        </div>
                        <button className="primary-button w-full" onClick={addToCartHandler}>Add to card</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductScreen;