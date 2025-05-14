
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookingFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  dateOptions: { value: string; label: string }[];
}

const BookingFilters: React.FC<BookingFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  selectedDate,
  setSelectedDate,
  dateOptions,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      <Input 
        placeholder="Search by customer name or phone" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1"
      />
      <Select 
        value={filterStatus} 
        onValueChange={setFilterStatus}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="canceled">Canceled</SelectItem>
        </SelectContent>
      </Select>
      <Select 
        value={selectedDate} 
        onValueChange={setSelectedDate}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Date" />
        </SelectTrigger>
        <SelectContent>
          {dateOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BookingFilters;
