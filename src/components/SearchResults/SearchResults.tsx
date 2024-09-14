import React from "react";
import UserCard from "../UseCard/UseCard";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";

interface SearchResultsProps {
  results: any;
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  loading,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    onPageChange(page); 
  };

  return (
    <>
      <div className="search-results">
        <div className="totalRes">Total Results: {totalPages}</div>
        <div className="searchResults">
          {results.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
      <div className="pag">
        <Stack spacing={2}>
          <Pagination
            style={{ width: "500px" }}
            count={totalPages} // Total number of pages
            page={currentPage} // Current page
            onChange={handlePageChange} // Handler when a page is clicked
          />
        </Stack>
      </div>
    </>
  );
};

export default SearchResults;
