import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { GuidanceLink } from '@/components/project/GuidanceLink';
import { Crumb, CustomBreadcrumbs } from '@/components/shared/CustomBreadcrumbs';
import { useGetProjectInconsistencies } from '@/services/hooks';
import { useCustomSession } from '@/utils/next-auth-react-query';
import {
  Box,
  CircularProgress,
  Container,
  LinearProgress,
  NoSsr,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableOptions } from 'mui-datatables';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useQueryClient } from 'react-query';
import { Parser } from 'json2csv';

interface ProjectStatPageProps {
  project: {
    id: string;
    name: string;
  };
}

interface InconsistenciesPageProps {
  data: TableDataElement[];
}

type ChoiceType = string | string[] | number;

type TableDataElement = {
  jobId: string;
  dataId: string;
  title: string;
  boardType: string;
  content: string;
  taskId: string;
} & { [worker: string]: ChoiceType };

const defaultColumns: MUIDataTableColumnDef[] = [
  {
    name: 'jobId',
    label: 'Job ID',
    options: {
      filter: true,
      sort: true,
      setCellHeaderProps: (value) => {
        return {
          style: {
            width: 120,
            justifyContent: 'center',
          },
        };
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
        return {
          style: {
            width: 120,
            // border: '2px solid'
          },
        };
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
        return {
          style: {
            width: 120,
            maxWidth: '140px',
          },
        };
      },
      setCellProps: (value) => {
        return {
          style: {
            width: 120,
            maxWidth: '140px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        };
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
            {/* <Typography>{value?.slice(0, 15) + '...'}</Typography> */}
            <Typography>{value}</Typography>
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
      draggable: true,
      // setCellHeaderProps: (value) => {
      //   return { style: { maxWidth: '120px', minWidth: 0 } };
      // },
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Tooltip title={value}>
            <Typography
              variant='subtitle2'
              sx={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                maxWidth: '300px',
                minWidth: 0,
              }}
            >
              {/* {value?.slice(0, 15) + '...'} */}
              {value}
            </Typography>
          </Tooltip>
        );
      },
    },
  },
  // ******************************
  { name: 'luna', label: 'luna', options: { filter: true, sort: false } },
  { name: 'joe', label: 'joe', options: { filter: true, sort: false } },
  { name: 'qroad_2', label: 'qroad_2', options: { filter: true, sort: false } },
  // ******************************
  { name: 'tobin', label: 'tobin', options: { filter: true, sort: false } },
  { name: 'sunny', label: 'sunny', options: { filter: true, sort: false } },
  { name: 'qroad_1', label: 'qroad_1', options: { filter: true, sort: false } },
];

const options: MUIDataTableOptions = {
  filterType: 'checkbox',
  // resizableColumns: true,
  isRowSelectable: (dataIndex) => true,
  selectableRowsHideCheckboxes: true,
  filter: false, // FIXME: 에러 수정 후 열기
  download: true,
  search: false, // FIXME: debounce 걸기
  textLabels: {
    pagination: {
      next: '다음 페이지',
      previous: '이전 페이지',
      rowsPerPage: '페이지 보기:',
      displayRows: 'of', // 1-10 of 30
    },
    toolbar: {
      search: '검색',
      downloadCsv: '다운로드(.csv파일)',
      print: '인쇄',
      viewColumns: '열 선택',
      filterTable: '테이블 필터',
    },
    filter: {
      title: 'FILTERS',
      reset: 'reset',
    },
    viewColumns: {
      title: '열 보기',
      titleAria: '열 보기 설정',
    },
    selectedRows: {
      text: 'rows(s) deleted',
      delete: 'Delete',
    },
    body: {
      // toolTip: '정렬',
      noMatch: '데이터가 없습니다.',
      columnHeaderTooltip: (column) => `${column.label} 정렬`,
    },
  },
  downloadOptions: {
    filename: `${new Date().toISOString()}-label.csv`,
    separator: ',',
    filterOptions: {
      useDisplayedColumnsOnly: true,
    },
  },
  onChangePage: (currentPage) => {
    console.info(currentPage);
    // scroll to top
    window.scrollTo(0, 0);
  },
  onDownload: (
    buildHead,
    buildBody,
    columns,
    data: { index: number; data: (undefined | string | string[])[] }[]
  ) => {
    console.info('columns', columns);
    console.info('data', data);
    const targetObj = data.map((data) => data.data.map((cell) => cell?.toString() ?? ''));

    // FIXME: 사람에 따라서 다른 칼럼만들도록 수정
    const fields = [
      'jobId',
      'dataId',
      'boardType',
      'title',
      'content',
      // ******************************
      'luna',
      'joe',
      'qroad_2',
      // ******************************
      'qroad_1',
      'sunny',
      'tobin',
    ];

    const headerString = fields.map((elem) => `"${elem}"`).join(',') + '\r\n';

    try {
      const parser = new Parser({
        includeEmptyRows: true,
      });
      const csv = parser.parse(targetObj);
      console.info('csv', csv);
      return headerString + csv;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  // tableBodyMaxHeight: '100%',
  // tableBodyHeight: 'auto',
  tableBodyMaxHeight: 'calc(100vh - 333px)',
  tableBodyHeight: 'calc(100vh - 333px)',
};

// ******************************
// ******************************
// ******************************
// ******************************

export default function ProjectStatPage({
  project: { id: projectId, name: projectName },
}: ProjectStatPageProps) {
  const title = '라벨링 불일치 데이터';
  const [session, isLoading] = useCustomSession({ required: true });
  const router = useRouter();
  const [tableData, setTableData] = useState<TableDataElement[]>([]);
  const [cols, setCols] = useState<MUIDataTableColumnDef[]>(defaultColumns);

  // const queryClient = useQueryClient();
  // const d1 = queryClient.getQueryData(['projects', {}]);
  // const d2 = queryClient.getQueryData('projects');
  // const d3 = queryClient.getQueryData(['projects']);
  // console.info(d1, d2, d3);

  const getProjectInconsistencies = useGetProjectInconsistencies(
    { projectId },
    { enabled: Boolean(projectId) && Boolean(session) }
  );

  const crumbs: Crumb[] = [
    { label: 'Home', href: '/' },
    { label: 'Stats', href: '/stats' },
    { label: 'Projects', href: '/stats/inconsistencies' },
  ];

  useEffect(() => {
    if (getProjectInconsistencies?.data) {
      const newTableData: TableDataElement[] = getProjectInconsistencies.data.jobs
        .flatMap((job) => {
          const augmented = job.responses.map((resp) => {
            const { id: dataId, ...others } = resp.data;
            return { projectId, jobId: job.id, responses: resp.responses, dataId, ...others };
          });
          return augmented;
        })
        .map((elem) => {
          const tmp: TableDataElement = {
            jobId: elem.jobId,
            dataId: elem.dataId,
            title: elem.title,
            boardType: elem.boardType,
            content: elem.content,
            taskId: '',
          };
          elem.responses.forEach(({ username, choices, taskId }) => {
            tmp[username] = choices;
            tmp.taskId = taskId;
          });
          return tmp;
        });

      // console.info('newtabledata', newTableData);
      setTableData(newTableData);
    }
  }, [getProjectInconsistencies.data, projectId]);

  return (
    <>
      <Head>
        <title>{`Stats | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>

      <Container maxWidth={false}>
        <Box>
          <CustomBreadcrumbs crumbs={crumbs} />
          <Box sx={{ height: 50, display: 'flex', alignItems: 'center' }}>
            <Typography variant='h5'>{projectName}</Typography>
          </Box>
          <GuidanceLink />
        </Box>
      </Container>
      <Box
        sx={{
          '.MuiTypography-root': {
            whiteSpace: 'nowrap',
            fontSize: '0.8rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        }}
      >
        {getProjectInconsistencies.isLoading && <LinearProgress />}

        <NoSsr>
          {getProjectInconsistencies.data && (
            <MUIDataTable
              title={title}
              data={tableData}
              columns={cols}
              options={options}
              css={css`
                border-radius: 0;
                box-shadow: none;
                // border: 4px solid blue;
                .MuiTableCell-root.MuiTableCell-body {
                  div {
                    white-space: nowrap;
                    font-size: 0.8rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                }
              `}
            />
          )}
        </NoSsr>
      </Box>
    </>
  );
}

ProjectStatPage.getLayout = (page: React.ReactNode) => {
  return (
    <DashboardLayout
      sx={{
        height: '100vh',
        // border: '2px solid',
        '&>.MuiBox-root': {
          // border: '2px solid',
        },
      }}
    >
      {page}
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ProjectStatPageProps> = async ({
  req,
  res,
  params,
}) => {
  try {
    const projectId = params?.projectId as any;
    const session = await getSession({ req });
    // console.info('getServerSideProps', projectId, session);
    const project = { id: projectId, name: '' };
    const client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URI,
    });

    type Output = {
      id: string;
      name: string;
    };

    client.defaults.headers.common.authorization = session?.user.accessToken ?? false;
    const response = await client.get<Output>(`/projects/${projectId}`);
    project.name = response.data.name;

    return {
      props: {
        project,
      },
    };
  } catch (err: unknown) {
    // console.error(err.message);
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/signin',
      },
      props: {},
    };
  }
};
