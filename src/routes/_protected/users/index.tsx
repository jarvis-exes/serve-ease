import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import { useCreateKitchenUser } from './-query-hooks';

function Users() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const {mutateAsync: createKitchenUser, isPending} = useCreateKitchenUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    createKitchenUser(payload);
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Kitchen Account</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600 ml-1">Full Name</label>
          <input
            required
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Enter name"
            className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-orange focus:outline-none transition-colors"
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
          <input
            required
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="john@example.com"
            className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-orange focus:outline-none transition-colors"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600 ml-1">Password</label>
          <input
            required
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="••••••••"
            className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-orange focus:outline-none transition-colors"
          />
        </div>

        {/* Create Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="mt-2 w-full bg-orange text-white font-bold py-3 rounded-xl hover:bg-orange/80 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Creating...' : 'Create Account'}
        </Button>
      </form>
    </Card>
  );
}

export const Route = createFileRoute('/_protected/users/')({
  component: Users,
})
