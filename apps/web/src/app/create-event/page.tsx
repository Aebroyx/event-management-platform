'use client';
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCookies } from "@/features/cookies";
import { MultiSelect } from "react-multi-select-component";


export default function CreateEvent() {

  const router = useRouter();

  const [file,setFiles] = useState([])
  const onSetFile = (event: any) => {
      const arrFiles: any = [...event.target.files]
      if(arrFiles.length > 3 || arrFiles.length === 0 ) return alert ('Max 3 Images Only!')

      arrFiles.forEach((item: any) => {
          if(item.type.split('/')[0] !== 'image') return alert(`${item.name} is not an image`)
          if(item.size >500000) return alert(`${item.name} Size too Large. Maximum Size 5Byte`)
      })
      setFiles(arrFiles)
  }

  const registerSchema = Yup.object().shape({
    name: Yup.string()
        .min(6, 'Name Must be atleast 6 Characters')
        .required('Name is Required')
    , 
    description: Yup.string()
        .min(6, 'Description Must be atleast 6 Characters')
        .required('Email is Required')
    , 
    location: Yup.string()
        .min(6, 'Location Must be atleast 6 Characters')
        .required('Location is Required')
    ,
    startDate: Yup.string()
        .required('First Date is Required')
    ,
    endDate: Yup.string()
        .required('End Date is Required')
    ,
    price: Yup.string()
        .required('Price is Required')
    ,
    isFree: Yup.string()
        .required('isFree is Required')
    ,
    stock: Yup.string()
        .required('stock is Required')
  })

    const {mutate} = useMutation({
        mutationFn: async ({name, description, location, startDate, endDate, price, isFree, stock, categories}: any) => {
            const formData = new FormData()
            formData.append('data', JSON.stringify({name, description, location, startDate, endDate, price, isFree, stock, categories}))

            file.forEach(item => {
                formData.append('uploadImg', item)
            })

            const { value }: any = await getCookies()

            await axios.post('http://localhost:8000/events/create', formData, {
                headers: {
                    Authorization: value
                }
            })
        },
        onSuccess: () => {
            alert('Success')
            router.push('/')
        },
        onError : (error) =>{
            alert(error)
        }
    })

    // regular fetch
    // const fetchCategory = async({id}: any) => {
    //     try {
    //         const res = await fetch(`http://localhost:8000/events/category`, {
    //             method: 'GET', cache: 'no-store'
    //         })
    //         return res.json()
    //     } catch (error) {
    //         return error
    //     }
    // }

    const response = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const { value }: any = await getCookies()
            const res = await axios.get('http://localhost:8000/events/category')
            return res
        }
    })
    const [selected, setSelected] = useState([]);

    if(response.isLoading) return(<p>Loading...</p>)
    if(response.isError) return(<p>Error...</p>)

    console.log(response)
    const category = [...response.data?.data.data]

    console.log(category)

    const options: any = []

    category.map((item : any) => {
        options.push({label: item.name, value: item.id})
    })



    return (
      <>
      <Formik
        initialValues={{name: '', description: '', location: '', startDate: '', endDate: '', price: '', isFree: 'false', stock: '', categories: '[2]'}}
        validationSchema={registerSchema}
        onSubmit={async(values) => {
            const selectedCategory = selected.map((item: any) => {
                return item.value
            })

            const {name, description, location, startDate, endDate, price, isFree, stock, categories} : any = values

            await mutate({name, description, location, startDate, endDate, price, isFree, stock, categories: selectedCategory})
        }}
      >
        <Form>
          <div className="py-[160px] flex items-center justify-center">
            <div className="card w-auto border shadow-2xl h-auto rounded-md px-10 py-14">
                <div className="text-4xl mb-10">
                    Create Event
                </div>
              <div className="md:flex gap-5">
                <div>
                    <div>
                      <div className="text-lg">
                        Event Name
                      </div>
                      <div>
                          <Field 
                            name="name"
                            type="text"
                          >
                            {({field}: any) => (
                                <input {...field} type="text" placeholder="Input Event Name" className="rounded-md border border-black mb-5 pl-2 w-[320px] h-8"/>
                            )}
                          </Field>
                          <ErrorMessage 
                            name="name"
                          />
                      </div>
                    </div>
                    <div>
                      <div className="text-lg">
                        Description
                      </div>
                      <div>
                        <Field
                          name="description"
                          type="text"
                        >
                          {({field}: any) => (
                            <textarea {...field} type="text" placeholder="Input Description" className="rounded-md border border-black pl-2 mb-5 w-[320px] h-16"/>

                          )}
                        </Field>
                        <ErrorMessage
                          name="description"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-lg">
                        Location
                      </div>
                      <div>
                          <Field
                            name="location"
                            type="text"
                          >
                            {({field}: any) => (
                              <input {...field} type="text" placeholder="Input Location" className="rounded-md border border-black pl-2 mb-5 w-[320px] h-8"/>
                            )}
                          </Field>
                          <ErrorMessage
                            name="location"
                          />
                      </div>
                    </div>
                    <div>
                    <div className="text-lg">
                        Ticket Stock
                      </div>
                      <div>
                          <Field
                            name="stock"
                            type="number"
                          >
                            {({field}: any) => (
                              <input {...field} type="number" placeholder="Input Ticket Stock" className="rounded-md border border-black pl-2 mb-5 w-[320px] h-8"/>
                            )}
                          </Field>
                          <ErrorMessage
                            name="location"
                          />
                      </div>
                    </div>
                </div>

                <div>
                    <div>
                      <div className="text-lg">
                        Start Date
                      </div>
                      <div>
                        <Field
                          name="startDate"
                          type="date"
                        >
                          {({field}: any) => (
                            <input {...field} type="date" placeholder="Input Start Date" className="rounded-md border border-black pl-2 mb-5 w-[320px] h-8"/>
                          )}
                        </Field>
                        <ErrorMessage
                          name="startDate"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-lg">
                        End Date
                      </div>
                      <div>
                        <Field
                          name="endDate"
                          type="date"
                        >
                          {({field}: any) => (
                            <input {...field} type="date" placeholder="Input End Date" className="rounded-md border border-black pl-2 mb-5 w-[320px] h-8"/>
                          )}
                        </Field>
                        <ErrorMessage
                          name="lastname"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-lg">
                        Free or Paid Event?
                      </div>
                      <div>
                        <Field
                          as="select"
                          name="isFree"
                        >
                          {({field}: any) => (
                            <select {...field} className="rounded-md border border-black pl-2 w-[320px] h-8">
                                <option value="true">Free</option>
                                <option value="false">Paid</option>
                            </select>
                          )}
                        </Field>
                      </div>
                    </div>
                    <div>
                    <div className="text-lg">
                        Price
                      </div>
                      <div>
                        <Field
                          name="price"
                          type="number"
                        >
                          {({field}: any) => (
                            <input {...field} type="number" placeholder="Input Price" className="rounded-md border border-black pl-2 mb-5 w-[320px] h-8"/>
                          )}
                        </Field>
                        <ErrorMessage
                          name="price"
                        />
                      </div>
                    </div>
                    <div>
                        <MultiSelect
                            options={options}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                        />
                    </div>
                </div>
              </div>
                <div className="flex flex-col items-center justify-center">
                    <label className="flex flex-col items-center justify-center w-[320px]">
                    <div className="flex flex-col items-center justify-center w-[320px]">
                        <span>Select Images</span>
                    </div>
                        <input
                        type ="file"
                        accept="image/*"
                        multiple
                        onChange={(event) => onSetFile(event)}
                        placeholder="Enter Event Images"
                        className="input border-2 bg-base-100 w-full" 
                        />
                    </label>
                    <button type="submit" className="bg-gray-300 hover:bg-gray-400 rounded-md w-[320px] h-8">Create Event</button>
                </div>
            </div>
          </div>
        </Form>
      </Formik>
      </>
    );
  }