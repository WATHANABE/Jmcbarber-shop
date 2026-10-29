
import { useEffect, useState } from 'react';
import { getServices, createBooking } from './bookingService';
import './BookingForm.css';

const BARBERS = ['Marcus', 'Julian', 'Desmond', 'Leo'];

export default function BookingForm() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    serviceId: '',
    barberName: '',
    date: '',
    time: '',
  });

  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function update(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setError('');
    setConfirmation(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setConfirmation(null);

    if (
      !form.customerName.trim() ||
      !form.customerPhone.trim() ||
      !form.serviceId ||
      !form.barberName ||
      !form.date ||
      !form.time
    ) {
      setError('Please complete all fields.');
      return;
    }

    if (form.date < localToday) {
      setError('Please choose today or a future date.');
      return;
    }

    setSubmitting(true);

    try {
      const booking = await createBooking({
        ...form,
        serviceId: Number(form.serviceId),
      });

      setConfirmation(booking);
      setForm({
        customerName: '',
        customerPhone: '',
        serviceId: '',
        barberName: '',
        date: '',
        time: '',
      });
    } catch (err) {
      setError(err.message || 'Unable to submit your booking.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="booking-page">
      <section className="booking-card">
        <p className="booking-label">JMC BARBER-SHOP</p>
        <h1>Book Your Appointment</h1>
        <p className="booking-description">
          Choose your service, barber, and preferred schedule.
          No account required.
        </p>

        {loading ? (
          <p>Loading services...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Full Name
              <input
                value={form.customerName}
                onChange={(e) =>
                  update('customerName', e.target.value)
                }
                placeholder="Enter your full name"
                maxLength={100}
                required
              />
            </label>

            <label>
              Phone Number
              <input
                type="tel"
                value={form.customerPhone}
                onChange={(e) =>
                  update('customerPhone', e.target.value)
                }
                placeholder="09XXXXXXXXX"
                maxLength={20}
                required
              />
            </label>

            <label>
              Select Service
              <select
                value={form.serviceId}
                onChange={(e) =>
                  update('serviceId', e.target.value)
                }
                required
              >
                <option value="">Choose a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} — ₱{service.price}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Select Barber
              <select
                value={form.barberName}
                onChange={(e) =>
                  update('barberName', e.target.value)
                }
                required
              >
                <option value="">Choose a barber</option>
                {BARBERS.map((barber) => (
                  <option key={barber} value={barber}>
                    {barber}
                  </option>
                ))}
              </select>
            </label>

            <div className="booking-row">
              <label>
                Appointment Date
                <input
                  type="date"
                  min={localToday}
                  value={form.date}
                  onChange={(e) => update('date', e.target.value)}
                  required
                />
              </label>

              <label>
                Appointment Time
                <select
                  value={form.time}
                  onChange={(e) => update('time', e.target.value)}
                  required
                >
                  <option value="">Choose time</option>
                  {[
                    '09:00', '09:30', '10:00', '10:30',
                    '11:00', '11:30', '13:00', '13:30',
                    '14:00', '14:30', '15:00', '15:30',
                    '16:00',
                  ].map((time) => (
                    <option key={time} value={time}>
                      {new Date(
                        `2000-01-01T${time}:00`
                      ).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {error && (
              <p className="booking-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Request Appointment'}
            </button>
          </form>
        )}

        {confirmation && (
          <div className="booking-success" role="status">
            <h2>Booking Request Submitted!</h2>
            <p>
              Your request number is:
              <strong> JMC-{confirmation.id}</strong>
            </p>
            <p>
              Status: <strong>{confirmation.status}</strong>
            </p>
            <p>
              Your appointment is pending confirmation by the
              barbershop. Please wait for approval.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
