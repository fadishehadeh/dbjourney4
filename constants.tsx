
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
    title: 'Instant Finance',
    titleAr: 'التمويل الفوري',
    icon: <DollarSign key="finance" />,
    detailState: ExperienceState.RETAIL_INSTANT_FINANCE,
    hasVideo: true,
    videoPath: '/videos/retail-instant-finance.mp4',
    contentTitle: 'Dukhan Bank Instant Finance',
    contentTitleAr: 'التمويل الفوري من بنك دخان',
    contentDescription: 'Dukhan Bank Instant Finance is a fully digital financing solution that enables customers to apply for and receive Shari\'a-compliant financing within minutes. Through a simple and seamless digital journey, customers can check eligibility, receive instant decisions, and access funds quickly, without visiting a branch. Designed for convenience and speed, Instant Finance empowers customers to meet their financial needs anytime, anywhere.\n\nKey Benefits\n\n• Fully digital application journey\n• Instant eligibility check and approval\n• Fast financing disbursement\n• Shari\'a-compliant solution\n• Minimal documentation\n• Transparent financing terms\n• Accessible via Dukhan Bank digital channels\n• Secure processing',
    contentDescriptionAr: 'يُعد التمويل الفوري من بنك دخان حلًا تمويليًا رقميًا متكاملًا يتيح للعملاء التقدّم بطلب التمويل والحصول عليه خلال دقائق، وبما يتوافق مع أحكام الشريعة الإسلامية. ومن خلال رحلة رقمية بسيطة وسلسة، يمكن للعملاء التحقق من الأهلية، والحصول على قرارات فورية، والوصول السريع إلى التمويل دون الحاجة لزيارة الفرع. وقد صُمّم التمويل الفوري ليوفّر أعلى مستويات السرعة والراحة، ويمكّن العملاء من تلبية احتياجاتهم المالية في أي وقت ومن أي مكان.\n\nالمزايا الرئيسية\n\n• رحلة تقديم طلب رقمية بالكامل\n• التحقق الفوري من الأهلية والموافقة\n• صرف سريع للتمويل\n• حل متوافق مع أحكام الشريعة الإسلامية\n• مستندات محدودة\n• شروط تمويل واضحة وشفافة\n• متاح عبر القنوات الرقمية لبنك دخان\n• معالجة آمنة'
  },
  {
    id: 2,
    title: 'Instant Credit Card',
    titleAr: 'بطاقة الائتمان الفورية',
    icon: <CreditCard key="creditcard" />,
    detailState: ExperienceState.RETAIL_INSTANT_PREPAID,
    hasVideo: true,
    videoPath: '/videos/retail-prepaid-card.mp4',
    contentTitle: 'Instant Credit Card',
    contentTitleAr: 'بطاقة الائتمان الفورية من بنك دخان',
    contentDescription: 'Dukhan Bank\'s Instant Credit Card enables eligible customers to apply for and receive a credit card instantly through a fully digital journey. The card is issued with a pre-set credit limit, allowing customers to start using it immediately for everyday purchases and online transactions, without waiting or visiting a branch.\n\nKey Benefits\n\n• Instant digital card issuance\n• Pre-set credit limit\n• Fully digital application journey\n• Immediate card usability\n• Secure transactions\n• No branch visit required\n• Available through Dukhan Bank digital channels',
    contentDescriptionAr: 'تُمكّن بطاقة الائتمان الفورية من بنك دخان العملاء المؤهلين من التقدّم بطلب بطاقة ائتمان والحصول عليها فورًا عبر رحلة رقمية متكاملة. يتم إصدار البطاقة بحد ائتماني محدد مسبقًا، مما يتيح للعملاء استخدامها مباشرة في المشتريات اليومية والمعاملات عبر الإنترنت، دون انتظار أو الحاجة إلى زيارة الفرع.\n\nالمزايا الرئيسية\n\n• إصدار فوري لبطاقة رقمية\n• حد ائتماني محدد مسبقًا\n• رحلة تقديم طلب رقمية بالكامل\n• إمكانية استخدام البطاقة فورًا\n• معاملات آمنة\n• لا حاجة لزيارة الفرع\n• متاحة عبر القنوات الرقمية لبنك دخان'
  },
  {
    id: 3,
    title: 'DAwards (Rewards Program)',
    titleAr: 'مكافآت بنك دخان (DAwards)',
    icon: <Gift key="dawards-rewards" />,
    detailState: ExperienceState.RETAIL_CARD_OFFERS,
    hasVideo: true,
    videoPath: '/videos/retail-card-offers.mp4',
    contentTitle: 'Dukhan Bank Rewards (DAwards)',
    contentTitleAr: 'مكافآت بنك دخان (DAwards)',
    contentDescription: 'More Rewards. More Freedom. More Possibilities.\n\nDukhan Bank DAwards lets customers earn points on everyday spending and redeem them for a world of exciting rewards. From flights and hotels to car rentals, shopping, and e-vouchers, DAwards gives customers the flexibility to enjoy what matters most. Customers can simply log in to Dukhan Mobile to view their balance, redeem points, or transfer them to Qatar Airways Avios or Ooredoo Nojoom.\n\nHow to Earn DAwards\n\nCredit Cards\n\nVisa Platinum\nLocal: 1 DAward per QAR 8\nInternational: 1 DAward per QAR 7\nWelcome Bonus: 5,000 DAwards\n\nVisa Signature\nLocal: 1 DAward per QAR 6\nInternational: 1 DAward per QAR 5\nWelcome Bonus: 10,000 DAwards\n\nVisa Infinite (Retail)\nLocal: 1 DAward per QAR 5\nInternational: 1 DAward per QAR 3\nWelcome Bonus: 15,000 DAwards\n\nVisa Infinite (Private Banking)\nLocal: 1 DAward per QAR 5\nInternational: 1 DAward per QAR 3\n\nOther Cards\n\nPrepaid Card\n1 DAward per QAR 10 spent\n\nJeelkum Debit Card\n1 DAward per QAR 10 international spend\n\nRedeem Your DAwards For\n\n• Flights with major airlines\n• Hotel stays worldwide\n• Car rentals\n• E-vouchers from top brands\n• Marketplace products\n• Transfer to Qatar Airways Avios or Ooredoo Nojoom\n\nGet Started\n\nDownload Dukhan Mobile, register, and start earning and redeeming DAwards today.',
    contentDescriptionAr: 'مكافآت أكثر. حرية أكبر. إمكانيات بلا حدود.\n\nيمنحك برنامج DAwards من بنك دخان فرصة كسب النقاط على إنفاقك اليومي واستبدالها بعالم واسع من المكافآت المميّزة. من تذاكر الطيران والفنادق إلى تأجير السيارات والتسوّق والقسائم الإلكترونية، يوفّر لك DAwards المرونة للاستمتاع بما يهمّك أكثر. ما عليك سوى تسجيل الدخول إلى تطبيق Dukhan Mobile للاطلاع على رصيدك، واستبدال النقاط، أو تحويلها إلى أفيوس الخطوط الجوية القطرية (Qatar Airways Avios) أو نجوم أوريدو (Ooredoo Nojoom).\n\nكيفية كسب  نقاط   DAwards\n\nبطاقات الائتمان\n\nVisa Platinum\n• الإنفاق المحلي: 1 DAward لكل 8 ريالات قطرية\n• الإنفاق الدولي: 1 DAward لكل 7 ريالات قطرية\n• مكافأة ترحيبية: 5,000 DAwards\n\nVisa Signature\n• الإنفاق المحلي: 1 DAward لكل 6 ريالات قطرية\n• الإنفاق الدولي: 1 DAward لكل 5 ريالات قطرية\n• مكافأة ترحيبية: 10,000 DAwards\n\nVisa Infinite (الأفراد)\n• الإنفاق المحلي: 1 DAward لكل 5 ريالات قطرية\n• الإنفاق الدولي: 1 DAward لكل 3 ريالات قطرية\n• مكافأة ترحيبية: 15,000 DAwards\n\nVisa Infinite (الخدمات المصرفية الخاصة)\n• الإنفاق المحلي: 1 DAward لكل 5 ريالات قطرية\n• الإنفاق الدولي: 1 DAward لكل 3 ريالات قطرية\n\nبطاقات أخرى\n\nالبطاقة مسبقة الدفع\n• 1 DAward لكل 10 ريالات قطرية يتم إنفاقها\n\nبطاقة الخصم Jeelkum\n• 1 DAward لكل 10 ريالات قطرية إنفاق دولي\n\nاستبدل نقاط DAwards بـ\n\n• تذاكر طيران مع كبرى شركات الطيران\n• إقامات فندقية حول العالم\n• تأجير السيارات\n• قسائم إلكترونية من أشهر العلامات التجارية\n• منتجات من متجر المكافآت\n• تحويل النقاط إلى أفيوس الخطوط الجوية القطرية أو نجوم أوريدو\n\nابدأ الآن\n\nقم بتنزيل تطبيق Dukhan Mobile، وسجّل، وابدأ اليوم في كسب واستبدال نقاط DAwards.'
  },
  {
    id: 4,
    title: 'Investment Tracking (Private Banking)',
    titleAr: 'تتبّع الاستثمارات (الخدمات المصرفية الخاصة)',
    icon: <TrendingUp key="investment" />,
    detailState: ExperienceState.RETAIL_DAWARDS,
    hasVideo: true,
    videoPath: '/videos/retail-dawards.mp4',
    contentTitle: 'Private Banking - Investment Tracking',
    contentTitleAr: 'ميزة تتبّع الاستثمارات من بنك دخان',
    contentDescription: 'Dukhan Bank\'s Investment Tracking feature enables Private Banking customers to view and monitor their investment portfolios directly through the Dukhan Mobile app. The feature provides real-time portfolio performance, valuations, and market insights, giving clients greater visibility, control, and confidence in managing their wealth. Designed to support informed decision-making, Investment Tracking enhances the digital private banking experience through seamless access and comprehensive reporting.\n\nKey Benefits\n\n• Real-time view of investment portfolio performance\n• Access via Dukhan Mobile app\n• Consolidated view of holdings and valuations\n• Market insights and financial news updates\n• Improved visibility and transparency\n• Supports informed investment decisions\n• Secure access for Private Banking clients',
    contentDescriptionAr: 'تمكّن ميزة تتبّع الاستثمارات من بنك دخان عملاء الخدمات المصرفية الخاصة من عرض ومتابعة محافظهم الاستثمارية مباشرة عبر تطبيق Dukhan Mobile. توفّر هذه الميزة عرضًا فوريًا لأداء المحافظ، وقيم الاستثمارات، ورؤى السوق، مما يمنح العملاء مستوى أعلى من الوضوح والتحكّم والثقة في إدارة ثرواتهم. وقد صُمّمت هذه الميزة لدعم اتخاذ قرارات استثمارية مدروسة، وتعزيز تجربة الخدمات المصرفية الخاصة الرقمية من خلال وصول سلس وتقارير شاملة.\n\nالمزايا الرئيسية\n\n• عرض فوري لأداء المحفظة الاستثمارية\n• إمكانية الوصول عبر تطبيق Dukhan Mobile\n• عرض موحّد للمقتنيات وقيم الاستثمارات\n• رؤى السوق وتحديثات الأخبار المالية\n• شفافية ووضوح أكبر\n• دعم اتخاذ قرارات استثمارية مدروسة\n• وصول آمن لعملاء الخدمات المصرفية الخاصة'
  },
  {
    id: 5,
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
    title: 'Host-to-Host (H2H)',
    titleAr: 'اتصال نظام إلى نظام',
    icon: <Wallet key="h2h" />,
    detailState: ExperienceState.CORPORATE_VCP,
    hasVideo: true,
    videoPath: '/videos/vcp.mp4',
    contentTitle: 'Host-to-Host (H2H)',
    contentTitleAr: 'اتصال نظام إلى نظام (Host-to-Host – H2H)',
    contentDescription: 'Dukhan Bank\'s Host-to-Host solution connects business systems directly with the Bank for secure, automated, and high-volume transaction processing; enabling faster payments, reduced manual work, and seamless integration with your ERP or treasury platform.\n\nHighlights\n\n• Direct system-to-system connectivity\n• Automated bulk payments and collections\n• Faster processing and confirmations\n• Secure and reliable integration',
    contentDescriptionAr: 'حلّ Host-to-Host من بنك دخان يربط أنظمتكم مباشرة بأنظمة البنك لمعالجة المعاملات بشكل آمن وآلي وبأحجام كبيرة، مما يتيح مدفوعات أسرع، ويقلّل الأعمال اليدوية، ويوفّر تكاملاً سلسًا مع نظام تخطيط موارد المؤسسة (ERP) أو منصة إدارة الخزينة لديكم.\n\nالمزايا الرئيسية\n\n• اتصال مباشر من نظام إلى نظام\n• أتمتة المدفوعات والتحصيلات بالجملة\n• معالجة أسرع وتأكيدات فورية\n• تكامل آمن وموثوق'
  },
  {
    id: 2,
    title: 'WPS',
    titleAr: 'نظام حماية الأجور',
    icon: <Users key="wps" />,
    detailState: ExperienceState.CORPORATE_WPS,
    hasVideo: true,
    videoPath: '/videos/corporate-wps.mp4',
    contentTitle: 'Wage Protection System (WPS)',
    contentTitleAr: 'نظام حماية الأجور (WPS)',
    contentDescription: 'Dukhan Bank\'s Wage Protection System (WPS) provides corporations with a real-time portal to process employee salary payments in a secure and compliant manner. The platform enables companies to upload salary files, validate employee details, execute payments, and generate comprehensive reports of all previous salary transactions, ensuring transparency, accuracy, and regulatory compliance.\n\nKey Benefits\n\n• Real-time portal for salary processing\n• Secure and compliant salary payments\n• Easy upload of salary files\n• Automated validation and processing\n• Faster salary disbursements\n• Access to historical payment records\n• Downloadable reports and statements\n• Reduced manual effort',
    contentDescriptionAr: 'يوفّر نظام حماية الأجور (WPS) من بنك دخان للشركات بوابة فورية لمعالجة رواتب الموظفين بطريقة آمنة ومتوافقة مع المتطلبات التنظيمية. تُمكّن المنصة الشركات من رفع ملفات الرواتب، والتحقق من بيانات الموظفين، وتنفيذ المدفوعات، وإصدار تقارير شاملة لجميع معاملات الرواتب السابقة، بما يضمن الشفافية والدقة والامتثال للوائح التنظيمية.\n\nالمزايا الرئيسية\n\n• بوابة فورية لمعالجة الرواتب\n• مدفوعات رواتب آمنة ومتوافقة مع الأنظمة\n• سهولة رفع ملفات الرواتب\n• التحقق والمعالجة الآلية\n• صرف الرواتب بشكل أسرع\n• الوصول إلى سجلات المدفوعات السابقة\n• تقارير وكشوفات قابلة للتنزيل\n• الحد من المهام اليدوية'
  },
  {
    id: 3,
    title: 'E-Trade',
    titleAr: 'التجارة الإلكترونية',
    icon: <Globe key="etrade" />,
    detailState: ExperienceState.CORPORATE_PAYMENT_GATEWAY,
    hasVideo: true,
    videoPath: '/videos/corporate-payment-gateway.mp4',
    contentTitle: 'E-Trade',
    contentTitleAr: 'التجارة الإلكترونية (E-Trade)',
    contentDescription: 'Dukhan Bank\'s E-Trade platform provides corporations with a digital channel to initiate, submit, and track trade finance transactions online. The solution streamlines trade processes, reduces paperwork, and improves visibility across trade activities; enabling faster and more efficient handling of trade finance instruments.\n\nKey Benefits\n\n• Online initiation of trade transactions\n• Digital submission of documents\n• Real-time status tracking\n• Faster processing and approvals\n• Reduced paperwork\n• Improved transparency\n• Secure and compliant platform\n• Centralized trade management',
    contentDescriptionAr: 'توفّر منصة E-Trade من بنك دخان للشركات قناة رقمية لبدء معاملات تمويل التجارة وتقديمها ومتابعتها عبر الإنترنت. تعمل هذه الحلول على تبسيط عمليات التجارة، وتقليل الأعمال الورقية، وتعزيز مستوى الرؤية والاطلاع على أنشطة تمويل التجارة، مما يتيح معالجة أسرع وأكثر كفاءة لأدوات تمويل التجارة.\n\nالمزايا الرئيسية\n\n• بدء معاملات تمويل التجارة عبر الإنترنت\n• التقديم الرقمي للمستندات\n• تتبّع حالة المعاملات في الوقت الفعلي\n• الاستفادة من معالجة وموافقات أسرع\n• تقليل الأعمال الورقية\n• تعزيز الشفافية\n• منصة آمنة ومتوافقة مع المتطلبات التنظيمية\n• إدارة مركزية لمعاملات التجارة'
  },
  {
    id: 4,
    title: 'Corporate Internet & Mobile Banking',
    titleAr: 'الخدمات المصرفية عبر الإنترنت والجوّال للشركات',
    icon: <FileText key="cib" />,
    detailState: ExperienceState.CORPORATE_RDC,
    hasVideo: true,
    videoPath: '/videos/corporate-rdc.mp4',
    contentTitle: 'Corporate Internet & Mobile Banking',
    contentTitleAr: 'الخدمات المصرفية عبر الإنترنت والجوّال للشركات',
    contentDescription: 'Dukhan Bank\'s Corporate Internet and Mobile Banking services provide businesses with a secure, intuitive, and unified digital platform to manage their financial operations anytime, anywhere. Through a dedicated website and mobile app, corporations can access accounts, execute payments, and monitor transactions seamlessly; empowering greater control, efficiency, and visibility across their business.\n\nKey Benefits\n\n• Secure access with two-factor authentication (2FA)\n• Biometric login using Fingerprint or Face ID\n• Seamless experience across web and mobile (iOS & Android)\n• View and download account statements up to 6 months (PDF / XLS)\n• Own account, intra-bank, domestic and international transfers\n• Utility payments for Vodafone, Ooredoo, and Kahramaa\n• Single access to multiple group companies\n• Real-time balances and transaction history',
    contentDescriptionAr: 'توفّر خدمات الخدمات المصرفية عبر الإنترنت والجوّال للشركات من بنك دخان منصة رقمية موحّدة وآمنة وسهلة الاستخدام تُمكّن الشركات من إدارة عملياتها المالية في أي وقت ومن أي مكان. ومن خلال موقع إلكتروني مخصّص وتطبيق الجوّال، يمكن للشركات الوصول إلى حساباتها، وإجراء المدفوعات، ومتابعة المعاملات بكل سلاسة، مما يعزّز مستوى التحكم والكفاءة والشفافية في أعمالها.\n\nالمزايا الرئيسية\n\n• وصول آمن باستخدام المصادقة الثنائية (2FA)\n• تسجيل الدخول البيومتري عبر بصمة الإصبع أو تقنية التعرف على الوجه\n• تجربة سلسة عبر الإنترنت وتطبيقات الجوّال (iOS وAndroid)\n• عرض وتنزيل كشوف الحساب حتى 6 أشهر (PDF / XLS)\n• إجراء تحويلات بين الحسابات الخاصة، وداخل البنك، ومحلية ودولية\n• سداد فواتير الخدمات لفودافون، وأوريدُ، وكهرماء\n• دخول موحّد لإدارة عدة شركات ضمن المجموعة الواحدة\n• أرصدة فورية وسجل كامل للمعاملات'
  },
  {
    id: 5,
    title: 'D-TAP (Soft POS)',
    titleAr: 'D-TAP نقطة بيع لينة (Soft POS)',
    icon: <Smartphone key="dtap" />,
    detailState: ExperienceState.CORPORATE_DTAP,
    hasVideo: true,
    videoPath: '/videos/corporate-dtap.mp4',
    contentTitle: 'D-TAP (Soft POS)',
    contentTitleAr: 'D-TAP نقطة بيع لينة (Soft POS)',
    contentDescription: 'D-TAP is Dukhan Bank\'s newly launched Soft POS solution with PIN acceptance, designed to provide merchants with a smart, flexible, and cost-effective way to accept payments. This low-cost, maintenance-free solution enables merchants to accept payments from any contactless-enabled card or mobile wallet directly on their NFC-enabled Android™️ device, without the need for additional hardware. D-TAP delivers a fast, secure, and convenient payment experience while supporting Dukhan Bank\'s expanding corporate digital services portfolio.\n\nKey Benefits\n\n• Soft POS with PIN acceptance\n• Accept payments on NFC-enabled Android devices\n• No additional hardware required\n• Supports contactless cards and mobile wallets\n• Low-cost and maintenance-free solution\n• Fast and convenient checkout experience\n• Secure transaction processing\n• Option to send receipts via SMS or email',
    contentDescriptionAr: 'تُعد خدمة (D-Tap) من بنك دخان أحدث ابتكارات نقاط البيع الرقمية (Soft POS) التي تدعم الرقم السري (PIN)، حيث صُممت لتقدم للتجار حلاً ذكيًا ومنخفض التكلفة لقبول المدفوعات دون عناء الصيانة أو الحاجة لأجهزة إضافية. وتتيح هذه التقنية المتطورة تحويل أجهزة Android™ المزودة بخاصية NFC إلى منصات دفع فورية دون لمس تقبل كافة البطاقات والمحافظ الرقمية، مما يضمن تجربة دفع سريعة وآمنة تعزز من محفظة الخدمات الرقمية المتنامية التي يقدمها البنك لدعم قطاع الشركات.\n\nالمزايا الرئيسية\n\n• حلول نقاط البيع الرقمية(Soft POS) تدعم الرقم السري (PIN)\n• قبول المدفوعات عبر أجهزة Android المزوّدة بتقنية NFC\n• لا حاجة لأي أجهزة إضافية\n• تدعم خاصية الدفع دون لمس وعبر المحافظ الرقمية\n• حل منخفض التكلفة دون الحاجة إلى صيانة دورية\n• تجربة دفع سريعة ومريحة عند نقاط البيع\n• معالجة آمنة وموثوقة لكافة المعاملات\n• إمكانية إرسال الإيصالات عبر الرسائل النصية القصيرة (SMS) أو البريد الإلكتروني'
  },
  {
    id: 6,
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
