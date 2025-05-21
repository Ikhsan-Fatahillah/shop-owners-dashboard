
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TableType } from "../hooks/useTableTypes";
import { Edit, Trash } from "lucide-react";

type TableTypesListProps = {
  tableTypes: TableType[];
  onDelete: (id: number) => void;
};

const TableTypesList = ({ tableTypes, onDelete }: TableTypesListProps) => {
  return (
    <Card>
      <CardHeader className="border-b border-gray-100 bg-dashboard-background/50">
        <CardTitle className="text-xl">Table Types</CardTitle>
        <CardDescription>Configure the types of tables in your restaurant</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {tableTypes.map(table => (
          <div key={table.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-white hover:bg-dashboard-background/30 transition-colors">
            <div>
              <h3 className="font-medium text-dashboard-text-primary">{table.name}</h3>
              <p className="text-sm text-dashboard-text-secondary">
                {table.capacity} {table.capacity === 1 ? 'person' : 'people'} × {table.quantity} {table.quantity === 1 ? 'table' : 'tables'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => onDelete(table.id)}
              >
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TableTypesList;
