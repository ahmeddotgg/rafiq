import { Add01Icon, Loading02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { DateInput } from '@/components/shared/date-input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { $api } from '@/lib/api';
import { queryClient } from '@/main';
import { type FormData, formSchema } from '../models';

export function JobForm() {
  const [open, setopen] = useState(false);
  const { mutate, isPending } = $api.useMutation('post', '/api/jobs');

  const form = useForm({
    defaultValues: {
      position: '',
      company: '',
      location: '',
      stage: 'Applied',
      applicationUrl: null,
      companyUrl: null,
      salary: null,
      type: null,
      interviewDate: null,
      interviewType: null
    } as FormData,
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      mutate(
        { body: { ...value, createdBy: 'test_user' } },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['get'] });
            form.reset();
            setopen(false);
            toast.success('Job submitted successfully.', { richColors: true });
          }
        }
      );
    }
  });

  return (
    <AlertDialog open={open} onOpenChange={setopen}>
      <AlertDialogTrigger
        render={
          <Button className="[&_svg]:size-[17px]">
            <HugeiconsIcon icon={Add01Icon} strokeWidth={3.5} />
            <span>Add new job</span>
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create new job</AlertDialogTitle>
        </AlertDialogHeader>

        <ScrollArea className="h-86 pe-3 md:h-auto">
          <form
            className="space-y-4 px-1"
            id="job-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="position"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Position *</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Software Engineer"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="company"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Company *</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Company Name"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="location"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Location *</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="City, State"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="salary"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Salary</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        value={field.state.value || ''}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                        aria-invalid={isInvalid}
                        placeholder="Annual salary"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <Field orientation="horizontal">
                <form.Field
                  name="stage"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Stage *</FieldLabel>
                        <Select
                          name={field.name}
                          value={field.state.value}
                          onValueChange={(value) =>
                            field.handleChange(value || 'Applied')
                          }
                        >
                          <SelectTrigger aria-invalid={isInvalid}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Saved">Saved</SelectItem>
                            <SelectItem value="Applied">Applied</SelectItem>
                            <SelectItem value="Interview">Interview</SelectItem>
                            <SelectItem value="Offer">Offer</SelectItem>
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="type"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Type</FieldLabel>
                        <Select
                          name={field.name}
                          value={field.state.value || null}
                          onValueChange={(value) => field.handleChange(value)}
                        >
                          <SelectTrigger aria-invalid={isInvalid}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={null}>N/A</SelectItem>
                            <SelectItem value="On-site">On-site</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                            <SelectItem value="Remote">Remote</SelectItem>
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </Field>

              <Field orientation="responsive">
                <form.Field
                  name="companyUrl"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Company URL
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="url"
                          value={field.state.value || ''}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value || null)
                          }
                          aria-invalid={isInvalid}
                          placeholder="https://company.com"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="applicationUrl"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Application URL
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="url"
                          value={field.state.value || ''}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value || null)
                          }
                          aria-invalid={isInvalid}
                          placeholder="https://application.com"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </Field>

              <Field orientation="responsive">
                <form.Field
                  name="interviewDate"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <DateInput
                          label="Interview Date"
                          value={field.state.value || ''}
                          onBlur={field.handleBlur}
                          onChange={(value) =>
                            field.handleChange(value || null)
                          }
                          aria-invalid={isInvalid}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="interviewType"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Interview Type
                        </FieldLabel>
                        <Select
                          name={field.name}
                          value={field.state.value || null}
                          onValueChange={(value) => field.handleChange(value)}
                        >
                          <SelectTrigger aria-invalid={isInvalid}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={null}>N/A</SelectItem>
                            <SelectItem value="Phone">Phone</SelectItem>
                            <SelectItem value="Video">Video</SelectItem>
                            <SelectItem value="In-person">In-person</SelectItem>
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </Field>
            </FieldGroup>
          </form>
        </ScrollArea>

        <AlertDialogFooter>
          <AlertDialogCancel
            variant="outline"
            onClick={() => form.reset()}
            disabled={isPending}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction type="submit" form="job-form" disabled={isPending}>
            {isPending ? (
              <>
                <HugeiconsIcon icon={Loading02Icon} />
                <span>Loading</span>
              </>
            ) : (
              'Submit'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
