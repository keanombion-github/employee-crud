import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  created_at: string;
  updated_at: string;
}

type EmployeeForm = {
  name: string;
  email: string;
  position: string;
};

const API = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [form, setForm] = useState<EmployeeForm>({ name: '', email: '', position: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchEmployees = async () => {
    try {
      console.log('Fetching employees...');
      const res = await API.get('/employees');
      console.log('API Response:', res.data);

      if (Array.isArray(res.data.data)) {
        setEmployees(res.data.data);
      } else {
        console.error('Invalid response format:', res.data);
        setEmployees([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (editingId) {
        response = await API.put(`/employees/${editingId}`, form);
        alert('Employee updated!');
      } else {
        response = await API.post('/employees', form);
        alert('Employee created!');
      }
      setForm({ name: '', email: '', position: '' });
      setEditingId(null);
      fetchEmployees();
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
          .join('\n');
        alert(`Validation errors:\n${errorMessages}`);
      } else {
        alert('Something went wrong!');
        console.error(error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    try {
      await API.delete(`/employees/${id}`);
      alert('Employee deleted!');
      fetchEmployees();
    } catch (error: any) {
      alert('Failed to delete.');
      console.error(error);
    }
  };

  const handleEdit = (emp: Employee) => {
    setForm({ name: emp.name, email: emp.email, position: emp.position });
    setEditingId(emp.id);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {editingId ? 'Edit Employee' : 'Add New Employee'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
        >
          {editingId ? 'Update' : 'Create'}
        </button>
      </form>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Employee List</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : employees.length === 0 ? (
        <p className="text-gray-500">No employees found.</p>
      ) : (
        <ul className="space-y-4">
          {employees.map((emp) => (
            <li key={emp.id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
              <strong className="text-xl text-gray-700">{emp.name}</strong>
              <p className="text-gray-600">{emp.email}</p>
              <p className="text-gray-600">{emp.position}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleEdit(emp)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeList;
