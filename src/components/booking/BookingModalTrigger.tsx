"use client";

import Link from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { useBookingModal } from "@/components/booking/BookingModalProvider";
import type { Locale } from "@/i18n/locales";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  locale: Locale;
  children: ReactNode;
  href?: string;
};

export const BookingModalTrigger = forwardRef<HTMLAnchorElement, Props>(
  ({ locale, href, onClick, children, ...props }, ref) => {
    const { openBookingModal } = useBookingModal();
    const fallbackHref = href ?? `/${locale}/reserver/formulaire`;

    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
      onClick?.(event);
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openBookingModal();
    }

    return (
      <Link ref={ref} href={fallbackHref} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  },
);

BookingModalTrigger.displayName = "BookingModalTrigger";
