import api from "../config/api";

export async function getExpenses(category_id)
{
	return api.get(`/categories/${category_id}/expenses`);
}

export async function getExpenseById(category_id, expense_id)
{
	return api.get(`/categories/${category_id}/expenses/${expense_id}`);
}

export async function createExpense(category_id, data)
{
	return api.post(`/categories/${category_id}/expenses`, data);
}

export async function updateExpense(category_id, expense_id, data)
{
	return api.patch(`/categories/${category_id}/expenses/${expense_id}`, data);
}

export async function deleteExpense(category_id, expense_id)
{
	return api.delete(`/categories/${category_id}/expenses/${expense_id}`);
}