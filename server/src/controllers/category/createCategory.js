import prisma from "../../config/prisma.js";

export async function createCategory(req, res)
{
	try
	{
		const {name, limitAmount} = req.body;

		if (!name || limitAmount === undefined)
		{
			return res.status(400).json({
				success: false,
				message: "MISSING_FIELDS",
				data: null,
			});
		}

		const category = await prisma.categories.create({
			data: {
				name,
				limit_amount: Number(limitAmount),
				user_id: req.user.id,
			},
		});

		return res.status(201).json({
			success: true,
			message: "CATEGORY_CREATED_SUCCESSFULLY",
			data: category,
		});
	}
	catch (error)
	{
		console.error(error);

		return res.status(500).json({
			success: false,
			message: "CATEGORY_CREATION_FAILED",
			data: null,
		});
	}
};