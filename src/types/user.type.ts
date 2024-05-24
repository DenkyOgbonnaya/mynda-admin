export interface User {
  firstName: string;
  lastName: string;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  accountVerified?: boolean;
  subscriptionPlan?: string;
  subscriptionExpiration?: Date;
  status?: string;
  lastLoggedIn?: Date;
  lastNotificationView?: Date;
  completedKyc?: boolean;
  advertPoints?: number;
  fcmToken?: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
}
