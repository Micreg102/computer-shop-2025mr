import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';

export default async function ImagePage(props: {
    params: Promise<{ productId: string }>;
}) {
    // 1. Oczekujemy na params (To jest kluczowa naprawa!)
    const params = await props.params;

    // 2. Dopiero teraz pobieramy ID
    const productId = parseInt(params.productId);

    if (isNaN(productId)) {
        notFound();
    }

    const product = getProductById(productId);

    if (!product) {
        notFound();
    }

    // Poprawka ścieżki dla Next.js (z public/ na /)
    const imagePath = product.image.replace('public/', '/');

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Galeria: {product.name}</h1>
            <div className="relative w-full max-w-5xl h-[70vh] border bg-white rounded-lg shadow-xl overflow-hidden p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={imagePath}
                    alt={product.name}
                    className="object-contain w-full h-full"
                />
            </div>
        </div>
    );
}