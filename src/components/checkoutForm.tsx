'use client';

import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSpinner } from '@fortawesome/free-solid-svg-icons'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from './ui/textarea'
// import { Label } from './ui/label'

interface CheckoutFormProps {
  onFormSubmit: (formData: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    referEmail?: string;
    message?: string;
  }) => void;
}

export interface CheckoutFormRef {
  validateForm: () => boolean;
  getFormData: () => {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    referEmail?: string;
    message?: string;
  };
}

const CheckoutField = forwardRef<CheckoutFormRef, CheckoutFormProps>(({ onFormSubmit }, ref) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    referEmail: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load user details from sessionStorage if they exist
  useEffect(() => {
    const userDetails = sessionStorage.getItem('userDetails');
    if (userDetails) {
      const { firstName, lastName, userName, emailId } = JSON.parse(userDetails);
      setFormData(prev => ({
        ...prev,
        firstName: firstName || '',
        lastName: lastName || '',
        username: userName || '',
        email: emailId || ''
      }));
    }
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.referEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.referEmail)) {
      newErrors.referEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    validateForm,
    getFormData: () => formData
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onFormSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 [&_input]:h-10 [&_input]:text-[15px] [&_input]:rounded [&_textarea]:text-[15px] [&_textarea]:rounded [&_textarea]:h-32 [&_input]:border-[#e5e7eb] [&_textarea]:border-[#e5e7eb] [&_textarea]:text-[#555] [&_input]:text-[#555]'>
      <div className='flex sm:flex-row flex-col items-center w-full sm:gap-x-3 max-sm:gap-y-3 [&>div]:w-full'>
        <div>
          <Input
            type='text'
            name='firstName'
            placeholder='First Name'
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <Input
            type='text'
            name='lastName'
            placeholder='Last Name'
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>
      {/* <div>
        <Input
          type='text'
          name='username'
          placeholder='User Name'
          value={formData.username}
          onChange={handleChange}
          className={errors.username ? 'border-red-500' : ''}
        />
        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
      </div> */}
      <div className='flex sm:flex-row flex-col items-center w-full sm:gap-x-3 max-sm:gap-y-3 [&>div]:w-full'>
        <div>
          <Input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        {/* <div>
          <Input
            type='email'
            name='referEmail'
            placeholder='Refer Email'
            value={formData.referEmail}
            onChange={handleChange}
            className={errors.referEmail ? 'border-red-500' : ''}
          />
          {errors.referEmail && <p className="text-red-500 text-sm mt-1">{errors.referEmail}</p>}
        </div> */}
      </div>
      <div>
        <Textarea
          name='message'
          placeholder="Type your message here."
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      {/* <Button
        type="submit"
        className='w-fit md:ml-0 mx-auto block h-11 text-base bg-[#333] text-white hover:text-[#333] border border-transparent hover:border hover:border-[#333] shadow-none rounded'
      >
        Proceed to Checkout
      </Button> */}
    </form>
  )
});

CheckoutField.displayName = 'CheckoutField';

export default CheckoutField
