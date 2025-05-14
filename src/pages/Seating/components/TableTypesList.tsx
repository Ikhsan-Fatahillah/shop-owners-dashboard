
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TableType } from "../hooks/useTableTypes";

type TableTypesListProps = {
  tableTypes: TableType[];
  onDelete: (id: number) => void;
};

const TableTypesList = ({ tableTypes, onDelete }: TableTypesListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Table Types</CardTitle>
        <CardDescription>Configure the types of tables in your restaurant</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tableTypes.map(table => (
            <div key={table.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h3 className="font-medium">{table.name}</h3>
                <p className="text-sm text-gray-500">
                  {table.capacity} {table.capacity === 1 ? 'person' : 'people'} × {table.quantity} {table.quantity === 1 ? 'table' : 'tables'}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => onDelete(table.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TableTypesList;
