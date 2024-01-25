'use client';
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Register() {

  const router = useRouter();

  const registerSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, 'Username Must be 6 Characters')
        .required('Username is Required')
    , 
    email: Yup.string()
        .email('Invalid Email Address')
        .required('Email is Required')
    , 
    password: Yup.string()
        .min(6, 'Password Must be 6 Characters')
        .max(12, 'Password Maximum 12 Characters')
        .required('Password is Required')
    ,
    firstname: Yup.string()
        .min(2, 'Firstname Must be 2 Characters')
        .required('Firstname is Required')
    ,
    lastname: Yup.string()
        .min(2, 'Lastname Must be 2 Characters')
        .required('Lastname is Required')
  })

  const {mutate, isSuccess} = useMutation({
    mutationFn: async({username, email, firstname, lastname, password, role, referral}: any) => {
            await axios.post('http://localhost:8000/users/register', {
                username, email, firstname, lastname, password, role, referral
            })
        },
    onSuccess: () => {
       alert('Register Successful! Redirecting to login...')
       router.push('/login')
    },
    onError: (error) => {
        alert(error.message)
    }
  })
    return (
      <>
      <Formik
        initialValues={{username: '', email: '', password: '', firstname: '', lastname: '', role: 'User', referral: ''}}
        validationSchema={registerSchema}
        onSubmit={async(values) => {
          const {username, email, firstname, lastname, password, role, referral} = values

          await mutate({username, email, firstname, lastname, password, role, referral})
        }}
      >
        <Form>
          <div className="py-[160px] flex items-center justify-center">
            <div className="card w-auto border shadow-2xl h-auto rounded-md px-10 py-14">
                <div className="text-4xl mb-10">
                Register
                </div>

              <div className="md:flex gap-5">
                <div>
                  <div>
                      <div className="text-lg">
                        Email
                      </div>
                      <div>
                          <Field 
                            name="email"
                            type="email"
                          >
                            {({field}: any) => (
                                <input {...field} type="text" placeholder="Input Email" className="rounded-md border border-black mb-5 pl-2 w-[320px] h-8"/>
                            )}
                          </Field>
                          <ErrorMessage 
                            name="email"
                          />
                      </div>
                    </div>
                    <div>
                      <div className="text-lg">
                        Username
                      </div>
                      <div>
                        <Field
                          name="username"
                          type="text"
                        >
                          {({field}: any) => (
                            <input {...field} type="text" placeholder="Input Username" className="rounded-md border border-black pl-2 mb-5 w-[320px] h-8"/>

                          )}
                        </Field>
                        <ErrorMessage
                          name="username"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-lg">
                        Password
                      </div>
                      <div>
                          <Field
                            name="password"
                            type="password"
                          >
                            {({field}: any) => (
                              <input {...field} type="password" placeholder="Input Password" className="rounded-md border border-black pl-2 mb-5 w-[320px] h-8"/>
                            )}
                          </Field>
                          <ErrorMessage
                            name="password"
                          />
                      </div>
                    </div>
                  </div>
                    <div>
                    <div>
                      <div className="text-lg">
                        First Name
                      </div>
                      <div>
                        <Field
                          name="firstname"
                          type="text"
                        >
                          {({field}: any) => (
                            <input {...field} type="text" placeholder="Input First Name" className="rounded-md border border-black pl-2 mb-5 w-[320px] h-8"/>
                          )}
                        </Field>
                        <ErrorMessage
                          name="firstname"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-lg">
                        Last Name
                      </div>
                      <div>
                        <Field
                          name="lastname"
                          type="text"
                        >
                          {({field}: any) => (
                            <input {...field} type="text" placeholder="Input Last Name" className="rounded-md border border-black pl-2 mb-5 w-[320px] h-8"/>
                          )}
                        </Field>
                        <ErrorMessage
                          name="lastname"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-lg">
                        Role
                      </div>
                      <div>
                        <Field
                          as="select"
                          name="role"
                        >
                          {({field}: any) => (
                            <select {...field} className="rounded-md border border-black pl-2 w-[320px] h-8">
                                <option value="User">User</option>
                                <option value="Organizer">Organizer</option>
                            </select>
                          )}
                        </Field>
                      </div>
                    </div>
                  </div>
              </div>
                <div className="flex items-center justify-center mt-5">
                    <button type="submit" className="bg-gray-300 hover:bg-gray-400 rounded-md w-[320px] h-8">Register</button>
                </div>
            </div>
          </div>
        </Form>
      </Formik>
      </>
    );
  }