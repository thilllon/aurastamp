import { useFinishChallenge } from '@/apis/challenges';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export const ChallengeFinishButton = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const challengeId = router.query.challengeId as string;
  const finishChallenge = useFinishChallenge();

  const onClickFinish = async () => {
    if (!challengeId) {
      throw new Error('challengeId is required');
      return;
    }
    const result = await finishChallenge.mutateAsync({ challengeId });
    console.log(result);
    if (result) {
      router.push(`/challenges/${challengeId}/results`);
    }
  };

  return (
    <LoadingButton
      color='secondary'
      onClick={onClickFinish}
      disabled={finishChallenge.isLoading}
      loading={finishChallenge.isLoading}
    >
      {t('챌린지 종료')}
    </LoadingButton>
  );
};
