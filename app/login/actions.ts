"use server";

import {
	PASSWORD_ERROR_MESSAGE,
	PASSWORD_MIN_LENGTH,
	PASSWORD_REGEX,
} from "@/lib/constants";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email().toLowerCase(),
	password: z
		.string()
		.min(PASSWORD_MIN_LENGTH)
		.max(10)
		.regex(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
});

export const handleForm = async (prevState: any, formData: FormData) => {
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
	};
	const result = formSchema.safeParse(data);
	if (result.error) {
		return result.error.flatten();
	} else {
		console.log(result.data);
	}
};
