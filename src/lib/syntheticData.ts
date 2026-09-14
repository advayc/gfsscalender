// Synthetic fallback data shown when database fails.
// Source: db_cluster-31-07-2026 backup (public.Club + public.Event).
// storage.zip was empty (22B), so no storage objects included.
// ponytail: static snapshot, refresh from backup if schema changes.

export interface SyntheticClub {
  id: string;
  slug: string;
  name: string;
  color: string;
  enabled: boolean;
  prioritized: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SyntheticEvent {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  date: string;
  time: string | null;
  clubId: string;
  recurrenceFrequency: string | null;
  recurrenceInterval: number | null;
  recurrenceCount: number | null;
  recurrenceUntil: string | null;
  createdAt: string;
  updatedAt: string;
}

export const SYNTHETIC_CLUBS: SyntheticClub[] = [
  { id: "cmfys0d07002xm48laygr3jwi", slug: "sac", name: "SAC", color: "#eee953", enabled: true, prioritized: true, createdAt: "2025-09-25T02:10:41.222Z", updatedAt: "2025-09-25T02:10:41.222Z" },
  { id: "cmfyrrsqw0000m48lexiekvsr", slug: "athletic-council", name: "Athletic Council", color: "#4ade80", enabled: true, prioritized: false, createdAt: "2025-09-25T02:04:01.736Z", updatedAt: "2025-09-25T02:14:55.976Z" },
  { id: "cmfys5ylm0000birywv7xd0mk", slug: "deca", name: "DECA", color: "#5274ff", enabled: true, prioritized: false, createdAt: "2025-09-25T02:15:02.384Z", updatedAt: "2025-09-25T02:15:02.384Z" },
  { id: "cmfys67nz0001biryjk86ukun", slug: "medlife", name: "MEDLIFE", color: "#ff1f1f", enabled: true, prioritized: false, createdAt: "2025-09-25T02:15:14.255Z", updatedAt: "2025-09-25T02:15:17.927Z" },
  { id: "cmfysjnlk005ym48l6ud0cgbj", slug: "art-guild", name: "Art Guild", color: "#34e7ea", enabled: true, prioritized: false, createdAt: "2025-09-25T02:25:41.315Z", updatedAt: "2025-09-25T02:25:41.315Z" },
  { id: "cmfyqxn4700018ompev2z8mhf", slug: "cs", name: "Computer Science Club", color: "#95a7ac", enabled: true, prioritized: false, createdAt: "2025-09-25T01:40:34.760Z", updatedAt: "2025-09-25T02:29:53.178Z" },
  { id: "cmg8pza8w0001ww1edde9f0e2", slug: "dance-club", name: "Dance Club", color: "#b6c5f2", enabled: true, prioritized: false, createdAt: "2025-10-02T01:11:33.415Z", updatedAt: "2025-10-02T01:11:33.415Z" },
  { id: "cmg8pzpyw0002ww1er9ehamgu", slug: "model-un", name: "Model UN", color: "#bbac0c", enabled: true, prioritized: false, createdAt: "2025-10-02T01:11:53.895Z", updatedAt: "2025-10-02T01:11:53.895Z" },
  { id: "cmg8q04230003ww1el4d5zyjc", slug: "hosa", name: "HOSA", color: "#759fff", enabled: true, prioritized: false, createdAt: "2025-10-02T01:12:12.154Z", updatedAt: "2025-10-02T01:12:12.154Z" },
  { id: "cmg8q0fhz0004ww1e5vc82ide", slug: "french-club", name: "French Club", color: "#aff8ca", enabled: true, prioritized: false, createdAt: "2025-10-02T01:12:26.999Z", updatedAt: "2025-10-02T01:12:26.999Z" },
  { id: "cmg8q0qj40005ww1e6n8vo0t7", slug: "newcomers-club", name: "Newcomers Club", color: "#deaf4a", enabled: true, prioritized: false, createdAt: "2025-10-02T01:12:41.279Z", updatedAt: "2025-10-02T01:12:41.279Z" },
  { id: "cmg8q0y7l0006ww1exvgyexjl", slug: "talon-times", name: "Talon Times", color: "#f96269", enabled: true, prioritized: false, createdAt: "2025-10-02T01:12:51.249Z", updatedAt: "2025-10-02T01:12:51.249Z" },
  { id: "cmg8q1f1i0007ww1e46b8a4ml", slug: "studio-creation", name: "Studio Creation", color: "#ad66f5", enabled: true, prioritized: false, createdAt: "2025-10-02T01:13:13.045Z", updatedAt: "2025-10-02T01:13:13.045Z" },
  { id: "cmg8q1rzp0008ww1en8ekdamt", slug: "first-aid", name: "First Aid", color: "#981616", enabled: true, prioritized: false, createdAt: "2025-10-02T01:13:29.827Z", updatedAt: "2025-10-02T01:13:29.827Z" },
  { id: "cmg8q24tv0009ww1exxjn01sy", slug: "robotics-club", name: "Robotics Club", color: "#000000", enabled: true, prioritized: false, createdAt: "2025-10-02T01:13:46.466Z", updatedAt: "2025-10-02T01:13:46.466Z" },
  { id: "cmg8qzj7300006pqokkjznp7v", slug: "amnesty", name: "Amnesty", color: "#ded94a", enabled: true, prioritized: false, createdAt: "2025-10-02T01:39:44.734Z", updatedAt: "2025-10-02T01:39:44.734Z" },
  { id: "cmgb5378w00008djpfvca6eme", slug: "eco-club", name: "Eco Club", color: "#9effc2", enabled: true, prioritized: false, createdAt: "2025-10-03T17:50:02.745Z", updatedAt: "2025-10-03T17:50:02.745Z" },
  { id: "cmgb53pht00018djpvg7zjw7v", slug: "student-writers-guild", name: "Student Writers Guild", color: "#d35a5a", enabled: true, prioritized: false, createdAt: "2025-10-03T17:50:26.496Z", updatedAt: "2025-10-03T17:50:26.496Z" },
  { id: "cmg8pu8qa0000ww1ezb8ztioz", slug: "united-way", name: "United Way", color: "#ff0040", enabled: true, prioritized: false, createdAt: "2025-10-02T01:07:38.273Z", updatedAt: "2025-10-03T17:50:34.577Z" },
  { id: "cmgb54g2w00004ddgt3nmotve", slug: "arab-student-club", name: "Arab Student Club", color: "#512a2a", enabled: true, prioritized: false, createdAt: "2025-10-03T17:51:00.951Z", updatedAt: "2025-10-03T17:51:00.951Z" },
  { id: "cmgf4txka00002tscvxrilnaa", slug: "stem-club", name: "STEM Club", color: "#4c705a", enabled: true, prioritized: false, createdAt: "2025-10-06T12:53:55.097Z", updatedAt: "2025-10-06T12:53:55.097Z" },
  { id: "cmhlfffzu00001fm7x5g36428", slug: "easa", name: "EASA", color: "#de4aa0", enabled: true, prioritized: false, createdAt: "2025-11-05T03:16:54.314Z", updatedAt: "2025-11-05T03:16:54.314Z" },
  { id: "cmhtj47lb0000wql07h3pfsso", slug: "bsa", name: "BSA", color: "#3a403c", enabled: true, prioritized: false, createdAt: "2025-11-10T19:22:18.080Z", updatedAt: "2025-11-10T19:22:18.080Z" },
];

export const SYNTHETIC_EVENTS: SyntheticEvent[] = [
  { id: "cmgb6bbnz0001ri00ul31g2dm", title: "Studio Creation Meeting", description: "Bi-Weekly meeting", location: "room 119", date: "2025-10-02T00:00:00.000Z", time: "11:07", clubId: "cmg8q1f1i0007ww1e46b8a4ml", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-10-03T18:24:21.438Z", updatedAt: "2025-10-03T18:24:21.438Z" },
  { id: "cmgb6g1rx0003ri003hlufzbe", title: "Badminton Intramurals", description: "Weekly intramurals", location: "Gym A, B, C", date: "2025-10-09T00:00:00.000Z", time: "16:00", clubId: "cmfyrrsqw0000m48lexiekvsr", recurrenceFrequency: "WEEKLY", recurrenceInterval: 1, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-10-03T18:28:01.804Z", updatedAt: "2025-10-03T18:28:01.804Z" },
  { id: "cmfys1qjg002zm48ltzweujgz", title: "hat day", description: "Wear a hat to support our spirit day!", location: null, date: "2025-09-26T00:00:00.000Z", time: null, clubId: "cmfys0d07002xm48laygr3jwi", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-09-25T02:11:45.420Z", updatedAt: "2025-09-25T02:11:45.420Z" },
  { id: "cmfys2add0031m48l28rvflpw", title: "Dress as teacher day!", description: "Dress as your (favorite) teacher for spirit week!", location: null, date: "2025-09-25T00:00:00.000Z", time: null, clubId: "cmfys0d07002xm48laygr3jwi", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-09-25T02:12:11.119Z", updatedAt: "2025-09-25T02:12:11.119Z" },
  { id: "cmhlfke0p00041fm7c1g3z0b5", title: "Art Guild General Meeting", description: "Weekly Meeting for Art Guild!", location: "Room 156", date: "2025-11-06T00:00:00.000Z", time: "14:40", clubId: "cmfysjnlk005ym48l6ud0cgbj", recurrenceFrequency: "WEEKLY", recurrenceInterval: 1, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-11-05T03:20:44.940Z", updatedAt: "2025-11-05T03:20:44.940Z" },
  { id: "cmhlfl2ax00061fm7w7h8k9m0", title: "MEDLIFE General Meeting", description: "Weekly meeting for MEDLIFE", location: "Room 206", date: "2025-11-05T00:00:00.000Z", time: "14:40", clubId: "cmfys67nz0001biryjk86ukun", recurrenceFrequency: "WEEKLY", recurrenceInterval: 1, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-11-05T03:20:44.940Z", updatedAt: "2025-11-05T03:20:44.940Z" },
  { id: "cs-exec-elections", title: "Computer Science Club Exec Elections", description: "We will be hosting in-person elections for the computer science club exec team.", location: "Room 201", date: "2025-10-14T00:00:00.000Z", time: "11:10", clubId: "cmfyqxn4700018ompev2z8mhf", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-10-03T18:24:21.438Z", updatedAt: "2025-10-03T18:24:21.438Z" },
  { id: "cs-fall-contest", title: "Computer Science Club Fall Coding Contest", description: "Join us in room 201 to compete in a team coding contest.", location: "Room 201", date: "2025-11-04T00:00:00.000Z", time: "23:07", clubId: "cmfyqxn4700018ompev2z8mhf", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-10-03T18:24:21.438Z", updatedAt: "2025-10-03T18:24:21.438Z" },
  { id: "art-guild-gm", title: "Art Guild GM", description: "Weekly meeting for Art Guild", location: null, date: "2026-01-21T00:00:00.000Z", time: "11:07", clubId: "cmfysjnlk005ym48l6ud0cgbj", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-10-03T18:24:21.438Z", updatedAt: "2025-10-03T18:24:21.438Z" },
  { id: "orange-shirt-day", title: "Orange Shirt Day", description: "Wear an Orange Shirt in support of truth and reconciliation!", location: null, date: "2025-09-30T00:00:00.000Z", time: null, clubId: "cmfys0d07002xm48laygr3jwi", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-09-25T02:12:11.119Z", updatedAt: "2025-09-25T02:12:11.119Z" },
  { id: "supercouncil", title: "Supercouncil!", description: "Our first supercouncil meeting! Please have 1 representative attend.", location: null, date: "2025-09-29T00:00:00.000Z", time: "11:07", clubId: "cmfys0d07002xm48laygr3jwi", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-09-25T02:12:11.119Z", updatedAt: "2025-09-25T02:12:11.119Z" },
  { id: "stem-general-meet", title: "STEM General Meet", description: null, location: "room 223", date: "2025-10-06T00:00:00.000Z", time: "11:07", clubId: "cmgf4txka00002tscvxrilnaa", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-10-06T12:53:55.097Z", updatedAt: "2025-10-06T12:53:55.097Z" },
  { id: "pumpkin-carving", title: "Pumpking Carving", description: "Come to room 212 for pumpkin carving!", location: "Room 212", date: "2025-10-29T00:00:00.000Z", time: null, clubId: "cmg8q0qj40005ww1e6n8vo0t7", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-10-03T18:24:21.438Z", updatedAt: "2025-10-03T18:24:21.438Z" },
  { id: "haunted-house", title: "Haunted House", description: "Up for a challenge? Visit our haunted house in room 136!", location: "Room 136", date: "2025-10-30T00:00:00.000Z", time: null, clubId: "cmfys0d07002xm48laygr3jwi", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-10-03T18:24:21.438Z", updatedAt: "2025-10-03T18:24:21.438Z" },
  { id: "pumpkin-painting", title: "Pumpkin Painting", description: null, location: "Room 129", date: "2025-10-30T00:00:00.000Z", time: "11:07", clubId: "cmg8q1f1i0007ww1e46b8a4ml", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-10-03T18:24:21.438Z", updatedAt: "2025-10-03T18:24:21.438Z" },
  { id: "athletic-council-gm", title: "Athletic Council GM", description: "Weekly meeting", location: "Gym C", date: "2025-11-21T00:00:00.000Z", time: "08:30", clubId: "cmfyrrsqw0000m48lexiekvsr", recurrenceFrequency: "WEEKLY", recurrenceInterval: 1, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-10-03T18:28:01.804Z", updatedAt: "2025-10-03T18:28:01.804Z" },
  { id: "deca-meeting", title: "DECA Meeting", description: "First training", location: null, date: "2025-10-09T00:00:00.000Z", time: "14:40", clubId: "cmfys5ylm0000birywv7xd0mk", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-10-03T18:24:21.438Z", updatedAt: "2025-10-03T18:24:21.438Z" },
  { id: "amnesty-gm", title: "Amnesty General Meeting", description: "General Meeting", location: "Room 126", date: "2025-10-06T00:00:00.000Z", time: "11:07", clubId: "cmg8qzj7300006pqokkjznp7v", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-10-03T18:24:21.438Z", updatedAt: "2025-10-03T18:24:21.438Z" },
  { id: "calligraphy-event", title: "Calligraphy Event", description: "Bi-weekly meeting", location: "Room 203", date: "2025-11-07T00:00:00.000Z", time: "11:07", clubId: "cmhlfffzu00001fm7x5g36428", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-11-05T03:20:44.940Z", updatedAt: "2025-11-05T03:20:44.940Z" },
  { id: "general-meeting-upper", title: "General Meeting", description: null, location: "room 226", date: "2026-06-11T00:00:00.000Z", time: "11:07", clubId: "cmhtj47lb0000wql07h3pfsso", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-11-10T19:22:18.080Z", updatedAt: "2025-11-10T19:22:18.080Z" },
  { id: "general-meeting-lower", title: "General meeting", description: null, location: "room 226", date: "2025-11-13T00:00:00.000Z", time: "11:07", clubId: "cmhtj47lb0000wql07h3pfsso", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-11-10T19:22:18.080Z", updatedAt: "2025-11-10T19:22:18.080Z" },
  { id: "flc-exam-day", title: "FLC Exam Day", description: "Exam for HOSA Competative Events", location: "Computer Lab", date: "2025-11-18T00:00:00.000Z", time: null, clubId: "cmg8q04230003ww1el4d5zyjc", recurrenceFrequency: null, recurrenceInterval: null, recurrenceCount: null, recurrenceUntil: null, createdAt: "2025-10-03T18:24:21.438Z", updatedAt: "2025-10-03T18:24:21.438Z" },
];
