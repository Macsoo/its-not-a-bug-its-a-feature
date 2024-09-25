export const currentRole = "guest"


export function isSignedIn() {
    return currentRole !== "guest";
}

export function isUser() {
    return currentRole === "user";
}

export function isAdmin() {
    return currentRole === "admin";
}