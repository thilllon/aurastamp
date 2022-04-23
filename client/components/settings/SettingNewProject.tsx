import { UserList, UserListChangeEventHandler } from '@/components/settings/UserList';
import { CustomSelect } from '@/components/shared/CustomSelect';
import { Link } from '@/components/shared/Link';
import { MultipleSelectCheckmarks } from '@/components/shared/MultipleSelectCheckmarks';
import { ExtendedFile, Uploader } from '@/components/shared/Uploader';
import { CreateProjectInput, useCreateProject } from '@/services/hooks';
import { useGetUsers } from '@/services/users';
import { useCustomSession } from '@/utils/next-auth-react-query';
import {
  fileSchema,
  projectValidationSchema,
  SamplingMethod,
  samplingOptions,
} from '@/utils/validators';
import { Add, AttachFile, ExpandLess, ExpandMore, Remove } from '@mui/icons-material';
import { MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  IconButton,
  NoSsr,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { ko } from 'date-fns/locale';
import React, { useCallback, useEffect, useState } from 'react';
import { Control, Controller, useFieldArray, useForm, UseFormGetValues } from 'react-hook-form';
import { User } from '@/services/users';
import { Close as CloseIcon } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';

type SettingNewProjectProps = {
  organizationCandidates: Organization[];
  managerCandidates: User[];
  workerCandidates: User[];
};

type Organization = {
  id: string;
  name: string;
};

type FormInputs = {
  organization: Organization;
  name: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  workers: User[];
  managers: User[];
  file?: File;
  sampling: {
    method: SamplingMethod;
    size: number;
  };
  allocation: {
    indexFrom: number;
    indexTo: number;
    workers: User[];
  }[];
};

// const resolver: Resolver<FormValues> = async (values) => {
//   return {
//     // values: values.password ? values : {},
//     // errors: !values.password
//     //   ? {
//     //       password: {
//     //         type: 'required',
//     //         message: 'This is required.',
//     //       },
//     //     }
//     //   : {},
//   };
// };

// {...register} 리턴 타입: UseFormRegisterReturn
// onChange: ChangeHandler;
// onBlur: ChangeHandler;
// ref: RefCallBack;
// name: InternalFieldName;
// min?: string | number;
// max?: string | number;
// maxLength?: number;
// minLength?: number;
// pattern?: string;
// required?: boolean;
// disabled?: boolean;

let renderCount = 0;

export const SettingNewProject = ({
  organizationCandidates,
  managerCandidates,
  workerCandidates,
  ...props
}: SettingNewProjectProps) => {
  renderCount++;

  const createProject = useCreateProject();

  const { register, handleSubmit, reset, control, getValues, setValue, formState, watch } =
    useForm<FormInputs>({
      // resolver: yupResolver(schema),
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      defaultValues: {
        organization: organizationCandidates[0],
        name: 'Project ' + new Date().toISOString().substring(0, 10),
        description: '',
        dateStart: new Date(),
        dateEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        workers: [],
        managers: [],
        file: undefined,
        sampling: {
          method: samplingOptions[0].value,
          size: 1000,
        },
        allocation: [],
        // allocation: [{ indexFrom: 0, indexTo: 100, workers: [] }],
      },
      // context: undefined,
      // criteriaMode: 'firstError',
      // shouldFocusError: true,
      // shouldUnregister: false,
      // shouldUseNativeValidation: false,
      // delayError: undefined,
    });

  const fieldArray = useFieldArray({ control, name: 'allocation' });
  const watchFieldArray = watch('allocation');

  const controlledFields = fieldArray.fields.map((field, idx) => {
    return { ...field, ...watchFieldArray[idx] };
  });

  useEffect(() => {
    if (fieldArray.fields.length === 0) {
      const indexTo = getValues('sampling.size');
      fieldArray.append({ indexFrom: 0, indexTo, workers: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showDetails, setShowDetails] = useState(true);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openFailureAlert, setOpenFailureAlert] = useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessAlert(false);
    setOpenFailureAlert(false);
  };

  const onSubmit = async (data: FormInputs) => {
    const newProject: CreateProjectInput = {
      data: {
        project: {
          name: data.name,
          description: data.description,
          dateStart: data.dateStart.toISOString(),
          dateEnd: data.dateEnd.toISOString(),
          workers: data.workers.map(({ id }) => id),
          managers: data.managers.map(({ id }) => id),
        },
        sampling: data.sampling,
        jobs: {
          count: data.allocation.length,
          allocation: data.allocation.map((alloc) => {
            return {
              users: alloc.workers.map(({ id }) => id),
              data: [alloc.indexFrom, alloc.indexTo],
            };
          }),
        },
      },
      file: data.file as File,
    };
    console.info(newProject);

    try {
      const valid = projectValidationSchema.validateSync(newProject.data, { abortEarly: true });
      const valid2 = fileSchema.validateSync(newProject.file, { abortEarly: true });
      console.info('valid', valid);
      // const res = await createProject.mutateAsync(newProject);
      // reset();
    } catch (err) {
      console.error(err);
    }
  };

  const onClickAddAlloc = () => {
    fieldArray.append({ indexFrom: 0, indexTo: getValues('sampling.size'), workers: [] });
  };

  const onClickRemoveAlloc = () => {
    fieldArray.remove(fieldArray.fields.length - 1);
  };

  const makeOnClickRemoveAlloc = (idx: number) => {
    return () => {
      console.info(idx);
      fieldArray.remove(idx);
    };
  };

  const onChangeManagers: UserListChangeEventHandler = (left, right) => {
    setValue('managers', right);
  };

  const onChangeWorkers: UserListChangeEventHandler = (left, right) => {
    setValue('workers', right);
  };

  const onChangeDateEnd = (
    date: { target: any; type?: any } | null,
    keyboardInputValue?: string
  ) => {
    //
  };

  const onChangeUpload = (files: ExtendedFile[]) => {
    //
  };

  const makeOnChangeSelectWorkers = useCallback(
    (idx: number) => {
      const onChangeSelectWorkers = (selectedList: any[]) => {
        console.info('selected', selectedList);
        // FIXME: select any 전부 label, value값으로 변경할것
        const workerIds = selectedList.map((name) => ({
          id: workerCandidates.find(({ username }) => username === name)?.id ?? '',
          username: name,
        }));
        const allocation = getValues('allocation');
        allocation[idx].workers = workerIds;
        setValue('allocation', allocation);
      };
      return onChangeSelectWorkers;
    },
    [getValues, setValue, workerCandidates]
  );

  const makeOnDeleteForm = (name: any) => {
    return () => {
      setValue(name, '');
    };
  };

  console.info('formState.errors', formState.errors);

  return (
    <Box sx={{ pt: 3 }} component='form' {...props} onSubmit={handleSubmit(onSubmit)}>
      <NoSsr>
        <Typography>{'Render Count:' + renderCount}</Typography>
      </NoSsr>
      <Card>
        <CardHeader
          title='새 프로젝트'
          subheader='새로운 라벨링 프로젝트를 생성합니다. 라벨링 데이터 파일을 업로드하고 프로젝트 정보를 입력하세요.'
        />

        <Divider />

        <CardContent sx={{ display: 'flex', flexFlow: 'column nowrap' }}>
          <CustomSelect
            label='Organization'
            formControlProps={{ fullWidth: true, required: true }}
            selectProps={{ fullWidth: true, required: true, labelId: 'organization-select' }}
            options={organizationCandidates.map(({ id, name }) => ({ value: id, label: name }))}
          />
          <TextField
            label='Project Name'
            fullWidth
            required
            margin={'normal'}
            // helperText={'help'}
            // error={true}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <IconButton disableRipple={false} onClick={makeOnDeleteForm('name')}>
                  <CloseIcon />
                </IconButton>
              ),
            }}
            {...register('name', { required: true })}
          />
          <TextField
            label='Description'
            fullWidth
            margin={'normal'}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <IconButton disableRipple={false} onClick={makeOnDeleteForm('description')}>
                  <CloseIcon />
                </IconButton>
              ),
            }}
            {...register('description')}
          />
        </CardContent>

        <Divider />

        <CardContent>
          <Typography sx={{ my: 2, fontSize: 16 }} variant='h6'>
            {'라벨링 데이터 업로드(.csv)'}
          </Typography>
          <Link
            href='/example.csv'
            download
            underline='hover'
            sx={{ display: 'flex', alignItems: 'center', width: 'fit-content' }}
          >
            <AttachFile fontSize={'small'} />
            <Typography variant='subtitle2' component='span'>{`예시 파일`}</Typography>
          </Link>

          <Uploader
            multiple={false}
            onChange={(ev, files) => {
              if (files.length > 0) {
                // console.info(files?.[0].file);
                setValue('file', files?.[0].file);
              }
            }}
          />
        </CardContent>

        <Divider />

        <Collapse in={showDetails}>
          <CardContent>
            <Typography sx={{ my: 2, fontSize: 16 }} variant='h6'>
              {'프로젝트 기간'}
            </Typography>
            <PeriodDatePicker control={control} getValues={getValues} />
          </CardContent>

          <Divider />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <Typography sx={{ my: 2, fontSize: 16 }} variant='h6'>
                  {'프로젝트 관리자'}
                </Typography>
                <UserList left={managerCandidates} right={[]} onChange={onChangeManagers} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography sx={{ my: 2, fontSize: 16 }} variant='h6'>
                  {'프로젝트 작업자'}
                </Typography>
                <UserList left={workerCandidates} right={[]} onChange={onChangeWorkers} />
              </Grid>
            </Grid>
          </CardContent>

          <Divider />

          <CardContent>
            <Typography sx={{ my: 2, fontSize: 16 }} variant='h6'>
              {'샘플링'}
            </Typography>

            <Grid container columnSpacing={2}>
              <Grid item xs={12} md={6}>
                <CustomSelect
                  id='samplingMethod'
                  formControlProps={{ fullWidth: true }}
                  options={samplingOptions}
                  label={'샘플링 방식'}
                  sx={{ pt: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label={'샘플링 데이터 크기'}
                  fullWidth
                  required
                  margin={'normal'}
                  type={'number'}
                  InputLabelProps={{ shrink: true }}
                  {...register('sampling.size', {
                    required: true,
                    min: 1,
                    valueAsNumber: true,
                    value: getValues('sampling.size'),
                  })}
                />
              </Grid>
            </Grid>
          </CardContent>

          <Divider />

          <CardContent>
            {renderCount}
            <Box sx={{ display: 'flex', flexFlow: 'row' }}>
              <Typography sx={{ my: 2, fontSize: 16 }} variant='h6'>
                {'작업 분배'}
              </Typography>

              <Tooltip title='추가'>
                <IconButton color='primary' onClick={onClickAddAlloc} sx={{ ml: 2, my: 'auto' }}>
                  <Add />
                </IconButton>
              </Tooltip>
              <Tooltip title='마지막 행 제거'>
                <IconButton color='primary' onClick={onClickRemoveAlloc} sx={{ ml: 1, my: 'auto' }}>
                  <Remove />
                </IconButton>
              </Tooltip>
            </Box>

            {/* <AllocationSection
              controlledFields={controlledFields}
              workerCandidates={workerCandidates}
              makeOnClickRemoveAlloc={makeOnClickRemoveAlloc}
              register={register}
            /> */}

            {controlledFields.map((field, idx) => (
              <Grid key={field.id} container spacing={2} className={field.id}>
                <Grid item xs={12} md={3} lg={2}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    // helperText='데이터 시작 번호'
                    // error={true}
                    label={'데이터 시작 번호'}
                    fullWidth
                    required
                    margin={'normal'}
                    inputProps={{ type: 'number' }}
                    InputProps={{ type: 'number' }}
                    type={'number'}
                    // value={field.indexFrom}
                    // {...register(`allocation.${idx}.indexFrom`, {
                    //   required: true,
                    //   min: 0,
                    //   valueAsNumber: true,
                    //   value: field.indexFrom,
                    //   onChange: (ev: any) => {
                    //     const value = parseInt(ev.target.value);
                    //     fieldArray.update(idx, { ...field, indexFrom: value });
                    //   },
                    // })}
                    {...register(`allocation.${idx}.indexFrom` as const, {
                      valueAsNumber: true,
                    })}
                  />
                </Grid>

                <Grid item xs={12} md={3} lg={2}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label={'데이터 끝 번호'}
                    fullWidth
                    required
                    margin={'normal'}
                    inputProps={{ type: 'number' }}
                    InputProps={{ type: 'number' }}
                    type={'number'}
                    // value={field.indexTo}
                    // {...register(`allocation.${idx}.indexTo`, {
                    //   required: true,
                    //   min: 1,
                    //   valueAsNumber: true,
                    //   // value: getValues('allocation.'),
                    // })}
                    // inputRef={register(`allocation.${idx}.indexTo`).ref}
                    {...register(`allocation.${idx}.indexTo` as const, {
                      valueAsNumber: true,
                      required: true,
                      min: 1,
                    })}
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={8}>
                  <Box sx={{ display: 'flex', columnGap: 2, pt: 2 }}>
                    <MultipleSelectCheckmarks
                      label={'작업자'}
                      choices={workerCandidates.map(({ username }) => username)}
                      {...register(`allocation.${idx}.workers`, {
                        required: true,
                        // onChange: (ev: Event) => {
                        //   console.info((ev.target as any).value);
                        // },
                      })}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'flex-start', pt: 1 }}>
                      <IconButton color='primary' onClick={makeOnClickRemoveAlloc(idx)}>
                        <Remove />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </CardContent>

          <Divider />
        </Collapse>

        <CardContent sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            onClick={() => {
              setShowDetails((prev) => !prev);
            }}
            endIcon={showDetails ? <ExpandLess /> : <ExpandMore />}
          >
            {'Setting Details'}
          </Button>

          <Button type='submit' variant='contained'>
            {'Create'}
          </Button>
        </CardContent>
      </Card>

      <Snackbar open={openSuccessAlert} onClose={handleClose}>
        <Alert onClose={handleClose} elevation={6} severity='success' sx={{ width: '100%' }}>
          <AlertTitle>{'새 프로젝트 생성'}</AlertTitle>
          {'새 포르젝트가 생성되었습니다.'}
        </Alert>
      </Snackbar>

      <Snackbar open={openFailureAlert} onClose={handleClose}>
        <Alert onClose={handleClose} elevation={6} severity='error' sx={{ width: '100%' }}>
          <AlertTitle>{'생성 실패'}</AlertTitle>
          {'프로젝트를 생성하지 못하였습니다. 다시 시도해주세요.'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const PeriodDatePicker = React.memo(
  ({
    control,
    getValues,
  }: {
    control: Control<FormInputs>;
    getValues: UseFormGetValues<FormInputs>;
  }) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ko}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Controller
            name='dateStart'
            control={control}
            render={({ field, fieldState, formState }) => {
              // field: {name: 'dateStart', value: Tue Apr 26 2022 09:39:57 GMT+0900 (한국 표준시), onChange: ƒ, onBlur: ƒ, ref: ƒ}
              // fieldState: {invalid: false, isDirty: false, isTouched: false, error: undefined}
              // formState: {…}
              return (
                <MobileDatePicker
                  value={field.value}
                  onChange={(date) => {
                    if (date) {
                      field.onChange(date);
                    }
                  }}
                  label='시작일'
                  // minDate={getValues('dateStart')}
                  maxDate={getValues('dateEnd')}
                  renderInput={(params) => {
                    // InputProps: {readOnly: true}
                    // disabled: undefined
                    // error: false
                    // inputProps: {disabled: undefined, readOnly: true, aria-readonly: true, aria-label: 'Choose date, selected date is 2022.04.26', value: '2022.04.26', …}
                    // inputRef: undefined
                    // label: "시작일"
                    // ref: null
                    return (
                      <TextField
                        value={field.value}
                        fullWidth
                        required={true}
                        InputLabelProps={{ shrink: true }}
                        margin={'normal'}
                        {...params}
                        name={field.name}
                        inputRef={field.ref}
                      />
                    );
                  }}
                />
              );
            }}
          />

          <Controller
            name='dateEnd'
            control={control}
            render={({ field, fieldState, formState }) => {
              return (
                <MobileDatePicker
                  value={field.value}
                  onChange={(date) => {
                    if (date) {
                      field.onChange(date);
                    }
                  }}
                  label='종료일'
                  minDate={getValues('dateStart')}
                  // maxDate={getValues('dateEnd')}
                  renderInput={(params) => {
                    return (
                      <TextField
                        value={field.value}
                        fullWidth
                        required={false}
                        InputLabelProps={{ shrink: true }}
                        margin={'normal'}
                        {...params}
                      />
                    );
                  }}
                />
              );
            }}
          />
        </Box>
      </LocalizationProvider>
    );
  }
);

// export const AllocationSection = React.memo(
//   ({
//     controlledFields,
//     workerCandidates,
//     makeOnClickRemoveAlloc,
//     register,
//   }: {
//     controlledFields: {
//       indexFrom: number;
//       indexTo: number;
//       workers: User[];
//       id: string;
//     }[];
//     workerCandidates: User[];
//     makeOnClickRemoveAlloc: (idx: number) => () => void;
//     register: any;
//   }) => {
//     return (
//       <>
//         {controlledFields.map((field, idx) => (
//           <Grid key={field.id} container spacing={2} className={field.id}>
//             <Grid item xs={12} md={3} lg={2}>
//               <TextField
//                 InputLabelProps={{ shrink: true }}
//                 // helperText='데이터 시작 번호'
//                 // error={true}
//                 label={'데이터 시작 번호'}
//                 fullWidth
//                 required
//                 margin={'normal'}
//                 type={'number'}
//                 // value={field.indexFrom}
//                 // {...register(`allocation.${idx}.indexFrom`, {
//                 //   required: true,
//                 //   min: 0,
//                 //   valueAsNumber: true,
//                 //   value: field.indexFrom,
//                 //   onChange: (ev: any) => {
//                 //     const value = parseInt(ev.target.value);
//                 //     fieldArray.update(idx, { ...field, indexFrom: value });
//                 //   },
//                 // })}
//                 {...register(`allocation.${idx}.indexFrom` as const, {
//                   valueAsNumber: true,
//                   required: true,
//                   min: 0,
//                 })}
//               />
//             </Grid>

//             <Grid item xs={12} md={3} lg={2}>
//               <TextField
//                 InputLabelProps={{ shrink: true }}
//                 label={'데이터 끝 번호'}
//                 fullWidth
//                 required
//                 margin={'normal'}
//                 type={'number'}
//                 value={field.indexTo}
//                 // {...register(`allocation.${idx}.indexTo`, {
//                 //   required: true,
//                 //   min: 1,
//                 //   valueAsNumber: true,
//                 //   // value: getValues('allocation.'),
//                 // })}
//                 // inputRef={register(`allocation.${idx}.indexTo`).ref}
//                 {...register(`allocation.${idx}.indexTo` as const, {
//                   valueAsNumber: true,
//                   required: true,
//                   min: 1,
//                 })}
//               />
//             </Grid>

//             <Grid item xs={12} md={6} lg={8}>
//               <Box sx={{ display: 'flex', columnGap: 2, pt: 2 }}>
//                 <MultipleSelectCheckmarks
//                   label={'작업자'}
//                   choices={workerCandidates.map(({ username }) => username)}
//                 />

//                 <Box sx={{ display: 'flex', alignItems: 'flex-start', pt: 1 }}>
//                   <IconButton color='primary' onClick={makeOnClickRemoveAlloc(idx)}>
//                     <Remove />
//                   </IconButton>
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         ))}
//       </>
//     );
//   }
// );
