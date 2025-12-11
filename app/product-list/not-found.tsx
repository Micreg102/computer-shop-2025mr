import Link from 'next/link';


export default function NotFound() {
    return (
        <main className="max-w-xl mx-auto p-8 border border-red-500 rounded-lg shadow-xl mt-10 bg-white">
            <h3 className="text-3xl font-bold text-red-600 mb-4">Błąd 404 - Strona Produktów</h3>
            <p className="text-gray-700 mb-6">
                Nie znaleziono żądanej strony w segmencie tras dla **Listy Produktów** (np. podany produkt lub kategoria nie istnieją).
            </p>
            <p>
                <Link
                    href="/product-list"
                    className="text-lg text-blue-600 hover:text-blue-800 transition-colors underline"
                >
                    &larr; Wróć do Listy Produktów
                </Link>
            </p>
        </main>
    );
}