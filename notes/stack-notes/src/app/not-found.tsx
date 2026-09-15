import Link from "next/link";
import { FileQuestionIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileQuestionIcon />
          </EmptyMedia>
          <EmptyTitle>No such note</EmptyTitle>
          <EmptyDescription>
            That topic is not in this stack. The list on the left is the full
            set.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button nativeButton={false} render={<Link href="/" />}>
            Back to how they fit
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
