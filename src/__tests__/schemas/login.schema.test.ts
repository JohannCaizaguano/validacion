import { expect, test, describe } from "bun:test";
import { loginSchema } from "@/schemas/login.schema";

describe("Login Schema Validation", () => {
    test("should validate correct credentials", () => {
        const valid = { email: "test@example.com", password: "password123" };
        const result = loginSchema.safeParse(valid);
        expect(result.success).toBe(true);
    });

    test("should reject invalid email", () => {
        const invalid = { email: "not-an-email", password: "password123" };
        const result = loginSchema.safeParse(invalid);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("Correo electrónico inválido");
        }
    });

    test("should reject short password", () => {
        const invalid = { email: "test@example.com", password: "123" };
        const result = loginSchema.safeParse(invalid);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("La contraseña debe tener al menos 6 caracteres");
        }
    });
});
