/* eslint-disable no-restricted-imports */
import { LeaderboardTable, TableRowType } from '@/components/challenge/LeaderboardTable';
import { TableHeadCellType } from '@/components/table/SortableTable';
import { ChallengeReportOutput } from '@/types/apiTypes';
import { buildFullName } from '@/utils/common';
import { Locale } from '@/utils/locale';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import * as locales from '@mui/material/locale';

type SupportedLocales = keyof typeof locales;

const defaultLocale = 'koKR';

export const LeaderboardTableWrapper = memo(({ reports }: { reports: ChallengeReportOutput[] }) => {
  const [locale, setLocale] = useState<SupportedLocales>(defaultLocale);
  const theme = useTheme();
  const themeWithLocale = useMemo(() => createTheme(theme, locales[locale]), [locale, theme]);
  const { t } = useTranslation();

  const headCells: readonly TableHeadCellType<TableRowType>[] = [
    {
      id: 'rank',
      align: 'center',
      disablePadding: true,
      label: t('순위'),
      defaultOrder: 'desc',
    },
    {
      id: 'applicantName',
      align: 'center',
      disablePadding: false,
      label: t('이름'),
      defaultOrder: 'desc',
    },
    {
      id: 'totalAccuracy',
      align: 'center',
      disablePadding: false,
      label: t('정확도'),
      defaultOrder: 'desc',
    },
    {
      id: 'totalScore',
      align: 'center',
      disablePadding: false,
      label: t('점수'),
      defaultOrder: 'desc',
    },
    {
      id: 'elapsedTime',
      align: 'center',
      disablePadding: false,
      label: t('소요시간'),
      defaultOrder: 'desc',
    },
  ];

  // FIXME: 서버에서 모든 데이터 전처리를 하고 보내주는게 좋을 것 같음
  const rows: TableRowType[] = reports.map(
    ({ id, rank, totalAccuracy, totalScore, elapsedTime, user }) => {
      const applicantName = buildFullName(user.firstName, user.lastName, Locale.ko_KR);

      return {
        id,
        rank: rank.toString(),
        applicantName,
        totalAccuracy: (totalAccuracy * 100).toFixed(2),
        totalScore: totalScore.toString(),
        elapsedTime: elapsedTime.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      };
    }
  );

  return (
    <ThemeProvider theme={themeWithLocale}>
      <LeaderboardTable multiSortable={false} headCells={headCells} rows={rows} />
    </ThemeProvider>
  );

  // return <LeaderboardTable multiSortable={false} headCells={headCells} rows={rows} />;
});
