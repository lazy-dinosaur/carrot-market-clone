export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[$?!@$%^&*-]).+$/,
);
export const PASSWORD_ERROR_MESSAGE =
	"비밀번호는 적어도 하나 이상의 소문자, 대문자, 숫자, 특수문자가 포함되어야함";
