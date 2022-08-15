import { CatchPhrase } from '@/components/CatchPhrase';
import { HeadMetaTags } from '@/components/HeadMetaTags';
import { Link } from '@/components/Link';
import { BaseLayout } from '@/layouts/BaseLayout';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  SxProps,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import fs from 'fs';
import glob from 'glob';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { memo, SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

// landing page benchmark
// https://www.revenuecat.com/

const readFile = (path) => fs.readFileSync(path, 'utf8');

const GridItem = ({ metric, description }: { metric: string; description: string }) => {
  const { t } = useTranslation();

  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ p: 3, height: '100%' }}>
        <Box pb={2} display='flex' alignItems='center' justifyContent='space-between'>
          <Box>
            <Typography variant='h3' sx={{ mb: 1 }}>
              {t(metric)}
            </Typography>
            <Typography variant='body1'>{t(description)}</Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

const ConceptAssessmentWrapper = ({
  question,
  answers,
  language,
  index,
  value,
  className,
  sx,
}: {
  question: string;
  answers: Array<string>;
  language: string;
  className?: string;
  sx?: SxProps<Theme>;
  index: number;
  value: number;
}) => {
  const { t } = useTranslation();

  return (
    <>
      {value === index && (
        <Grid container>
          <Grid item xs={12} md={6} sx={{}}>
            <Box sx={{ px: 2, py: 1 }}>
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                linkTarget={'_blank'}
                components={{
                  code: ({ children }: { children: any }) => (
                    <SyntaxHighlighter
                      style={okaidia}
                      customStyle={{}}
                      language={language}
                      showLineNumbers={true}
                    >
                      {children}
                    </SyntaxHighlighter>
                  ),
                }}
              >
                {question}
              </ReactMarkdown>
            </Box>
          </Grid>

          <Divider orientation='vertical' flexItem sx={{ marginRight: '-1px' }} />

          <Grid item xs={12} md={6}>
            <Box sx={{ px: 2, py: 1 }}>
              <FormControl fullWidth>
                <RadioGroup name='radio-buttons-group'>
                  {answers.map((elem, idx) => (
                    <FormControlLabel
                      key={idx}
                      value={idx}
                      control={<Radio />}
                      labelPlacement='end'
                      label={
                        <Box sx={{}}>
                          <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            remarkPlugins={[remarkGfm]}
                            linkTarget={'_blank'}
                            components={{
                              code: (x: CodeProps) =>
                                x.inline ? (
                                  <code>{x.children}</code>
                                ) : (
                                  <SyntaxHighlighter
                                    style={okaidia}
                                    customStyle={{}}
                                    language={language}
                                    showLineNumbers={true}
                                  >
                                    {String(x.children)}
                                  </SyntaxHighlighter>
                                ),
                            }}
                          >
                            {elem}
                          </ReactMarkdown>
                        </Box>
                      }
                      sx={[
                        {
                          '&:hover': {
                            color: '#000000',
                            backgroundColor: (theme) => theme.colors.alpha.black[5],
                          },
                        },
                        {
                          '& span:nth-child(2)': {
                            flexGrow: 1,
                            minWidth: 0,
                          },
                        },
                        {
                          display: 'flex',
                          m: 1,
                          pr: 2,
                          border: 1,
                          borderRadius: 0.5,
                          width: '97%',
                          borderColor: (theme) => theme.colors.alpha.black[30],
                          color: (theme) => theme.palette.common.black,
                        },
                      ]}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

type Category = {
  question: string;
  answers: string[];
};

type Problems = {
  spring: Category;
  nestjs: Category;
  react: Category;
};

type LandingPageProps = {
  problems: Problems;
};

export default function LandingPage({ problems }: LandingPageProps) {
  const { t } = useTranslation();

  return (
    <>
      <HeadMetaTags
        title={'Proved | Test. Prove. Hire.'}
        description={'채용에 확신을 드립니다'}
        keywords={'코딩 테스트, 프로그래머 채용, 개발자 채용, 채용 검증, 레주메 검증'}
        image={'/static/images/marketings/code-challenge-meta-image.png'}
      />

      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          alignItems: 'center',
          justifyContent: 'center',
          overflowX: 'hidden',
          overflowY: 'auto',
          flex: 1,
          background: (theme) => theme.palette.common.white,
          minHeight: (theme) => `calc(100vh - ${theme.header.height})`,
        }}
      >
        <CatchPhrase />

        <Box sx={{ py: 6, display: 'flex', flexFlow: 'row', justifyContent: 'center', gap: 2 }}>
          <Button color='secondary' LinkComponent={Link} href='/request-demo'>
            {t('얼리 액세스 신청')}
          </Button>
        </Box>

        <Box sx={{}}>
          <Typography variant='h4'>{t('채용에 확신을 드립니다')}</Typography>
        </Box>
      </Box>

      <Box sx={{ py: 12, background: (theme) => theme.palette.background.default }}>
        <Container>
          <Box sx={{ pb: 5 }}>
            <Typography variant='h1' align='center' sx={{ mb: 3 }}>
              {t('로켓을 만들기 위해서는 🚀로켓을 잘 만드는 개발자를 채용해야 합니다')}
            </Typography>
          </Box>

          <Container maxWidth='md'>
            <Grid container spacing={4}>
              <GridItem
                metric={t('💵 1,952만 원')}
                description={t('회사에 맞지 않는 인원 고용으로 인한 평균 손실 금액')}
              />
              <GridItem
                metric='😞 72%'
                description='채용이 후회되는 직원이 있다고 응답한 인사담당자'
              />
              <GridItem
                metric='🦄 94%'
                description='미국 데카콘 기업 (기업가치 100억 달러 이상) 중 코딩 테스트를 활용하는 기업'
              />
              <GridItem
                metric={t('⚡ 66%')}
                description={t('입사 결정에 신속한 채용 프로세스가 영향을 준다고 응답한 개발자')}
              />
            </Grid>
          </Container>
        </Container>
      </Box>

      <Box sx={{ py: 10, px: 3, background: (theme) => theme.palette.background.paper }}>
        <Container sx={{ py: 10, px: '0 !important' }}>
          <Grid container maxWidth='lg' spacing={4}>
            <Grid item xs={12} lg={8} order={{ xs: 2, lg: 1 }}>
              <MCQ problems={problems} />
            </Grid>

            <Grid
              item
              xs={12}
              lg={4}
              order={{ xs: 1, lg: 2 }}
              minHeight='100%'
              sx={{ height: '100%' }}
            >
              {/* Text */}
              <Box sx={{ my: 3 }}>
                <Typography variant='h1' align='left' sx={{ mb: 3 }}>
                  {t('레주메 너머의 실력 검증')}
                </Typography>
                <Typography variant='h5' align='left' sx={{ mb: 3, fontWeight: 400 }}>
                  {t('개발자는 이력서가 아닌 프로그래밍 실력으로 스스로를 증명해야 합니다.')}
                </Typography>
                <Typography variant='h5' align='left' sx={{ mb: 3, fontWeight: 400 }}>
                  {t(
                    'Proved가 준비한 100여개의 테스트 라이브러리를 활용해 빠르고 정확하게 지원자의 진짜 프로그래밍 실력을 확인할 수 있습니다.'
                  )}
                </Typography>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 5 }}
                >
                  <Button color='secondary' LinkComponent={Link} href='/request-demo'>
                    {t('얼리 액세스 신청')}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 10, px: 3, background: (theme) => theme.palette.background.default }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Grid container maxWidth='lg' spacing={4}>
            <Grid item xs={12} lg={4} minHeight='100%' sx={{ height: '100%' }}>
              <Box sx={{ height: '100%', my: 3 }}>
                <Typography variant='h1' sx={{ mb: 3 }}>
                  {t('실전 같은 테스트')}
                </Typography>
                <Typography variant='h5' align='left' sx={{ mb: 3, fontWeight: 400 }}>
                  {t('그 어떤 팀도 같은 비즈니스 목표를 가지고 있지 않습니다.')}
                </Typography>
                <Typography variant='h5' align='left' sx={{ mb: 3, fontWeight: 400 }}>
                  {t(
                    '우리 팀이 풀고 있는 문제를 가장 잘 해결할 수 있는 인재를 찾을 수 있도록, 우리 회사에 딱 맞는 실전적인 코딩 챌린지를 제공합니다.'
                  )}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} lg={8}>
              <Link href={'/static/images/marketings/code-challenge-right.png'} target='_blank'>
                <Card sx={{ position: 'relative', mb: 5 }}>
                  <Image
                    src={'/static/images/marketings/code-challenge-right.png'}
                    alt={'Coding Challenge Image'}
                    layout='responsive'
                    width={'100%'}
                    height={'65.5%'}
                    quality={50}
                    objectFit='cover'
                  />
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button color='secondary' LinkComponent={Link} href='/request-demo'>
            {t('얼리 액세스 신청')}
          </Button>
        </Box>
      </Box>
    </>
  );
}

LandingPage.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getStaticProps: GetStaticProps<LandingPageProps> = async (ctx) => {
  const structureFilePaths = (mdFilePaths: string[]) => {
    const result: Category = { question: '', answers: [] };

    mdFilePaths.forEach((filePath) => {
      const splitted = filePath.split('/');
      if (splitted[splitted.length - 1][0] === 'q') {
        result.question = readFile(filePath);
      } else {
        result.answers.push(readFile(filePath));
      }
    });

    return result;
  };

  const springFiles: string[] = glob.sync('public/landing/spring/*.md');
  const nestjsFiles: string[] = glob.sync('public/landing/nestjs/*.md');
  const reactFiles: string[] = glob.sync('public/landing/react/*.md');

  return {
    props: {
      problems: {
        spring: structureFilePaths(springFiles),
        nestjs: structureFilePaths(nestjsFiles),
        react: structureFilePaths(reactFiles),
      },
    },
  };
};

const MCQ = memo(({ problems }: { problems: Problems }) => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();

  const onChangeTab = (ev: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Card sx={{ mb: 5 }}>
        <CardContent
          sx={{
            position: 'relative',
            backgroundColor: (theme) => theme.colors.alpha.black[5],
            p: '0 !important',
          }}
        >
          {/* <Typography variant='h5' sx={{}}>
              {t('Concept Assessment - Spring')}
            </Typography> */}

          <Tabs value={value} onChange={onChangeTab} variant='fullWidth' sx={{ p: '0 !important' }}>
            <Tab label={'Spring'} />
            <Tab label={'Nest.js'} />
            <Tab label={'React'} />
          </Tabs>
        </CardContent>

        <Divider />

        {/* <CardContent sx={{ p: '0 !important' }}>
            <CodeTab />
          </CardContent> */}

        {/* Q-A */}
        <CardContent sx={{ p: '0 !important' }}>
          <ConceptAssessmentWrapper
            question={problems.spring.question}
            answers={problems.spring.answers}
            language='java'
            value={value}
            index={0}
          />
          <ConceptAssessmentWrapper
            question={problems.nestjs.question}
            answers={problems.nestjs.answers}
            language='js'
            value={value}
            index={1}
          />
          <ConceptAssessmentWrapper
            question={problems.react.question}
            answers={problems.react.answers}
            language='jsx'
            value={value}
            index={2}
          />
        </CardContent>
      </Card>
    </Box>
  );
});
