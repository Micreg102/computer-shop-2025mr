"use client";

import { useTransition } from "react";
import { removeCartItem } from "@/lib/actions/cart";

export default function RemoveButton({ cartItemId }: { cartItemId: number }) {
    const [isPending, startTransition] = useTransition();

    const handleRemove = () => {
        if (confirm("Czy na pewno chcesz usunąć ten produkt z koszyka?")) {
            startTransition(async () => {
                await removeCartItem(cartItemId);
            });
        }
    };

    return (
        <button
            onClick={handleRemove}
            disabled={isPending}
            className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50 disabled:opacity-50"
            title="Usuń produkt"
            aria-label="Usuń produkt z koszyka"
        >
            {isPending ? (
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            ) : (
                '✕'
            )}
        </button>
    );
}