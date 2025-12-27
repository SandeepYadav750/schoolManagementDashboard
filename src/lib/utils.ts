import { auth } from "@clerk/nextjs/server";

// const { sessionClaims } = auth();
// export const role = (sessionClaims?.metadata as { role?: string })?.role;

export async function getUserRole() {
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    return {role, userId};
}
