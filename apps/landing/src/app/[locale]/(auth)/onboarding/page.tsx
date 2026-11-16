'use client';

import { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { AuthLanguageProvider, useAuthLanguage } from '../../../../../components/auth/auth-language-context';
import { AuthShell } from '../../../../../components/auth/auth-shell';
import { AuthProgress } from '../../../../../components/auth/auth-progress';
import { CompanyStructureStep } from '../../../../../components/auth/onboarding/company-structure';
import { TeamSetup } from '../../../../../components/auth/onboarding/team-setup';
import { BranchSetup } from '../../../../../components/auth/onboarding/branch-setup';
import { OnboardingComplete } from '../../../../../components/auth/onboarding/onboarding-complete';
import { authService } from '../../../../../lib/auth/service';

type OnboardingStep = 'structure' | 'branches' | 'team' | 'complete';

function OnboardingFlow() {
  const { lang } = useAuthLanguage();

  const [step, setStep] = useState<OnboardingStep>('structure');
  const [structure, setStructure] = useState<'single' | 'branches' | null>(null);
  const [branchesList, setBranchesList] = useState<string[]>([]);

  const handleStructureSelect = useCallback((selected: 'single' | 'branches') => {
    setStructure(selected);
    if (selected === 'branches') {
      setStep('branches');
    } else {
      setStep('team');
    }
  }, []);

  const handleBranchSetupComplete = useCallback((branches: string[]) => {
    setBranchesList(branches);
    setStep('team');
  }, []);

  const handleBranchSetupSkip = useCallback(() => {
    setStep('team');
  }, []);

  const handleTeamSetup = useCallback(async (method: 'manual' | 'excel' | 'skipped') => {
    await authService.saveOnboarding({
      structure: structure || 'single',
      branches: branchesList,
      teamMethod: method,
    });
    setStep('complete');
  }, [structure, branchesList]);

  const handleGoToDashboard = useCallback(() => {
    const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:5174';
    window.open(`${portalUrl}?lang=${lang}`, '_self');
  }, [lang]);


  const currentStepIndex = step === 'complete' ? 4 : 3;

  return (
    <AuthShell width={step === 'complete' ? 'narrow' : 'medium'}>
      {step !== 'complete' && (
        <div className="mb-8">
          <AuthProgress currentStep={currentStepIndex} />
        </div>
      )}

      {step === 'structure' && (
        <div className="animate-fadeIn">
          <CompanyStructureStep onSelect={handleStructureSelect} />
        </div>
      )}

      {step === 'branches' && (
        <div className="animate-fadeIn">
          <BranchSetup
            onSubmit={(branches) => handleBranchSetupComplete(branches)}
            onSkip={handleBranchSetupSkip}
          />
        </div>
      )}

      {step === 'team' && (
        <div className="animate-fadeIn">
          <TeamSetup
            onSelectOption={(method) => handleTeamSetup(method)}
            onSkip={() => handleTeamSetup('skipped')}
          />
        </div>
      )}

      {step === 'complete' && (
        <div className="animate-fadeIn">
          <OnboardingComplete onGoToDashboard={handleGoToDashboard} />
        </div>
      )}
    </AuthShell>
  );
}

export default function OnboardingPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'ar';

  return (
    <AuthLanguageProvider initialLocale={locale}>
      <OnboardingFlow />
    </AuthLanguageProvider>
  );
}
