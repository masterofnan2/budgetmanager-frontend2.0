export type User = {
    id?: number,
    name?: string,
    email?: string,
    email_verified_at?: string,
    created_at?: string,
    updated_at?: string
};

export type Cycle = {
    id?: number,
    user_id?: string,
    start_date: string,
    end_date: string,
    created_at?: string,
    updated_at?: string
    renewal_frequency_id?: number,
};

export type Budget = {
    id?: number,
    amount?: number,
    user_id?: number,
    category_id?: number,
    created_at?: string,
    updated_at?: string,
    cycle_id?: number
};

export type Category = {
    id?: number,
    budget?: number,
    user_id?: number,
    name?: string,
    created_at?: string,
    updated_at?: string,
    cycle_id?: number,
    description?: string
};

