/**
 * Arabic auth translations — flat key-value map.
 * Imported into the auth pages' language context.
 */
export const authAr = {
  // Brand
  brandName: 'Taqfel HR',
  brandSubtitle: 'Enterprise',

  // Language switcher
  switchLang: 'English',
  switchLangShort: 'EN',
  needHelp: 'تحتاج مساعدة؟',

  // Progress steps
  stepCompany: 'الشركة',
  stepAccount: 'الحساب',
  stepVerify: 'التحقق',
  stepSetup: 'الإعداد',
  stepReady: 'جاهز',

  // Login page
  loginTitle: 'مرحبًا بعودتك',
  loginSubtitle: 'سجّل الدخول إلى مساحة شركتك.',
  loginEmail: 'البريد الإلكتروني',
  loginEmailPlaceholder: 'أدخل بريدك الإلكتروني',
  loginPassword: 'كلمة المرور',
  loginPasswordPlaceholder: 'أدخل كلمة المرور',
  loginSubmit: 'تسجيل الدخول',
  loginForgotPassword: 'نسيت كلمة المرور؟',
  loginCreateCompany: 'إنشاء شركة جديدة',
  loginNoAccount: 'ليس لديك حساب؟',
  loginLoading: 'جارٍ تسجيل الدخول...',
  loginInvalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
  loginAccountLocked: 'تم تعليق حسابك مؤقتًا. يرجى المحاولة لاحقًا.',
  loginRateLimited: 'محاولات دخول كثيرة. يرجى الانتظار قبل المحاولة مجددًا.',
  loginUnexpectedError: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
  loginEmailNotVerified: 'يحتاج حسابك إلى تأكيد البريد الإلكتروني.',
  loginResendVerification: 'إعادة إرسال رابط التفعيل',

  // Signup - Company step
  signupCompanyTitle: 'أخبرنا عن شركتك',
  signupCompanySubtitle: 'لنبدأ ببعض المعلومات الأساسية لإنشاء مساحة شركتك.',
  signupCompanyName: 'اسم الشركة',
  signupCompanyNamePlaceholder: 'مثال: شركة الأمل',
  signupFullName: 'الاسم الكامل',
  signupFullNamePlaceholder: 'الاسم الكامل للمسؤول',
  signupEmail: 'البريد الإلكتروني الرسمي',
  signupEmailPlaceholder: 'admin@company.com',
  signupPhone: 'رقم الهاتف',
  signupPhonePlaceholder: '+20 1XX XXX XXXX',
  signupContinue: 'متابعة',
  signupBack: 'العودة',
  signupHaveAccount: 'لديك حساب بالفعل؟',
  signupLogin: 'تسجيل الدخول',

  // Signup - Account step
  signupAccountTitle: 'أنشئ حساب المسؤول',
  signupAccountSubtitle: 'سيكون هذا الحساب مسؤولًا عن مساحة شركتك.',
  signupPassword: 'كلمة المرور',
  signupPasswordPlaceholder: 'أنشئ كلمة مرور قوية',
  signupConfirmPassword: 'تأكيد كلمة المرور',
  signupConfirmPasswordPlaceholder: 'أعد إدخال كلمة المرور',
  signupCreateAccount: 'إنشاء الحساب',
  signupCreating: 'جارٍ إنشاء مساحة شركتك...',
  signupPrivacyNote: 'بياناتك محمية ولن يتم مشاركتها مع أطراف خارجية.',
  signupPasswordShow: 'إظهار كلمة المرور',
  signupPasswordHide: 'إخفاء كلمة المرور',

  // Email verification
  verifyTitle: 'تحقق من بريدك الإلكتروني',
  verifySubtitle: 'أرسلنا رابط تفعيل إلى بريدك الإلكتروني.',
  verifySentTo: 'تم الإرسال إلى',
  verifyResend: 'إعادة إرسال الرابط',
  verifyChangeEmail: 'تغيير البريد الإلكتروني',
  verifyBackToLogin: 'العودة لتسجيل الدخول',
  verifyResendSuccess: 'تم إرسال رابط جديد',
  verifyResendCooldown: 'يمكنك إعادة الإرسال بعد',
  verifySeconds: 'ثانية',
  verifyTooManyAttempts: 'تم تجاوز الحد الأقصى لمحاولات الإرسال. يرجى المحاولة لاحقًا.',
  verifySuccessTitle: 'تم تأكيد بريدك الإلكتروني',
  verifySuccessSubtitle: 'تم تفعيل حسابك بنجاح. يمكنك الآن متابعة إعداد شركتك.',
  verifySuccessContinue: 'متابعة',
  verifyExpiredTitle: 'انتهت صلاحية رابط التفعيل',
  verifyExpiredSubtitle: 'يرجى طلب رابط تفعيل جديد.',
  verifyExpiredResend: 'إرسال رابط جديد',
  verifyInvalidTitle: 'رابط التفعيل غير صالح',
  verifyInvalidSubtitle: 'هذا الرابط غير صالح أو تم استخدامه بالفعل.',
  verifyInvalidResend: 'إرسال رابط جديد',

  // Forgot password
  forgotTitle: 'استعادة كلمة المرور',
  forgotSubtitle: 'أدخل البريد الإلكتروني المرتبط بحسابك.',
  forgotEmail: 'البريد الإلكتروني',
  forgotEmailPlaceholder: 'أدخل بريدك الإلكتروني',
  forgotSubmit: 'إرسال رابط الاستعادة',
  forgotSending: 'جارٍ الإرسال...',
  forgotSuccessTitle: 'تحقق من بريدك الإلكتروني',
  forgotSuccessSubtitle: 'إذا كان لديك حساب مسجّل، ستتلقى رابطًا لاستعادة كلمة المرور.',
  forgotBackToLogin: 'العودة لتسجيل الدخول',

  // Reset password
  resetTitle: 'تعيين كلمة مرور جديدة',
  resetSubtitle: 'أنشئ كلمة مرور جديدة لحسابك.',
  resetNewPassword: 'كلمة المرور الجديدة',
  resetNewPasswordPlaceholder: 'أدخل كلمة المرور الجديدة',
  resetConfirmPassword: 'تأكيد كلمة المرور',
  resetConfirmPlaceholder: 'أعد إدخال كلمة المرور الجديدة',
  resetSubmit: 'تغيير كلمة المرور',
  resetSubmitting: 'جارٍ التغيير...',
  resetSuccessTitle: 'تم تغيير كلمة المرور',
  resetSuccessSubtitle: 'يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.',
  resetSuccessLogin: 'تسجيل الدخول',
  resetExpiredTitle: 'انتهت صلاحية الرابط',
  resetExpiredSubtitle: 'يرجى طلب رابط استعادة جديد.',
  resetExpiredAction: 'طلب رابط جديد',
  resetInvalidTitle: 'الرابط غير صالح',
  resetInvalidSubtitle: 'هذا الرابط غير صالح أو تم استخدامه.',
  resetInvalidAction: 'طلب رابط جديد',

  // Two-factor
  twoFactorTitle: 'تحقق إضافي',
  twoFactorSubtitle: 'أدخل رمز التحقق لإكمال تسجيل الدخول.',
  twoFactorCode: 'رمز التحقق',
  twoFactorCodePlaceholder: '------',
  twoFactorVerify: 'تحقق',
  twoFactorVerifying: 'جارٍ التحقق...',
  twoFactorResend: 'إرسال رمز جديد',
  twoFactorAlternative: 'استخدام طريقة أخرى',
  twoFactorInvalidCode: 'الرمز المدخل غير صحيح. يرجى المحاولة مرة أخرى.',

  // Onboarding - Company structure
  onboardingStructureTitle: 'كيف تعمل شركتك؟',
  onboardingStructureSubtitle: 'اختر الهيكل المناسب لشركتك.',
  onboardingSingleTitle: 'شركة بدون فروع',
  onboardingSingleDesc: 'فريق يعمل مباشرة تحت الشركة.',
  onboardingBranchesTitle: 'شركة بفروع',
  onboardingBranchesDesc: 'نظّم موظفيك ضمن فرع واحد أو عدة فروع.',
  onboardingContinue: 'متابعة',

  // Onboarding - Team / Branches setup
  onboardingTeamTitle: 'ابدأ بإضافة فريقك',
  onboardingBranchSetupTitle: 'أضف فروع شركتك',
  onboardingAddEmployee: 'إضافة موظفين',
  onboardingImportExcel: 'استيراد من Excel',
  onboardingSkip: 'تخطي الآن',
  onboardingAddBranch: 'إضافة فرع',
  onboardingAddAnotherBranch: 'إضافة فرع آخر',
  onboardingBranchName: 'اسم الفرع',
  onboardingBranchNamePlaceholder: 'مثال: الفرع الرئيسي',

  // Onboarding - Complete
  onboardingCompleteTitle: 'أصبحت شركتك جاهزة',
  onboardingCompleteSubtitle: 'يمكنك الآن البدء بإدارة شركتك من مساحة العمل.',
  onboardingGoToDashboard: 'الانتقال إلى لوحة التحكم',

  // Footer
  footerPrivacy: 'الخصوصية',
  footerTerms: 'الشروط',
  footerCopyright: '© ٢٠٢٦ Taqfel HR. جميع الحقوق محفوظة.',

  // Metadata
  metaLoginTitle: 'تسجيل الدخول | Taqfel HR',
  metaSignupTitle: 'إنشاء حساب شركة | Taqfel HR',
  metaVerifyTitle: 'تأكيد البريد الإلكتروني | Taqfel HR',
  metaForgotTitle: 'استعادة كلمة المرور | Taqfel HR',
  metaResetTitle: 'تعيين كلمة مرور جديدة | Taqfel HR',
  metaTwoFactorTitle: 'التحقق الإضافي | Taqfel HR',
  metaOnboardingTitle: 'إعداد الشركة | Taqfel HR',
} as const;
