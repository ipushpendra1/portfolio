import React, { useEffect, useMemo, useRef, useState } from 'react';
import './OtpModal.css';

const OTP_LENGTH = 6;

const OtpModal = ({
  isOpen,
  email,
  loadingVerify = false,
  loadingResend = false,
  initialSeconds = 60,
  onSubmit,
  onResend,
  onCancel
}) => {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const inputsRef = useRef([]);

  const otpValue = useMemo(() => digits.join(''), [digits]);

  useEffect(() => {
    if (!isOpen) return;
    setDigits(Array(OTP_LENGTH).fill(''));
    setSecondsLeft(initialSeconds);
    // Focus first input when opening
    setTimeout(() => inputsRef.current[0]?.focus(), 0);
  }, [isOpen, initialSeconds]);

  useEffect(() => {
    if (!isOpen) return;
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [isOpen, secondsLeft]);

  const handleChange = (index, value) => {
    const onlyDigits = value.replace(/\D/g, '');
    if (!onlyDigits) {
      setDigits((prev) => {
        const updated = [...prev];
        updated[index] = '';
        return updated;
      });
      return;
    }
    // Support typing/pasting multiple digits
    setDigits((prev) => {
      const updated = [...prev];
      let cursor = index;
      for (let i = 0; i < onlyDigits.length && cursor < OTP_LENGTH; i += 1) {
        updated[cursor] = onlyDigits[i];
        cursor += 1;
      }
      // Move focus to the next empty input
      setTimeout(() => inputsRef.current[Math.min(cursor, OTP_LENGTH - 1)]?.focus(), 0);
      return updated;
    });
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (digits[index]) return; // default clear this box
      const prevIndex = Math.max(index - 1, 0);
      setDigits((prev) => {
        const updated = [...prev];
        updated[prevIndex] = '';
        return updated;
      });
      inputsRef.current[prevIndex]?.focus();
    }
    if (e.key === 'ArrowLeft') {
      inputsRef.current[Math.max(index - 1, 0)]?.focus();
    }
    if (e.key === 'ArrowRight') {
      inputsRef.current[Math.min(index + 1, OTP_LENGTH - 1)]?.focus();
    }
    if (e.key === 'Enter') {
      if (otpValue.length === OTP_LENGTH && onSubmit) onSubmit(otpValue);
    }
    if (e.key === 'Escape') {
      onCancel && onCancel();
    }
  };

  const handlePaste = (index, e) => {
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    if (!paste) return;
    e.preventDefault();
    const onlyDigits = paste.replace(/\D/g, '');
    if (!onlyDigits) return;
    setDigits((prev) => {
      const updated = [...prev];
      let cursor = index;
      for (let i = 0; i < onlyDigits.length && cursor < OTP_LENGTH; i += 1) {
        updated[cursor] = onlyDigits[i];
        cursor += 1;
      }
      setTimeout(() => inputsRef.current[Math.min(cursor - 1, OTP_LENGTH - 1)]?.focus(), 0);
      return updated;
    });
  };

  const canResend = secondsLeft <= 0 && !loadingResend;
  const canVerify = otpValue.length === OTP_LENGTH && !loadingVerify;

  if (!isOpen) return null;

  return (
    <div className="otp-modal-overlay" onClick={onCancel}>
      <div className="otp-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="otp-close" onClick={onCancel} aria-label="Close">
          ✕
        </button>
        <h3 className="otp-title">Verify your email</h3>
        <p className="otp-subtitle">
          We sent a code to <span className="otp-email">{email}</span>
        </p>

        <div className="otp-inputs" role="group" aria-label="One-time passcode">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              className={`otp-input ${d ? 'filled' : ''}`}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={(e) => handlePaste(i, e)}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        <div className="otp-actions">
          <button
            className={`otp-btn primary ${!canVerify ? 'disabled' : ''}`}
            onClick={() => canVerify && onSubmit && onSubmit(otpValue)}
            disabled={!canVerify}
          >
            {loadingVerify ? 'Verifying…' : 'Verify & Send'}
          </button>
          <button
            className={`otp-btn ghost ${!canResend ? 'disabled' : ''}`}
            onClick={async () => {
              if (!canResend || !onResend) return;
              const ok = await onResend();
              if (ok !== false) setSecondsLeft(initialSeconds);
            }}
            disabled={!canResend}
          >
            {loadingResend ? 'Resending…' : secondsLeft > 0 ? `Resend in 0:${secondsLeft.toString().padStart(2, '0')}` : 'Resend code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;


