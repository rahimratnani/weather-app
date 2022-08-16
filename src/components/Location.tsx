import React from 'react';
import './Location.css';

interface LocationProps {
  country: string;
  city: string;
}

export default function Location(props: LocationProps) {
  const { country, city } = props;
  return (
    <section className="Location">
      <div>
        <p>
          {city}, {country}
        </p>
      </div>
    </section>
  );
}
