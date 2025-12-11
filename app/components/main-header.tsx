import NavLink from './nav-link';
import Link from 'next/link';

export default function MainHeader() {
    return (

        <header className="bg-gray-800 shadow-lg sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <Link href="/" className="flex-shrink-0">

                        <span className="text-xl font-extrabold text-white">PK-SHOP</span>
                    </Link>


                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <NavLink href="/">Start</NavLink>
                            </li>
                            <li>
                                <NavLink href="/product-list">Produkty</NavLink>
                            </li>
                            <li>
                                <NavLink href="/about">O nas</NavLink>
                            </li>
                            <li>
                                <NavLink href="/basket">Cart</NavLink>
                            </li>
                            <li>
                                <NavLink href="/contact">Kontakt</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}