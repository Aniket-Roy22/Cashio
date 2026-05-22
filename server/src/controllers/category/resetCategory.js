import prisma from "../../config/prisma.js";

export async function resetCategory(req, res)
{
	try
	{
		const {id} = req.params;
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

		await prisma.expenses.deleteMany({
			where: {
				category_id: id,
			},
		});

		return res.status(200).json({
			success: true,
			message: "CATEGORY_RESET_SUCCESS",
			data: null,
		});
	}
	catch (error)
	{
		console.error(error);

		return res.status(500).json({
			success: false,
			message: "CATEGORY_RESET_FAIL",
			data: null,
		});
	}
};