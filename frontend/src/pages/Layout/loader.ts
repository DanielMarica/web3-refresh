import ApiClient from "../../lib/api";
import type { User } from "../../types/User";

// On définit ce que le loader va renvoyer
export interface LoaderData {
    users: User[];
}

// La fonction appelée par React Router
export async function loader() {
    const users = await ApiClient.getUsers();
    return { users };
}