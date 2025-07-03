"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useActionState } from "react";
import { smsVerification } from "./actions";

const initialState = {
	token: false,
	phone: undefined,
};

export default function SMSLogin() {
	const [{ token, data, error }, action] = useActionState(
		smsVerification,
		initialState,
	);
	return (
		<div className="flex flex-col gap-10 py-8 px-6">
			<div className="flex flex-col gap-2 *:font-medium">
				<h1 className="text-2xl">SMS Login</h1>
				<h2 className="text-xl">Verify your phone number.</h2>
			</div>
			<form action={action} className="flex flex-col gap-4">
				{!token ? (
					<Input
						name="phone"
						defaultValue={token ? data : data}
						type="text"
						placeholder="Phone number"
						errors={error?.formErrors}
						required
					/>
				) : (
					<Input
						name="token"
						type="number"
						placeholder="Verification code"
						required
						min={100000}
						max={999999}
					/>
				)}
				<Button text={token ? "Verify Token" : "Send Verification SMS"} />
			</form>
		</div>
	);
}
