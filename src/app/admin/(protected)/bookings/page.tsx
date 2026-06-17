import { AdminBookingsClient } from '@/components/admin/AdminBookingsClient';
import { mockBookings } from '@/lib/admin/mock-data';

export default function AdminBookingsPage() {
  return <AdminBookingsClient mockBookings={mockBookings} />;
}
