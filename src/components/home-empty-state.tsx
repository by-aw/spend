import { Card } from "./ui/card";

function HomeEmptyState() {
  return (
    <Card className="flex h-full flex-grow rounded-lg bg-accent">
      <p className="text-2xl font-medium m-auto">No entries yet</p>
    </Card>
  );
}

export default HomeEmptyState;
