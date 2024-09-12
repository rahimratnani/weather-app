import React from 'react';
import './Error.css';

interface ErrorProps {
  errorMessage: string;
}

export default function Error(props: ErrorProps) {
  const { errorMessage } = props;

  return errorMessage.length > 0 ? (
    <section className="Error">
      <p data-testid="error-message">{errorMessage}</p>
    </section>
  ) : null;
}
