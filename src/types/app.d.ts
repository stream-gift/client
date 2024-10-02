type User = {
  id: string;
  email: string;
  googleData: Record<string, any> | null;
  googleImage: string | null;
  twitchData: Record<string, any> | null;
  twitchImage: string | null;
  createdAt: string;
  updatedAt: string;
};

type Streamer = {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  profileImage: string;
  profileBanner: string;
  profileColor: string;
  settings?: StreamerSettings;
  token?: StreamerToken;
  donations: Donation[];
  addresses: StreamerAddress[];
  balances: StreamerBalance[];
  withdrawals: StreamerWithdrawal[];
};

type StreamerToken = {
  streamerId: string;
  id: string;
  token: string;
  createdAt: string;
  updatedAt: string;
};

type StreamerSettings = {
  streamerId: string;
  id: string;
  playNotificationSound: boolean;
  animationType: string;
  animationParams: Record<string, any>;
};

type Currency = "SOL" | (string & {});

type DonationStatus = "PENDING" | "COMPLETED" | "FAILED";

type Donation = {
  id: string;
  amount: number;
  amountFloat: number;
  amountAtomic: number;
  amountUsd: number;
  currency: Currency;
  message?: string;
  name?: string;
  status: DonationStatus;
  createdAt: string;
  updatedAt: string;
  pendingUntil: string;
  streamerId: string;
  addressId: string;
  transactionHash?: string;
  transactionSender?: string;
  transactionSenderDomainName?: string;
};

type Address = {
  id: string;
  index: number;
  address: string;
  currency: Currency;
  lockedUntil?: string;
  donations: Donation[];
};

type StreamerAddress = {
  id: string;
  address: string;
  currency: Currency;
  streamerId: string;
  createdAt: string;
};

type StreamerBalance = {
  id: string;
  streamerId: string;
  balance: number;
  balanceAtomic: number;
  balanceFloat: number;
  pending: number;
  currency: Currency;
  updatedAt: string;
};

type StreamerWithdrawalStatus = "PENDING" | "SENT" | "COMPLETED" | "FAILED";

type StreamerWithdrawal = {
  id: string;
  amount: number;
  amountAtomic: number;
  amountFloat: number;
  address: string;
  currency: Currency;
  status: StreamerWithdrawalStatus;
  streamerId: string;
  createdAt: string;
  updatedAt: string;
  transactionHash?: string;
};
