export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
}

export interface BillingAddress {
  address: string;
  notes?: string;
}

export interface UserProfileData {
  profile: UserProfile;
  billingAddress: BillingAddress;
}
