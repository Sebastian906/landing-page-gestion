import { supabase } from './supabase'
import type { User } from '../context/AppContext'

// Helpers

/** Map a Supabase auth user + optional profile row → our app User type */
function mapUser(
    authUser: { id: string; email?: string },
    meta?: Record<string, string>
): User {
    return {
        id: authUser.id,
        name: meta?.name ?? authUser.email?.split('@')[0] ?? 'Usuario',
        email: authUser.email ?? '',
        company: meta?.company ?? '',
        role: 'client',
        sector: meta?.sector,
        joinedAt: meta?.joined_at ?? new Date().toISOString().split('T')[0],
    }
}

// Auth operations

export interface RegisterData {
    name: string
    email: string
    password: string
    company: string
    sector: string
}

/**
 * Sign in with email + password.
 * Returns the mapped User on success, null on failure.
 */
export async function signIn(email: string, password: string): Promise<User | null> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.user) return null

    const meta = data.user.user_metadata as Record<string, string> | undefined
    return mapUser(data.user, meta)
}

/**
 * Register a new user.
 * Stores name, company, sector in user_metadata (no extra profile table needed).
 * Returns the mapped User on success, null on failure.
 */
export async function signUp(data: RegisterData): Promise<User | null> {
    const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                name: data.name,
                company: data.company,
                sector: data.sector,
                joined_at: new Date().toISOString().split('T')[0],
            },
        },
    })

    if (error || !authData.user) return null

    const meta = authData.user.user_metadata as Record<string, string> | undefined
    return mapUser(authData.user, meta)
}

/**
 * Sign out the current session.
 */
export async function signOut(): Promise<void> {
    await supabase.auth.signOut()
}

/**
 * Restore session on page reload.
 * Returns the mapped User if a valid session exists, null otherwise.
 */
export async function getSession(): Promise<User | null> {
    const { data } = await supabase.auth.getSession()
    if (!data.session?.user) return null

    const authUser = data.session.user
    const meta = authUser.user_metadata as Record<string, string> | undefined
    return mapUser(authUser, meta)
}