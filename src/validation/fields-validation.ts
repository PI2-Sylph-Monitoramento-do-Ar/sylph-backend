type ValidationResponse = {
    valid: boolean 
    message?: string
}

type ValidationInfo = {
    requiredFields: string[]
    fields: string[]
}

export const validateFields = (data: ValidationInfo): ValidationResponse => {
    const { fields, requiredFields } = data

    if(fields.length === 0){
        return {
            valid: false, 
            message: "No field was provided"
        }
    }

    for(const field of requiredFields){
        if(!fields.includes(field)){
            return {
                valid: false, 
                message: "Field is missing: " + field
            }
        }
    }

    return { valid: true }
}