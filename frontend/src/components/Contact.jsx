import React, { useRef, useState } from 'react';
import { useSmoothAnimation, useStaggeredAnimation } from '../hooks/useSmoothAnimation';
import 'devicon/devicon.min.css';
import { Linkedin, Instagram } from 'lucide-react';
import OtpModal from './OtpModal';

const Contact = () => {
  const contactRef = useRef(null);
  const [awaitingOtp, setAwaitingOtp] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [pendingPayload, setPendingPayload] = useState(null);
  const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD
      ? 'https://portfolio-six-zeta-ymb8holpt6.vercel.app'
      : 'http://localhost:3000');
  
  // Smooth animations
  const titleRef = useSmoothAnimation({ threshold: 0.3 });
  const subtitleRef = useSmoothAnimation({ threshold: 0.3, animationClass: 'animate' });
  const contactInfoRef = useSmoothAnimation({ threshold: 0.3, animationClass: 'animate' });
  const formRef = useStaggeredAnimation([], { threshold: 0.3, staggerDelay: 0.1 });

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/ipushpendra1',
      icon: 'devicon-github-original'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/pushpendra-kumar-a92302257/',
      iconComponent: Linkedin
    },
    {
      name: 'Twitter',
      url: 'https://x.com/Pushpen04860270',
      icon: 'devicon-twitter-original'
    },
    {
      name: 'Email',
      url: 'mailto:pushpendra090804@gmail.com',
      icon: 'devicon-google-original'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/_ipushpendra/',
      iconComponent: Instagram
    }

  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name?.value?.trim() || '';
    const email = form.email?.value?.trim() || '';
    const subject = form.subject?.value?.trim() || '';
    const message = form.message?.value?.trim() || '';

    if (!name || !email || !subject || !message) {
      alert('Please fill out all fields before sending.');
      return;
    }

    // Step 1: Generate OTP
    try {
      setIsGenerating(true);
      const response = await fetch(`${API_BASE_URL}/generate-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error?.error || error?.message || 'Failed to generate OTP');
      }

      setPendingPayload({
        Name: name,
        Email: email,
        Subject: subject,
        Message: message
      });
      setAwaitingOtp(true);
    } catch (err) {
      alert(err.message || 'Could not send OTP. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVerifyAndSend = async (providedOtp) => {
    if (!awaitingOtp || !pendingPayload) return;
    const otp = (providedOtp ?? '').trim();
    if (!otp || otp.length !== 6) {
      alert('Please enter the 6-digit OTP.');
      return;
    }

    try {
      setIsVerifying(true);
      // Step 2: Verify OTP
      const verifyRes = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: pendingPayload.Email,
          otp
        })
      });

      if (!verifyRes.ok) {
        const error = await verifyRes.json().catch(() => ({}));
        throw new Error(error?.error || error?.message || 'OTP verification failed');
      }

      // Step 3: Send the message after successful OTP verification
      const sendRes = await fetch(`${API_BASE_URL}/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pendingPayload)
      });

      if (!sendRes.ok) {
        const error = await sendRes.json().catch(() => ({}));
        throw new Error(error?.message || 'Failed to send message');
      }

      alert('Message sent successfully!');
      // Reset state
      setAwaitingOtp(false);
      setPendingPayload(null);

      // Best effort: clear the form fields if still mounted
      if (contactRef?.current) {
        const form = contactRef.current.querySelector('form');
        form && form.reset && form.reset();
      }
    } catch (err) {
      alert(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!pendingPayload) return;
    try {
      setIsGenerating(true);
      const response = await fetch(`${API_BASE_URL}/generate-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingPayload.Email })
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error?.error || error?.message || 'Failed to resend OTP');
      }
      return true;
    } catch (err) {
      alert(err.message || 'Could not resend OTP.');
      return false;
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="contact" ref={contactRef} className="section contact">
      <h2 
        ref={titleRef}
        className="section-title fade-in"
      >
        Get In Touch
      </h2>
      <p 
        ref={subtitleRef}
        className="section-subtitle fade-in stagger-1"
      >
        I'm always interested in hearing about new opportunities and exciting projects.
      </p>

      <div className="contact-content">
        <div 
          ref={contactInfoRef}
          className="contact-info fade-in stagger-2"
        >
          <h3>Let's Connect</h3>
          <p>
            Whether you have a question about my work, want to discuss a potential 
            collaboration, or just want to say hello, I'd love to hear from you.
          </p>
          
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-link fade-in animate stagger-${index + 3} hover-lift hover-glow`}
              >
                {link.iconComponent ? (
                  <link.iconComponent className="social-icon" size={20} />
                ) : (
                  <i className={`${link.icon} social-icon`}></i>
                )}
                <span className="social-name">{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        <form 
          ref={formRef}
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group fade-in stagger-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="form-input hover-glow"
            />
          </div>

          <div className="form-group fade-in stagger-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="form-input hover-glow"
            />
          </div>
          

          <div className="form-group fade-in stagger-3">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="form-input hover-glow"
            />
          </div>

          <div className="form-group fade-in stagger-4">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="form-textarea hover-glow"
            ></textarea>
          </div>

          {!awaitingOtp && (
            <button 
              type="submit" 
              className="submit-button fade-in stagger-5 hover-lift hover-glow"
              disabled={isGenerating}
            >
              {isGenerating ? 'Sending OTP...' : 'Send Message'}
            </button>
          )}

          {awaitingOtp && null}
        </form>
      </div>
      <OtpModal
        isOpen={awaitingOtp}
        email={pendingPayload?.Email}
        loadingVerify={isVerifying}
        loadingResend={isGenerating}
        initialSeconds={60}
        onSubmit={(otp) => handleVerifyAndSend(otp)}
        onResend={handleResendOtp}
        onCancel={() => { setAwaitingOtp(false); setPendingPayload(null); }}
      />
    </section>
  );
};

export default Contact;
