CREATE TABLE IF NOT EXISTS booking_requests (
  id TEXT PRIMARY KEY,
  booking_reference TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  tour_slug TEXT NOT NULL,
  tour_title TEXT NOT NULL,
  travel_date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  guests INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  total_price_label TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  payment_method_label TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  notes TEXT NOT NULL,
  selected_preferences TEXT NOT NULL
);
