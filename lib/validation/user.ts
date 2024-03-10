import * as z from "zod";

const validateName = (value: string): string | undefined => {
    const namePattern = /^(null|NaN|Name|name|nan|undefined|null null|NaN NaN|undefined undefined|Null|true|false|True|False|TRUE|FALSE|True|False|object|array|function|Infinity|-Infinity|Infinity Infinity|-Infinity -Infinity|-Infinity NaN|NaN -Infinity|Infinity -Infinity|-Infinity -Infinity -Infinity|Infinity -Infinity -Infinity NaN|NaN -Infinity -Infinity NaN|Infinity -Infinity -Infinity NaN NaN|NaN -Infinity -Infinity NaN NaN NaN|Infinity -Infinity -Infinity NaN NaN NaN NaN|null null null null null|undefined undefined undefined undefined undefined|Null Null Null Null Null|true true true true true|false false false false false|True True True True True|False False False False False|NaN NaN NaN NaN NaN)$/;
    if (namePattern.test(value.trim())) {
        const error: z.ZodError = new z.ZodError([
            {
                path: ['name'],
                code: 'invalid_string',
                message: `Invalid name "${value}"`,
                validation: "regex"
            }
        ]);
        throw error;
    }
    return value;
};

export const userValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3).max(30).refine(validateName),
    username: z.string().min(3).max(30),
    bio: z.string().min(10).max(1000)
});
