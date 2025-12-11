import Link from 'next/link';
import { getAllProducts } from '@/lib/products';

function DiscountCard({ product }: { product: any }) {
    const originalPrice = product.price;
    const discountedPrice = originalPrice * 0.9; // 10% zniżki


    const productTypeSlug = product.type.replace(/\s+/g, '-');
    const linkHref = `/product-list/${productTypeSlug}/${product.id}`;

    return (
        <Link
            href={linkHref}
            className="block min-w-[200px] bg-white p-4 border border-red-200 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between"
        >
            <h4 className="text-md font-semibold text-gray-900 line-clamp-2">{product.name}</h4>
            <div className="mt-2 text-right">
                <p className="text-sm text-gray-500 line-through">
                    {originalPrice.toFixed(2)} zł
                </p>
                <span className="text-xl font-bold text-red-600">
                    {discountedPrice.toFixed(2)} zł
                </span>
            </div>
        </Link>
    );
}

export default function DiscountDefault() {

    const availableProducts = getAllProducts().filter(p => p.amount > 0);

    if (availableProducts.length === 0) {
        return null;
    }


    const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
    const randomDiscounts = shuffled.slice(0, 3);

    return (
        <div className="bg-red-50 p-4 rounded-lg mb-8">
            <h3 className="text-xl font-bold text-red-800 mb-3">🔥 Gorące Promocje!</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
                {randomDiscounts.map(product => (
                    <DiscountCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}