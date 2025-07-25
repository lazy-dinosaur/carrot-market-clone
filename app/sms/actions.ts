"use server";
import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
	.string()
	.trim()
	.refine(
		(phone) => validator.isMobilePhone(phone, "ko-KR"),
		"잘못된 전화번호",
	);
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
	token: boolean;
}

export async function smsVerification(
	prevState: ActionState,
	formData: FormData,
) {
	const phone = formData.get("phone");
	const token = formData.get("token");

	if (!prevState?.token) {
		const result = phoneSchema.safeParse(phone);
		if (!result.success) {
			console.log(result.error.flatten());
			return {
				token: false,
				error: result.error.flatten(),
				data: result.data,
			};
		} else {
			return {
				token: true,
				data: result.data,
			};
		}
	} else {
		const result = tokenSchema.safeParse(token);
		if (!result.success) {
			return { token: true };
		} else {
			redirect("/");
		}
	}
}
