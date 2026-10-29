
import { useEffect, useState } from 'react';
import { getServices } from './bookingService';

export default function SupabaseTest() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ padding: 30 }}>
      <h1>JMC Barber-Shop</h1>
      <h2>Available Services</h2>

      {loading && <p>Loading services...</p>}
      {error && <p>Error: {error}</p>}

      {services.map((service) => (
        <p key={service.id}>
          {service.name} — ₱{service.price}
          {' '}({service.duration_minutes} min)
        </p>
      ))}
    </main>
  );
}
