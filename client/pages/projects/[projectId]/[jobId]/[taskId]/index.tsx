import { ShortcutDialog } from '@/components/dialogs/ShortcutDialog';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { GuidanceLink } from '@/components/project/GuidanceLink';
import { CircularProgressWithLabel } from '@/components/shared/CircularProgressWithLabel';
import { CustomBreadcrumbs } from '@/components/shared/CustomBreadcrumbs';
import { Link } from '@/components/shared/Link';
import { GetTaskOutput, useGetAdjacentTasks, useGetTask, useUpdateTask } from '@/services/hooks';
import { defaultShortcutKeyMap } from '@/utils/keymap';
import { useCustomSession } from '@/utils/next-auth-react-query';
import { useShorcuts } from '@/utils/useShortcuts';
import { ArrowLeft, ArrowRight, UTurnLeft } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormControlLabel,
  FormControlLabelProps,
  Grid,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, {
  ChangeEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { GlobalHotKeys } from 'react-hotkeys';

type TaskPageProps = {};

type Options = {
  autoSubmit: boolean;
  multiColumn: boolean;
};

const defaultChoicesProps: Partial<FormControlLabelProps> = {
  sx: {
    ':hover': {
      boxSizing: 'content-box',
      // backgroundColor: '#fefefe',
      // opacity: 1,
      // filter: 'brightness(50%)',
      border: '0.5px solid #dddddd',
      borderRadius: '9999px',
    },
    border: '0.5px solid transparent',
    pr: 2,
  },
  value: 'end',
  labelPlacement: 'end',
};
export default function TaskPage({}: TaskPageProps) {
  const router = useRouter();
  const { shortcuts } = useShorcuts();
  const [session] = useCustomSession({ required: true });
  const projectId = router.query.projectId as string;
  const jobId = router.query.jobId as string;
  const taskId = router.query.taskId as string;
  const [openShortcutDialog, setOpenShortcutDialog] = useState(false);
  const getTask = useGetTask(
    { jobId, taskId },
    {
      enabled: Boolean(jobId) && Boolean(taskId) && Boolean(session?.user.accessToken),
      keepPreviousData: false,
      refetchOnWindowFocus: true,
      onError: (error) => {
        if (error.response?.status === 403) {
          router.push(`/projects`);
        }
      },
    }
  );

  const taskRef = useRef<GetTaskOutput>(); // progress rate 깜빡이지 않도록 하기 위한 장치

  const getAdjacentTasks = useGetAdjacentTasks(
    { jobId, taskId },
    {
      enabled: Boolean(jobId) && Boolean(taskId) && Boolean(session?.user.accessToken),
      onError: (error) => {
        if (error.response?.status === 403) {
          router.push(`/projects`);
        }
      },
    }
  );

  const updateTask = useUpdateTask();
  const [chosenList, setChosenList] = useState<number[]>([]);
  const [options, setOptions] = useState<Options>({
    autoSubmit: false,
    multiColumn: false,
  });
  const taskIdPrevious = getAdjacentTasks.data?.previous?.id;
  const taskIdNext = getAdjacentTasks.data?.next?.id;
  const hrefPreviousTask = `/projects/${projectId}/${jobId}/${taskIdPrevious}`;
  const hrefNextTask = `/projects/${projectId}/${jobId}/${taskIdNext}`;

  const hiddenRef = useRef<HTMLDivElement>(null);

  const [openAlert, setOpenAlert] = useState(false);
  const alertAlreadyShown = useRef<{ [jobId: string]: boolean }>({});

  useEffect(() => {
    return () => {
      alertAlreadyShown.current = {};
    };
  }, []);

  const onClickAlert = () => {
    router.push(`/projects/${projectId}/${jobId}/tasks`);
  };

  useEffect(() => {
    if (router.isReady && getTask.data) {
      const chosenLabels = getTask.data.currentLabels;
      setChosenList(chosenLabels.map(({ label }) => label));
      taskRef.current = getTask.data;
    }

    if (getTask.data && getTask.data.count.finished === getTask.data.count.total) {
      setOpenAlert(true);
      alertAlreadyShown.current = { [jobId]: true };
    }
  }, [router, getTask.data, jobId]);

  const onCloseAlert = useCallback(() => {
    setOpenAlert(false);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const submitAndRefetch = useCallback(
    async (labels: number[]) => {
      const response = await updateTask.mutateAsync({ jobId, taskId, labels });
      console.info('update', response);
      const refetched = await getTask.refetch();
      console.info('refetched', refetched);
      return refetched;
    },
    [getTask, jobId, taskId, updateTask]
  );

  const choices = getTask.data?.labels.map(({ label, name }, idx) => {
    return { idx, text: name, value: label };
  });

  const onChangeOptions = useCallback<
    (ev: ChangeEvent<HTMLInputElement>, checked: boolean) => void
  >((ev, checked) => {
    ev.preventDefault();
    setOptions((opts) => ({ ...opts, [ev.target.name]: ev.target.checked }));
    // NOTE: 2022.03.25 아래 포커스 로직을 추가하면 옵션을 변경한 직후 키보드 단축키를 이용해서 원하는 동작이 가능함. 하지만 연속해서 마우스로 두번 옵션을 변경하면 첫번째 클릭 액션이 먹히게됨. 왜냐하면 이미 히든 레퍼런스로 포커스가 옮겨간 것을 다시 옵션으로 포커스를 이동시키고(1번 클릭), 옵션을 체크(2번 클릭). 사용자 입장에서는 연속해서 마우스 입력이 안되는 것처럼 느껴짐. 반면에 히든 레퍼런스를 사용하지 않으면, 옵션을 변경한 직후 키보드 단추기를 사용하기 위해 마우스로 한번 백그라운드를 클릭해줘야함. ux적으로 어떤게 더 옳은지 결정할 필요가 있음. 현재는 키보드 단축키를 위해 추가 마우스 클릭이 필요 없는 방향으로 결정하고 있음.
    hiddenRef.current?.focus();
  }, []);

  const onChangeCheckBox = async (ev: ChangeEvent<HTMLInputElement>, checkedSynthetic: boolean) => {
    const { checked, value } = ev.target;
    const valueNumber = parseInt(value, 10);
    console.info(checked, valueNumber, chosenList);

    if (options.autoSubmit) {
      // filter를 splice+indexof로 변경
      const labels = checked ? [valueNumber] : chosenList.filter((idx) => idx !== valueNumber);
      const tmptest = chosenList.splice(chosenList.indexOf(valueNumber), 1);
      submitAndRefetch(labels);
      moveToNextPage();
    } else {
      setChosenList((elem) =>
        checked ? [...new Set([...elem, valueNumber])] : elem.filter((val) => val !== valueNumber)
      );
      // elem.splice(elem.indexOf(valueNumber), 1);
    }

    // 키보드 단축키 먹히지 않도록 하기 위함
    hiddenRef.current?.focus();
  };

  const makeOnClickAdjacentLink = useCallback<
    (type: 'prev' | 'next') => MouseEventHandler<HTMLAnchorElement>
  >(
    (type: 'prev' | 'next') => {
      return async (ev) => {
        ev.preventDefault();
        submitAndRefetch(chosenList);
        router.push(type === 'prev' ? hrefPreviousTask : hrefNextTask);
      };
    },
    [submitAndRefetch, chosenList, router, hrefPreviousTask, hrefNextTask]
  );

  const onClickLastTask = async () => {
    await submitAndRefetch(chosenList);
    router.push(`/projects/${projectId}/${jobId}/tasks`);
  };

  const moveToPreviousPage = useCallback(() => {
    // console.info('moveToPreviousPage');
    const adjacentTaskId = getAdjacentTasks.data?.previous?.id;
    if (projectId && jobId && adjacentTaskId) {
      router.push(`/projects/${projectId}/${jobId}/${adjacentTaskId}`);
    }
  }, [getAdjacentTasks.data, jobId, projectId, router]);

  const moveToNextPage = useCallback(() => {
    // console.info('moveToNextPage');
    const adjacentTaskId = getAdjacentTasks.data?.next?.id;
    if (projectId && jobId && adjacentTaskId) {
      router.push(`/projects/${projectId}/${jobId}/${adjacentTaskId}`);
    }
  }, [getAdjacentTasks.data, jobId, projectId, router]);

  const keyMapHandlers = {
    CHOOSE_1: async () => {
      const valueCorrespondToShortcut = 0;
      if (options.autoSubmit) {
        submitAndRefetch([valueCorrespondToShortcut]);
        moveToNextPage();
      } else {
        setChosenList((list) => {
          const idx = valueCorrespondToShortcut;
          return list.includes(idx) ? list.filter((x) => x !== idx) : [...list, idx];
        });
      }
    },
    CHOOSE_2: async () => {
      const valueCorrespondToShortcut = 1;
      if (options.autoSubmit) {
        submitAndRefetch([valueCorrespondToShortcut]);
        moveToNextPage();
      } else {
        setChosenList((list) => {
          const idx = valueCorrespondToShortcut;
          return list.includes(idx) ? list.filter((x) => x !== idx) : [...list, idx];
        });
      }
    },
    MOVE_TO_PREVIOUS: async () => {
      submitAndRefetch(chosenList);
      moveToPreviousPage();
    },
    MOVE_TO_NEXT: async () => {
      submitAndRefetch(chosenList);
      moveToNextPage();
    },
    OPEN_SHORTCUT_DIALOG: async (ev: any) => {
      console.info(ev);
      setOpenShortcutDialog(true);
    },
  };

  const crumbs =
    projectId && jobId
      ? [
          { label: 'Projects', href: '/projects', title: '프로젝트 목록으로 돌아갑니다.' },
          { label: 'Jobs', href: `/projects/${projectId}`, title: '작업모음 목록으로 돌아갑니다.' },
          {
            label: 'Tasks',
            href: `/projects/${projectId}/${jobId}/tasks`,
            title: '작업 목록으로 돌아갑니다.',
          },
        ]
      : undefined;

  const progressRate = taskRef.current
    ? (taskRef.current.count.finished / taskRef.current.count.total) * 100
    : undefined;

  const progressTitle = getTask.data
    ? `${getTask.data.count.finished} / ${getTask.data.count.total}`
    : undefined;

  const AdjacentButtons = getAdjacentTasks.data && (
    <Box sx={{ display: 'flex', gap: 1, flex: { xs: 1, md: 0 }, alignItems: 'center' }}>
      {taskIdPrevious ? (
        <Tooltip title={`단축키 ${shortcuts.MOVE_TO_PREVIOUS[0]}`}>
          <Link href={hrefPreviousTask} underline='none' onClick={makeOnClickAdjacentLink('prev')}>
            <Button startIcon={<ArrowLeft />}>{'이전'}</Button>
          </Link>
        </Tooltip>
      ) : (
        <Button disabled startIcon={<ArrowLeft />}>
          {'이전'}
        </Button>
      )}

      {taskIdNext ? (
        <Tooltip title={`단축키 ${shortcuts.MOVE_TO_NEXT[0]}`}>
          <Link href={hrefNextTask} underline='none' onClick={makeOnClickAdjacentLink('next')}>
            <Button endIcon={<ArrowRight />}>{'다음'}</Button>
          </Link>
        </Tooltip>
      ) : (
        <>
          <Button
            onClick={onClickLastTask}
            endIcon={<UTurnLeft sx={{ transform: 'rotate(0.25turn)' }} />}
          >
            {'제출 후 목록으로 돌아가기'}
          </Button>
        </>
      )}
    </Box>
  );

  return (
    <>
      <Head>
        <title>{`Task | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>

      <GlobalHotKeys keyMap={defaultShortcutKeyMap} handlers={keyMapHandlers} allowChanges={true} />

      <Container maxWidth={false}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexFlow: { xs: 'column', sm: 'row' },
            width: '100%',
          }}
        >
          <Box>
            <CustomBreadcrumbs crumbs={crumbs} />
            <Box sx={{ height: 50, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant='h5'>{`Task`}</Typography>
              <CircularProgressWithLabel value={progressRate} title={progressTitle} />

              {/* FIXME: 버튼 디자인 수정 */}
              {/* <AutoSubmitButton /> */}
              {/* <ViewToggleButtons /> */}
              {/* <ViewTypeButton /> */}
              <Tooltip title={'자동 제출 옵션을 변경합니다.'}>
                <FormControlLabel
                  sx={{ ml: 'auto' }}
                  value='end'
                  control={
                    <Checkbox
                      onChange={onChangeOptions}
                      checked={options.autoSubmit}
                      name='autoSubmit'
                    />
                  }
                  draggable={false}
                  label={'라벨링 자동 제출'}
                  labelPlacement='end'
                />
              </Tooltip>
              <Tooltip title={'화면 보기 방식을 변경합니다.'}>
                <FormControlLabel
                  sx={{ ml: 'auto' }}
                  value='end'
                  control={
                    <Checkbox
                      onChange={onChangeOptions}
                      checked={options.multiColumn}
                      name='multiColumn'
                    />
                  }
                  draggable={false}
                  label={'화면 분할'}
                  labelPlacement='end'
                />
              </Tooltip>
            </Box>
            <GuidanceLink />
          </Box>

          {/* NOTE: 버튼 그룹 제거 */}
          {/* <Box sx={{ ml: 'auto', pb: 2 }}>{AdjacentButtons}</Box> */}
        </Box>

        {/* NOTE: loading skeleton */}
        {/* {getTask.isLoading && (
              <Box>
                <Skeleton sx={{ my: 2 }} variant='rectangular' height='8rem' />
                <Stack direction='row' spacing={1} sx={{ my: 2 }}>
                  <Skeleton variant='rectangular' width='4rem' height='2rem' />
                  <Skeleton variant='rectangular' width='4rem' height='2rem' />
                </Stack>
              </Box>
            )} */}

        {/* // ****************************** */}
        {/* 화면분할 타입1 */}
        {/* // ****************************** */}

        {!options.multiColumn && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={9}>
              {getTask.data && (
                <Box>
                  <Card>
                    <CardHeader
                      // avatar={<Avatar alt={'123'}>{'123'}</Avatar>} // FIXME: api에서 order 받야아함
                      title={getTask.data.data.title}
                      subheader={getTask.data.data.boardType}
                    />
                    <CardContent>
                      <Typography>{getTask.data.data.content}</Typography>
                    </CardContent>
                  </Card>

                  <Stack direction='row' spacing={0} sx={{ my: 2 }}>
                    {choices
                      ?.sort((a, b) => (a.value > b.value ? 1 : a.value < b.value ? -1 : 0))
                      .map(({ text, value }, idx) => {
                        let shortcut: string[];
                        switch (idx) {
                          case 0:
                            shortcut = shortcuts.CHOOSE_1;
                            break;
                          case 1:
                            shortcut = shortcuts.CHOOSE_2;
                            break;
                          default:
                            shortcut = ['없음'];
                            break;
                        }

                        const title = `단축키 ${shortcut}`;

                        return (
                          <Tooltip title={title} key={idx}>
                            <FormControlLabel
                              {...defaultChoicesProps}
                              control={
                                <Checkbox
                                  onChange={onChangeCheckBox}
                                  checked={chosenList.includes(value)}
                                  value={value}
                                />
                              }
                              label={text}
                            />
                          </Tooltip>
                        );
                      })}
                  </Stack>
                </Box>
              )}
              {AdjacentButtons}
            </Grid>

            <Grid item xs={12} sm={12} lg={3}>
              {/* <OtherTasks /> */}
            </Grid>
          </Grid>
        )}
        {/* // ****************************** */}
        {/* 화면분할 타입2 */}
        {/* // ****************************** */}
        {options.multiColumn && (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                {getTask.data && (
                  <Box>
                    <Card>
                      <CardHeader
                        title={getTask.data.data.title}
                        subheader={getTask.data.data.boardType}
                        sx={{ pb: 0 }}
                      />
                      <CardContent>
                        <Typography>{getTask.data.data.content}</Typography>
                      </CardContent>
                    </Card>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                {getTask.data && (
                  <Stack direction='row' spacing={1} sx={{ my: 2 }}>
                    {choices
                      ?.sort((a, b) => (a.value > b.value ? 1 : a.value < b.value ? -1 : 0))
                      .map(({ text, value }, idx) => {
                        let shortcut: string[];
                        switch (idx) {
                          case 0:
                            shortcut = shortcuts.CHOOSE_1;
                            break;
                          case 1:
                            shortcut = shortcuts.CHOOSE_2;
                            break;
                          default:
                            shortcut = [];
                            break;
                        }

                        const title = `단축키 ${shortcut}`;

                        return (
                          <Tooltip title={title} key={idx}>
                            <FormControlLabel
                              {...defaultChoicesProps}
                              control={
                                <Checkbox
                                  onChange={onChangeCheckBox}
                                  checked={chosenList.includes(value)}
                                  value={value}
                                />
                              }
                              label={text}
                            />
                          </Tooltip>
                        );
                      })}
                  </Stack>
                )}
                {AdjacentButtons}
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={3}>
                {/* <OtherTasks /> */}
              </Grid>
            </Grid>
          </>
        )}

        <Box ref={hiddenRef} sx={{ display: 'none', visibility: 'hidden' }} />
      </Container>

      {/* TODO: FAB */}
      {/* <TaskSpeedDial /> */}

      <Snackbar open={openAlert} onClose={onCloseAlert}>
        <Alert onClose={onCloseAlert} variant='filled'>
          <AlertTitle>{`라벨링을 완료했습니다.`}</AlertTitle>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={onClickAlert} variant='contained' color='success' size='small'>
              {'목록으로 돌아가기'}
            </Button>
          </Box>
        </Alert>
      </Snackbar>

      <ShortcutDialog open={openShortcutDialog} setOpen={setOpenShortcutDialog} />
    </>
  );
}

TaskPage.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
