export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (

        <footer className="bg-gray-800 mt-10 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
                <p>
                    &copy; {currentYear} Politechnika Krakowska. Projekt wykonany przez: Michał Regiewicz 14K2 K02.
                </p>
                <p className="mt-2">
                    <a
                        href="https://www.pk.edu.pl/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-500 transition-colors"
                    >
                        Strona Politechniki Krakowskiej
                    </a>
                </p>
            </div>
        </footer>
    );
}