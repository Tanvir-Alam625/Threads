import * as z from "zod"

const validateName = (value: string): string => {
    const invalidValues = ['null', 'NaN', 'undefined', 'null null', 'NaN NaN', 'undefined undefined'];
    if (invalidValues.includes(value.trim().toLocaleLowerCase())) {
        const error = z.ZodError.create([
            { path: ['name'], code: 'invalid_string', message: `Invalid name "${value}"` }
        ]);
        throw error;
    }
    return value;
};


export const userValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3).max(30).refine(validateName),
    username: z.string().min(3).max(30),
    bio: z.string().min(50).max(1000)
});