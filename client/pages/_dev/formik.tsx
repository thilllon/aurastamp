import React, { ReactNode, useState, useEffect, useContext } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { Box, Typography, Container, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import { Link } from '@/components/shared/Link';
import Image from 'next/image';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { frncc } from '@/utils/styles';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

interface FormikPageProps {}

const initialValues = {
  friends: [
    {
      name: '',
      email: '',
    },
  ],
};

export default function FormikPage({}: FormikPageProps) {
  const router = useRouter();

  return (
    <Container css={css``}>
      <Typography variant='h1' component={'h4'}>
        {'formik'}
      </Typography>

      <Link href={`https://formik.org/docs/examples/field-arrays`}>
        <Typography>{`https://formik.org/docs/examples/field-arrays`}</Typography>
      </Link>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name='friends'>
              {({ insert, remove, push }) => (
                <div>
                  {' '}
                  <button
                    type='button'
                    className='secondary'
                    onClick={() => {
                      push({ name: '', email: '' });
                    }}
                  >
                    Add Friend
                  </button>
                  {values.friends.length > 0 &&
                    values.friends.map((friend, index) => (
                      <div className='row' key={index}>
                        <div className='col'>
                          <label htmlFor={`friends.${index}.name`}>Name</label>
                          <Field
                            name={`friends.${index}.name`}
                            placeholder='Jane Doe'
                            type='text'
                          />
                          <ErrorMessage
                            name={`friends.${index}.name`}
                            component='div'
                            className='field-error'
                          />
                        </div>
                        <div className='col'>
                          <label htmlFor={`friends.${index}.email`}>Email</label>
                          <Field
                            name={`friends.${index}.email`}
                            placeholder='jane@acme.com'
                            type='email'
                          />
                          <ErrorMessage
                            name={`friends.${index}.name`}
                            component='div'
                            className='field-error'
                          />
                        </div>
                        <div className='col'>
                          <button type='button' className='secondary' onClick={() => remove(index)}>
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type='button'
                    className='secondary'
                    onClick={() => push({ name: '', email: '' })}
                  >
                    Add Friend
                  </button>
                </div>
              )}
            </FieldArray>
            <button type='submit'>Invite</button>
          </Form>
        )}
      </Formik>
      <Divider />
      <Divider />
      <Divider />
      <Divider />

      <h1>Invite friends(자동 제출 오류)</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 400));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form id='form'>
            <FieldArray name='friends'>
              {({ push, remove }) => (
                <div id='row'>
                  {/* push는 내부 함수이므로 이 안에서 정의되어야함 */}
                  <button
                    onClick={() => {
                      push({ name: '', email: '' });
                    }}
                  >
                    Add Friend
                  </button>

                  {values.friends.length > 0 &&
                    values.friends.map((friend, index) => (
                      <div className='row' key={index}>
                        <div className='col'>
                          <label htmlFor={`friends.${index}.name`}>Name</label>
                          <Field
                            name={`friends.${index}.name`}
                            placeholder='Jane Doe'
                            type='text'
                          />
                          <ErrorMessage
                            name={`friends.${index}.name`}
                            component='div'
                            className='field-error'
                          />
                        </div>
                        <div className='col'>
                          <label htmlFor={`friends.${index}.email`}>Email</label>
                          <Field
                            name={`friends.${index}.email`}
                            placeholder='jane@acme.com'
                            type='email'
                          />
                          <ErrorMessage
                            name={`friends.${index}.name`}
                            component='div'
                            className='field-error'
                          />
                        </div>
                        <div className='col'>
                          <button
                            type='button'
                            className='secondary'
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </FieldArray>{' '}
            <button type='submit'>Invite</button>
          </Form>
        )}
      </Formik>

      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />

      <Typography>{'아래는 원본'}</Typography>
      <Link href={`https://formik.org/docs/api/fieldarray`}>
        <Typography>{`https://formik.org/docs/api/fieldarray`}</Typography>
      </Link>

      <Formik
        initialValues={{ friends: ['jared', 'ian', 'brent'] }}
        onSubmit={(values) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name='friends'>
              {(arrayHelpers) => {
                return (
                  <div>
                    {values.friends && values.friends.length > 0 ? (
                      values.friends.map((friend, index) => (
                        <div key={index}>
                          <Field name={`friends.${index}`} />
                          <button
                            type='button'
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            -
                          </button>
                          <button
                            type='button'
                            onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                      <button type='button' onClick={() => arrayHelpers.push('')}>
                        {/* show this when user has removed all friends from the list */}
                        Add a friend
                      </button>
                    )}
                    <div>
                      <button type='submit'>Submit</button>
                    </div>
                  </div>
                );
              }}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

// export const getServerSideProps: GetServerSideProps<FormikPageProps> = async ({ req, res }) => {
//  return { props: {} };
// };

// type Paths = (
//   | string
//   | {
//       params: ParsedUrlQuery;
//       locale?: string | undefined;
//     }
// )[];

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths: Paths = [];
//   return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps<FormikPageProps> = async () => {
//   return { props: {} };
// };
