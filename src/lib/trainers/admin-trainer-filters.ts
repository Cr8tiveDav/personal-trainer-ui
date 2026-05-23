import type { TabType } from '@/components/admin/trainers/types';

/** Maps admin list tabs to GET /trainers onboarding_status filter. */
export function getTrainerListOnboardingStatus(
  tab: TabType,
): string | undefined {
  switch (tab) {
    case 'active':
      return 'approved';
    case 'pending':
      return 'pending';
    case 'suspended':
      return 'suspended';
    default:
      return undefined;
  }
}
