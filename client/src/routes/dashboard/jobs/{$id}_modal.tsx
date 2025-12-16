import {
  Building05Icon,
  Location09Icon,
  MoneyBag02Icon
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import { findJobQuery } from '@/modules/jobs/api';

export const Route = createFileRoute('/dashboard/jobs/{$id}_modal')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(findJobQuery(params.id));
  }
});

function RouteComponent() {
  const navigate = useNavigate();
  const params = Route.useParams();
  const {
    data: { data }
  } = useSuspenseQuery(findJobQuery(params.id));

  return (
    <Sheet
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          navigate({
            to: '/dashboard/jobs'
          });
        }
      }}
    >
      <SheetContent className="p-4">
        <SheetHeader />

        <ul className="space-y-8">
          <div>
            <li className="mb-1 text-muted-foreground text-xs">
              {data.createdAt && new Date(data.createdAt).toLocaleDateString()}
            </li>
            <li className="font-bold text-2xl">{data.position}</li>
            <li className="mt-2 font-medium">
              {data.companyUrl ? (
                <a
                  href={data.companyUrl}
                  target="_blank"
                  tabIndex={-1}
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <HugeiconsIcon
                    icon={Building05Icon}
                    className="size-[18px]"
                  />
                  {data.company}
                </a>
              ) : (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <HugeiconsIcon
                    icon={Building05Icon}
                    className="size-[18px]"
                  />
                  {data.company}
                </span>
              )}
            </li>
          </div>
          <div className="space-y-2 [*>&_svg]:size-5 [*>&_svg]:text-muted-foreground">
            <li className="flex items-center">
              <HugeiconsIcon icon={Location09Icon} />
              <span className="font-medium">: {data.location}</span>
            </li>
            <li className="flex items-center">
              <HugeiconsIcon icon={MoneyBag02Icon} />
              <span className="font-medium">
                :
                {data.salary
                  ? ` $${data.salary.toLocaleString()}`
                  : 'Not specified'}
              </span>
            </li>
            <br />
            <li className="space-x-2">
              <Badge
                variant={
                  data.stage === 'Offer'
                    ? 'success'
                    : data.stage === 'Applied'
                      ? 'info'
                      : data.stage === 'Interview'
                        ? 'warn'
                        : 'secondary'
                }
              >
                {data.stage}
              </Badge>

              <Badge variant="secondary">{data.type}</Badge>
            </li>
          </div>
        </ul>

        {data.interviewDate && (
          <>
            <div>
              <strong>Interview Date:</strong>{' '}
              {data.interviewDate
                ? new Date(data.interviewDate).toLocaleDateString()
                : 'Not set'}
            </div>
            <div>
              <strong>Interview Type:</strong> {data.interviewType || 'N/A'}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
