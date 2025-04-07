<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;

class EmployeeController extends Controller
{
    public function index()
    {
        try {
            $employees = Employee::all()->toArray();
            Log::info('Retrieved employees:', ['count' => count($employees), 'data' => $employees]);
            return response()->json([
                'status' => 'success',
                'data' => $employees
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching employees:', ['error' => $e->getMessage()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch employees'
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:employees',
                'position' => 'required|string|max:255',
            ]);

            $employee = Employee::create($validated);
            Log::info('Created new employee:', ['id' => $employee->id, 'data' => $employee->toArray()]);
            
            return response()->json([
                'status' => 'success',
                'data' => $employee
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating employee:', ['error' => $e->getMessage()]);
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 422);
        }
    }

    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('employees')->ignore($employee->id)],
            'position' => 'required|string|max:255',
        ]);

        $employee->update($validated);
        Log::info('Updated employee:', ['id' => $employee->id]);
        return response()->json([
            'status' => 'success',
            'data' => $employee
        ]);
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        Log::info('Deleted employee:', ['id' => $employee->id]);
        return response()->json([
            'status' => 'success',
            'message' => 'Employee deleted successfully'
        ]);
    }
} 