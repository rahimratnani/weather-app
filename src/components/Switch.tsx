import React from 'react';
import './Switch.css';

interface SwitchProps {
  handleUnitChange: () => void;
}

export default function Switch(props: SwitchProps) {
  return (
    <section className="Switch">
      <div className="button r" id="button-1">
        <input
          onClick={props.handleUnitChange}
          type="checkbox"
          className="checkbox"
        />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
    </section>
  );
}
