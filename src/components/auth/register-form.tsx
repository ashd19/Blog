'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm , Resolver} from 'react-hook-form';
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, Form, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { password } from 'bun';
import { Island_Moments } from 'next/font/google';

const registrationSchema = z.object({
        name:z.string().min(3,'Name must be greater than 3 lettters '),
        email : z.email('Enter a valid email address '),
        password : z.string().min(8,'Password must be atleast of 8 letters'),
        confirmPassword : z.string().min(8,'Password must be atleast of 8 letters'),
       } ).refine(data => data.password === data.confirmPassword ,{
        message:'Passwords do not match ',
        path:['confirmPassword']
       })
 

        type RegisterFormValues = z.infer<typeof registrationSchema>


function RegisterForm() {
    const [isloading , setisLoading] = useState(false);
    
    
    const form = useForm<RegisterFormValues>(
    {resolver :  zodResolver(registrationSchema),
    defaultValues: {
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    }

}
    )
  
  const onSubmit = async(values : RegisterFormValues) => {
    setisLoading(true)
    console.log(values)
    try{
      console.log(values);
    }
    catch(e){
       
    }

  }

    return (  
        <div>
            {/* form is from the ui lib not hooks !!  */}
            <Form   {...form}> 
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'>
                    <FormField
                    control={form.control}
                    name = "name"
                    render = {({field})=>(
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                            <FormControl>
                                <Input placeholder='Enter your name' {...field}/>
                            </FormControl>
                            <FormMessage/>
                    </FormItem>
                    )}
                    >
                    </FormField><FormField
                    control={form.control}
                    name = "email"
                    render = {({field})=>(
                    <FormItem>
                        <FormLabel>
                            email
                        </FormLabel>
                            <FormControl>
                                <Input placeholder='Enter your email' type='email' {...field}/>
                            </FormControl>
                            <FormMessage/>
                    </FormItem>
                    )}
                    >
                    </FormField><FormField
                    control={form.control}
                    name = "password"
                    render = {({field})=>(
                    <FormItem>
                        <FormLabel>
                            Password
                        </FormLabel>
                            <FormControl>
                                <Input placeholder='Enter your password' type='password' {...field}/>
                            </FormControl>
                            <FormMessage/>
                    </FormItem>
                    )}
                    >
                    </FormField><FormField
                    control={form.control}
                    name = "confirmPassword"
                    render = {({field})=>(
                    <FormItem>
                        <FormLabel>
                            Confirm Password 
                        </FormLabel>
                            <FormControl>
                                <Input placeholder='Enter your password again' type='password' {...field}/>
                            </FormControl>
                            <FormMessage/>
                    </FormItem>
                    )}
                    >
                    </FormField>
                    <Button  type='submit' className='w-full' disabled={isloading}>
                   {
                    isloading ? "Creating Account" : "Create Account"
                   }
                    </Button>
                </form>
            </Form>



        </div>
    );
}

export default RegisterForm;