type User = {
  id: string;
  email: string;
  googleImage: string;
  twitchImage: string;
};

type Donation = {
  id: string;
  amount: number;
  amountFloat: number;
  amountAtomic: number;
  amountUsd: number;
  currency: "SOL";
  message?: string;
  name?: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  createdAt: Date;
  updatedAt: Date;
  streamerId: string;
  addressId: string;
  transactionHash?: string;
  transactionSender?: string;
  transactionSenderDomainName?: string;
};

type Streamer = {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  profileImage?: string;
  profileBanner?: string;
  profileColor?: string;
};

type StreamerSettings = {
  streamerId: string;
  id: string;
  playNotificationSound: boolean;
  animationType: string;
  animationParams: Record<string, any>;
};
