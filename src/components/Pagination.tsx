interface PaginationType {
  streetsPerPage: number;
  filteredStreets: string[];
  fetchedStreets: string[];
  totalStreets: number;
  paginate: any;
  currentPage: number;
}

export default function Pagination({
  streetsPerPage,
  filteredStreets,
  fetchedStreets,
  totalStreets,
  paginate,
  currentPage,
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
            <a
              className={number === currentPage ? "activePage" : "inactivePage"}
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// {pageNumbers.map((number) => (
//   <li key={number}>
//     <a
//       className={number === currentPage ? "activePage" : "inactivePage"}
//       onClick={() => paginate(number)}
//       href="!#"
//     >
//       {number}
//     </a>
//   </li>
// ))}

// TO DO:
// - pagination ...?
// - CSS
// - polish up TS

// https://react-leaflet.js.org/
// https://leafletjs.com/
