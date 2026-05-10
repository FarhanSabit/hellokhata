import client from "@/lib/axios"

export const updateUser = async (user: any) => {
    const res = await client.patch('/api/settings/user', user);
    return res.data
}