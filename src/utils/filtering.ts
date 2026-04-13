export interface ServiceItem {
  title: string;
  cat: string;
  desc: string;
  price: string;
  icon: string;
  tags: string[];
}

export const filterServices = (
  services: ServiceItem[],
  activeCat: string,
  searchQuery: string
): ServiceItem[] => {
  return services.filter((s) => {
    const matchesCat = activeCat === "All" || s.cat === activeCat;
    const matchesSearch =
      !searchQuery ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });
};
