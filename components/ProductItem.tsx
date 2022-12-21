import React from 'react';
import Link from "next/link";

// @ts-ignore
function ProductItem({ product }) {
    return (
        <div className="card">
            <Link href={`/product/${product.slug}`} className="flex items-center justify-center shadow">
                <div>
                    <img src={product.image} alt={product.name} className="lg:h-80 md:h-56 sm:h-36 rounded" />
                </div>
            </Link>

            <div className="flex flex-col items-center justify-center p-5">
                <Link href={`/product/${product.slug}`}>
                    <div>
                        <h2 className="text-lg">{product.name}</h2>
                    </div>
                </Link>
                <p className="mb-2">{product.brand}</p>
                <p className="mb-2">{product.price === 0 ? "Free" : `${product.price}€`}</p>
                <button className="primary-button" type="button">Add to cart</button>
            </div>
        </div>
    )
}
export default ProductItem;