"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'


const loginSchema = z.object(
  {
      email : z.email('Please enter a valid email address'),
      password : z.string().min(6,'Password must be atleast 6 characters long')
  }
)

type LoginFormValues = z.infer<typeof loginSchema>


const LoginForm = () => {
  
  const[isloading , setisloading] = useState(false);

  // initialize form 
  const form = useForm<LoginFormValues>(
    {
      defaultValues:{
        email:'',
        password:'',
        
      }
    }
  )
  
  return (
    
      // {/* ... form ???? many children ...??  */}
     <div>
         <Form  {...form} >
      <form className='space-y-4'>
    <FormField 
    control = {form.control}
    name='email'
    render={({field}) =>(
      <FormItem>
          <FormLabel>
            Email
           
          </FormLabel>
              <FormControl> 
              <Input placeholder='Enter your email '  {...field}/>
              </FormControl>
          </FormItem>
    )}
    /> <FormField 
    control = {form.control}
    name='password'
    render={({field}) =>(
      <FormItem>
          <FormLabel>
            Password
          </FormLabel>
        <FormControl> 
      <Input placeholder='Enter your password ' type='password'  {...field}/>
        </FormControl>
          </FormItem>
    )}
    />
     <Button  type='submit' className='w-full' disabled={isloading}>
                       {
                        isloading ? "Logging in " : "Log in "
                       }
                        </Button>
    </form>

  </Form>
     </div>


  )
}
export default LoginForm