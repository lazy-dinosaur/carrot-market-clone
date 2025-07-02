"use server";

import { z } from "zod";

const checkPassword = ({
	password,
	confirmPassword,
}: {
	password: string;
	confirmPassword: string;
}) => password == confirmPassword;

const formSchema = z
	.object({
		username: z
			.string({
				invalid_type_error: "문자여야함",
				required_error: "입력 없음",
			})
			.min(3, "3글자 이상")
			.max(10, "10글자 이하")
			.toLowerCase()
			.trim(),
		email: z
			.string({
				invalid_type_error: "문자여야함",
				required_error: "입력 없음",
			})
			.email("이메일 형식이어야 함")
			.toLowerCase(),
		password: z.string().min(4),
		confirmPassword: z.string().min(4),
	})
	.refine(checkPassword, {
		message: "두 비밀 번호가 동일해야 함",
		path: ["confirmPassword"],
	});

export async function createAccount(prevState: any, formData: FormData) {
	const data = {
		username: formData.get("username"),
		email: formData.get("email"),
		password: formData.get("password"),
		conformPassword: formData.get("conformPassword"),
	};
	const result = formSchema.safeParse(data);
	if (!result.success) {
		return result.error.flatten();
	} else {
		console.log(result.data);
	}
}
