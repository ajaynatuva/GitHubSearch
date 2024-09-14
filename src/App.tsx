import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import { Card, Navbar } from "react-bootstrap";
import SortDropdown from "./components/SortDropdownsProps/SortDropdown";

export interface User {
  score: any;
  id: number;
  login: string;
  avatar_url: string;
}

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("name-asc");
  const [currentPage, setCurrentPage] = useState<number>(1); // Track the current page
  const [totalPages, setTotalPages] = useState<number>(0); // Track the total pages
  const [query, setQuery] = useState<string>(""); // Keep track of the search query
  const perPage = 30;
  const fetchSearchResults = async (page: number = 1) => {
    if (query.trim().length > 0) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${query}&page=${page}&per_page=${perPage}`
        );
        const data = await response.json();
        if (data.items) {
          setSearchResults(data.items);
          setTotalPages(Math.ceil(data.total_count / perPage));
        }
        // Calculate the total number of pages
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      setLoading(false);
    } else {
      setSearchResults([]);
      setTotalPages(0); // Reset pagination
    }
  };
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery.trim()); // Update the query state and trim extra spaces
    setCurrentPage(1); // Reset to the first page
    fetchSearchResults(1); // Fetch the first page of results
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the current page
    fetchSearchResults(page); // Fetch the results for the new page
  };
  const handleSort = (option: string) => {
    setSortOption(option);
  };

  const getSortedResults = () => {
    let sortedResults = [...searchResults];
    switch (sortOption) {
      case "name-asc":
        return sortedResults.sort((a, b) => a.login.localeCompare(b.login));
      case "name-desc":
        return sortedResults.sort((a, b) => b.login.localeCompare(a.login));
      case "rank-asc":
        return sortedResults.sort((a, b) => a.score - b.score); // Assuming 'score' is Rank
      case "rank-desc":
        return sortedResults.sort((a, b) => b.score - a.score);
      default:
        return sortedResults;
    }
  };
  return (
    <div className="App">
      <Navbar expand="lg" className="navBarColor">
        <div className="navContent">
          <SortDropdown onSort={handleSort} />
          <SearchBar onSearch={handleSearch} />
        </div>
      </Navbar>
      <Card>
        {getSortedResults().length > 0 ? (
          <Card.Body className="cardBody">
            <SearchResults
              results={getSortedResults()}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Card.Body>
        ) : (
          <Card.Body className="cardBody">No results found.</Card.Body>
        )}
      </Card>
    </div>
  );
};

export default App;
