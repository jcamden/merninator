import React from 'react';

interface FormButtonProps {
  text: string;
  color: string;
  disabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FormButton: React.FC<FormButtonProps> = ({ text, color, disabled }) => {
  return (
    <button className="form-btn" type="submit" disabled={disabled}>
      {disabled ? 'Logging in...' : 'Login'}
    </button>
  );
};
