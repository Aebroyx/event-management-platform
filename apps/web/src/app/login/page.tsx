"use client"
import { useRef } from "react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import Link from "next/link";
import axios from "axios"
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';



// Redux
import { setUser } from "@/redux/slice/userSlice"
import { useDispatch } from "react-redux"

// Cookies
import { setCookies } from "@/features/cookies"

export default function Login() {

    const loginSchema = Yup.object().shape({
        usernameOrEmail: Yup.string()
            .min(6, 'Username Must be 6 Characters')
            .required('Please enter username or email!')
        ,
        password: Yup.string()
            .min(6, 'Password Must be 6 Characters')
            .max(12, 'Password Maximum 12 Characters')
            .required('Password is Required')
    })

    const router = useRouter()
    const dispatch = useDispatch()

    const {mutate} = useMutation({
        mutationFn: async({usernameOrEmail, password}: any) => {
                const res = await axios.post('http://localhost:8000/users/login', {
                    usernameOrEmail, password
                })
                return res
            },
        onSuccess: (data) => {
           alert('Login Success')
           console.log(data)
           dispatch(setUser(data.data.data.username))
           setCookies(data.data.data.token)

           setTimeout(() => {
               router.push('/')
           }, 1000)
        },
        onError: (error) => {
            alert(error.message)
        }
    })

    return (
      <>
        <Formik 
                initialValues={{usernameOrEmail: '', password: ''}}
                validationSchema={loginSchema}
                onSubmit={async(values) => {
                    const {usernameOrEmail, password} = values

                    await mutate({usernameOrEmail, password})
                }}
            >
            <Form>
                <div className="py-48 flex items-center justify-center">
                    <div className="card w-auto border shadow-2xl h-auto rounded-md px-14 py-20">
                        <div className="text-4xl mb-10">
                        Sign In
                        </div>
                        <div>
                            <div className="text-lg">
                                Email or Username
                            </div>
                            <div>
                                <Field
                                    name="usernameOrEmail"
                                    type="text"
                                >{({field}: any) => (
                                    <input {...field} type="text" placeholder="Input Username or Email" className="rounded-md border border-black pl-2 w-[320px] h-8 mb-3"/>
                                )}
                                </Field>
                                <ErrorMessage
                                    name="usernameOrEmail"
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
                                >{({field}: any) => (
                                    <input {...field} type="password" placeholder="Input Password" className="rounded-md border border-black pl-2 w-[320px] h-8"/>
                                )}
                                </Field>
                                <ErrorMessage
                                    name="password"
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="bg-gray-300 hover:bg-gray-400 rounded-md w-[320px] h-10 w-72 flex items-center justify-center my-3"> Sign In</button>
                        </div>
                        <div className="flex">
                            <div className="mr-1">
                                Already have an account? 
                            </div>
                            <Link href="/register">
                                <div className="hover:text-gray-500">
                                    Create Account
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
      </>
    );
  }