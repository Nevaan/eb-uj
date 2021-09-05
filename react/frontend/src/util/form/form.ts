import { useState } from "react";

export const useForm = <T>(callback: any, initialState: T) => {
    const [formValues, setFormValues] = useState(initialState);
    
    const onChange = (event: React.ChangeEvent<any>) => {
        setFormValues({ ...formValues, [event.target.name]: 
    event.target.value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await callback();
    };
    
    return {
        onChange,
        onSubmit,
        formValues,
        setFormValues
    };
}