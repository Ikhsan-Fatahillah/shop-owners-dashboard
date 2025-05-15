
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
}) => {
  const [date, setDate] = useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined
  );

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setSelectedDate(newDate.toISOString().split('T')[0]);
    } else {
      // If date is cleared, reset the filter
      setSelectedDate("");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-4">
      <Input 
        placeholder="Search by customer name or phone" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 input-modern"
      />
      <Select 
        value={filterStatus} 
        onValueChange={setFilterStatus}
      >
        <SelectTrigger className="w-full sm:w-[180px] input-modern">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="canceled">Canceled</SelectItem>
        </SelectContent>
      </Select>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className={cn(
              "w-full sm:w-[180px] justify-start text-left font-normal input-modern",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-soft-purple-400" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            className="p-3 pointer-events-auto bg-white shadow-card rounded-md"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BookingFilters;
