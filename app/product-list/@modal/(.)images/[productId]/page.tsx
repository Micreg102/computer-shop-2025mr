import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';


interface ImagePageProps {
    params: Promise<{ productId: string }>;
}

export default async function ImagePage({ params }: ImagePageProps) {

    const { productId } = await params;


    const id = parseInt(productId);

    if (isNaN(id)) {
        notFound();
    }

    const product = getProductById(id);

    if (!product) {
        notFound();
    }


    const imagePath = product.image.replace('public/', '/');

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Galeria: {product.name}</h1>
            <div className="relative w-full max-w-5xl h-[70vh] border bg-white rounded-lg shadow-xl overflow-hidden p-4">

                <img
                    src={imagePath}
                    alt={product.name}
                    className="object-contain w-full h-full"
                />
            </div>
        </div>
    );
}