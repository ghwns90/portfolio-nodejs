import React from 'react';
import '../ToggleSwitch.css';

const ToggleSwitch = ({label, isChecked, onChange, activeColor }) => {
  return (
    <div className="toggle-container">
      {label && <span className="toggle-label">{label}</span>}
      <label className="switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
        />
        {/* isChecked 가 true 일때만 activeColor 를 배경색으로 */}
        <span
          className="slider round"
          style={{ backgroundColor: isChecked ? activeColor : '#ccc'}}
        ></span>
      </label>
    </div>
  )
}

export default ToggleSwitch;