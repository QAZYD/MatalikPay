    import type {UserId, MerchantId, AuditTimestamps, ApiResponse } from '../../types/common.types.ts';

export type UserRole = 'CUSTOMER' | 'MERCHANT' | 'ADMIN' | 'SYSTEM_SUPERADMIN';

export type UserAccountStatus = 
| 'PENDING_VERIFICATION'
| 'ACTIVE'
| 'SUSPENDED'
| 'DEACTIVATED';

export interface address {
    readonly recipientName: string;
    readonly phoneNumber: string;
    readonly streetAddress: string;
    readonly barangay: string;
    readonly city: string;
    readonly province: string;
    readonly region: string;
    readonly postalCode: string;
    readonly isDefault: boolean;
}

export interface UserEntity extends AuditTimestamps {
    readonly id: UserId;
    readonly email: string;
    readonly passwordHash: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly phoneNumber?: string;
    readonly role: UserRole;
    readonly status: UserAccountStatus;
    readonly merchantId?: MerchantId | null;
    readonly addresses: readonly address[];
    readonly lastloginAt?: Date | null;


}

export interface createUserDTO {
    readonly email: string;
    readonly password: string;
    readonly firstName: string;
    readonly lastName: string; 
    readonly phoneNumber?: string;
    readonly role?: Extract<UserRole, 'CUSTOMER' | 'MERCHANT'>;
}

export interface UpdateUserProfileDTO {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly phoneNumber?: string;
}

export interface UserResponseDTO {
  readonly id: UserId;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber?: string;
  readonly role: UserRole;
  readonly status: UserAccountStatus;
  readonly merchantId?: MerchantId | null;
  readonly addresses: readonly address[];
  readonly createdAt: string; // ISO String format for JSON serialization
}

export type UserApiResponse = ApiResponse<UserResponseDTO>;