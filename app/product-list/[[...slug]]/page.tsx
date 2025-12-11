import { notFound } from 'next/navigation';
import Link from 'next/link';

import {
    getAllProducts,
    getProductsAlphabetically,
    getProductsByNewest,
    getProductsByCategory,
    getProductById,
    getAvailableProducts,
    Product
} from '@/lib/products';
import ProductCard from '../../components/product-card';
import AddToCartButton from '../../components/add-to-cart-button';


const slugToProductType = (slug: string) => decodeURIComponent(slug).replace(/-/g, ' ');



function ProductDetails({ product }: { product: Product }) {
    const imageLink = `/product-list/images/${product.id}`;
    const imagePath = product.image.replace('public/', '/');

    return (
        <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-lg shadow-lg">
            <div className="lg:w-1/3">
                <h1 className="text-3xl font-bold mb-4 lg:hidden">{product.name}</h1>
                <div className="relative w-full h-96 border rounded-lg overflow-hidden group">
                    <Link
                        href={imageLink}
                        scroll={false}
                        className="block w-full h-full"
                    >
                        <img
                            src={imagePath}
                            alt={product.name}
                            className="object-contain w-full h-full cursor-pointer group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center">
                            <span className="text-transparent group-hover:text-white font-bold bg-black/50 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                Powiększ
                            </span>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="lg:w-2/3">
                <h1 className="text-3xl font-bold mb-2 hidden lg:block">{product.name}</h1>
                <p className="text-2xl font-extrabold text-red-600 my-4">
                    Cena: {product.price.toFixed(2)} zł
                </p>

                <div className="mb-6 space-y-2">
                    <p className="text-gray-600">Kod: <span className="font-semibold text-gray-900">{product.code}</span></p>
                    <p className="text-gray-600">Typ: <span className="font-semibold text-gray-900">{product.type}</span></p>
                    <p className="text-gray-600">Dostępność:
                        <span className={`font-semibold ml-2 ${product.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.amount > 0 ? `W magazynie (${product.amount} szt.)` : 'Chwilowo brak'}
                        </span>
                    </p>
                </div>

                {product.amount > 0 ? (
                    <AddToCartButton productId={product.id} />
                ) : (
                    <button
                        className="w-full lg:w-auto bg-gray-400 text-white font-bold py-3 px-8 rounded-lg cursor-not-allowed"
                        disabled
                    >
                        Powiadom o dostępności
                    </button>
                )}

                <h2 className="text-xl font-bold mt-8 mb-3 border-b pb-2">Opis Produktu</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
        </div>
    );
}



function ProductList({ products, category, isAvailable, sort }:
    { products: Product[], category?: string, isAvailable: boolean, sort: 'name' | 'newest' }) {

    const categorySlug = category ? `/${category}` : '';

    const categories = [
        { slug: 'procesor', label: 'Procesory' },
        { slug: 'karta-graficzna', label: 'Karty Graficzne' },
        { slug: 'pamięć-ram', label: 'Pamięć RAM' },
        { slug: 'dysk', label: 'Dyski' },
    ];

    return (
        <div className="w-full">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                {category ? `Kategoria: ${slugToProductType(category).toUpperCase()}` : 'Wszystkie Produkty'}
            </h1>


            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-gray-100 rounded-lg gap-4">
                <div className="flex space-x-4 items-center">
                    <p className="font-semibold text-gray-700">Sortuj:</p>

                    <Link
                        href={`/product-list${categorySlug}?sort=name${isAvailable ? '&available=true' : ''}`}
                        className={`text-sm py-2 px-4 rounded-full transition-colors ${sort === 'name' ? 'bg-red-600 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200 border'}`}
                    >
                        Alfabetycznie
                    </Link>

                    <Link
                        href={`/product-list${categorySlug}?sort=newest${isAvailable ? '&available=true' : ''}`}
                        className={`text-sm py-2 px-4 rounded-full transition-colors ${sort === 'newest' ? 'bg-red-600 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200 border'}`}
                    >
                        Najnowsze
                    </Link>
                </div>

                <Link
                    href={`/product-list${categorySlug}?sort=${sort}${isAvailable ? '' : '&available=true'}`}
                    className={`flex items-center space-x-2 cursor-pointer p-2 px-3 rounded border transition-colors ${isAvailable ? 'bg-green-100 border-green-300' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                >
                    <div className={`w-5 h-5 border rounded flex items-center justify-center ${isAvailable ? 'bg-green-600 border-green-600' : 'border-gray-400'}`}>
                        {isAvailable && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className="text-gray-700 font-medium">Tylko dostępne</span>
                </Link>
            </div>


            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">Wybierz kategorię:</h3>
                <div className="flex flex-wrap gap-3">

                    <Link
                        href={`/product-list?sort=${sort}${isAvailable ? '&available=true' : ''}`}
                        className={`px-4 py-2 rounded-lg border transition-colors ${!category ? 'bg-gray-800 text-white border-gray-800 shadow-md' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}
                    >
                        Wszystkie
                    </Link>


                    {categories.map((cat) => {
                        const isActive = category === cat.slug;
                        return (
                            <Link
                                key={cat.slug}
                                href={`/product-list/${cat.slug}?sort=${sort}${isAvailable ? '&available=true' : ''}`}
                                className={`px-4 py-2 rounded-lg border transition-colors ${isActive ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200'}`}
                            >
                                {cat.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {products.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-xl text-gray-500">Brak produktów spełniających kryteria.</p>
                </div>
            )}
        </div>
    );
}



export default async function ProductListPage(props: {
    params: Promise<{ slug?: string[] }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const slug = params.slug || [];
    const isAvailable = searchParams.available === 'true';
    const sort = (searchParams.sort as 'name' | 'newest') || 'newest';

    let products: Product[] = [];


    if (slug.length === 2) {
        const categorySlug = slug[0];
        const productId = parseInt(slug[1]);

        if (isNaN(productId)) {
            notFound();
        }

        const product = getProductById(productId);

        if (!product || product.type !== slugToProductType(categorySlug)) {
            notFound();
        }

        return <ProductDetails product={product} />;
    }


    if (slug.length === 1) {
        const categorySlug = slug[0];
        const categoryType = slugToProductType(categorySlug) as Product['type'];

        let filteredProducts = getProductsByCategory(categoryType);

        if (getAllProducts().filter(p => p.type === categoryType).length === 0 && filteredProducts.length === 0) {

        }

        if (isAvailable) {
            filteredProducts = filteredProducts.filter(p => p.amount > 0);
        }

        if (sort === 'name') {
            products = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
        } else {
            products = [...filteredProducts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }

        return <ProductList products={products} category={categorySlug} isAvailable={isAvailable} sort={sort} />;
    }


    if (slug.length === 0) {
        let allProducts = getAllProducts();

        if (isAvailable) {
            allProducts = getAvailableProducts();
        }

        if (sort === 'name') {
            products = [...allProducts].sort((a, b) => a.name.localeCompare(b.name));
        } else {
            products = [...allProducts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }

        return <ProductList products={products} isAvailable={isAvailable} sort={sort} />;
    }

    notFound();
}