import { Box, Container, Skeleton, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const feedbackQuestionNumbers = {
  firstQuestion: 1,
  secondQuestion: 2,
  thirdQuestion: 3,
};

export type FeedbackQuestionFormValues = {
  firstQuestion: string;
  secondQuestion: string;
  thirdQuestion: string;
};

const TextfieldWrapper = styled(Box)(
  ({ theme }) => `
    .MuiOutlinedInput-root {
      padding: ${theme.spacing(1.4)};
    }
`
);

export const FeedbackQuestion = ({
  name,
  control,
  question = '',
}: {
  name: keyof FeedbackQuestionFormValues;
  control: Control<FeedbackQuestionFormValues, object>;
  question?: string;
}) => {
  const { t } = useTranslation();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Container sx={{ mb: 3 }}>
            <Box sx={{ py: 1 }}>
              {question.length === 0 ? (
                <Skeleton />
              ) : (
                <Typography variant='h5'>
                  {t(`${feedbackQuestionNumbers[name]}. ${question}`)}
                </Typography>
              )}
            </Box>
            <TextfieldWrapper>
              <TextField
                fullWidth
                variant='outlined'
                inputProps={{ sx: { minHeight: 160 } }}
                multiline
                rows='1'
                placeholder={t('여기에 답변을 작성해주세요. Markdown 문법을 지원합니다')}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message}
              />
            </TextfieldWrapper>
          </Container>
        </>
      )}
    />
  );
};
