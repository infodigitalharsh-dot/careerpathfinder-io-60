import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface DynamicFormArrayProps<T> {
  fields: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  maxItems: number;
  renderField: (item: T, index: number) => React.ReactNode;
  addButtonText: string;
  emptyMessage?: string;
  className?: string;
}

export function DynamicFormArray<T>({
  fields,
  onAdd,
  onRemove,
  maxItems,
  renderField,
  addButtonText,
  emptyMessage = "No items added yet.",
  className
}: DynamicFormArrayProps<T>) {
  return (
    <div className={className}>
      <div className="space-y-4">
        {fields.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground text-sm">{emptyMessage}</p>
            </CardContent>
          </Card>
        ) : (
          fields.map((field, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-6">
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                    onClick={() => onRemove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                {renderField(field, index)}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {fields.length < maxItems && (
        <Button
          type="button"
          variant="outline"
          onClick={onAdd}
          className="mt-4 w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          {addButtonText}
        </Button>
      )}

      {fields.length >= maxItems && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Maximum {maxItems} items allowed
        </p>
      )}
    </div>
  );
}