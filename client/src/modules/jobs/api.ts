import { $api } from '@/lib/api';

export const allJobsQuery = $api.queryOptions('get', '/api/jobs');

export const findJobQuery = (id: string) => {
  return $api.queryOptions('get', '/api/jobs/{id}', {
    params: { path: { id } }
  });
};
