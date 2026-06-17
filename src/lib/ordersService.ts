import { supabase } from './supabase'
import type { QuoteItem } from '../context/AppContext'

export interface ContactData {
    name: string
    company: string
    email: string
    phone: string
}

/**
 * Persist a complete quote (order + items) in Supabase.
 *
 * Flow:
 *  1. Insert a row in `orders` with the authenticated user's id.
 *  2. Insert one row per QuoteItem in `order_items`.
 *
 * The `orders_user_isolation` and `order_items_user_isolation` RLS policies
 * ensure each user can only access their own data.
 *
 * `contactData` is included in order metadata via the `notes` column so an
 * advisor has the contact info without needing a separate table.
 *
 * Returns true on success, false on any error.
 */
export async function submitOrder(
    items: QuoteItem[],
    contact: ContactData,
    userId: string
): Promise<boolean> {
    // Calculate total using the midpoint price as a reference estimate
    const total = items.reduce(
        (sum, item) =>
            sum + ((item.product.priceFrom + item.product.priceTo) / 2) * item.quantity,
        0
    )

    // 1 — Create the order header
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            user_id: userId,
            status: 'pending',
            total,
            // Store contact details as a JSON note so advisors see them in the dashboard
            notes: JSON.stringify({
                contact_name: contact.name,
                contact_company: contact.company,
                contact_email: contact.email,
                contact_phone: contact.phone,
            }),
        })
        .select('id')
        .single()

    if (orderError || !order) {
        console.error('[submitOrder] order insert error:', orderError?.message)
        return false
    }

    // 2 — Insert line items
    const lineItems = items.map((item) => ({
        order_id: order.id,
        // products table uses UUID ids; our local product ids are strings like "PRD-001".
        // We store the local id as a text reference in a notes field and use a
        // placeholder for the FK until the products table is fully seeded.
        product_id: null,           // set to null until products are seeded in Supabase
        product_ref: item.product.id, // local string reference (e.g. "PRD-001")
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.priceFrom,
        selected_color: item.selectedColor,
        notes: item.notes || null,
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(lineItems)

    if (itemsError) {
        console.error('[submitOrder] order_items insert error:', itemsError.message)
        return false
    }

    return true
}

/**
 * Fetch all orders for the authenticated user, newest first.
 * Used on the Account Dashboard page.
 */
export async function getUserOrders(userId: string) {
    const { data, error } = await supabase
        .from('orders')
        .select('id, status, total, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('[getUserOrders]', error.message)
        return []
    }
    return data ?? []
}