import api from "../config/api";

export async function getAllCategories()
{
	return api.get("/categories");
}

export async function getCategoryById(id)
{
	return api.get(`/categories/${id}`);
}

export async function createCategory(data)
{
	return api.post("/categories", data);
}

export async function updateCategory(id, data)
{
	return api.patch(`/categories/${id}`, data);
}

export async function deleteCategory(id)
{
	return api.delete(`/categories/${id}`);
}

export async function resetCategory(id)
{
	return api.delete(`/categories/${id}/reset`);
}