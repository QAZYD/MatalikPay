import type {
    ProductId,
    MerchantId,
    CategoryId,
    Centavos,
    AuditTimestamps,
    paginatedQuery,
    ApiResponse
} from '../../types/common.types.ts'

export type ProductStatus = 'Draft' | 'ACTIVE' | 'OUT_OF_STOCK' | 'ARCHIVED';

export interface ProductDimensions {
    readonly WeightInGrams: number;
    readonly lengthInCm: number; 
    readonly widthInCm: number;
    readonly heightInCm: number;
}

export interface ProductEntity extends AuditTimestamps {
  readonly id: ProductId;
  readonly merchantId: MerchantId;
  readonly categoryId: CategoryId;
  readonly sku: string; // Stock Keeping Unit (e.g., "EXP-TSHIRT-BLK-L")
  readonly title: string;
  readonly slug: string; // URL-friendly identifier
  readonly description: string;
  readonly price: Centavos; // Stored in Centavos
  readonly compareAtPrice?: Centavos | null; // Original price for discount displays
  readonly stockQuantity: number;
  readonly reservedQuantity: number; // Stock held in unpaid pending carts
  readonly status: ProductStatus;
  readonly images: readonly string[]; // S3 / CDN URLs
  readonly dimensions: ProductDimensions;
}



/**
 * Input DTO: Payload for creating a new product.
 */
export interface CreateProductDTO {
  readonly merchantId: MerchantId;
  readonly categoryId: CategoryId;
  readonly sku: string;
  readonly title: string;
  readonly description: string;
  readonly priceAmountInPHP: number; // e.g., 250.50 (Service layer converts to Centavos)
  readonly stockQuantity: number;
  readonly images: readonly string[];
  readonly dimensions: ProductDimensions;
}

/**
 * Input DTO: Payload for updating an existing product.
 * All fields are optional, allowing partial updates (PATCH requests).
 */
export interface UpdateProductDTO {
  readonly categoryId?: CategoryId;
  readonly title?: string;
  readonly description?: string;
  readonly priceAmountInPHP?: number;
  readonly stockQuantity?: number;
  readonly status?: ProductStatus;
  readonly images?: readonly string[];
  readonly dimensions?: Partial<ProductDimensions>;
}

/**
 * Input DTO: Filtering and searching product listings.
 */
export interface ProductFilterQueryDTO extends paginatedQuery {
  readonly merchantId?: MerchantId;
  readonly categoryId?: CategoryId;
  readonly minPriceInCentavos?: number;
  readonly maxPriceInCentavos?: number;
  readonly status?: ProductStatus;
  readonly searchKeyword?: string;
}

/**
 * Output DTO: Sanitized Product response payload sent to client applications.
 */
export interface ProductResponseDTO {
  readonly id: ProductId;
  readonly merchantId: MerchantId;
  readonly categoryId: CategoryId;
  readonly sku: string;
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly price: {
    readonly amountInCentavos: Centavos;
    readonly formattedPHP: string; // e.g., "₱1,250.50" for immediate UI rendering
  };
  readonly availableStock: number; // Computed as (stockQuantity - reservedQuantity)
  readonly isAvailable: boolean;
  readonly images: readonly string[];
  readonly dimensions: ProductDimensions;
  readonly createdAt: string;
}

export type ProductApiResponse = ApiResponse<ProductResponseDTO>;