import { supabase } from './supabase'

export interface LeadData {
    name: string
    company: string
    email: string
    volume: string
}

/**
 * Insert a new lead from the public contact form.
 * The `leads_insert_public` RLS policy allows anonymous inserts.
 * Returns true on success, false on error.
 */
export async function submitLead(lead: LeadData): Promise<boolean> {
    const { error } = await supabase.from('leads').insert({
        name: lead.name,
        company: lead.company,
        email: lead.email,
        volume: lead.volume,
    })

    if (error) {
        console.error('[submitLead]', error.message)
        return false
    }
    return true
}