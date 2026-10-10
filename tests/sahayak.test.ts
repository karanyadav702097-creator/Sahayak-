// SAHAYAK AI Automated Unit & Integrity Test Suite
// Verifies core domain schemas, translations, helpline numbers, and scheme integrity.

import { INITIAL_VERIFIED_SCHEMES, INITIAL_VERIFIED_HELPLINES } from '../src/lib/supabase';
import { translations, languages } from '../src/locales/translations';
import { LanguageCode } from '../src/types';

export function runSahayakTests() {
  const results: { test: string; passed: boolean; error?: string }[] = [];

  // Test 1: All 8 Indian languages are configured in translation dictionary
  const expectedLanguages: LanguageCode[] = ['en', 'hi', 'mr', 'bn', 'ta', 'te', 'gu', 'pa'];
  for (const lang of expectedLanguages) {
    const dict = translations[lang];
    if (!dict || !dict.appName || !dict.nav.schemes || !dict.emergency.title) {
      results.push({ test: `Language dictionary for ${lang}`, passed: false, error: `Missing translations for ${lang}` });
    } else {
      results.push({ test: `Language dictionary for ${lang}`, passed: true });
    }
  }

  // Test 2: Scheme data validity
  for (const scheme of INITIAL_VERIFIED_SCHEMES) {
    const valid = Boolean(
      scheme.id &&
      scheme.name &&
      scheme.slug &&
      scheme.category &&
      scheme.official_source_url.startsWith('https://') &&
      scheme.eligibility_requirements.length > 0 &&
      scheme.required_documents.length > 0
    );
    results.push({
      test: `Scheme validation: ${scheme.name}`,
      passed: valid,
      error: valid ? undefined : 'Invalid scheme fields'
    });
  }

  // Test 3: Emergency helplines validity
  const erss = INITIAL_VERIFIED_HELPLINES.find(h => h.number === '112');
  const ambulance = INITIAL_VERIFIED_HELPLINES.find(h => h.number === '108');
  const cyber = INITIAL_VERIFIED_HELPLINES.find(h => h.number === '1930');
  
  results.push({
    test: 'Unified ERSS 112 helpline is present and 24x7',
    passed: Boolean(erss && erss.is_24x7 && erss.is_toll_free),
  });

  results.push({
    test: '108 Ambulance helpline is present and 24x7',
    passed: Boolean(ambulance && ambulance.is_24x7),
  });

  results.push({
    test: '1930 Cyber Fraud helpline is present',
    passed: Boolean(cyber && cyber.number === '1930'),
  });

  // Test 4: Verify Women Safety and DigiLocker modules are absent (Non-negotiable Rule 7 & 8)
  const codeCheck = JSON.stringify(translations);
  const containsWomenSafety = codeCheck.toLowerCase().includes('women safety') || codeCheck.toLowerCase().includes('guardian mode');
  const containsDigiLocker = codeCheck.toLowerCase().includes('digilocker');

  results.push({
    test: 'Strict Exclusion: No dedicated Women Safety module',
    passed: !containsWomenSafety,
  });

  results.push({
    test: 'Strict Exclusion: No dedicated DigiLocker module',
    passed: !containsDigiLocker,
  });

  return results;
}
