"use client"
import { FaStar } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import Link from "next/link";
import axios from "axios";
import { getCookies } from "@/features/cookies";
import { useRouter } from "next/navigation"

export const Review = ({eventId}: any) => {
    const router = useRouter()

    const reviewSchema = Yup.object().shape({
        comment: Yup.string()
            .min(1, 'Comment Must be 1 Character(s)')
            .required('Comment is Required'),
        rating: Yup.string()
            .required('Rating is Required')
    })

    const {mutate} = useMutation({
        mutationFn: async({eventId, comment, rating}: any) => {
            const {value}: any = await getCookies();
            await axios.post(`http://localhost:8000/events/review`, {
                eventId, comment, rating,
            }, {
                headers: {
                    Authorization: value
                }
            })
        },
        onSuccess: () => {
            alert('Review Success')
            router.refresh()
        },
        onError: (error) => {
            alert(error.message)
        }
    })

    return(
        <>
            <Formik
                initialValues={{
                    comment: '', rating: 0
                }}
                validationSchema={reviewSchema}
                onSubmit={async(values) => {
                    const {comment, rating} = values

                    await mutate({eventId, comment, rating})
                }}
            >
                <Form>
                <div>
                    <h1 className="text-lg pl-4">Write your review of the event:</h1>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Comment</span>
                            </div>
                            <Field
                            name="comment"
                            type="text"
                            >{({field}: any) => (
                                <textarea {...field} className="textarea textarea-bordered textarea-md w-[600px]" placeholder="Write your comment here..."></textarea>
                            )}
                            </Field>
                            <ErrorMessage name="comment"/>
                            <div className="label">
                                <span className="label-text">Rate this event!</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="">
                                    <FaStar className="text-yellow-400 text-3xl"/>
                                </div>
                                <label className="form-control w-[50px] pt-1">
                                    <Field
                                    as="select"
                                    name="rating"
                                    >{({field}: any) => (
                                        <select {...field} className="select select-bordered select-xs">
                                            <option disabled selected></option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </select>  
                                    )}
                                    </Field>
                                    <ErrorMessage name="rating"/>
                                </label>
                            </div>
                        </label>
                        <div className="flex justify-center mb-4">
                            <button type="submit" className="btn btn-primary w-[300px]">Submit</button>
                        </div>
                    </div>
                </div>
                </Form>
            </Formik>
        </>
    )
}