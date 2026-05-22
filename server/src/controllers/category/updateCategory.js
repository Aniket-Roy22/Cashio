import prisma from "../../config/prisma.js";

export async function updateCategory(req, res)
{
	try
	{
		const {id} = req.params;
		const {name, limit_amount} = req.body;
		const existingCategory = await prisma.categories.findFirst({
			where: {
				id,
				user_id: req.user.id,
			},
		});

		if (!existingCategory)
		{
			return res.status(404).json({
				success: false,
				message: "CATEGORY_NOT_FOUND",
				data: null,
			});
		}

		const updatedCategory = await prisma.categories.update({
			where: {
				id,
			},
			data: {
				...(name && {name}),
				...(limit_amount !== undefined && {
					limit_amount: Number(limit_amount),
				}),
			},
		});

		return res.status(200).json({
			success: true,
			message: "CATEGORY_UPDATE_SUCCESS",
			data: updatedCategory,
		});
	}
	catch (error)
	{
		console.error(error);

		return res.status(500).json({
			success: false,
			message: "CATEGORY_UPDATE_FAIL",
			data: null,
		});
	}
};