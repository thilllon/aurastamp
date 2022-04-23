// import { UserList, UserListChangeEventHandler } from '@/components/settings/UserList';
// import { CustomSelect } from '@/components/shared/CustomSelect';
// import { Link } from '@/components/shared/Link';
// import { MultipleSelectCheckmarks } from '@/components/shared/MultipleSelectCheckmarks';
// import { ExtendedFile, Uploader } from '@/components/shared/Uploader';
// import { CreateProjectInput, useCreateProject } from '@/services/hooks';
// import { useGetUsers } from '@/services/users';
// import { useCustomSession } from '@/utils/next-auth-react-query';
// import { projectValidationSchema, SamplingMethod, samplingOptions } from '@/utils/validators';
// import { Add, Remove } from '@mui/icons-material';
// import { MobileDatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import {
//   Alert,
//   AlertTitle,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
//   Grid,
//   IconButton,
//   NoSsr,
//   Snackbar,
//   TextField,
//   TextFieldProps,
//   Tooltip,
//   Typography,
// } from '@mui/material';
// import { ko } from 'date-fns/locale';
// import { Formik, useFormik } from 'formik';
// import React, { useEffect, useState } from 'react';
// import { Controller, useFieldArray, useForm } from 'react-hook-form';

// type SettingNewProjectFormikProps = {};

// type User = {
//   id: string;
//   username: string;
// };

// type Organization = {
//   id: string;
//   name: string;
// };

// type FormInputs = {
//   organization: Organization;
//   name: string;
//   description: string;
//   dateStart: Date;
//   dateEnd: Date;
//   workers: User[];
//   managers: User[];
//   file?: File;
//   sampling: {
//     method: SamplingMethod;
//     size: number;
//   };
//   allocation: {
//     indexFrom: number;
//     indexTo: number;
//     workers: User[];
//   }[];
// };

// // const resolver: Resolver<FormValues> = async (values) => {
// //   return {
// //     // values: values.password ? values : {},
// //     // errors: !values.password
// //     //   ? {
// //     //       password: {
// //     //         type: 'required',
// //     //         message: 'This is required.',
// //     //       },
// //     //     }
// //     //   : {},
// //   };
// // };

// // {...register} 리턴 타입: UseFormRegisterReturn
// // onChange: ChangeHandler;
// // onBlur: ChangeHandler;
// // ref: RefCallBack;
// // name: InternalFieldName;
// // min?: string | number;
// // max?: string | number;
// // maxLength?: number;
// // minLength?: number;
// // pattern?: string;
// // required?: boolean;
// // disabled?: boolean;

// let renderCount = 0;

// // ******************************
// // ******************************
// // ******************************

// // ******************************

// export const SettingNewProjectFormik = (props: SettingNewProjectFormikProps) => {
//   renderCount++;

//   const formik = useFormik<FormInputs>({
//     initialValues: {
//       // email: 'foobar@example.com',
//       // password: 'foobar',
//       organization: {
//         id: '',
//         name: '',
//       },
//       name: '',
//       description: '',
//       file: undefined,
//       dateStart: new Date(),
//       dateEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
//       managers: [],
//       workers: [],
//       sampling: {
//         method: samplingOptions[0].value,
//         size: 1000,
//       },
//       allocation: [],
//     },
//     validationSchema: projectValidationSchema,
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });

//   const [session] = useCustomSession();
//   const getUsers = useGetUsers({}, { enabled: Boolean(session?.user) });

//   // const getOrganizations = useGetOrganizations();
//   // FIXME: orgList API
//   const orgList = [{ id: '1234-1234-123412341234-12341234', name: 'Qroad' }];

//   const createProject = useCreateProject();

//   // useEffect(() => {
//   //   if (getUsers.data?.users) {
//   //     const workers = getUsers.data.users.map(({ id, username }) => ({ id, username }));
//   //     // const workers = getValues('workers');
//   //     const indexTo = getValues('sampling.size');
//   //     setValue('allocation', [{ indexFrom: 0, indexTo, workers }]);
//   //   }
//   // }, [getUsers, getValues, setValue]);

//   const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
//   const [openFailureAlert, setOpenFailureAlert] = useState(false);

//   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpenSuccessAlert(false);
//     setOpenFailureAlert(false);
//   };

//   const onSubmit = async (data: FormInputs) => {
//     const newProject: CreateProjectInput = {
//       data: {
//         project: {
//           name: data.name,
//           description: data.description,
//           dateStart: data.dateStart.toISOString(),
//           dateEnd: data.dateEnd.toISOString(),
//           workers: data.workers.map(({ id }) => id),
//           managers: data.managers.map(({ id }) => id),
//         },
//         sampling: data.sampling,
//         jobs: {
//           count: data.allocation.length,
//           allocation: data.allocation.map((alloc) => {
//             return {
//               users: alloc.workers.map(({ id }) => id),
//               data: [alloc.indexFrom, alloc.indexTo],
//             };
//           }),
//         },
//       },
//       file: data.file as File,
//     };
//     // console.info(data, newProject);

//     try {
//       const valid = projectValidationSchema.validateSync(newProject, { abortEarly: true });
//       console.info('valid', valid);
//       const res = await createProject.mutateAsync(newProject);
//       // reset();
//       setOpenSuccessAlert(true);
//     } catch (err) {
//       console.error(err);
//       setOpenFailureAlert(true);
//     }
//   };

//   const onClickAddAlloc = () => {
//     const val = getValues();
//     // console.info(val);
//     setValue('allocation', [
//       ...val.allocation,
//       { indexFrom: 0, indexTo: val.sampling.size, workers: [] },
//     ]);
//   };

//   const makeOnClickAddAlloc = (idx: number) => {
//     return () => {};
//   };
//   const makeOnClickRemoveAlloc = (idx: number) => {
//     return () => {};
//   };

//   const onChangeManagers: UserListChangeEventHandler = (left, right) => {
//     setValue('managers', right);
//   };

//   const onChangeWorkers: UserListChangeEventHandler = (left, right) => {
//     setValue('workers', right);
//   };

//   const onChangeDateEnd = (
//     date: { target: any; type?: any } | null,
//     keyboardInputValue?: string
//   ) => {
//     //
//   };

//   const onChangeUpload = (files: ExtendedFile[]) => {
//     //
//   };

//   return (
//     <Formik>
//       <Box sx={{ pt: 3 }} component='form' {...props} onSubmit={handleSubmit(onSubmit)}>
//         <NoSsr>
//           <Typography>{'Render Count:' + renderCount}</Typography>
//         </NoSsr>
//         <Card>
//           <CardHeader
//             title='새 프로젝트'
//             subheader='새로운 라벨링 프로젝트를 생성합니다. 라벨링 데이터 파일을 업로드하고 프로젝트 정보를 입력하세요.'
//           />

//           <Divider />

//           <CardContent sx={{ display: 'flex', flexFlow: 'column nowrap' }}>
//             <TextField
//               label='Project Name'
//               fullWidth
//               required
//               margin={'normal'}
//               // helperText='help'
//               // error={true}
//               InputLabelProps={{ shrink: true }}
//               {...register('name', {
//                 required: true,
//                 maxLength: 16,
//               })}
//             />
//             <TextField
//               label='Description'
//               InputLabelProps={{ shrink: true }}
//               fullWidth
//               margin={'normal'}
//               {...register('description')}
//             />{' '}
//           </CardContent>

//           <Divider />

//           <CardContent>
//             <Typography sx={{ my: 2 }}>{'라벨링 데이터 업로드(.csv)'}</Typography>
//             <Link href='/example.csv' download>
//               {`예시 파일`}
//             </Link>

//             <Uploader
//               multiple={false}
//               // {...register('file', {
//               //   required: true,
//               //   onChange: (event, files) => {
//               //     onChangeUpload();
//               //   },
//               // })}
//               onChange={(ev, files) => {
//                 if (files.length > 0) {
//                   // console.info(files?.[0].file);
//                   setValue('file', files?.[0].file);
//                 }
//               }}
//             />
//           </CardContent>

//           <Divider />

//           <CardContent>
//             <Typography sx={{ my: 2 }}>{'프로젝트 기간'}</Typography>

//             <LocalizationProvider dateAdapter={AdapterDateFns} locale={ko}>
//               <Box sx={{ display: 'flex', gap: 2 }}>
//                 <Controller
//                   name='dateStart'
//                   control={control}
//                   render={({ field, fieldState, formState }) => {
//                     // field: {name: 'dateStart', value: Tue Apr 26 2022 09:39:57 GMT+0900 (한국 표준시), onChange: ƒ, onBlur: ƒ, ref: ƒ}
//                     // fieldState: {invalid: false, isDirty: false, isTouched: false, error: undefined}
//                     // formState: {…}
//                     return (
//                       <MobileDatePicker
//                         value={field.value}
//                         onChange={(date) => {
//                           if (date) {
//                             setValue('dateStart', date);
//                           }
//                         }}
//                         label='시작일'
//                         // minDate={getValues('dateStart')}
//                         maxDate={getValues('dateEnd')}
//                         renderInput={(params) => {
//                           // InputProps: {readOnly: true}
//                           // disabled: undefined
//                           // error: false
//                           // inputProps: {disabled: undefined, readOnly: true, aria-readonly: true, aria-label: 'Choose date, selected date is 2022.04.26', value: '2022.04.26', …}
//                           // inputRef: undefined
//                           // label: "시작일"
//                           // ref: null
//                           return (
//                             <TextField
//                               value={field.value}
//                               fullWidth
//                               InputLabelProps={{ shrink: true }}
//                               margin={'normal'}
//                               {...params}
//                             />
//                           );
//                         }}
//                       />
//                     );
//                   }}
//                 />

//                 <Controller
//                   name='dateEnd'
//                   control={control}
//                   render={({ field, fieldState, formState }) => {
//                     // field: {name: 'dateEnd', value: Tue Apr 26 2022 09:39:57 GMT+0900 (한국 표준시), onChange: ƒ, onBlur: ƒ, ref: ƒ}
//                     // fieldState: {invalid: false, isDirty: false, isTouched: false, error: undefined}
//                     // formState: {…}
//                     return (
//                       <MobileDatePicker
//                         value={field.value}
//                         onChange={(date) => {
//                           if (date) {
//                             setValue('dateEnd', date);
//                           }
//                         }}
//                         label='종료일'
//                         minDate={getValues('dateStart')}
//                         // maxDate={getValues('dateEnd')}
//                         renderInput={(params) => {
//                           // InputProps: {readOnly: true}
//                           // disabled: undefined
//                           // error: false
//                           // inputProps: {disabled: undefined, readOnly: true, aria-readonly: true, aria-label: 'Choose date, selected date is 2022.04.26', value: '2022.04.26', …}
//                           // inputRef: undefined
//                           // label: "종료일"
//                           // ref: null
//                           return (
//                             <TextField
//                               value={field.value}
//                               fullWidth
//                               InputLabelProps={{ shrink: true }}
//                               margin={'normal'}
//                               {...params}
//                             />
//                           );
//                         }}
//                       />
//                     );
//                   }}
//                 />
//               </Box>
//             </LocalizationProvider>
//           </CardContent>

//           <Divider />

//           <CardContent>
//             <Typography sx={{ mt: 2, mb: 2 }}>{'프로젝트 관리자'}</Typography>
//             {/* {getUsers.data && (
//             <UserList users={getUsers.data?.users ?? []} onChange={onChangeManagers} />
//           )}

//           <Typography sx={{ mt: 4, mb: 2 }}>{'프로젝트 작업자'}</Typography>
//           {getUsers.data && (
//             <UserList users={getUsers.data?.users ?? []} onChange={onChangeWorkers} />
//           )} */}
//           </CardContent>

//           <Divider />

//           <CardContent>
//             <Typography sx={{ mt: 2, mb: 2 }}>{'샘플링'}</Typography>

//             <Grid container columnSpacing={2}>
//               <Grid item xs={12} md={6}>
//                 <CustomSelect
//                   id='samplingMethod'
//                   formControlProps={{ fullWidth: true }}
//                   options={samplingOptions}
//                   label={'샘플링 방식'}
//                   sx={{ pt: 2 }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label={'샘플링 데이터 크기'}
//                   fullWidth
//                   required
//                   margin={'normal'}
//                   type={'number'}
//                   InputLabelProps={{ shrink: true }}
//                   {...register('sampling.size', {
//                     required: true,
//                     min: 1,
//                     valueAsNumber: true,
//                     value: getValues('sampling.size'),
//                   })}
//                 />
//               </Grid>
//             </Grid>
//           </CardContent>

//           <Divider />

//           <CardContent>
//             <Box sx={{ display: 'flex', flexFlow: 'row' }}>
//               <Typography sx={{ mt: 2, mb: 2, mr: 1 }}>{'작업 분배'}</Typography>

//               <Tooltip title='추가'>
//                 <IconButton color='primary' onClick={onClickAddAlloc} sx={{ my: 'auto' }}>
//                   <Add />
//                 </IconButton>
//               </Tooltip>
//             </Box>

//             {/* {fields.map((field, idx) => ( */}
//             {/* // <div key={field.id}> */}
//             {/* <Grid key={idx} container spacing={2}>
//                 <Grid item xs={12} md={3} lg={2}>
//                   <TextField
//                     InputLabelProps={{ shrink: true }}
//                     // helperText='데이터 시작 번호'
//                     // error={true}
//                     label={'데이터 시작 번호'}
//                     fullWidth
//                     required
//                     margin={'normal'}
//                     type={'number'}
//                     // {...register(`allocation.${idx}.indexFrom`, {
//                     //   required: true,
//                     //   min: 0,
//                     //   valueAsNumber: true,
//                     // })}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={3} lg={2}>
//                   <TextField
//                     InputLabelProps={{ shrink: true }}
//                     label={'데이터 끝 번호'}
//                     fullWidth
//                     required
//                     margin={'normal'}
//                     type={'number'}
//                     // {...register(`allocation.${idx}.indexTo`, {
//                     //   required: true,
//                     //   min: 1,
//                     //   valueAsNumber: true,
//                     //   // value: getValues('allocation.'),
//                     // })}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={6} lg={8}>
//                   <Box sx={{ display: 'flex', columnGap: 2, pt: 2 }}>
//                     <MultipleSelectCheckmarks
//                       label={'작업자'}
//                       // choices={alloc.workers.map(({ username }) => username)}
//                       // choices={getUsers.data?.users ?? []}
//                     />

//                     <Box sx={{ display: 'flex', alignItems: 'flex-start', pt: 1 }}>
//                       <IconButton color='primary' onClick={onClickRemoveAlloc(idx)}>
//                         <Remove />
//                       </IconButton>
//                     </Box>
//                   </Box>
//                 </Grid>
//               </Grid> */}
//             {/* </div> */}
//             {/* ))} */}

//             {getValues('allocation').map((alloc, idx) => {
//               return (
//                 <Grid key={idx} container spacing={2}>
//                   <Grid item xs={12} md={3} lg={2}>
//                     <TextField
//                       InputLabelProps={{ shrink: true }}
//                       // helperText='데이터 시작 번호'
//                       // error={true}
//                       label={'데이터 시작 번호'}
//                       fullWidth
//                       required
//                       margin={'normal'}
//                       type={'number'}
//                       {...register(`allocation.${idx}.indexFrom`, {
//                         required: true,
//                         min: 0,
//                         valueAsNumber: true,
//                       })}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={3} lg={2}>
//                     <TextField
//                       InputLabelProps={{ shrink: true }}
//                       label={'데이터 끝 번호'}
//                       fullWidth
//                       required
//                       margin={'normal'}
//                       type={'number'}
//                       {...register(`allocation.${idx}.indexTo`, {
//                         required: true,
//                         min: 1,
//                         valueAsNumber: true,
//                         // value: getValues('allocation.'),
//                       })}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6} lg={8}>
//                     <Box sx={{ display: 'flex', columnGap: 2, pt: 2 }}>
//                       <MultipleSelectCheckmarks
//                         label={'작업자'}
//                         choices={alloc.workers.map(({ username }) => username)}
//                       />

//                       <Box sx={{ display: 'flex', alignItems: 'flex-start', pt: 1, gap: 1 }}>
//                         <Button
//                           sx={{ aspectRatio: 1, p: 1, minWidth: 0 }}
//                           variant='outlined'
//                           onClick={makeOnClickAddAlloc(idx)}
//                         >
//                           <Add />
//                         </Button>
//                         <Button
//                           sx={{ aspectRatio: 1, p: 1, minWidth: 0 }}
//                           variant='outlined'
//                           onClick={makeOnClickRemoveAlloc(idx)}
//                         >
//                           <Remove />
//                         </Button>
//                         {/* <IconButton color='primary' onClick={makeOnClickAddAlloc(idx)}>
//                         <Add />
//                       </IconButton>
//                       <IconButton color='primary' onClick={makeOnClickRemoveAlloc(idx)}>
//                         <Remove />
//                       </IconButton> */}
//                       </Box>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               );
//             })}
//           </CardContent>

//           <Divider />

//           <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//             <Button type='submit' variant='contained'>
//               {'Create'}
//             </Button>
//           </CardContent>
//         </Card>
//         <Snackbar open={openSuccessAlert} onClose={handleClose}>
//           <Alert onClose={handleClose} elevation={6} severity='success' sx={{ width: '100%' }}>
//             <AlertTitle>{'새 프로젝트 생성'}</AlertTitle>
//             {'새 포르젝트가 생성되었습니다.'}
//           </Alert>
//         </Snackbar>
//         <Snackbar open={openFailureAlert} onClose={handleClose}>
//           <Alert onClose={handleClose} elevation={6} severity='error' sx={{ width: '100%' }}>
//             <AlertTitle>{'생성 실패'}</AlertTitle>
//             {'프로젝트를 생성하지 못하였습니다. 다시 시도해주세요.'}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </Formik>
//   );
// };

export {};
