import { renderTemplateRoute } from '../route-renderer';

export default async function TemplateSubPage({
  params,
}: {
  params: Promise<{ username: string; page: string }>;
}) {
  const { username, page } = await params;
  return renderTemplateRoute(username, page);
}