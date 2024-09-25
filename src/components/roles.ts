export const currentRole = "admin"

export const currentUserId = 101;


export function isSignedIn() {
    return currentRole !== "guest";
}

export function isUser() {
    return currentRole === "user";
}

export function isAdmin() {
    return currentRole === "admin";
}