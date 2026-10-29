
import { supabase } from './supabaseClient';

export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('id, name, price, duration_minutes')
    .eq('is_active', true)
    .order('name');

  if (error) throw error;

  return data ?? [];
}

export async function createBooking(booking) {
  const { data, error } = await supabase
    .from('appointments')
    .insert({
      customer_name: booking.customerName.trim(),
      customer_phone: booking.customerPhone.trim(),
      service_id: booking.serviceId,
      barber_name: booking.barberName,
      appointment_date: booking.date,
      appointment_time: booking.time,
      status: 'Pending',
    })
    .select('id, status')
    .single();

  if (error) throw error;

  return data;
}
