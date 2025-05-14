
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BlockedSlot } from "../hooks/useBlockedSlots";

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
      <CardHeader>
        <CardTitle>Block Time Slots</CardTitle>
        <CardDescription>Reserve tables for special events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {blockedSlots.map(slot => (
            <div key={slot.id} className="p-3 border rounded-lg">
              <div className="flex justify-between">
                <h3 className="font-medium">{slot.name}</h3>
                <Badge variant="outline">{new Date(slot.date).toLocaleDateString()}</Badge>
              </div>
              <p className="text-sm text-gray-500">
                {slot.startTime} - {slot.endTime}
              </p>
              <p className="text-sm text-gray-500">
                Tables: {slot.tables}
              </p>
              <div className="mt-2 flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEdit(slot)}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => onDelete(slot.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockedTimeSlotsList;
