import React from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import "../SortDropdownsProps/SortDropDown.css";

interface SortDropdownProps {
  onSort: (sortType: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSort }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSort(event.target.value);
  };

  return (
    <div>
      <Form.Select defaultValue="Name (A-Z)" onChange={handleSortChange}>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="rank-asc">Rank ↑</option>
        <option value="rank-desc">Rank ↓</option>
      </Form.Select>
    </div>
  );
};

export default SortDropdown;
