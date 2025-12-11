import Link from 'next/link';

import { Product } from '@/lib/products';

export default function ProductCard({ product }: { product: Product }) {

    const productTypeSlug = product.type.replace(/\s+/g, '-');
    const linkHref = `/product-list/${productTypeSlug}/${product.id}`;
    const imagePath = product.image.replace('public/', '/');

    return (
        <Link
            href={linkHref}
            className="block border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
        >
            <div className="relative h-48 mb-4">
                {/*  */}
                <img src={imagePath} alt={product.name} className="object-contain w-full h-full" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 truncate">
                {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Typ: {product.type}</p>
            <p className="text-sm text-gray-500">Ilość: {product.amount > 0 ? product.amount : 'Brak'}</p>
            <div className="mt-3">
                <span className="text-xl font-bold text-red-600">
                    {product.price.toFixed(2)} zł
                </span>
            </div>
        </Link>
    );
}