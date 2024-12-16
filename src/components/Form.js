import { Formik, Form as FormikForm, Field, ErrorMessage, useFormikContext } from 'formik'
import { object, string, ref } from 'yup'
import Button from '@/components/Button.js'
import '@/app/globals.css'

export function Form({children, sendToParent, initialValues, validationSchema, submitButton}) {
    const formikFormStyle = "bg-white p-8 rounded-lg shadow-md max-w-md mx-auto mr-4 ml-4"
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={sendToParent}>
            <FormikForm className={formikFormStyle}> 
                {children}
                <Button type="submit">{submitButton}</Button>
            </FormikForm>
        </Formik>
    )
}


export function FormRow({name, label}) {
    const fieldStyle = "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    const labelStyle = "block mb-2 font-medium"
    const errorMsgStyle = "text-red-600 text-sm mt-1"
    return (
        <div className="mb-4">
            <label className={labelStyle}>{label}</label> 
            <Field name={name} className={fieldStyle}/> 
            <ErrorMessage name={name} component="div" className={errorMsgStyle}/> 
        </div>
    )
}


export function LoginForm({sendToParent}) {
    const loginInitials = { email: '', password: '' }
    const loginSchema = object({
        email: string().required('Email is required'),
        password: string().required('Password is required')
    })
    return (
        <Form sendToParent={sendToParent} initialValues={loginInitials} validationSchema={loginSchema} submitButton='Log In'>
            <FormRow name='email' label='E-Mail'/>
            <FormRow name='password' label='Password'/>
        </Form>
    )
}


export function SigninForm({sendToParent}) {
    const i = { email: '', password: '', repeatPassword: ''}
    const s = object({
        email: string().email('Invalid email address').required('Email is required'),
        password: string().required('Password is required'),
        repeatPassword: string().oneOf([ref('password')], 'Passwords must match').required('Please repeat your password'),
    })
    return (
        <Form sendToParent={sendToParent} initialValues={i} validationSchema={s} submitButton='Register'>
            <FormRow name='email' label='Email'/>
            <FormRow name='password' label='Password'/>
            <FormRow name='repeatPassword' label='Repeat Password'/>
        </Form>
    )
}


export function ValidationForm({sendToParent}) {
    const i = {digit1: '', digit2: '', digit3: '', digit4: '', digit5: '', digit6: ''}
    const s = object({
        digit1: string().matches(/^[0-9]$/, 'Number only').required(),
        digit2: string().matches(/^[0-9]$/, 'Number only').required(),
        digit3: string().matches(/^[0-9]$/, 'Number only').required(),
        digit4: string().matches(/^[0-9]$/, 'Number only').required(),
        digit5: string().matches(/^[0-9]$/, 'Number only').required(),
        digit6: string().matches(/^[0-9]$/, 'Number only').required()
    })

    const handleSubmit = (values) => {
        const code = Object.values(values).join('')
        sendToParent({ code })
    }

    return (
        <Form sendToParent={handleSubmit} initialValues={i} validationSchema={s} submitButton='Validate Email'>
            <div className="flex space-x-2 justify-center">
                {[1,2,3,4,5,6].map((num) => (
                    <CodeInput key={num} name={`digit${num}`} />
                ))}
            </div>
        </Form>
    )
}


function CodeInput({name}) {
    const { setFieldValue } = useFormikContext()

    const handlePaste = (e) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData('text')
        const digits = pasted.match(/\d/g)
        
        if (digits && digits.length >= 6) {
            // Fill all inputs with pasted digits
            for (let i = 1; i <= 6; i++) {
                setFieldValue(`digit${i}`, digits[i-1])
            }
        }
    }

    const handleChange = (e) => {
        const value = e.target.value
        if (value.match(/[^0-9]/)) return
        setFieldValue(name, value)
        // Auto-focus next input
        const current = parseInt(name.replace('digit', ''))
        const nextInput = document.querySelector(`input[name=digit${current + 1}]`)
        if (value && nextInput) nextInput.focus()
    }

    const style = "w-12 h-12 text-center text-xl border rounded-md"
    return (<Field name={name} className={style} maxLength="1" onChange={handleChange} onPaste={name === 'digit1' ? handlePaste : undefined}/>)
}

