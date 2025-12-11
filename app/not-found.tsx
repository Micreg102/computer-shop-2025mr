import Link from 'next/link';
export default function NotFound() {
    return (
        <main className="not-found" style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ fontSize: '3rem', color: '#ff4d4f' }}>404 - Nie znaleziono strony</h1>
            <p style={{ fontSize: '1.2rem' }}>Strona, której szukasz, nie istnieje.</p>
            <p style={{ fontSize: '1rem', color: '#888' }}>Sprawdź adres URL lub wróć na stronę główną.</p>
            <p>
                <Link href="/product-list" style={{ color: '#007bff', textDecoration: 'underline' }}>
                    Wróć do Listy Produktów
                </Link>
            </p>
        </main>
    );
}