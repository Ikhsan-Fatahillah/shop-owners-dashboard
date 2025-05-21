
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BlockedSlot } from "../hooks/useBlockedSlots";
import { Edit, Trash, Calendar } from "lucide-react";

type BlockedTimeSlotsListProps = {
  blockedSlots: BlockedSlot[];
  onEdit: (slot: BlockedSlot) => void;
  onDelete: (id: number) => void;
};

const BlockedTimeSlotsList = ({ 
  blockedSlots, 
  onEdit, 
  onDelete 
}: BlockedTimeSlotsListProps) => {
  return (
    <Card>
      <CardHeader className="border-b border-gray-100 bg-dashboard-background/50">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-dashboard-primary mr-2" />
          <CardTitle className="text-xl">Block Time Slots</CardTitle>
        </div>
        <CardDescription>Reserve tables for special events</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {blockedSlots.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-dashboard-text-secondary">No blocked time slots found</p>
          </div>
        ) : (
          blockedSlots.map(slot => (
            <div key={slot.id} className="p-4 border border-gray-100 rounded-lg bg-white hover:bg-dashboard-background/30 transition-colors">
              <div className="flex justify-between">
                <h3 className="font-medium text-dashboard-text-primary">{slot.name}</h3>
                <Badge variant="secondary" className="font-medium">
                  {new Date(slot.date).toLocaleDateString()}
                </Badge>
              </div>
              <p className="text-sm text-dashboard-text-secondary mt-2">
                {slot.startTime} - {slot.endTime}
              </p>
              <p className="text-sm text-dashboard-text-secondary">
                Tables: {slot.tables}
                {slot.selectedTables && slot.selectedTables.length > 0 && (
                  <span> ({slot.selectedTables.join(', ')})</span>
                )}
              </p>
              <div className="mt-3 flex justify-end space-x-2">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => onEdit(slot)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(slot.id)}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default BlockedTimeSlotsList;
