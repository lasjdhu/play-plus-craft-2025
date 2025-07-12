export const getResponsiveImageUrl = (
  baseUrl: string,
  isLargeScreen: boolean,
): string => {
  const url = new URL(baseUrl);

  if (!isLargeScreen) {
    url.searchParams.set("w", "600");
  }

  return url.toString();
};
