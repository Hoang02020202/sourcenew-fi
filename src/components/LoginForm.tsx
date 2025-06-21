import useFormValidation from '@hooks/useFormValidation';
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

type FieldName = 'emailOrPhone' | 'password';

type ContextType = {
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	emailInputRef: React.RefObject<HTMLInputElement>;
	passwordInputRef: React.RefObject<HTMLInputElement>;
};

const LoginForm: React.FC = () => {
	const [formData, setFormData] = useState<{
		emailOrPhone: string;
		password: string;
	}>({
		emailOrPhone: '',
		password: '',
	});
	const { errors, validateInput } = useFormValidation();
	const { setEmail, setPassword, emailInputRef, passwordInputRef } =
		useOutletContext<ContextType>();

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		field: FieldName,
	) => {
		const value = event.target.value;
		setFormData((prevData) => ({
			...prevData,
			[field]: value,
		}));
		if (field === 'emailOrPhone') {
			setEmail(value);
		} else if (field === 'password') {
			setPassword(value);
		}
		validateInput(field, value);
	};

	const handleChange =
		(field: FieldName) => (event: React.ChangeEvent<HTMLInputElement>) => {
			handleInputChange(event, field);
		};

	return (
		<div className='my-5'>
			<input
				ref={emailInputRef}
				className='my-2 w-full rounded-lg border border-gray-300 p-4 focus:border-blue-500 focus:outline-none'
				type='text'
				placeholder='Email'
				value={formData.emailOrPhone}
				onChange={handleChange('emailOrPhone')}
				onBlur={() => validateInput('emailOrPhone', formData.emailOrPhone)}
			/>
			{errors.emailOrPhone && <p className='text-red-500'>{errors.emailOrPhone}</p>}

			<input
				ref={passwordInputRef}
				className='my-2 w-full rounded-lg border border-gray-300 p-4 focus:border-blue-500 focus:outline-none'
				type='password'
				placeholder='Password'
				value={formData.password}
				onChange={handleChange('password')}
				onBlur={() => validateInput('password', formData.password)}
			/>
			{errors.password && (
				<p className='text-red-500'>{errors.password}</p>
			)}
		</div>
	);
};

export default LoginForm;
