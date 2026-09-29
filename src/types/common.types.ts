declare const __brand: unique symbol; 
export type Brand<T, B extends string> = T & {readonly [__brand]: B };

export type UserId = Brand<string, 'UserId'>;
export type MerchantId = Brand<string, 'MerchantId'>;
export type ProductId = Brand<string, 'ProductId'>;
export type CategoryId = Brand<string, 'CategoryId'>;

export type Centavos = Brand<number, 'Centavos'>;

export interface AuditTimestamps{
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt?: Date | null;
}

export interface paginatedQuery {
    readonly page: number;
    readonly limit: number;
    readonly sortBy?: string;
    readonly sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse <T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

export interface paginatedResult <T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
