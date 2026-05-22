import prisma from "../../config/prisma.js";

export async function deleteCategory(req, res)
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

		await prisma.categories.delete({
			where: {
				id,
			},
		});

		return res.status(200).json({
			success: true,
			message: "CATEGORY_DELETED",
			data: null,
		});
	}
	catch (error)
	{
		console.error(error);

		return res.status(500).json({
			success: false,
			message: "CATEGORY_DELETE_FAIL",
			data: null,
		});
	}
};