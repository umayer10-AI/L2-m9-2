export type Role = "admin"| "agent" | "user"

export const UserRole = {
    admin: "admin",
    agent: "agent",
    user: "user"
} as const