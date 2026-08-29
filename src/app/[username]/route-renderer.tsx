import { notFound } from 'next/navigation';
import { PublicTemplateViewer } from '@/components/engine/PublicTemplateViewer';
import {
  createPublicSeedData,
  findManifestByHandle,
  loadTemplateModule,
} from '@/components/templates/platform';

/**
 * Canonical public template rendering. Resolves templates exclusively through
 * the Template Platform resolver — the same mechanism the builder canvas uses,
 * eliminating builder/public drift. Implementations arrive via lazy chunks;
 * on the server this simply awaits the module before returning JSX.
 */
export async function renderTemplateRoute(username: string, pageSlug?: string | null) {
  const lowercaseHandle = username.toLowerCase();
  const manifest = findManifestByHandle(lowercaseHandle);

  if (!manifest) {
    return null;
  }

  const resolved = await loadTemplateModule(manifest.id);
  if (!resolved) {
    return null;
  }

  if ('definition' in resolved) {
    const targetPage =
      resolved.definition.pages.find((page) => page.slug === (pageSlug || '')) ||
      (!pageSlug ? resolved.definition.pages[0] : null);

    if (!targetPage) {
      notFound();
    }

    return (
      <PublicTemplateViewer handle={lowercaseHandle} defaultData={createPublicSeedData(manifest)}>
        <resolved.Renderer
          definition={resolved.definition}
          activePageId={targetPage.id}
          mode="public"
          handle={lowercaseHandle}
          templateId={manifest.id}
        />
      </PublicTemplateViewer>
    );
  }

  const targetPage = manifest.pages && manifest.pages.length > 0
    ? manifest.pages.find((page) => page.slug === (pageSlug || '')) || (!pageSlug ? manifest.pages[0] : null)
    : null;

  if (pageSlug && !targetPage) {
    notFound();
  }

  return (
    <PublicTemplateViewer handle={lowercaseHandle} defaultData={createPublicSeedData(manifest)}>
      {resolved.renderFree(
        { templateId: manifest.id, profileName: manifest.profileName, profileHandle: manifest.profileHandle },
        {},
        targetPage ? targetPage.id : undefined
      )}
    </PublicTemplateViewer>
  );
}
