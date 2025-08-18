import React, { useState, useEffect, useRef } from 'react';

const ThemeToggle = () => {
	// Initialize from stored preference if available, otherwise follow system
	const [isDark, setIsDark] = useState(() => {
		try {
			const storedTheme = localStorage.getItem('theme');
			if (storedTheme === 'dark') return true;
			if (storedTheme === 'light') return false;
		} catch {}
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	});

	// Refs to manage system listener lifecycle
	const mediaQueryRef = useRef(null);
	const systemListenerRef = useRef(null);

	// Keep DOM attribute in sync with state
	useEffect(() => {
		document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
	}, [isDark]);

	// On mount: attach system theme listener only if no stored preference
	useEffect(() => {
		const storedTheme = (() => {
			try { return localStorage.getItem('theme'); } catch { return null; }
		})();
		const hasStoredPreference = storedTheme === 'dark' || storedTheme === 'light';

		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQueryRef.current = mq;

		if (!hasStoredPreference) {
			const handleSystemChange = (e) => {
				setIsDark(e.matches);
				document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
			};
			systemListenerRef.current = handleSystemChange;
			mq.addEventListener('change', handleSystemChange);
			return () => mq.removeEventListener('change', handleSystemChange);
		}
	}, []);

	const toggleTheme = () => {
		const nextIsDark = !isDark;
		setIsDark(nextIsDark);
		document.documentElement.setAttribute('data-theme', nextIsDark ? 'dark' : 'light');
		try {
			localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
		} catch {}
		// If we were following system, stop listening now that user chose explicitly
		if (systemListenerRef.current && mediaQueryRef.current) {
			mediaQueryRef.current.removeEventListener('change', systemListenerRef.current);
			systemListenerRef.current = null;
		}
	};

	return (
		<button
			onClick={toggleTheme}
			className="theme-toggle"
			aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
			title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
		>
			{isDark ? (
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<circle cx="12" cy="12" r="5"/>
					<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
				</svg>
			) : (
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
				</svg>
			)}
		</button>
	);
};

export default ThemeToggle;
