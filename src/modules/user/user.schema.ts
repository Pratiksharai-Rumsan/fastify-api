import {z} from 'zod'
const createUserSchema = z.object({
    email: z.string({
        required_error: 'Email is requied',
        invalid_type_error:'Email must be string'
    }).email(),
    name: z.string(),
    password:z.string({
        required_error: 'Password is requied',
        invalid_type_error:'Password must be string'
    })
    
})

export type CreateUserInput = z.infer<typeof createUserSchema>