import { LanguageCode } from '../types';

export interface Translations {
  appName: string;
  appTagline: string;
  nav: {
    home: string;
    schemes: string;
    complaints: string;
    emergency: string;
    assistant: string;
    dashboard: string;
    admin: string;
    login: string;
    signup: string;
    logout: string;
    profile: string;
    notifications: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    searchPlaceholder: string;
    trustNote: string;
  };
  features: {
    schemesTitle: string;
    schemesDesc: string;
    complaintsTitle: string;
    complaintsDesc: string;
    helplinesTitle: string;
    helplinesDesc: string;
    assistantTitle: string;
    assistantDesc: string;
  };
  dashboard: {
    welcome: string;
    quickActions: string;
    activeComplaints: string;
    recommendedSchemes: string;
    emergencyHelplineCard: string;
    lodgeComplaint: string;
    browseSchemes: string;
    askAssistant: string;
    call112: string;
  };
  complaints: {
    title: string;
    lodgeNew: string;
    referenceNo: string;
    category: string;
    department: string;
    status: string;
    filedOn: string;
    viewDetails: string;
    description: string;
    location: string;
    draftLetter: string;
    evidence: string;
    submitGrievance: string;
    emptyMessage: string;
  };
  schemes: {
    title: string;
    search: string;
    filterCategory: string;
    filterState: string;
    checkEligibility: string;
    applyOfficial: string;
    requiredDocs: string;
    benefits: string;
    savedSchemes: string;
    allSchemes: string;
  };
  emergency: {
    title: string;
    subtitle: string;
    sosButton: string;
    instantDial: string;
    contactsTitle: string;
    addContact: string;
    gpsStatus: string;
    disclaimer: string;
  };
  chat: {
    title: string;
    welcomeMsg: string;
    inputPlaceholder: string;
    send: string;
    clear: string;
    disclaimer: string;
  };
  common: {
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    view: string;
    close: string;
    status: string;
    date: string;
    back: string;
  };
}

export const languages: { code: LanguageCode; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

export const translations: Record<LanguageCode, Translations> = {
  en: {
    appName: 'SAHAYAK AI',
    appTagline: 'Empowering Indian Citizens with Digital Civic Intelligence',
    nav: {
      home: 'Home',
      schemes: 'Govt Schemes',
      complaints: 'Grievance Redressal',
      emergency: 'Emergency & Helplines',
      assistant: 'Civic Assistant',
      dashboard: 'Citizen Dashboard',
      admin: 'Admin Console',
      login: 'Sign In',
      signup: 'Register',
      logout: 'Sign Out',
      profile: 'My Profile',
      notifications: 'Notifications',
    },
    hero: {
      badge: 'Official Citizen Utility Platform',
      title: 'Civic Services, Welfare Schemes & Grievance Redressal Made Simple',
      subtitle: 'Discover government benefits, draft formal civic complaints, access verified emergency helplines, and receive AI civic guidance in your regional language.',
      ctaPrimary: 'Get Started',
      ctaSecondary: 'Explore Government Schemes',
      searchPlaceholder: 'Search schemes, municipal services, or helplines...',
      trustNote: 'Independent civic utility assisting citizens. Official links redirect directly to verified .gov.in portals.',
    },
    features: {
      schemesTitle: 'Welfare Schemes Discovery',
      schemesDesc: 'Explore central and state welfare initiatives with transparent eligibility criteria, benefits, and required document checklists.',
      complaintsTitle: 'Civic Grievance Management',
      complaintsDesc: 'Report civic issues—potholes, water supply, sewage, electricity—with AI drafting assistance and unique tracking references.',
      helplinesTitle: 'Verified Emergency Helplines',
      helplinesDesc: 'Direct, 1-tap access to national emergency lines (112, 100, 108, 1930 Cyber Fraud) with location awareness.',
      assistantTitle: 'Multilingual Civic AI',
      assistantDesc: 'Get answers to administrative questions, document requirements, and procedures in 8 Indian languages.',
    },
    dashboard: {
      welcome: 'Welcome back,',
      quickActions: 'Quick Citizen Actions',
      activeComplaints: 'My Active Complaints',
      recommendedSchemes: 'Recommended Welfare Schemes',
      emergencyHelplineCard: 'Emergency Immediate Assistance',
      lodgeComplaint: 'Lodge Civic Grievance',
      browseSchemes: 'Browse All Schemes',
      askAssistant: 'Ask Civic Assistant',
      call112: 'Dial 112 National Emergency',
    },
    complaints: {
      title: 'Citizen Grievance Portal',
      lodgeNew: 'Lodge New Grievance',
      referenceNo: 'Reference ID',
      category: 'Category',
      department: 'Department',
      status: 'Current Status',
      filedOn: 'Filed On',
      viewDetails: 'View Details',
      description: 'Grievance Description',
      location: 'Location Details',
      draftLetter: 'AI Draft Letter',
      evidence: 'Supporting Evidence',
      submitGrievance: 'Submit Grievance to Sahayak',
      emptyMessage: 'No complaints filed yet. You can lodge a civic issue anytime.',
    },
    schemes: {
      title: 'Government Welfare Schemes',
      search: 'Search by scheme name or keywords...',
      filterCategory: 'All Categories',
      filterState: 'All States / National',
      checkEligibility: 'Check Eligibility',
      applyOfficial: 'Apply on Official Portal',
      requiredDocs: 'Required Documents',
      benefits: 'Scheme Benefits',
      savedSchemes: 'Saved Schemes',
      allSchemes: 'All Published Schemes',
    },
    emergency: {
      title: 'Emergency SOS & Helpline Directory',
      subtitle: 'Immediate access to verified national emergency numbers and personal distress alerts.',
      sosButton: 'TRIGGER EMERGENCY SOS',
      instantDial: 'Instant Emergency Dial',
      contactsTitle: 'Personal Emergency Contacts',
      addContact: 'Add Contact',
      gpsStatus: 'GPS Location Status',
      disclaimer: 'Calls use your device telecommunication service. For urgent life threats, always dial 112 directly.',
    },
    chat: {
      title: 'SAHAYAK Civic Assistant',
      welcomeMsg: 'Namaste! I am Sahayak AI. How may I assist you today with government schemes, civic procedures, or grievance filing?',
      inputPlaceholder: 'Ask a question in your preferred language...',
      send: 'Send',
      clear: 'Clear Conversation',
      disclaimer: 'AI guidance is informational only. Please confirm with official .gov.in departmental portals before making legal or financial decisions.',
    },
    common: {
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      view: 'View',
      close: 'Close',
      status: 'Status',
      date: 'Date',
      back: 'Back',
    },
  },
  hi: {
    appName: 'सहायक AI',
    appTagline: 'डिजिटल नागरिक सहायता और जन सेवा मंच',
    nav: {
      home: 'होम',
      schemes: 'सरकारी योजनाएं',
      complaints: 'शिकायत निवारण',
      emergency: 'आपातकालीन हेल्पलाइन',
      assistant: 'नागरिक सहायक',
      dashboard: 'नागरिक डैशबोर्ड',
      admin: 'प्रशासन डैशबोर्ड',
      login: 'लॉग इन',
      signup: 'पंजीकरण',
      logout: 'लॉग आउट',
      profile: 'मेरी प्रोफाइल',
      notifications: 'सूचनाएं',
    },
    hero: {
      badge: 'विश्वसनीय नागरिक सेवा मंच',
      title: 'नागरिक सेवाएं, सरकारी योजनाएं और शिकायत निवारण अब आसान',
      subtitle: 'सरकारी कल्याणकारी योजनाओं की खोज करें, जनसमस्याओं के लिए शिकायत दर्ज करें और अपनी भाषा में त्वरित एआई सहायता प्राप्त करें।',
      ctaPrimary: 'शुरू करें',
      ctaSecondary: 'सरकारी योजनाएं देखें',
      searchPlaceholder: 'योजना, नगर निगम सेवा या हेल्पलाइन खोजें...',
      trustNote: 'नागरिकों की सुविधा हेतु स्वतंत्र मंच। आधिकारिक लिंक सीधे .gov.in पोर्टल्स पर ले जाते हैं।',
    },
    features: {
      schemesTitle: 'कल्याणकारी योजनाओं की खोज',
      schemesDesc: 'पात्रता शर्तों, लाभ और आवश्यक दस्तावेजों की विस्तृत सूची के साथ केंद्र और राज्य की योजनाएं खोजें।',
      complaintsTitle: 'जनसमस्या निवारण प्रणाली',
      complaintsDesc: 'सड़क के गड्ढे, जलापूर्ति, बिजली और कचरे से संबंधित समस्याएं एआई पत्र प्रारूपण के साथ दर्ज करें।',
      helplinesTitle: 'सत्यापित आपातकालीन हेल्पलाइन',
      helplinesDesc: 'राष्ट्रीय आपातकालीन नंबरों (112, 100, 108, 1930 साइबर सुरक्षा) पर तुरंत एक क्लिक से कॉल करें।',
      assistantTitle: 'बहुभाषी नागरिक एआई',
      assistantDesc: 'अपनी क्षेत्रीय भाषा में प्रशासनिक प्रक्रियाओं और दस्तावेज़ों से जुड़े सवालों के उत्तर प्राप्त करें।',
    },
    dashboard: {
      welcome: 'वापसी पर स्वागत है,',
      quickActions: 'त्वरित नागरिक कार्य',
      activeComplaints: 'मेरी सक्रिय शिकायतें',
      recommendedSchemes: 'अनुशंसित योजनाएं',
      emergencyHelplineCard: 'आपातकालीन त्वरित सहायता',
      lodgeComplaint: 'शिकायत दर्ज करें',
      browseSchemes: 'सभी योजनाएं देखें',
      askAssistant: 'एआई सहायक से पूछें',
      call112: '112 आपातकालीन नंबर डायल करें',
    },
    complaints: {
      title: 'नागरिक शिकायत पोर्टल',
      lodgeNew: 'नई शिकायत दर्ज करें',
      referenceNo: 'संदर्भ संख्या (ID)',
      category: 'श्रेणी',
      department: 'विभाग',
      status: 'वर्तमान स्थिति',
      filedOn: 'दर्ज तिथि',
      viewDetails: 'विवरण देखें',
      description: 'शिकायत विवरण',
      location: 'स्थान विवरण',
      draftLetter: 'एआई पत्र प्रारूप',
      evidence: 'साक्ष्य/तस्वीरें',
      submitGrievance: 'सहायक में शिकायत सबमिट करें',
      emptyMessage: 'कोई शिकायत दर्ज नहीं है। आप कभी भी नई समस्या दर्ज कर सकते हैं।',
    },
    schemes: {
      title: 'सरकारी कल्याणकारी योजनाएं',
      search: 'योजना का नाम या विषय खोजें...',
      filterCategory: 'सभी श्रेणियां',
      filterState: 'सभी राज्य / राष्ट्रीय',
      checkEligibility: 'पात्रता जांचें',
      applyOfficial: 'आधिकारिक पोर्टल पर आवेदन करें',
      requiredDocs: 'आवश्यक दस्तावेज़',
      benefits: 'योजना के लाभ',
      savedSchemes: 'सहेजी गई योजनाएं',
      allSchemes: 'सभी प्रकाशित योजनाएं',
    },
    emergency: {
      title: 'आपातकालीन एसओएस और हेल्पलाइन निर्देशिका',
      subtitle: 'सत्यापित राष्ट्रीय आपातकालीन नंबरों और व्यक्तिगत संकट संपर्कों तक सीधी पहुंच।',
      sosButton: 'आपातकालीन एसओएस सक्रिय करें',
      instantDial: 'त्वरित कॉल करें',
      contactsTitle: 'व्यक्तिगत आपातकालीन संपर्क',
      addContact: 'नया संपर्क जोड़ें',
      gpsStatus: 'जीपीएस स्थान स्थिति',
      disclaimer: 'कॉल आपके डिवाइस फोन नेटवर्क से होगी। जान के खतरे में हमेशा सीधे 112 डायल करें।',
    },
    chat: {
      title: 'सहायक नागरिक एआई',
      welcomeMsg: 'नमस्ते! मैं सहायक एआई हूँ। मैं सरकारी योजनाओं, नागरिक प्रक्रियाओं या शिकायत पत्र बनाने में आपकी क्या मदद कर सकता हूँ?',
      inputPlaceholder: 'अपनी भाषा में कोई भी सवाल पूछें...',
      send: 'भेजें',
      clear: 'बातचीत साफ़ करें',
      disclaimer: 'एआई सलाह केवल मार्गदर्शन के लिए है। किसी भी आधिकारिक निर्णय से पहले .gov.in पोर्टल पर जांच अवश्य करें।',
    },
    common: {
      loading: 'लोड हो रहा है...',
      save: 'सहेजें',
      cancel: 'रद्द करें',
      delete: 'हटाएं',
      view: 'देखें',
      close: 'बंद करें',
      status: 'स्थिति',
      date: 'तारीख',
      back: 'वापस',
    },
  },
  mr: {
    appName: 'सहायक AI',
    appTagline: 'डिजिटल नागरिक सहाय्यता आणि जनसेवा व्यासपीठ',
    nav: {
      home: 'मुख्यपृष्ठ',
      schemes: 'शासकीय योजना',
      complaints: 'तक्रार निवारण',
      emergency: 'आपत्कालीन हेल्पलाईन',
      assistant: 'नागरिक सहाय्यक',
      dashboard: 'नागरिक डॅशबोर्ड',
      admin: 'प्रशासन कक्ष',
      login: 'लॉग इन',
      signup: 'नोंदणी',
      logout: 'लॉग आउट',
      profile: 'माझे प्रोफाईल',
      notifications: 'सूचना',
    },
    hero: {
      badge: 'विश्वासार्ह नागरिक सेवा व्यासपीठ',
      title: 'नागरी सेवा, शासकीय योजना आणि तक्रार निवारण आता सोपे',
      subtitle: 'कल्याणकारी योजना शोधा, नागरी समस्यांसाठी तक्रारी दाखल करा आणि मराठीत त्वरित एआय मार्गदर्शन मिळवा.',
      ctaPrimary: 'सुरू करा',
      ctaSecondary: 'शासकीय योजना पहा',
      searchPlaceholder: 'योजना किंवा नगरपालिका सेवा शोधा...',
      trustNote: 'नागरिकांसाठी स्वतंत्र डिजिटल व्यासपीठ. अधिकृत दुवे थेट .gov.in वर नेतात.',
    },
    features: {
      schemesTitle: 'शासकीय योजनांचा शोध',
      schemesDesc: 'पात्रतेचे निकष, फायदे आणि आवश्यक कागदपत्रांच्या तपशीलांसह केंद्र आणि राज्य योजना शोधा.',
      complaintsTitle: 'नागरी समस्या तक्रार व्यवस्थापन',
      complaintsDesc: 'खड्डे, पाणीपुरवठा, वीज आणि कचरा समस्यांसाठी एआय ड्राफ्टिंगसह तक्रार नोंदवा.',
      helplinesTitle: 'सत्यापित आपत्कालीन हेल्पलाईन',
      helplinesDesc: 'राष्ट्रीय आपत्कालीन क्रमांकांवर (११२, १००, १०८, १९३० सायबर सुरक्षा) एका क्लिकवर कॉल करा.',
      assistantTitle: 'बहुभाषिक नागरी एआय',
      assistantDesc: 'आपल्या प्रादेशिक भाषेत प्रशासकीय प्रक्रिया आणि योजनांशी संबंधित उत्तरे मिळवा.',
    },
    dashboard: {
      welcome: 'स्वागत आहे,',
      quickActions: 'द्रुत कृती',
      activeComplaints: 'माझ्या सक्रिय तक्रारी',
      recommendedSchemes: 'शिफारस केलेल्या योजना',
      emergencyHelplineCard: 'तात्काळ आपत्कालीन मदत',
      lodgeComplaint: 'तक्रार दाखल करा',
      browseSchemes: 'सर्व योजना पहा',
      askAssistant: 'एआय सहाय्यकाशी बोला',
      call112: '११२ डायल करा',
    },
    complaints: {
      title: 'नागरिक तक्रार कक्ष',
      lodgeNew: 'नवीन तक्रार नोंदवा',
      referenceNo: 'संदर्भ क्रमांक',
      category: 'वर्गवारी',
      department: 'विभाग',
      status: 'सद्यस्थिती',
      filedOn: 'दाखल तारीख',
      viewDetails: 'तपशील पहा',
      description: 'तक्रारीचे स्वरूप',
      location: 'ठिकाणाचा तपशील',
      draftLetter: 'एआय पत्र मसुदा',
      evidence: 'पुरावा कागदपत्रे',
      submitGrievance: 'तक्रार सबमिट करा',
      emptyMessage: 'अद्याप कोणतीही तक्रार नोंदवलेली नाही.',
    },
    schemes: {
      title: 'शासकीय कल्याणकारी योजना',
      search: 'योजनेचे नाव शोधा...',
      filterCategory: 'सर्व वर्गवारी',
      filterState: 'सर्व राज्ये / राष्ट्रीय',
      checkEligibility: 'पात्रता तपासा',
      applyOfficial: 'अधिकृत पोर्टलवर अर्ज करा',
      requiredDocs: 'आवश्यक कागदपत्रे',
      benefits: 'योजनेचे फायदे',
      savedSchemes: 'जतन केलेल्या योजना',
      allSchemes: 'सर्व योजना',
    },
    emergency: {
      title: 'आपत्कालीन एसओएस आणि हेल्पलाईन',
      subtitle: 'सत्यापित राष्ट्रीय आपत्कालीन क्रमांक आणि व्यक्तिगत संपर्क.',
      sosButton: 'आपत्कालीन एसओएस ट्रिगर करा',
      instantDial: 'त्वरित कॉल करा',
      contactsTitle: 'वैयक्तिक आपत्कालीन संपर्क',
      addContact: 'संपर्क जोडा',
      gpsStatus: 'जीपीएस स्थान स्थिती',
      disclaimer: 'कॉल तुमच्या फोन नेटवर्कवरून केला जाईल. गंभीर आपत्कालीन परिस्थितीत थेट ११२ वर संपर्क साधा.',
    },
    chat: {
      title: 'सहायक नागरी एआय',
      welcomeMsg: 'नमस्कार! मी सहायक एआय आहे. शासकीय योजना किंवा तक्रारीसंबंधी मी तुम्हाला कशी मदत करू?',
      inputPlaceholder: 'मराठीत प्रश्न विचारा...',
      send: 'पाठवा',
      clear: 'संभाषण साफ करा',
      disclaimer: 'एआय मार्गदर्शन केवळ माहितीसाठी आहे. अधिकृत .gov.in संकेतस्थळावर खात्री करा.',
    },
    common: {
      loading: 'लोड होत आहे...',
      save: 'जतन करा',
      cancel: 'रद्द करा',
      delete: 'हटवा',
      view: 'पहा',
      close: 'बंद करा',
      status: 'स्थिती',
      date: 'तारीख',
      back: 'मागे',
    },
  },
  bn: {
    appName: 'সহায়ক AI',
    appTagline: 'ডিজিটাল নাগরিক সহায়তা ও গণসেবা প্ল্যাটফর্ম',
    nav: {
      home: 'হোম',
      schemes: 'সরকারি প্রকল্প',
      complaints: 'অভিযোগ প্রতিকার',
      emergency: 'জরুরি হেল্পলাইন',
      assistant: 'নাগরিক সহকারী',
      dashboard: 'নাগরিক ড্যাশবোর্ড',
      admin: 'প্রশাসন ড্যাশবোর্ড',
      login: 'লগইন',
      signup: 'নিবন্ধন',
      logout: 'লগআউট',
      profile: 'আমার প্রোফাইল',
      notifications: 'বিজ্ঞপ্তি',
    },
    hero: {
      badge: 'নির্ভরযোগ্য নাগরিক সেবা প্ল্যাটফর্ম',
      title: 'নাগরিক পরিষেবা, সরকারি প্রকল্প ও অভিযোগ প্রতিকার এখন সহজ',
      subtitle: 'সরকারি জনকল্যাণমূলক প্রকল্প খুঁজুন, পৌর সমস্যার অভিযোগ জানান এবং বাংলায় এআই সহায়তা পান।',
      ctaPrimary: 'শুরু করুন',
      ctaSecondary: 'প্রকল্পসমূহ দেখুন',
      searchPlaceholder: 'প্রকল্প বা সরকারি পরিষেবা অনুসন্ধান করুন...',
      trustNote: 'নাগরিকদের জন্য স্বতন্ত্র ডিজিটাল প্ল্যাটফর্ম। অফিসিয়াল লিঙ্কগুলি সরাসরি .gov.in পোর্টালে যাবে।',
    },
    features: {
      schemesTitle: 'সরকারি প্রকল্পের সন্ধান',
      schemesDesc: 'যোগ্যতা, সুবিধা এবং নথিপত্রের বিস্তারিত বিবরণসহ কেন্দ্রীয় ও রাজ্য প্রকল্পগুলি খুঁজুন।',
      complaintsTitle: 'নাগরিক অভিযোগ ব্যবস্থাপনা',
      complaintsDesc: 'রাস্তাঘাট, পানীয় জল ও আবর্জনা সংক্রান্ত সমস্যার জন্য এআই ড্রাফটিং সহ অভিযোগ দায়ের করুন।',
      helplinesTitle: 'যাচাইকৃত জরুরি হেল্পলাইন',
      helplinesDesc: 'জরুরি নম্বরে (১১২, ১০০, ১০৮, ১৯৩০ সাইবার ক্রাইম) এক ক্লিকে যোগাযোগ করুন।',
      assistantTitle: 'বহুভাষিক নাগরিক এআই',
      assistantDesc: 'আপনার মাতৃভাষায় সরকারি প্রক্রিয়া এবং প্রকল্পের সঠিক তথ্য জানুন।',
    },
    dashboard: {
      welcome: 'স্বাগতম,',
      quickActions: 'দ্রুত নাগরিক পদক্ষেপ',
      activeComplaints: 'আমার সক্রিয় অভিযোগ',
      recommendedSchemes: 'সুপারিশকৃত প্রকল্প',
      emergencyHelplineCard: 'জরুরি সাহায্য',
      lodgeComplaint: 'অভিযোগ দায়ের করুন',
      browseSchemes: 'সকল প্রকল্প দেখুন',
      askAssistant: 'এআই সহকারীর সাথে কথা বলুন',
      call112: '১১২ ডায়াল করুন',
    },
    complaints: {
      title: 'নাগরিক অভিযোগ পোর্টাল',
      lodgeNew: 'নতুন অভিযোগ দায়ের করুন',
      referenceNo: 'রেফারেন্স আইডি',
      category: 'বিভাগ',
      department: 'দপ্তর',
      status: 'বর্তমান অবস্থা',
      filedOn: 'দায়েরের তারিখ',
      viewDetails: 'বিস্তারিত দেখুন',
      description: 'অভিযোগের বিবরণ',
      location: 'অবস্থান বিবরণ',
      draftLetter: 'এআই চিঠি খসড়া',
      evidence: 'প্রমাণাদি ও ছবি',
      submitGrievance: 'অভিযোগ জমা দিন',
      emptyMessage: 'কোনো অভিযোগ নথিভুক্ত নেই।',
    },
    schemes: {
      title: 'সরকারি প্রকল্পসমূহ',
      search: 'প্রকল্পের নাম অনুসন্ধান করুন...',
      filterCategory: 'সমস্ত বিভাগ',
      filterState: 'সকল রাজ্য / জাতীয়',
      checkEligibility: 'যোগ্যতা যাচাই করুন',
      applyOfficial: 'অফিসিয়াল পোর্টালে আবেদন করুন',
      requiredDocs: 'প্রয়োজনীয় নথিপত্র',
      benefits: 'প্রকল্পের সুবিধাসমূহ',
      savedSchemes: 'সংরক্ষিত প্রকল্প',
      allSchemes: 'সকল প্রকাশিত প্রকল্প',
    },
    emergency: {
      title: 'জরুরি এসওএস ও হেল্পলাইন ডিরেক্টরি',
      subtitle: 'জরুরি জাতীয় নম্বর ও ব্যক্তিগত জরুরি যোগাযোগ।',
      sosButton: 'জরুরি এসওএস পাঠান',
      instantDial: 'সরাসরি কল করুন',
      contactsTitle: 'ব্যক্তিগত জরুরি যোগাযোগ',
      addContact: 'যোগাযোগ যোগ করুন',
      gpsStatus: 'জিপিএস অবস্থান',
      disclaimer: 'কলটি আপনার ডিভাইসের ফোন নেটওয়ার্ক দিয়ে করা হবে। যেকোনো জীবন সঙ্কটে সরাসরি ১১২ নম্বরে ডায়াল করুন।',
    },
    chat: {
      title: 'সহায়ক নাগরিক এআই',
      welcomeMsg: 'নমস্কার! আমি সহায়ক এআই। সরকারি প্রকল্প বা প্রশাসনিক বিষয়ে আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
      inputPlaceholder: 'বাংলায় প্রশ্ন জিজ্ঞাসা করুন...',
      send: 'পাঠান',
      clear: 'কথোপকথন পরিষ্কার করুন',
      disclaimer: 'এআই পরামর্শ কেবল নির্দেশনার জন্য। গুরুত্বপূর্ণ সিদ্ধান্তের পূর্বে .gov.in পোর্টালে যাচাই করুন।',
    },
    common: {
      loading: 'লোড হচ্ছে...',
      save: 'সংরক্ষণ',
      cancel: 'বাতিল',
      delete: 'মুছুন',
      view: 'দেখুন',
      close: 'বন্ধ করুন',
      status: 'অবস্থা',
      date: 'তারিখ',
      back: 'ফিরে যান',
    },
  },
  ta: {
    appName: 'சஹாயக் AI',
    appTagline: 'டிஜிட்டல் குடிமக்கள் உதவி மற்றும் பொது சேவை தளம்',
    nav: {
      home: 'முகப்பு',
      schemes: 'அரசு திட்டங்கள்',
      complaints: 'புகார் தீர்வு',
      emergency: 'அவசர உதவி எண்கள்',
      assistant: 'குடிமக்கள் உதவியாளர்',
      dashboard: 'குடிமக்கள் டாஷ்போர்டு',
      admin: 'நிர்வாக டாஷ்போர்டு',
      login: 'உள்நுழைக',
      signup: 'பதிவு செய்க',
      logout: 'வெளியேறுக',
      profile: 'என் சுயவிவரம்',
      notifications: 'அறிவிப்புகள்',
    },
    hero: {
      badge: 'நம்பகமான குடிமக்கள் சேவை தளம்',
      title: 'குடிமக்கள் சேவைகள், அரசு திட்டங்கள் மற்றும் புகார்கள் எளிதாக்கப்பட்டுள்ளது',
      subtitle: 'அரசு நலத்திட்டங்களை கண்டறியுங்கள், குடிமைப் புகார்களைப் பதிவு செய்யுங்கள் மற்றும் தமிழில் AI வழிகாட்டுதலைப் பெறுங்கள்.',
      ctaPrimary: 'தொடங்குக',
      ctaSecondary: 'அரசு திட்டங்களை ஆராய்க',
      searchPlaceholder: 'திட்டம் அல்லது சேவையைத் தேடுங்கள்...',
      trustNote: 'குடிமக்களுக்கான சுயாதீன தளம். அதிகாரப்பூர்வ இணைப்புகள் நேரடியாக .gov.in தளங்களுக்கு அழைத்துச் செல்லும்.',
    },
    features: {
      schemesTitle: 'அரசு நலத்திட்டங்கள்',
      schemesDesc: 'தகுதி வரம்புகள், நன்மைகள் மற்றும் தேவையான ஆவணங்களுடன் மத்திய மற்றும் மாநில திட்டங்களைக் கண்டறியவும்.',
      complaintsTitle: 'குடிமக்கள் புகார் மேலாண்மை',
      complaintsDesc: 'சாலைகள், குடிநீர் மற்றும் குப்பை பிரச்சினைகளுக்கான புகார்களை AI கடித வரைவுடன் பதிவு செய்யவும்.',
      helplinesTitle: 'சரிபார்க்கப்பட்ட அவசர எண்கள்',
      helplinesDesc: 'தேசிய அவசர எண்களுக்கு (112, 100, 108, 1930 சைபர் க்ரைம்) உடனடியாக தொடர்பு கொள்ளவும்.',
      assistantTitle: 'பன்மொழி குடிமக்கள் AI',
      assistantDesc: 'உங்கள் தாய்மொழியில் அரசு நடைமுறைகள் குறித்த துல்லியமான தகவல்களைப் பெறுங்கள்.',
    },
    dashboard: {
      welcome: 'வணக்கம்,',
      quickActions: 'விரைவு நடவடிக்கைகள்',
      activeComplaints: 'எனது புகார்கள்',
      recommendedSchemes: 'பரிந்துரைக்கப்பட்ட திட்டங்கள்',
      emergencyHelplineCard: 'அவசர உதவி',
      lodgeComplaint: 'புகார் பதிவு செய்க',
      browseSchemes: 'அனைத்து திட்டங்கள்',
      askAssistant: 'AI உதவியாளரிடம் கேளுங்கள்',
      call112: '112 அழைக்கவும்',
    },
    complaints: {
      title: 'குடிமக்கள் புகார் தளம்',
      lodgeNew: 'புதிய புகார் பதிவு',
      referenceNo: 'குறிப்பு எண்',
      category: 'வகை',
      department: 'துறை',
      status: 'தற்போதைய நிலை',
      filedOn: 'பதிவு செய்த நாள்',
      viewDetails: 'விவரங்களை காண்க',
      description: 'புகார் விளக்கம்',
      location: 'இட விவரங்கள்',
      draftLetter: 'AI கடித வரைவு',
      evidence: 'ஆதார ஆவணங்கள்',
      submitGrievance: 'புகாரை சமர்ப்பிக்கவும்',
      emptyMessage: 'இதுவரை எந்த புகாரும் பதிவு செய்யப்படவில்லை.',
    },
    schemes: {
      title: 'அரசு நலத்திட்டங்கள்',
      search: 'திட்டத்தின் பெயரைத் தேடுங்கள்...',
      filterCategory: 'அனைத்து பிரிவுகள்',
      filterState: 'அனைத்து மாநிலங்கள் / தேசிய',
      checkEligibility: 'தகுதியை சரிபார்க்கவும்',
      applyOfficial: 'அதிகாரப்பூர்வ தளத்தில் விண்ணப்பிக்கவும்',
      requiredDocs: 'தேவையான ஆவணங்கள்',
      benefits: 'திட்ட நன்மைகள்',
      savedSchemes: 'சேமிக்கப்பட்ட திட்டங்கள்',
      allSchemes: 'அனைத்து திட்டங்கள்',
    },
    emergency: {
      title: 'அவசர உதவி மற்றும் எண்கள்',
      subtitle: 'சரிபார்க்கப்பட்ட தேசிய அவசர எண்கள் மற்றும் தனிப்பட்ட தொடர்புகள்.',
      sosButton: 'அவசர SOS ஐ இயக்கு',
      instantDial: 'உடனடி அழைப்பு',
      contactsTitle: 'தனிப்பட்ட அவசர தொடர்புகள்',
      addContact: 'தொடர்பை சேர்க்கவும்',
      gpsStatus: 'GPS இருப்பிட நிலை',
      disclaimer: 'அழைப்பு உங்கள் தொலைபேசி நெட்வொர்க் வழியாக செல்லும். உயிருக்கு ஆபத்தான நிலையில் நேரடியாக 112 ஐ அழைக்கவும்.',
    },
    chat: {
      title: 'சஹாயக் AI உதவியாளர்',
      welcomeMsg: 'வணக்கம்! நான் சஹாயக் AI. அரசு திட்டங்கள் அல்லது நிர்வாக விவகாரங்களில் நான் உங்களுக்கு எப்படி உதவ முடியும்?',
      inputPlaceholder: 'தமிழில் கேள்விகளை கேளுங்கள்...',
      send: 'அனுப்புக',
      clear: 'அரட்டையை அழிக்கவும்',
      disclaimer: 'AI வழிகாட்டுதல் தகவல் நோக்கங்களுக்கானது மட்டுமே. .gov.in தளங்களில் சரிபார்க்கவும்.',
    },
    common: {
      loading: 'ஏற்றுகிறது...',
      save: 'சேமிக்க',
      cancel: 'ரத்து செய்',
      delete: 'நீக்கு',
      view: 'காண்க',
      close: 'மூடு',
      status: 'நிலை',
      date: 'தேதி',
      back: 'பின்செல்',
    },
  },
  te: {
    appName: 'సహాయక్ AI',
    appTagline: 'డిజిటల్ పౌర సహాయ మరియు సేవా వేదిక',
    nav: {
      home: 'హోమ్',
      schemes: 'ప్రభుత్వ పథకాలు',
      complaints: 'ఫిర్యాదుల పరిష్కారం',
      emergency: 'అత్యవసర హెల్ప్‌లైన్లు',
      assistant: 'పౌర సహాయకుడు',
      dashboard: 'సిటిజన్ డాష్‌బోర్డ్',
      admin: 'అడ్మిన్ డాష్‌బోర్డ్',
      login: 'లాగిన్',
      signup: 'రిజిస్టర్',
      logout: 'లాగౌట్',
      profile: 'నా ప్రొఫైల్',
      notifications: 'నోటిఫికేషన్లు',
    },
    hero: {
      badge: 'విశ్వసనీయ పౌర సేవా వేదిక',
      title: 'పౌర సేవలు, ప్రభుత్వ పథకాలు మరియు ఫిర్యాదుల పరిష్కారం సులభతరం',
      subtitle: 'సంక్షేమ పథకాలను కనుగొనండి, పౌర సమస్యలపై ఫిర్యాదు చేయండి మరియు తెలుగులో AI మార్గదర్శకత్వం పొందండి.',
      ctaPrimary: 'ప్రారంభించండి',
      ctaSecondary: 'పథకాలను చూడండి',
      searchPlaceholder: 'పథకం లేదా మున్సిపల్ సేవను వెతకండి...',
      trustNote: 'పౌరుల కోసం స్వతంత్ర వేదిక. అధికారిక లింకులు నేరుగా .gov.in పోర్టల్‌లకు దారితీస్తాయి.',
    },
    features: {
      schemesTitle: 'సంక్షేమ పథకాల అన్వేషణ',
      schemesDesc: 'అర్హతలు, ప్రయోజనాలు మరియు అవసరమైన పత్రాల పూర్తి వివరాలతో కేంద్ర, రాష్ట్ర పథకాలను కనుగొనండి.',
      complaintsTitle: 'పౌర సమస్యల ఫిర్యాదు వ్యవస్థ',
      complaintsDesc: 'రోడ్లు, నీరు మరియు విద్యుత్ సమస్యలపై AI డ్రాఫ్టింగ్‌తో ఫిర్యాదులను నమోదు చేయండి.',
      helplinesTitle: 'ధృవీకరించబడిన అత్యవసర హెల్ప్‌లైన్లు',
      helplinesDesc: 'జాతీయ అత్యవసర నంబర్లకు (112, 100, 108, 1930 సైబర్ క్రైమ్) ఒకే క్లిక్‌తో కాల్ చేయండి.',
      assistantTitle: 'బహుభాషా పౌర AI',
      assistantDesc: 'మీ మాతృభాషలో ప్రభుత్వ ప్రక్రియలపై ఖచ్చితమైన సమాచారాన్ని పొందండి.',
    },
    dashboard: {
      welcome: 'స్వాగతం,',
      quickActions: 'త్వరిత చర్యలు',
      activeComplaints: 'నా క్రియాశీల ఫిర్యాదులు',
      recommendedSchemes: 'సిఫార్సు చేయబడిన పథకాలు',
      emergencyHelplineCard: 'అత్యవసర సహాయం',
      lodgeComplaint: 'ఫిర్యాదు చేయండి',
      browseSchemes: 'అన్ని పథకాలు చూడండి',
      askAssistant: 'AI అసిస్టెంట్‌ని అడగండి',
      call112: '112 కి కాల్ చేయండి',
    },
    complaints: {
      title: 'పౌర ఫిర్యాదుల పోర్టల్',
      lodgeNew: 'కొత్త ఫిర్యాదు నమోదు చేయండి',
      referenceNo: 'రిఫరెన్స్ నంబర్',
      category: 'కేటగిరీ',
      department: 'శాఖ',
      status: 'ప్రస్తుత స్థితి',
      filedOn: 'నమోదు చేసిన తేదీ',
      viewDetails: 'వివరాలు చూడండి',
      description: 'ఫిర్యాదు వివరణ',
      location: 'స్థాన వివరాలు',
      draftLetter: 'AI లేఖ డ్రాఫ్ట్',
      evidence: 'ఆధారాలు / ఫోటోలు',
      submitGrievance: 'ఫిర్యాదును సమర్పించండి',
      emptyMessage: 'ఎటువంటి ఫిర్యాదులు నమోదు కాలేదు.',
    },
    schemes: {
      title: 'ప్రభుత్వ సంక్షేమ పథకాలు',
      search: 'పథకం పేరు కోసం వెతకండి...',
      filterCategory: 'అన్ని కేటగిరీలు',
      filterState: 'అన్ని రాష్ట్రాలు / జాతీయ',
      checkEligibility: 'అర్హత తనిఖీ చేయండి',
      applyOfficial: 'అధికారిక పోర్టల్‌లో దరఖాస్తు చేయండి',
      requiredDocs: 'అవసరమైన పత్రాలు',
      benefits: 'పథకం ప్రయోజనాలు',
      savedSchemes: 'సేవ్ చేసిన పథకాలు',
      allSchemes: 'అన్ని పథకాలు',
    },
    emergency: {
      title: 'అత్యవసర SOS మరియు హెల్ప్‌లైన్లు',
      subtitle: 'ధృవీకరించబడిన అత్యవసర నంబర్లు మరియు వ్యక్తిగత కాంటాక్ట్‌లు.',
      sosButton: 'అత్యవసర SOS ని ప్రారంభించండి',
      instantDial: 'తక్షణ కాల్',
      contactsTitle: 'వ్యక్తిగత అత్యవసర కాంటాక్ట్‌లు',
      addContact: 'కాంటాక్ట్ జోడించండి',
      gpsStatus: 'GPS లొకేషన్ స్థితి',
      disclaimer: 'కాల్ మీ ఫోన్ నెట్‌వర్క్ ద్వారా వెళ్తుంది. ప్రాణాపాయ స్థితిలో నేరుగా 112కి కాల్ చేయండి.',
    },
    chat: {
      title: 'సహాయక్ సిటిజన్ AI',
      welcomeMsg: 'నమస్కారం! నేను సహాయక్ AIని. ప్రభుత్వ పథకాలు లేదా ఫిర్యాదులపై మీకు ఎలా సహాయపడగలను?',
      inputPlaceholder: 'తెలుగులో ప్రశ్న అడగండి...',
      send: 'పంపండి',
      clear: 'చర్చను క్లియర్ చేయండి',
      disclaimer: 'AI సమాచారం మార్గదర్శకత్వం కోసం మాత్రమే. .gov.in పోర్టల్‌లలో సరిచూసుకోండి.',
    },
    common: {
      loading: 'లోడ్ అవుతోంది...',
      save: 'సేవ్',
      cancel: 'రద్దు',
      delete: 'తొలగించు',
      view: 'చూడండి',
      close: 'మూసివేయి',
      status: 'స్థితి',
      date: 'తేదీ',
      back: 'వెనుకకు',
    },
  },
  gu: {
    appName: 'સહાયક AI',
    appTagline: 'ડિજિટલ નાગરિક સહાય અને જન સેવા મંચ',
    nav: {
      home: 'હોમ',
      schemes: 'સરકારી યોજનાઓ',
      complaints: 'ફરિયાદ નિવારણ',
      emergency: 'ઇમરજન્સી હેલ્પલાઇન',
      assistant: 'નાગરિક સહાયક',
      dashboard: 'નાગરિક ડેશબોર્ડ',
      admin: 'એડમિન ડેશબોર્ડ',
      login: 'લૉગ ઇન',
      signup: 'નોંધણી',
      logout: 'લૉગ આઉટ',
      profile: 'મારી પ્રોફાઇલ',
      notifications: 'સૂચનાઓ',
    },
    hero: {
      badge: 'વિશ્વસનીય નાગરિક સેવા મંચ',
      title: 'નાગરિક સેવાઓ, સરકારી યોજનાઓ અને ફરિયાદ નિવારણ હવે સરળ',
      subtitle: 'સરકારી કલ્યાણકારી યોજનાઓ શોધો, નાગરિક સમસ્યાઓ માટે ફરિયાદ નોંધાવો અને ગુજરાતીમાં AI સહાય મેળવો.',
      ctaPrimary: 'શરૂ કરો',
      ctaSecondary: 'સરકારી યોજનાઓ જુઓ',
      searchPlaceholder: 'યોજના અથવા નગરપાલિકા સેવા શોધો...',
      trustNote: 'નાગરિકો માટે સ્વતંત્ર ડિજિટલ મંચ. સત્તાવાર લિંક્સ સીધા .gov.in પોર્ટલ પર લઈ જાય છે.',
    },
    features: {
      schemesTitle: 'સરકારી યોજનાઓની શોધ',
      schemesDesc: 'પાત્રતા, લાભો અને જરૂરી દસ્તાવેજોની વિગતો સાથે કેન્દ્ર અને રાજ્ય સરકારની યોજનાઓ શોધો.',
      complaintsTitle: 'નાગરિક ફરિયાદ વ્યવસ્થાપન',
      complaintsDesc: 'રસ્તાના ખાડા, પાણી પુરવઠો અને કચરાની સમસ્યાઓ માટે AI ડ્રાફ્ટિંગ સાથે ફરિયાદ નોંધાવો.',
      helplinesTitle: 'ચકાસાયેલ ઇમરજન્સી હેલ્પલાઇન',
      helplinesDesc: 'રાષ્ટ્રીય ઇમરજન્સી નંબરો (112, 100, 108, 1930 સાયબર ક્રાઈમ) પર એક ક્લિકમાં કૉલ કરો.',
      assistantTitle: 'બહુભાષી નાગરિક AI',
      assistantDesc: 'તમારી પ્રાદેશિક ભાષામાં સરકારી પ્રક્રિયાઓ અને યોજનાઓની સાચી માહિતી મેળવો.',
    },
    dashboard: {
      welcome: 'સ્વાગત છે,',
      quickActions: 'ઝડપી કાર્યો',
      activeComplaints: 'મારી સક્રિય ફરિયાદો',
      recommendedSchemes: 'ભલામણ કરેલ યોજનાઓ',
      emergencyHelplineCard: 'તાત્કાલિક ઇમરજન્સી સહાય',
      lodgeComplaint: 'ફરિયાદ નોંધાવો',
      browseSchemes: 'બધી યોજનાઓ જુઓ',
      askAssistant: 'AI સહાયકને પૂછો',
      call112: '112 ડાયલ કરો',
    },
    complaints: {
      title: 'નાગરિક ફરિયાદ પોર્ટલ',
      lodgeNew: 'નવી ફરિયાદ નોંધાવો',
      referenceNo: 'સંદર્ભ નંબર (ID)',
      category: 'શ્રેણી',
      department: 'વિભાગ',
      status: 'હાલની સ્થિતિ',
      filedOn: 'નોંધાયેલ તારીખ',
      viewDetails: 'વિગતો જુઓ',
      description: 'ફરિયાદ વિગત',
      location: 'સ્થાન વિગત',
      draftLetter: 'AI પત્ર ડ્રાફ્ટ',
      evidence: 'પુરાવા / ફોટા',
      submitGrievance: 'ફરિયાદ સબમિટ કરો',
      emptyMessage: 'હજી સુધી કોઈ ફરિયાદ નોંધાઈ નથી.',
    },
    schemes: {
      title: 'સરકારી કલ્યાણકારી યોજનાઓ',
      search: 'યોજનાનું નામ શોધો...',
      filterCategory: 'બધી શ્રેણીઓ',
      filterState: 'બધા રાજ્યો / રાષ્ટ્રીય',
      checkEligibility: 'પાત્રતા તપાસો',
      applyOfficial: 'સત્તાવાર પોર્ટલ પર અરજી કરો',
      requiredDocs: 'જરૂરી દસ્તાવેજો',
      benefits: 'યોજનાના લાભો',
      savedSchemes: 'સાચવેલ યોજનાઓ',
      allSchemes: 'બધી યોજનાઓ',
    },
    emergency: {
      title: 'ઇમરજન્સી SOS અને હેલ્પલાઇન',
      subtitle: 'ચકાસાયેલ રાષ્ટ્રીય ઇમરજન્સી નંબરો અને અંગત સંપર્કો.',
      sosButton: 'ઇમરજન્સી SOS મોકલો',
      instantDial: 'તાત્કાલિક કૉલ કરો',
      contactsTitle: 'અંગત ઇમરજન્સી સંપર્કો',
      addContact: 'સંપર્ક ઉમેરો',
      gpsStatus: 'GPS સ્થાન સ્થિતિ',
      disclaimer: 'કૉલ તમારા ફોન નેટવર્ક દ્વારા કરવામાં આવશે. જીવલેણ જોખમમાં સીધો 112 ડાયલ કરો.',
    },
    chat: {
      title: 'સહાયક નાગરિક AI',
      welcomeMsg: 'નમસ્તે! હું સહાયક AI છું. સરકારી યોજનાઓ અથવા ફરિયાદ નોંધણી અંગે હું તમને કેવી રીતે મદદ કરી શકું?',
      inputPlaceholder: 'ગુજરાતીમાં પ્રશ્ન પૂછો...',
      send: 'મોકલો',
      clear: 'વાતચીત સાફ કરો',
      disclaimer: 'AI સલાહ માત્ર માર્ગદર્શન માટે છે. સત્તાવાર .gov.in પોર્ટલ પર ચકાસણી કરો.',
    },
    common: {
      loading: 'લોડ થઈ રહ્યું છે...',
      save: 'સાચવો',
      cancel: 'રદ કરો',
      delete: 'કાઢી નાખો',
      view: 'જુઓ',
      close: 'બંધ કરો',
      status: 'સ્થિતિ',
      date: 'તારીખ',
      back: 'પાછા',
    },
  },
  pa: {
    appName: 'ਸਹਾਇਕ AI',
    appTagline: 'ਡਿਜੀਟਲ ਨਾਗਰਿਕ ਸਹਾਇਤਾ ਅਤੇ ਜਨਤਕ ਸੇਵਾ ਮੰਚ',
    nav: {
      home: 'ਮੁੱਖ ਪੰਨਾ',
      schemes: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ',
      complaints: 'ਸ਼ਿਕਾਇਤ ਨਿਵਾਰਨ',
      emergency: 'ਐਮਰਜੈਂਸੀ ਹੈਲਪਲਾਈਨ',
      assistant: 'ਨਾਗਰਿਕ ਸਹਾਇਕ',
      dashboard: 'ਨਾਗਰਿਕ ਡੈਸ਼ਬੋਰਡ',
      admin: 'ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ',
      login: 'ਲਾਗ ਇਨ',
      signup: 'ਰਜਿਸਟਰ',
      logout: 'ਲਾਗ ਆਉਟ',
      profile: 'ਮੇਰੀ ਪ੍ਰੋਫਾਈਲ',
      notifications: 'ਸੂਚਨਾਵਾਂ',
    },
    hero: {
      badge: 'ਭਰੋਸੇਯੋਗ ਨਾਗਰਿਕ ਸੇਵਾ ਮੰਚ',
      title: 'ਨਾਗਰਿਕ ਸੇਵਾਵਾਂ, ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਅਤੇ ਸ਼ਿਕਾਇਤ ਨਿਵਾਰਨ ਹੁਣ ਆਸਾਨ',
      subtitle: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਲੱਭੋ, ਨਾਗਰਿਕ ਸਮੱਸਿਆਵਾਂ ਸੰਬੰਧੀ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ ਅਤੇ ਪੰਜਾਬੀ ਵਿੱਚ AI ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਕਰੋ।',
      ctaPrimary: 'ਸ਼ੁਰੂ ਕਰੋ',
      ctaSecondary: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਦੇਖੋ',
      searchPlaceholder: 'ਸਕੀਮ ਜਾਂ ਸੇਵਾ ਖੋਜੋ...',
      trustNote: 'ਨਾਗਰਿਕਾਂ ਲਈ ਸੁਤੰਤਰ ਮੰਚ। ਅਧਿਕਾਰਤ ਲਿੰਕ ਸਿੱਧੇ .gov.in ਪੋਰਟਲ ਤੇ ਲੈ ਜਾਂਦੇ ਹਨ।',
    },
    features: {
      schemesTitle: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਦੀ ਖੋਜ',
      schemesDesc: 'ਯੋਗਤਾ, ਲਾਭਾਂ ਅਤੇ ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼ਾਂ ਦੇ ਵੇਰਵਿਆਂ ਨਾਲ ਕੇਂਦਰੀ ਅਤੇ ਰਾਜ ਸਕੀਮਾਂ ਲੱਭੋ।',
      complaintsTitle: 'ਨਾਗਰਿਕ ਸ਼ਿਕਾਇਤ ਪ੍ਰਬੰਧਨ',
      complaintsDesc: 'ਸੜਕਾਂ, ਪਾਣੀ ਅਤੇ ਬਿਜਲੀ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਲਈ AI ਡਰਾਫਟਿੰਗ ਨਾਲ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ।',
      helplinesTitle: 'ਤਸਦੀਕਸ਼ੁਦਾ ਐਮਰਜੈਂਸੀ ਹੈਲਪਲਾਈਨ',
      helplinesDesc: 'ਰਾਸ਼ਟਰੀ ਐਮਰਜੈਂਸੀ ਨੰਬਰਾਂ (112, 100, 108, 1930 ਸਾਈਬਰ ਕ੍ਰਾਈਮ) ਤੇ ਇੱਕ ਕਲਿੱਕ ਵਿੱਚ ਕਾਲ ਕਰੋ।',
      assistantTitle: 'ਬਹੁ-ਭਾਸ਼ਾਈ ਨਾਗਰਿਕ AI',
      assistantDesc: 'ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸਰਕਾਰੀ ਪ੍ਰਕਿਰਿਆਵਾਂ ਅਤੇ ਸਕੀਮਾਂ ਸੰਬੰਧੀ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ।',
    },
    dashboard: {
      welcome: 'ਜੀ ਆਇਆਂ ਨੂੰ,',
      quickActions: 'ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ',
      activeComplaints: 'ਮੇਰੀਆਂ ਸ਼ਿਕਾਇਤਾਂ',
      recommendedSchemes: 'ਸਿਫਾਰਸ਼ ਕੀਤੀਆਂ ਸਕੀਮਾਂ',
      emergencyHelplineCard: 'ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ',
      lodgeComplaint: 'ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ',
      browseSchemes: 'ਸਾਰੀਆਂ ਸਕੀਮਾਂ ਦੇਖੋ',
      askAssistant: 'AI ਸਹਾਇਕ ਨੂੰ ਪੁੱਛੋ',
      call112: '112 ਡਾਇਲ ਕਰੋ',
    },
    complaints: {
      title: 'ਨਾਗਰਿਕ ਸ਼ਿਕਾਇਤ ਪੋਰਟਲ',
      lodgeNew: 'ਨਵੀਂ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ',
      referenceNo: 'ਹਵਾਲਾ ਨੰਬਰ',
      category: 'ਸ਼੍ਰੇਣੀ',
      department: 'ਵਿਭਾਗ',
      status: 'ਮੌਜੂਦਾ ਸਥਿਤੀ',
      filedOn: 'ਦਰਜ ਮਿਤੀ',
      viewDetails: 'ਵੇਰਵੇ ਦੇਖੋ',
      description: 'ਸ਼ਿਕਾਇਤ ਵੇਰਵਾ',
      location: 'ਸਥਾਨ ਵੇਰਵਾ',
      draftLetter: 'AI ਪੱਤਰ ਡਰਾਫਟ',
      evidence: 'ਸਬੂਤ / ਤਸਵੀਰਾਂ',
      submitGrievance: 'ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ',
      emptyMessage: 'ਕੋਈ ਸ਼ਿਕਾਇਤ ਦਰਜ ਨਹੀਂ ਕੀਤੀ ਗਈ।',
    },
    schemes: {
      title: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ',
      search: 'ਸਕੀਮ ਦਾ ਨਾਮ ਖੋਜੋ...',
      filterCategory: 'ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ',
      filterState: 'ਸਾਰੇ ਰਾਜ / ਰਾਸ਼ਟਰੀ',
      checkEligibility: 'ਯੋਗਤਾ ਜਾਂਚੋ',
      applyOfficial: 'ਅਧਿਕਾਰਤ ਪੋਰਟਲ ਤੇ ਅਪਲਾਈ ਕਰੋ',
      requiredDocs: 'ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼',
      benefits: 'ਸਕੀਮ ਦੇ ਲਾਭ',
      savedSchemes: 'ਸੰਭਾਲੀਆਂ ਗਈਆਂ ਸਕੀਮਾਂ',
      allSchemes: 'ਸਾਰੀਆਂ ਸਕੀਮਾਂ',
    },
    emergency: {
      title: 'ਐਮਰਜੈਂਸੀ SOS ਅਤੇ ਹੈਲਪਲਾਈਨ',
      subtitle: 'ਤਸਦੀਕਸ਼ੁਦਾ ਰਾਸ਼ਟਰੀ ਐਮਰਜੈਂਸੀ ਨੰਬਰ ਅਤੇ ਨਿੱਜੀ ਸੰਪਰਕ।',
      sosButton: 'ਐਮਰਜੈਂਸੀ SOS ਸ਼ੁਰੂ ਕਰੋ',
      instantDial: 'ਤੁਰੰਤ ਕਾਲ ਕਰੋ',
      contactsTitle: 'ਨਿੱਜੀ ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ',
      addContact: 'ਸੰਪਰਕ ਸ਼ਾਮਲ ਕਰੋ',
      gpsStatus: 'GPS ਸਥਿਤੀ',
      disclaimer: 'ਕਾਲ ਤੁਹਾਡੇ ਫ਼ੋਨ ਨੈੱਟਵਰਕ ਰਾਹੀਂ ਕੀਤੀ ਜਾਵੇਗੀ। ਜਾਨੀ ਖ਼ਤਰੇ ਵੇਲੇ ਸਿੱਧਾ 112 ਡਾਇਲ ਕਰੋ।',
    },
    chat: {
      title: 'ਸਹਾਇਕ ਨਾਗਰਿਕ AI',
      welcomeMsg: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਸਹਾਇਕ AI ਹਾਂ। ਮੈਂ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਜਾਂ ਸ਼ਿਕਾਇਤਾਂ ਸੰਬੰਧੀ ਤੁਹਾਡੀ ਕੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?',
      inputPlaceholder: 'ਪੰਜਾਬੀ ਵਿੱਚ ਸਵਾਲ ਪੁੱਛੋ...',
      send: 'ਭੇਜੋ',
      clear: 'ਗੱਲਬਾਤ ਸਾਫ਼ ਕਰੋ',
      disclaimer: 'AI ਸਲਾਹ ਸਿਰਫ਼ ਮਾਰਗਦਰਸ਼ਨ ਲਈ ਹੈ। ਕਿਸੇ ਵੀ ਫੈਸਲੇ ਤੋਂ ਪਹਿਲਾਂ .gov.in ਪੋਰਟਲ ਤੇ ਪੁਸ਼ਟੀ ਕਰੋ।',
    },
    common: {
      loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
      save: 'ਸੇਵ ਕਰੋ',
      cancel: 'ਰੱਦ ਕਰੋ',
      delete: 'ਹਟਾਓ',
      view: 'ਦੇਖੋ',
      close: 'ਬੰਦ ਕਰੋ',
      status: 'ਸਥਿਤੀ',
      date: 'ਮਿਤੀ',
      back: 'ਪਿੱਛੇ',
    },
  },
};
