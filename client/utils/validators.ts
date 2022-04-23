import * as Yup from 'yup';

export type SampleOption = { label: string; value: SamplingMethod };
export type SamplingMethod = 'MONTECARLO' | 'STRATIFIED' | 'QUASIRANDOM';
export const samplingMethods: SamplingMethod[] = ['MONTECARLO', 'STRATIFIED', 'QUASIRANDOM'];
export const samplingOptions: SampleOption[] = [
  { label: '무작위 샘플링', value: 'MONTECARLO' },
  // { label: '구역 샘플링', value: 'STRATIFIED' },
  // { label: '균등 샘플링', value: 'QUASIRANDOM' },
];

export const projectValidationSchema = Yup.object().shape({
  project: Yup.object().shape({
    name: Yup.string().required('Name is required').max(80).min(0),
    description: Yup.string().default('').max(80).min(0),
    dateStart: Yup.date().required('Date start is required'),
    dateEnd: Yup.date().notRequired(),
    managers: Yup.array().of(Yup.string().uuid()).min(1).required(),
    workers: Yup.array().of(Yup.string().uuid()).min(1).required(),
  }),
  sampling: Yup.object()
    .shape({
      method: Yup.string().oneOf(samplingMethods).required('Sampling method is required'),
      size: Yup.number().min(0).max(10000).required('Sampling size is required'),
    })
    .required(),
  jobs: Yup.object().shape({
    count: Yup.number().required(),
    allocation: Yup.array()
      .required()
      .of(
        Yup.object().shape({
          // workers: Yup.array().of(Yup.string().uuid()).required('Workers is required'),
          // indexFrom: Yup.number().min(0).required('starting index is required'),
          // indexTo: Yup.number()
          //   .min(0)
          //   .required('ending index is required')
          //   .when('indexFrom', (indexFrom, schema) => {
          //     if (typeof indexFrom === 'number') {
          //       return schema.min(indexFrom);
          //     }
          //   }),
          users: Yup.array().of(Yup.string().uuid()).min(1).required('Users is required'),
          data: Yup.array()
            .of(Yup.number().integer().min(0))
            .min(2)
            .max(2)
            .required('Data is required'),
        })
      ),
  }),
});

export const fileSchema = Yup.mixed().required('File is required');
