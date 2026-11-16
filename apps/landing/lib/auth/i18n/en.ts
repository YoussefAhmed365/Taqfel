/**
 * English auth translations — flat key-value map.
 */
export const authEn = {
  // Brand
  brandName: 'Taqfel HR',
  brandSubtitle: 'Enterprise',

  // Language switcher
  switchLang: 'العربية',
  switchLangShort: 'عربي',
  needHelp: 'Need help?',

  // Progress steps
  stepCompany: 'Company',
  stepAccount: 'Account',
  stepVerify: 'Verify',
  stepSetup: 'Setup',
  stepReady: 'Ready',

  // Login page
  loginTitle: 'Welcome back',
  loginSubtitle: 'Sign in to your company workspace.',
  loginEmail: 'Email',
  loginEmailPlaceholder: 'Enter your email',
  loginPassword: 'Password',
  loginPasswordPlaceholder: 'Enter your password',
  loginSubmit: 'Sign in',
  loginForgotPassword: 'Forgot password?',
  loginCreateCompany: 'Create a new company',
  loginNoAccount: "Don't have an account?",
  loginLoading: 'Signing in...',
  loginInvalidCredentials: 'Invalid email or password.',
  loginAccountLocked: 'Your account has been temporarily locked. Please try again later.',
  loginRateLimited: 'Too many login attempts. Please wait before trying again.',
  loginUnexpectedError: 'An unexpected error occurred. Please try again.',
  loginEmailNotVerified: 'Your account requires email verification.',
  loginResendVerification: 'Resend verification link',

  // Signup - Company step
  signupCompanyTitle: 'Tell us about your company',
  signupCompanySubtitle: "Let's start with some basic information to create your company workspace.",
  signupCompanyName: 'Company name',
  signupCompanyNamePlaceholder: 'e.g., Al-Amal Company',
  signupFullName: 'Full name',
  signupFullNamePlaceholder: "Administrator's full name",
  signupEmail: 'Official email',
  signupEmailPlaceholder: 'admin@company.com',
  signupPhone: 'Phone number',
  signupPhonePlaceholder: '+20 1XX XXX XXXX',
  signupContinue: 'Continue',
  signupBack: 'Back',
  signupHaveAccount: 'Already have an account?',
  signupLogin: 'Sign in',

  // Signup - Account step
  signupAccountTitle: 'Create admin account',
  signupAccountSubtitle: 'This account will manage your company workspace.',
  signupPassword: 'Password',
  signupPasswordPlaceholder: 'Create a strong password',
  signupConfirmPassword: 'Confirm password',
  signupConfirmPasswordPlaceholder: 'Re-enter your password',
  signupCreateAccount: 'Create account',
  signupCreating: 'Creating your company workspace...',
  signupPrivacyNote: 'Your data is protected and will not be shared with third parties.',
  signupPasswordShow: 'Show password',
  signupPasswordHide: 'Hide password',

  // Email verification
  verifyTitle: 'Check your email',
  verifySubtitle: 'We sent an activation link to your email address.',
  verifySentTo: 'Sent to',
  verifyResend: 'Resend link',
  verifyChangeEmail: 'Change email',
  verifyBackToLogin: 'Back to sign in',
  verifyResendSuccess: 'A new link has been sent',
  verifyResendCooldown: 'You can resend after',
  verifySeconds: 'seconds',
  verifyTooManyAttempts: 'Maximum resend attempts reached. Please try again later.',
  verifySuccessTitle: 'Email verified',
  verifySuccessSubtitle: 'Your account has been activated. You can now continue setting up your company.',
  verifySuccessContinue: 'Continue',
  verifyExpiredTitle: 'Activation link expired',
  verifyExpiredSubtitle: 'Please request a new activation link.',
  verifyExpiredResend: 'Send new link',
  verifyInvalidTitle: 'Invalid activation link',
  verifyInvalidSubtitle: 'This link is invalid or has already been used.',
  verifyInvalidResend: 'Send new link',

  // Forgot password
  forgotTitle: 'Recover password',
  forgotSubtitle: 'Enter the email associated with your account.',
  forgotEmail: 'Email',
  forgotEmailPlaceholder: 'Enter your email',
  forgotSubmit: 'Send recovery link',
  forgotSending: 'Sending...',
  forgotSuccessTitle: 'Check your email',
  forgotSuccessSubtitle: 'If you have a registered account, you will receive a password recovery link.',
  forgotBackToLogin: 'Back to sign in',

  // Reset password
  resetTitle: 'Set new password',
  resetSubtitle: 'Create a new password for your account.',
  resetNewPassword: 'New password',
  resetNewPasswordPlaceholder: 'Enter your new password',
  resetConfirmPassword: 'Confirm password',
  resetConfirmPlaceholder: 'Re-enter your new password',
  resetSubmit: 'Change password',
  resetSubmitting: 'Changing...',
  resetSuccessTitle: 'Password changed',
  resetSuccessSubtitle: 'You can now sign in with your new password.',
  resetSuccessLogin: 'Sign in',
  resetExpiredTitle: 'Link expired',
  resetExpiredSubtitle: 'Please request a new recovery link.',
  resetExpiredAction: 'Request new link',
  resetInvalidTitle: 'Invalid link',
  resetInvalidSubtitle: 'This link is invalid or has already been used.',
  resetInvalidAction: 'Request new link',

  // Two-factor
  twoFactorTitle: 'Additional verification',
  twoFactorSubtitle: 'Enter the verification code to complete sign in.',
  twoFactorCode: 'Verification code',
  twoFactorCodePlaceholder: '------',
  twoFactorVerify: 'Verify',
  twoFactorVerifying: 'Verifying...',
  twoFactorResend: 'Send new code',
  twoFactorAlternative: 'Use another method',
  twoFactorInvalidCode: 'The code entered is incorrect. Please try again.',

  // Onboarding - Company structure
  onboardingStructureTitle: 'How does your company work?',
  onboardingStructureSubtitle: 'Choose the right structure for your company.',
  onboardingSingleTitle: 'Single location',
  onboardingSingleDesc: 'A team working directly under the company.',
  onboardingBranchesTitle: 'Multiple branches',
  onboardingBranchesDesc: 'Organize employees across one or more branches.',
  onboardingContinue: 'Continue',

  // Onboarding - Team / Branches setup
  onboardingTeamTitle: 'Start adding your team',
  onboardingBranchSetupTitle: 'Add your company branches',
  onboardingAddEmployee: 'Add employees',
  onboardingImportExcel: 'Import from Excel',
  onboardingSkip: 'Skip for now',
  onboardingAddBranch: 'Add branch',
  onboardingAddAnotherBranch: 'Add another branch',
  onboardingBranchName: 'Branch name',
  onboardingBranchNamePlaceholder: 'e.g., Main branch',

  // Onboarding - Complete
  onboardingCompleteTitle: 'Your company is ready',
  onboardingCompleteSubtitle: 'You can now start managing your company from the workspace.',
  onboardingGoToDashboard: 'Go to dashboard',

  // Footer
  footerPrivacy: 'Privacy',
  footerTerms: 'Terms',
  footerCopyright: '© 2026 Taqfel HR. All rights reserved.',

  // Metadata
  metaLoginTitle: 'Sign In | Taqfel HR',
  metaSignupTitle: 'Create Company Account | Taqfel HR',
  metaVerifyTitle: 'Verify Email | Taqfel HR',
  metaForgotTitle: 'Recover Password | Taqfel HR',
  metaResetTitle: 'Reset Password | Taqfel HR',
  metaTwoFactorTitle: 'Verification | Taqfel HR',
  metaOnboardingTitle: 'Company Setup | Taqfel HR',
} as const;
