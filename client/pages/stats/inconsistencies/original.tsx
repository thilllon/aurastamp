import { Link } from '@/components/shared/Link';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

import { useGetInconsistencies } from '@/services/hooks';
import { useCustomSession } from '@/utils/next-auth-react-query';
import { Box, Container, Tooltip, Typography } from '@mui/material';
import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableOptions } from 'mui-datatables';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// https://github.com/gregnb/mui-datatables

interface InconsistenciesPageProps {
  data: TableDataElement[];
}

export default function InconsistenciesPage({ data }: InconsistenciesPageProps) {
  return (
    <>
      <Head>
        <title>{`Projects | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <InconsistencyTable />
      </Box>
    </>
  );
}

InconsistenciesPage.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps<InconsistenciesPageProps> = async ({
  req,
  res,
}) => {
  const data: TableDataElement[] = [];
  return { props: { data } };
};

// ******************************
// ******************************

type ChoiceType = string | string[] | number;

type TableDataElement =
  | {
      jobId: string;
      dataId: string;
      title: string;
      boardType: string;
      content: string;
      taskId: string;
    }
  | { [worker: string]: ChoiceType };

const defaultColumns: MUIDataTableColumnDef[] = [
  {
    name: 'jobId',
    label: 'Job ID',
    options: {
      filter: true,
      sort: true,
      setCellHeaderProps: (value) => {
        return { style: { width: 120 } };
      },
      customBodyRender: (value, tableMeta, updateValue) => {
        // console.info(value);
        return (
          <Tooltip title={value ?? ''}>
            <Typography>{value?.slice(0, 9) + '...'}</Typography>
          </Tooltip>
        );
      },
    },
  },
  {
    name: 'dataId',
    label: 'Data ID',
    options: {
      filter: true,
      sort: true,
      setCellHeaderProps: (value) => {
        return { style: { width: 120 } };
      },
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Tooltip title={value}>
            <Typography>{value.slice(0, 9) + '...'}</Typography>
          </Tooltip>
        );
      },
    },
  },

  {
    name: 'boardType',
    label: '게시판',
    options: {
      filter: true,
      sort: true,
      setCellHeaderProps: (value) => {
        return { style: { width: 120 } };
      },
      setCellProps: (value) => {
        return { style: { width: 120 } };
      },
      viewColumns: true,
    },
  },
  {
    name: 'title',
    label: '제목',
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const dataId = '';
        // return (
        //   <Link href={`/projects/data/${dataId}`} >
        //     <Typography>{value}</Typography>
        //   </Link>
        // );
        return (
          <Tooltip title={value}>
            <Typography>{value?.slice(0, 15) + '...'}</Typography>
          </Tooltip>
        );
      },
    },
  },
  {
    name: 'content',
    label: '게시글',
    options: {
      filter: true,
      sort: true,
      setCellHeaderProps: (value) => {
        return { style: { maxWidth: '120px', minWidth: 0 } };
      },
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Tooltip title={value}>
            <Typography>{value?.slice(0, 15) + '...'}</Typography>
          </Tooltip>
        );
      },
    },
  },
  // ******************************
  { name: 'luna', label: 'luna', options: { filter: true, sort: true } },
  { name: 'joe', label: 'joe', options: { filter: true, sort: true } },
  { name: 'qroad_2', label: 'qroad_2', options: { filter: true, sort: true } },
  // ******************************
  { name: 'tobin', label: 'tobin', options: { filter: true, sort: true } },
  { name: 'sunny', label: 'sunny', options: { filter: true, sort: true } },
  { name: 'qroad_1', label: 'qroad_1', options: { filter: true, sort: true } },
];

export const InconsistencyTable = () => {
  const router = useRouter();
  const [session, isLoading] = useCustomSession({ required: true });
  const [tableData, setTableData] = useState<TableDataElement[]>([]);
  const [cols, setCols] = useState<MUIDataTableColumnDef[]>(defaultColumns);
  const getInconsistencies = useGetInconsistencies(
    { skip: 0, take: 9999 },
    { enabled: Boolean(session?.user.accessToken) }
  );

  useEffect(() => {
    if (!isLoading && !session) {
      // FIXME: redirect to login page
    } else {
      console.info('roles', session?.user?.roles);
    }
  }, [session, isLoading]);

  useEffect(() => {
    if (getInconsistencies?.data?.length) {
      const newTableData: TableDataElement[] = getInconsistencies.data.map((elem) => {
        const row: TableDataElement = {
          jobId: elem.jobId,
          title: elem.data.title,
          boardType: elem.data.boardType,
          content: elem.data.content?.slice(0, 50) + '...',
          dataId: elem.data.id,
        };
        elem.responses.forEach(({ username, choices, taskId }, idx) => {
          row[username] = choices;
          row.taskId = taskId;
        });
        return row;
      });

      // setCols(() => {
      //   const aug =
      //     getInconsistencies.data?.[0].responses.map(({ username, choices, taskId }, idx) => ({
      //       name: username,
      //       label: username,
      //       options: {
      //         filter: true,
      //         sort: true,
      //         // setCellHeaderProps: (value) => {
      //         //   return { styles: { backgroundColor: 'blue' } };
      //         // },
      //       },
      //     })) ?? [];

      //   const newCols = defaultColumns.concat(...aug);
      //   return newCols;
      // });
      // console.info('newtabledata', newTableData);
      setTableData(newTableData);
    }
  }, [getInconsistencies.data]);

  const title = '라벨링 불일치 데이터';

  const options: MUIDataTableOptions = {
    filterType: 'checkbox',
    resizableColumns: true,
    isRowSelectable: (dataIndex) => true,
    selectableRowsHideCheckboxes: true,
    filter: false,
  };

  return <MUIDataTable title={title} data={tableData} columns={cols} options={options} />;
};
