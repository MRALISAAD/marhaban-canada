"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { BookingRequestModal } from "@/components/booking/BookingRequestModal";
import { useLanguage } from "@/components/LanguageProvider";

type BookingModalContextValue = {
  openBookingModal: () => void;
  isBookingModalOpen: boolean;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export const OPEN_BOOKING_MODAL_EVENT = "marhaban:open-booking-modal";

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const openBookingModal = useCallback(() => setIsOpen(true), []);
  const closeBookingModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    window.addEventListener(OPEN_BOOKING_MODAL_EVENT, openBookingModal);
    return () => window.removeEventListener(OPEN_BOOKING_MODAL_EVENT, openBookingModal);
  }, [openBookingModal]);

  const value = useMemo(
    () => ({ openBookingModal, isBookingModalOpen: isOpen }),
    [isOpen, openBookingModal],
  );

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <BookingRequestModal isOpen={isOpen} onClose={closeBookingModal} locale={locale} />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) throw new Error("useBookingModal must be used within BookingModalProvider");
  return context;
}
