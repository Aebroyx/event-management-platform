"use client"
import { FaStar } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import Link from "next/link";
import axios from "axios";
import { getCookies } from "@/features/cookies";
import { useRouter } from "next/navigation"

export const PurchaseTix = ({eventId}: any) => {
    const router = useRouter()

    const purchaseSchema = Yup.object().shape({
        quantity: Yup.number().required(),
    })

    const {mutate} = useMutation({
        mutationFn: async({eventId, promotionCode, quantity, usePoints}: any) => {
            const {value}: any = await getCookies();
            await axios.post(`http://localhost:8000/tickets/purchase`, {
                eventId, promotionCode, quantity, usePoints
            }, {
                headers: {
                    Authorization: value
                }
            })
        },
        onSuccess: () => {
            alert('Ticket Success')
            router.push('/profile')
        },
        onError: (error) => {
            alert(error.message)
        }
    })

    return(
        <>
            <Formik
                initialValues={{
                    eventId: '', promotionCode: '', quantity: 1, usePoints: false
                }}
                validationSchema={purchaseSchema}
                onSubmit={async(values) => {
                    const {eventId, promotionCode, quantity, usePoints} = values

                    await mutate({eventId, promotionCode: null, quantity, usePoints: false})
                }}
            >
                <Form>
                    <div className="">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Quantity</span>
                            </label>
                            <Field
                                type="number"
                                name="quantity"
                                className="input input-bordered w-full max-w-xs"
                            />
                            <div className="pt-4">
                                <button type="submit" className='btn btn-primary'>Buy Ticket(s)</button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}