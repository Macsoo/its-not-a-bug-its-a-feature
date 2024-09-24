export function isSignedIn({role}: { role: string }) {
    return role !== "guest";
}

export function isUser({role}: { role: string }) {
    return role === "user";
}

export function isAdmin({role}: { role: string }) {
    return role === "admin";
}