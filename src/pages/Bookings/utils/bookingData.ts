
export interface DateOption {
  value: string;
  label: string;
}

export const generateDateOptions = (): DateOption[] => {
  return [
    { value: new Date().toISOString().split('T')[0], label: "Today" },
    { 
      value: new Date(Date.now() + 86400000).toISOString().split('T')[0], 
      label: "Tomorrow" 
    },
    { 
      value: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0], 
      label: new Date(Date.now() + 2 * 86400000).toLocaleDateString() 
    },
    { 
      value: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0], 
      label: new Date(Date.now() + 3 * 86400000).toLocaleDateString() 
    },
    { 
      value: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0], 
      label: new Date(Date.now() + 4 * 86400000).toLocaleDateString() 
    },
  ];
};

export const mockBookingsData = [
  { 
    id: 1, 
    customer: "Tanaka Yuki", 
    phone: "+81 90-1234-5678", 
    time: "18:30-20:00", 
    date: "2025-05-14", 
    guests: 4, 
    tableType: "Window Seat", 
    status: "confirmed",
    notes: "Anniversary dinner, requested quiet corner" 
  },
  { 
    id: 2, 
    customer: "Smith John", 
    phone: "+81 80-9876-5432", 
    time: "19:00-21:00", 
    date: "2025-05-14", 
    guests: 2, 
    tableType: "Counter", 
    status: "confirmed",
    notes: "" 
  },
  { 
    id: 3, 
    customer: "Suzuki Akira", 
    phone: "+81 70-2468-1357", 
    time: "17:30-19:00", 
    date: "2025-05-15", 
    guests: 6, 
    tableType: "Private Room", 
    status: "pending",
    notes: "Birthday celebration, bringing cake" 
  },
  { 
    id: 4, 
    customer: "Lee Min", 
    phone: "+81 90-1357-2468", 
    time: "12:30-14:00", 
    date: "2025-05-15", 
    guests: 3, 
    tableType: "Regular", 
    status: "confirmed",
    notes: "" 
  },
  { 
    id: 5, 
    customer: "Yamada Taro", 
    phone: "+81 80-2468-1357", 
    time: "20:00-22:00", 
    date: "2025-05-16", 
    guests: 2, 
    tableType: "Counter", 
    status: "canceled",
    notes: "Canceled due to illness" 
  },
];
