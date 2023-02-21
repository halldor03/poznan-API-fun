interface PaginationType {
  streetsPerPage: number;
  filteredStreets: string[];
  fetchedStreets: string[];
  totalStreets: number;
}

export default function Pagination({
  streetsPerPage,
  filteredStreets,
  fetchedStreets,
  totalStreets,
}: PaginationType) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalStreets / streetsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="paginationNav">
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a href="!#">{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
