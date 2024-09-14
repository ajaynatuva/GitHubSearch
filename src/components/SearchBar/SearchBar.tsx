import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import "../SearchResults/SearchResults.css";
import { Search } from "react-bootstrap-icons";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      const value = event.target.value;
      setQuery(value);
      onSearch(value);
    } else {
      setQuery("");
      onSearch("");
    }
  };

  return (
    <div className="searchBox">
      <InputGroup className="search-input-group">
        <Form.Control
          type="text"
          id="giHubId"
          value={query}
          onChange={handleInputChange}
          // placeholder="Search GitHub users"
          aria-describedby="Search GitHub users"
        />
        <InputGroup.Text className="search-icon">
          <Search />
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
