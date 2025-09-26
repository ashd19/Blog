'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm , Resolver} from 'react-hook-form';
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, Form } from '../ui/form';
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
  

    const onSubmit = ()=>{
          
    }

    return (  
        <div>
            {/* form is from the ui lib not hooks !!  */}
            <Form   {...form}> 
                <form  className='space-y-4'>
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
                    </FormItem>
                    )}
                    >
                    </FormField><FormField
                    control={form.control}
                    name = "email"
                    render = {({field})=>(
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                            <FormControl>
                                <Input placeholder='Enter your email' type='email' {...field}/>
                            </FormControl>
                    </FormItem>
                    )}
                    >
                    </FormField><FormField
                    control={form.control}
                    name = "password"
                    render = {({field})=>(
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                            <FormControl>
                                <Input placeholder='Enter your password' type='password' {...field}/>
                            </FormControl>
                    </FormItem>
                    )}
                    >
                    </FormField><FormField
                    control={form.control}
                    name = "confirmPassword"
                    render = {({field})=>(
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                            <FormControl>
                                <Input placeholder='Enter your password again' type='password' {...field}/>
                            </FormControl>
                    </FormItem>
                    )}
                    >
                    </FormField>
                    <Button  type='submit' onClick={onSubmit} className='w-full' disabled={isloading}>
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