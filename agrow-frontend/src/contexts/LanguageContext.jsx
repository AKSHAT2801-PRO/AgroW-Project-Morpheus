import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Default to English, or use stored preference
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('agrowLanguage');
        return saved || 'en';
    });

    useEffect(() => {
        localStorage.setItem('agrowLanguage', language);
        // Dispatch custom event for non-react components if needed
        window.dispatchEvent(new Event('agrowLanguageChange'));
    }, [language]);

    // Fast translation function
    const t = (key) => {
        // Fallback sequentially: target language -> english -> the raw key name
        if (translations[language] && translations[language][key]) {
            return translations[language][key];
        }
        if (translations['en'] && translations['en'][key]) {
            return translations['en'][key];
        }
        return key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
