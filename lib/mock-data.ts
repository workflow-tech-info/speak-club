// ─── Types ─────────────────────────────────────────────

export interface Client {
  id: string;
  name: string;
  industry: string;
  agentCount: number;
  callsLast30d: number;
  bookingRate: number;
  successRate: number;
  status: "active" | "inactive" | "onboarding";
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: "active" | "inactive" | "training";
  totalCalls: number;
  voiceModel: string;
  clientName: string;
  language: string;
}

export interface CallLog {
  id: string;
  agentName: string;
  type: "phone" | "web";
  status: "completed" | "missed" | "in-progress" | "failed";
  duration: string;
  sentiment: "positive" | "neutral" | "negative";
  bookingMade: boolean;
  transferred: boolean;
  time: string;
  clientName: string;
}

export interface AnalyticsDataPoint {
  date: string;
  calls: number;
  bookings: number;
}

export interface SentimentData {
  name: string;
  value: number;
  color: string;
}

export interface PhoneNumber {
  id: string;
  number: string;
  nickname: string;
  agentName: string;
  agentRole: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface QAReview {
  id: string;
  callId: string;
  agentName: string;
  clientName: string;
  duration: string;
  sentiment: "positive" | "neutral" | "negative";
  score: number;
  status: "pending" | "reviewed" | "flagged";
  reviewedBy?: string;
  time: string;
  summary: string;
}

// ─── Mock Data ─────────────────────────────────────────

export const clients: Client[] = [
  { id: "1", name: "Urban Kitchen", industry: "Urban Kitchen Restaurant Group", agentCount: 1, callsLast30d: 0, bookingRate: 0, successRate: 0, status: "inactive" },
  { id: "2", name: "Bright Smile Orthodontics", industry: "Bright Smile Ortho", agentCount: 2, callsLast30d: 0, bookingRate: 0, successRate: 0, status: "active" },
  { id: "3", name: "Metro Auto Service", industry: "Metro Automotive", agentCount: 1, callsLast30d: 0, bookingRate: 0, successRate: 0, status: "onboarding" },
  { id: "4", name: "Sunrise Realty", industry: "Sunrise Real Estate Group", agentCount: 2, callsLast30d: 0, bookingRate: 0, successRate: 0, status: "active" },
  { id: "5", name: "Peak Fitness Studio", industry: "Peak Fitness LLC", agentCount: 2, callsLast30d: 0, bookingRate: 0, successRate: 0, status: "active" },
  { id: "6", name: "Dr. Smith Dental", industry: "Smith Dental Group", agentCount: 2, callsLast30d: 0, bookingRate: 0, successRate: 0, status: "active" },
  { id: "7", name: "Meridian Health Group", industry: "Healthcare", agentCount: 3, callsLast30d: 1284, bookingRate: 34.2, successRate: 89.1, status: "active" },
  { id: "8", name: "Apex Auto Sales", industry: "Automotive", agentCount: 2, callsLast30d: 876, bookingRate: 28.7, successRate: 82.4, status: "active" },
  { id: "9", name: "Luxe Property Partners", industry: "Real Estate", agentCount: 4, callsLast30d: 2103, bookingRate: 41.5, successRate: 91.3, status: "active" },
  { id: "10", name: "Coastal Dental Care", industry: "Healthcare", agentCount: 2, callsLast30d: 693, bookingRate: 47.3, successRate: 93.7, status: "active" },
  { id: "11", name: "Ironclad Insurance", industry: "Insurance", agentCount: 2, callsLast30d: 541, bookingRate: 31.8, successRate: 85.2, status: "active" },
  { id: "12", name: "Greenfield Veterinary", industry: "Veterinary", agentCount: 1, callsLast30d: 328, bookingRate: 52.1, successRate: 94.6, status: "active" },
];

export const agents: Agent[] = [
  { id: "a1", name: "Sophia", role: "Appointment Setter", status: "active", totalCalls: 4521, voiceModel: "11labs-rachel", clientName: "Meridian Health Group", language: "English" },
  { id: "a2", name: "James", role: "Lead Qualifier", status: "active", totalCalls: 3892, voiceModel: "11labs-adam", clientName: "Apex Auto Sales", language: "English" },
  { id: "a3", name: "Ava", role: "Booking Agent", status: "active", totalCalls: 6213, voiceModel: "11labs-lisa", clientName: "Luxe Property Partners", language: "English" },
  { id: "a4", name: "Marcus", role: "Follow-up Agent", status: "active", totalCalls: 2187, voiceModel: "11labs-josh", clientName: "Luxe Property Partners", language: "English" },
  { id: "a5", name: "Luna", role: "Receptionist", status: "active", totalCalls: 5674, voiceModel: "11labs-bella", clientName: "Coastal Dental Care", language: "English" },
  { id: "a6", name: "Ethan", role: "Consultation Booker", status: "training", totalCalls: 0, voiceModel: "11labs-daniel", clientName: "Metro Auto Service", language: "English" },
  { id: "a7", name: "Olivia", role: "Claims Assistant", status: "active", totalCalls: 1834, voiceModel: "11labs-nicole", clientName: "Ironclad Insurance", language: "English" },
  { id: "a8", name: "Noah", role: "Appointment Setter", status: "active", totalCalls: 1298, voiceModel: "11labs-sam", clientName: "Greenfield Veterinary", language: "English" },
  { id: "a9", name: "Emma", role: "Support Agent", status: "active", totalCalls: 987, voiceModel: "11labs-aria", clientName: "Bright Smile Orthodontics", language: "English" },
  { id: "a10", name: "Mike", role: "Sales Qualifier", status: "active", totalCalls: 412, voiceModel: "11labs-callum", clientName: "Apex Auto Sales", language: "English" },
  { id: "a11", name: "Lisa", role: "Receptionist", status: "active", totalCalls: 3210, voiceModel: "11labs-rachel", clientName: "Dr. Smith Dental", language: "English" },
];

export const callLogs: CallLog[] = [
  { id: "c1", agentName: "Sophia", type: "phone", status: "completed", duration: "4:32", sentiment: "positive", bookingMade: true, transferred: false, time: "2 min ago", clientName: "Meridian Health" },
  { id: "c2", agentName: "James", type: "phone", status: "completed", duration: "2:15", sentiment: "neutral", bookingMade: false, transferred: false, time: "8 min ago", clientName: "Apex Auto Sales" },
  { id: "c3", agentName: "Ava", type: "web", status: "completed", duration: "6:48", sentiment: "positive", bookingMade: true, transferred: false, time: "14 min ago", clientName: "Luxe Property" },
  { id: "c4", agentName: "Luna", type: "phone", status: "missed", duration: "0:00", sentiment: "neutral", bookingMade: false, transferred: false, time: "21 min ago", clientName: "Coastal Dental" },
  { id: "c5", agentName: "Marcus", type: "phone", status: "completed", duration: "3:22", sentiment: "negative", bookingMade: false, transferred: true, time: "34 min ago", clientName: "Luxe Property" },
  { id: "c6", agentName: "Olivia", type: "phone", status: "completed", duration: "5:11", sentiment: "positive", bookingMade: true, transferred: false, time: "41 min ago", clientName: "Ironclad Insurance" },
  { id: "c7", agentName: "Noah", type: "web", status: "completed", duration: "3:45", sentiment: "positive", bookingMade: true, transferred: false, time: "55 min ago", clientName: "Greenfield Vet" },
  { id: "c8", agentName: "Emma", type: "phone", status: "completed", duration: "7:23", sentiment: "neutral", bookingMade: false, transferred: true, time: "1 hr ago", clientName: "Bright Smile" },
  { id: "c9", agentName: "Sophia", type: "phone", status: "completed", duration: "2:56", sentiment: "positive", bookingMade: true, transferred: false, time: "1 hr ago", clientName: "Meridian Health" },
  { id: "c10", agentName: "James", type: "phone", status: "failed", duration: "0:12", sentiment: "negative", bookingMade: false, transferred: false, time: "2 hr ago", clientName: "Apex Auto Sales" },
  { id: "c11", agentName: "Ava", type: "phone", status: "completed", duration: "4:08", sentiment: "positive", bookingMade: true, transferred: false, time: "2 hr ago", clientName: "Luxe Property" },
  { id: "c12", agentName: "Luna", type: "phone", status: "completed", duration: "3:19", sentiment: "neutral", bookingMade: false, transferred: false, time: "3 hr ago", clientName: "Coastal Dental" },
  { id: "c13", agentName: "Lisa", type: "phone", status: "completed", duration: "5:47", sentiment: "positive", bookingMade: true, transferred: false, time: "3 hr ago", clientName: "Dr. Smith Dental" },
  { id: "c14", agentName: "Mike", type: "web", status: "completed", duration: "1:32", sentiment: "neutral", bookingMade: false, transferred: false, time: "4 hr ago", clientName: "Apex Auto Sales" },
];

export const analyticsData: AnalyticsDataPoint[] = [
  { date: "Feb 1", calls: 142, bookings: 48 },
  { date: "Feb 5", calls: 167, bookings: 56 },
  { date: "Feb 9", calls: 153, bookings: 51 },
  { date: "Feb 13", calls: 189, bookings: 67 },
  { date: "Feb 17", calls: 201, bookings: 73 },
  { date: "Feb 21", calls: 178, bookings: 62 },
  { date: "Feb 25", calls: 224, bookings: 81 },
  { date: "Mar 1", calls: 246, bookings: 89 },
  { date: "Mar 5", calls: 231, bookings: 84 },
];

export const sentimentData: SentimentData[] = [
  { name: "Positive", value: 58, color: "#34d399" },
  { name: "Neutral", value: 31, color: "#a1a1aa" },
  { name: "Negative", value: 11, color: "#f87171" },
];

export const phoneNumbers: PhoneNumber[] = [
  { id: "p1", number: "+1 (555) 100-0001", nickname: "Main Line", agentName: "Lisa", agentRole: "Receptionist", status: "active", createdAt: "41 minutes ago" },
  { id: "p2", number: "+1 (555) 100-0002", nickname: "Sales Line", agentName: "Mike", agentRole: "Sales Qualifier", status: "active", createdAt: "41 minutes ago" },
  { id: "p3", number: "+1 (555) 100-0003", nickname: "Support Line", agentName: "Emma", agentRole: "Support Agent", status: "active", createdAt: "41 minutes ago" },
  { id: "p4", number: "+1 (555) 100-0004", nickname: "Booking Line", agentName: "Ava", agentRole: "Booking Agent", status: "active", createdAt: "2 hours ago" },
  { id: "p5", number: "+1 (555) 100-0005", nickname: "Follow-up Line", agentName: "Marcus", agentRole: "Follow-up Agent", status: "inactive", createdAt: "1 day ago" },
];

export const qaReviews: QAReview[] = [
  { id: "q1", callId: "c1", agentName: "Sophia", clientName: "Meridian Health", duration: "4:32", sentiment: "positive", score: 92, status: "reviewed", reviewedBy: "Admin", time: "2 min ago", summary: "Excellent appointment booking. Agent handled objections well and confirmed all details." },
  { id: "q2", callId: "c3", agentName: "Ava", clientName: "Luxe Property", duration: "6:48", sentiment: "positive", score: 88, status: "reviewed", reviewedBy: "Admin", time: "14 min ago", summary: "Great property viewing scheduled. Agent provided accurate information about the listing." },
  { id: "q3", callId: "c5", agentName: "Marcus", clientName: "Luxe Property", duration: "3:22", sentiment: "negative", score: 45, status: "flagged", time: "34 min ago", summary: "Caller was frustrated about a scheduling conflict. Agent transferred to human but could have resolved better." },
  { id: "q4", callId: "c6", agentName: "Olivia", clientName: "Ironclad Insurance", duration: "5:11", sentiment: "positive", score: 95, status: "pending", time: "41 min ago", summary: "Outstanding claims intake. All required information collected accurately." },
  { id: "q5", callId: "c8", agentName: "Emma", clientName: "Bright Smile", duration: "7:23", sentiment: "neutral", score: 72, status: "pending", time: "1 hr ago", summary: "Support query handled. Response time was good but some information was incomplete." },
  { id: "q6", callId: "c10", agentName: "James", clientName: "Apex Auto Sales", duration: "0:12", sentiment: "negative", score: 20, status: "flagged", time: "2 hr ago", summary: "Call failed almost immediately. Possible technical issue with the connection." },
  { id: "q7", callId: "c11", agentName: "Ava", clientName: "Luxe Property", duration: "4:08", sentiment: "positive", score: 90, status: "pending", time: "2 hr ago", summary: "Successful booking for property tour. Agent upsold premium package effectively." },
  { id: "q8", callId: "c13", agentName: "Lisa", clientName: "Dr. Smith Dental", duration: "5:47", sentiment: "positive", score: 91, status: "pending", time: "3 hr ago", summary: "Patient appointment booked. Insurance verification handled smoothly." },
];

// ─── Aggregate stats ───────────────────────────────────

export const dashboardStats = {
  totalClients: clients.length,
  totalCalls: 85,
  overallBookingRate: 50,
  overallSuccessRate: 71,
  totalSpend: "$19.51",
};

export const analyticsStats = {
  totalCalls: 85,
  totalMinutes: "230 min",
  avgDuration: "2:57",
  successRate: 92,
  totalSpend: "$19.51",
  bookingRate: 50,
  pickupRate: 81,
  transferRate: 21,
};
