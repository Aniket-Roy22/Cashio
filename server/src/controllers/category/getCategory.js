import prisma from "../../config/prisma.js";

export async function getAllCategories(req, res)
{
	try
	{
		const categories = await prisma.categories.findMany({
			where: {
				user_id: req.user.id,
			},
			include: {
				expenses: true,
			},
			orderBy: {
				name: "asc",
			},
		});

		const formattedCategories = categories.map((category) => {
			const utilized = category.expenses.reduce(
				(sum, expense) => sum + expense.amount,
				0,
			);

			return {
				id: category.id,
				name: category.name,
				limitAmount: category.limit_amount,
				utilized,
				remaining: category.limit_amount - utilized,
			};
		});

		return res.status(200).json({
			success: true,
			message: "CATEGORY_FETCH_SUCCESS",
			data: formattedCategories,
		});
	}
	catch (error)
	{
		console.error(error);

		return res.status(500).json({
			success: false,
			message: "CATEGORY_FETCH_FAIL",
			data: null,
		});
	}
};

export async function getCategoryById(req, res)
{
	try
	{
		const {id} = req.params;
		const category = await prisma.categories.findFirst({
			where: {
				id,
				user_id: req.user.id,
			},
			include: {
				expenses: {
					orderBy: {
						created_at: "desc",
					},
				},
			},
		});

		if (!category)
		{
			return res.status(404).json({
				success: false,
				message: "CATEGORY_NOT_FOUND",
				data: null,
			});
		}

		const utilized = category.expenses.reduce(
			(sum, expense) => sum + expense.amount,
			0,
		);

		const formattedCategory = {
			id: category.id,
			name: category.name,
			limitAmount: category.limit_amount,
			utilized,
			remaining: category.limit_amount - utilized,
			expenses: category.expenses,
		};

		return res.status(200).json({
			success: true,
			message: "CATEGORY_FETCH_SUCCESS",
			data: formattedCategory,
		});
	}
	catch (error)
	{
		console.error(error);

		return res.status(500).json({
			success: false,
			message: "CATEGORY_FETCH_FAIL",
			data: null,
		});
	}
};