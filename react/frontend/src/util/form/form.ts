import { useState } from "react";

export const useForm = (callback: any, initialState = {}) => {
    const [formValues, setFormValues] = useState(initialState);
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    };
}