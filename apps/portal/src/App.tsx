import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardPage from './pages/dashboard';
import './index.css';

const supportedLocales = ['en', 'ar'] as const;
type Locale = (typeof supportedLocales)[number];

function LocaleRoute() {
	const { locale } = useParams<{ locale: string }>();
	const location = useLocation();
	const { i18n } = useTranslation();
	const validLocale = supportedLocales.includes(locale as Locale) ? locale as Locale : null;

	useEffect(() => {
		if (validLocale && i18n.resolvedLanguage !== validLocale) {
			void i18n.changeLanguage(validLocale);
		}
	}, [i18n, validLocale]);

	if (!validLocale) {
		return <Navigate to="/en" state={{ from: location }} replace />;
	}

	return <DashboardPage />;
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/:locale" element={<LocaleRoute />} />
				<Route path="/:locale/dashboard" element={<LocaleRoute />} />
				<Route path="/" element={<Navigate to="/en" replace />} />
				<Route path="/dashboard" element={<Navigate to="/en" replace />} />
				<Route path="*" element={<Navigate to="/en" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;