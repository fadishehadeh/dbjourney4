
import React from 'react';
import { ExperienceState, ChapterData, CardData } from './types';
import {
  Zap, TrendingUp, ShieldCheck,
  Smartphone, CreditCard, Headphones, CreditCard as CardIcon,
  User, Building2, Briefcase, Gem,
  Sparkles, Leaf, Orbit,
  Wallet, Globe, Lock, TrendingUp as Chart, Users, Award,
  DollarSign, Gift, Gamepad2, FileText, Banknote, QrCode
} from 'lucide-react';

export const COLORS = {
  WHITE: '#FFFFFF',
  DARK_BLUE: '#002D74',
  GREEN: '#3DAE2B',
};

export const TIMINGS = {
  TRANSITION_DURATION: 800, // ms
  IDLE_TIMEOUT: 60000, // 60s
  AUTO_PROGRESS: 12000, // 12s
  END_RESET_TIMEOUT: 8000, // 8s
};

// Retail Cards
export const RETAIL_CARDS: CardData[] = [
  {
    id: 1,
    title: 'Mobile App',
    titleAr: 'تطبيق الهاتف المحمول',
    icon: <Smartphone key="mobile" />,
    detailState: ExperienceState.RETAIL_MOBILE_APP,
    hasVideo: true,
    videoPath: '/videos/retail-mobile-app.mp4',
    contentTitle: 'Banking at Your Fingertips',
    contentTitleAr: 'الخدمات المصرفية في متناول يدك',
    contentDescription: 'Experience seamless banking with our award-winning mobile app. Manage accounts, transfer funds, pay bills, and access exclusive features - all from the palm of your hand. Available 24/7 with biometric security and real-time notifications.',
    contentDescriptionAr: 'استمتع بتجربة مصرفية سلسة مع تطبيقنا الحائز على جوائز. إدارة الحسابات، تحويل الأموال، دفع الفواتير، والوصول إلى الميزات الحصرية - كل ذلك من راحة يدك. متاح على مدار الساعة طوال أيام الأسبوع مع الأمان البيومتري والإشعارات الفورية.'
  },
  {
    id: 2,
    title: 'Instant Finance',
    titleAr: 'التمويل الفوري',
    icon: <DollarSign key="finance" />,
    detailState: ExperienceState.RETAIL_INSTANT_FINANCE,
    hasVideo: true,
    videoPath: '/videos/retail-instant-finance.mp4',
    contentTitle: 'Quick Loans, Instant Approval',
    contentTitleAr: 'قروض سريعة، موافقة فورية',
    contentDescription: 'Get the funds you need in minutes with our instant finance solutions. Apply online, receive instant approval, and have money in your account within hours. Competitive rates, flexible terms, and no hidden fees.',
    contentDescriptionAr: 'احصل على الأموال التي تحتاجها في دقائق مع حلول التمويل الفوري لدينا. قدم طلبك عبر الإنترنت، واحصل على موافقة فورية، واستلم الأموال في حسابك في غضون ساعات. أسعار تنافسية، شروط مرنة، وبدون رسوم خفية.'
  },
  {
    id: 3,
    title: 'Instant Prepaid Card',
    titleAr: 'بطاقة مسبقة الدفع فورية',
    icon: <CreditCard key="prepaid" />,
    detailState: ExperienceState.RETAIL_INSTANT_PREPAID,
    hasVideo: true,
    videoPath: '/videos/retail-prepaid-card.mp4',
    contentTitle: 'Spend Smart, Stay Secure',
    contentTitleAr: 'أنفق بذكاء، ابق آمناً',
    contentDescription: 'Control your spending with our instant prepaid cards. Load funds instantly, use worldwide, and enjoy complete security. Perfect for budgeting, online shopping, and travel. Get your virtual card immediately.',
    contentDescriptionAr: 'تحكم في إنفاقك مع بطاقاتنا مسبقة الدفع الفورية. قم بتحميل الأموال فوراً، استخدمها في جميع أنحاء العالم، واستمتع بالأمان الكامل. مثالية للميزانية، التسوق عبر الإنترنت، والسفر. احصل على بطاقتك الافتراضية على الفور.'
  },
  {
    id: 4,
    title: 'Card Linked Offers',
    titleAr: 'عروض مرتبطة بالبطاقة',
    icon: <Gift key="offers" />,
    detailState: ExperienceState.RETAIL_CARD_OFFERS,
    hasVideo: true,
    videoPath: '/videos/retail-card-offers.mp4',
    contentTitle: 'Exclusive Rewards & Cashback',
    contentTitleAr: 'مكافآت حصرية واسترداد نقدي',
    contentDescription: 'Unlock amazing deals and cashback offers linked directly to your card. Shop at partner merchants and automatically earn rewards. No coupons needed - just swipe and save on dining, shopping, travel, and entertainment.',
    contentDescriptionAr: 'افتح صفقات مذهلة وعروض استرداد نقدي مرتبطة مباشرة ببطاقتك. تسوق لدى التجار الشركاء واكسب المكافآت تلقائياً. لا حاجة للقسائم - فقط اسحب ووفر على تناول الطعام والتسوق والسفر والترفيه.'
  },
  {
    id: 5,
    title: 'DAwards',
    titleAr: 'دي أووردز',
    icon: <Award key="dawards" />,
    detailState: ExperienceState.RETAIL_DAWARDS,
    hasVideo: true,
    videoPath: '/videos/retail-dawards.mp4',
    contentTitle: 'Your Loyalty, Our Rewards',
    contentTitleAr: 'ولاؤك، مكافآتنا',
    contentDescription: 'Earn DAwards points on every transaction and redeem them for exclusive benefits. From travel upgrades to shopping vouchers, your loyalty deserves recognition. The more you bank, the more you earn.',
    contentDescriptionAr: 'اكسب نقاط دي أووردز على كل معاملة واستبدلها بمزايا حصرية. من ترقيات السفر إلى قسائم التسوق، ولاؤك يستحق التقدير. كلما زادت معاملاتك المصرفية، زادت أرباحك.'
  },
  {
    id: 6,
    title: 'Game',
    titleAr: 'لعبة',
    icon: <Gamepad2 key="game-retail" />,
    detailState: ExperienceState.RETAIL_GAME,
    hasVideo: false,
    contentTitle: 'Play & Win Prizes',
    contentTitleAr: 'العب واربح جوائز',
    contentDescription: 'Test your skills and win exciting prizes! Register now to unlock exclusive games and compete for amazing rewards.',
    contentDescriptionAr: 'اختبر مهاراتك واربح جوائز مثيرة! سجل الآن لفتح ألعاب حصرية والتنافس على مكافآت مذهلة.'
  }
];

// Corporate Cards
export const CORPORATE_CARDS: CardData[] = [
  {
    id: 1,
    title: 'VCP',
    titleAr: 'منصة التجارة الافتراضية',
    icon: <Wallet key="vcp" />,
    detailState: ExperienceState.CORPORATE_VCP,
    hasVideo: true,
    videoPath: '/videos/vcp.mp4',
    contentTitle: 'Virtual Commercial Platform',
    contentTitleAr: 'منصة التجارة الافتراضية',
    contentDescription: 'Streamline your business payments with our cutting-edge Virtual Commercial Platform. Manage virtual cards, control spending, and gain real-time insights into corporate expenses. Enhanced security and complete flexibility for modern businesses.',
    contentDescriptionAr: 'بسّط مدفوعات عملك مع منصة التجارة الافتراضية المتطورة لدينا. إدارة البطاقات الافتراضية، التحكم في الإنفاق، والحصول على رؤى فورية حول نفقات الشركة. أمان محسّن ومرونة كاملة للأعمال الحديثة.'
  },
  {
    id: 2,
    title: 'WPS',
    titleAr: 'نظام حماية الأجور',
    icon: <Users key="wps" />,
    detailState: ExperienceState.CORPORATE_WPS,
    hasVideo: true,
    videoPath: '/videos/corporate-wps.mp4',
    contentTitle: 'Wage Protection System',
    contentTitleAr: 'نظام حماية الأجور',
    contentDescription: 'Ensure timely and compliant salary payments with our WPS solution. Automated payroll processing, government compliance, and detailed reporting. Protect your employees and your business with our secure wage management system.',
    contentDescriptionAr: 'ضمان دفع الرواتب في الوقت المحدد والامتثال مع حل نظام حماية الأجور لدينا. معالجة الرواتب الآلية، الامتثال الحكومي، والتقارير التفصيلية. احمِ موظفيك وعملك مع نظام إدارة الأجور الآمن لدينا.'
  },
  {
    id: 3,
    title: 'Payment Gateway',
    titleAr: 'بوابة الدفع',
    icon: <Globe key="gateway" />,
    detailState: ExperienceState.CORPORATE_PAYMENT_GATEWAY,
    hasVideo: true,
    videoPath: '/videos/corporate-payment-gateway.mp4',
    contentTitle: 'Seamless Online Payments',
    contentTitleAr: 'مدفوعات إلكترونية سلسة',
    contentDescription: 'Accept payments from customers worldwide with our robust payment gateway. Support for multiple currencies, advanced fraud protection, and instant settlement. Integrate easily with your e-commerce platform and grow your business globally.',
    contentDescriptionAr: 'اقبل المدفوعات من العملاء في جميع أنحاء العالم مع بوابة الدفع القوية لدينا. دعم لعملات متعددة، حماية متقدمة من الاحتيال، وتسوية فورية. تكامل سهل مع منصة التجارة الإلكترونية الخاصة بك ونمِّ عملك عالمياً.'
  },
  {
    id: 4,
    title: 'RDC',
    titleAr: 'الإيداع عن بُعد',
    icon: <FileText key="rdc" />,
    detailState: ExperienceState.CORPORATE_RDC,
    hasVideo: true,
    videoPath: '/videos/corporate-rdc.mp4',
    contentTitle: 'Remote Deposit Capture',
    contentTitleAr: 'التقاط الإيداع عن بُعد',
    contentDescription: 'Deposit checks from anywhere with our Remote Deposit Capture solution. Simply scan and submit - no branch visit required. Faster processing, improved cash flow, and reduced operational costs for your business.',
    contentDescriptionAr: 'أودع الشيكات من أي مكان مع حل التقاط الإيداع عن بُعد لدينا. ببساطة امسح وأرسل - لا حاجة لزيارة الفرع. معالجة أسرع، تحسين التدفق النقدي، وتقليل التكاليف التشغيلية لعملك.'
  },
  {
    id: 5,
    title: 'Game',
    titleAr: 'لعبة',
    icon: <Gamepad2 key="game-corporate" />,
    detailState: ExperienceState.CORPORATE_GAME,
    hasVideo: false,
    contentTitle: 'Corporate Challenge',
    contentTitleAr: 'تحدي الشركات',
    contentDescription: 'Engage your team with our interactive corporate games. Register your details and compete for exclusive business rewards and recognition.',
    contentDescriptionAr: 'أشرك فريقك مع ألعاب الشركات التفاعلية لدينا. سجل تفاصيلك وتنافس على مكافآت الأعمال الحصرية والتقدير.'
  }
];

export const CHAPTERS: ChapterData[] = [
  {
    id: ExperienceState.CHAPTER_1,
    backgroundImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1080',
    headline: 'Architecting Qatar’s Digital Future',
    headlineAr: 'بناء المستقبل الرقمي لقطر',
    subline: 'Merging visionary leadership with breakthrough innovation to redefine the modern financial landscape.',
    sublineAr: 'دمج القيادة الرؤيوية مع الابتكار الرائد لإعادة تعريف المشهد المالي الحديث.',
    icons: [<Zap key="1" />, <TrendingUp key="2" />, <ShieldCheck key="3" />],
    overlayType: 'stars',
  },
  {
    id: ExperienceState.CHAPTER_2,
    backgroundImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1080',
    headline: 'Intuitive Banking at Your Fingertips',
    headlineAr: 'الخدمات المصرفية البديهية في متناول يدك',
    subline: 'Harnessing advanced mobile technologies to deliver seamless, real-time financial empowerment globally.',
    sublineAr: 'تسخير التقنيات المحمولة المتقدمة لتقديم التمكين المالي السلس والفوري عالمياً.',
    icons: [<Smartphone key="1" />, <CreditCard key="2" />, <Headphones key="3" />, <CardIcon key="4" />],
    overlayType: 'stars',
  },
  {
    id: ExperienceState.CHAPTER_3,
    backgroundImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1080',
    headline: 'Precision Solutions for Global Wealth',
    headlineAr: 'حلول دقيقة للثروة العالمية',
    subline: 'Custom-engineered financial instruments designed to scale businesses and secure future generations.',
    sublineAr: 'أدوات مالية مصممة خصيصاً لتوسيع نطاق الأعمال وتأمين الأجيال القادمة.',
    icons: [<User key="1" />, <Building2 key="2" />, <Briefcase key="3" />, <Gem key="4" />],
    overlayType: 'stars',
  },
  {
    id: ExperienceState.CHAPTER_4,
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1080',
    headline: 'Pioneering Tomorrow’s Sustainable Economy',
    headlineAr: 'ريادة اقتصاد الغد المستدام',
    subline: 'Committing to ethical growth and green innovation for a connected, resilient future.',
    sublineAr: 'الالتزام بالنمو الأخلاقي والابتكار الأخضر من أجل مستقبل متصل ومرن.',
    icons: [<Sparkles key="1" />, <Leaf key="2" />, <Orbit key="3" />],
    overlayType: 'stars',
  }
];
