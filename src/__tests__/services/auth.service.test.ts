import { expect, test, describe } from "bun:test";
import { authService } from "@/services/auth.service";

describe("Auth Service", () => {
    test("should login with correct specific credentials", async () => {
        const user = await authService.login({
            email: "usuario@test.com",
            password: "password123"
        });
        
        expect(user.email).toBe("usuario@test.com");
        expect(user.name).toBe("Usuario Demo");
        expect(user.id).toBe("user-123");
    });

    test("should login with any email if password is password123", async () => {
        const user = await authService.login({
            email: "other@test.com",
            password: "password123"
        });
        
        expect(user.email).toBe("other@test.com");
        expect(user.name).toBe("other");
    });

    test("should fail with incorrect password", async () => {
        try {
            await authService.login({
                email: "usuario@test.com",
                password: "wrong-password"
            });
            // Should fail test if no error thrown
            expect(true).toBe(false); 
        } catch (e: any) {
            expect(e.message).toBe("Credenciales inválidas");
        }
    });
});
