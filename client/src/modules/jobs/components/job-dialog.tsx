import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import type { components } from '@/lib/schema';

type job = components['schemas']['Job'];

export function JobDialog({ job }: { job: job }) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="link" className="p-0">
            {job.position}
          </Button>
        }
      />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <h1>{job.position}</h1>
          <p>{job.company}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
