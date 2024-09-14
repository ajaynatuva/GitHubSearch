import React, { useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import "../UseCard/UseCard.css";
import { Pagination } from "@mui/material";
interface Repo {
  id: number;
  name: string;
  language: string;
}

interface UserCardProps {
  user: {
    id: number;
    login: string;
    avatar_url: string;
    url: string;
    // html_url: string; // Uncomment if you want to use this later
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [repos, setRepos] = useState<Repo[]>([]);

  const handleDetailsClick = async () => {
    setShowDetails(!showDetails);
    if (!showDetails) {
      const response = await fetch(
        `https://api.github.com/users/${user.login}/repos`
      );
      const data = await response.json();
      setRepos(data);
    }
  };
  return (
    <div className="user-card">
      <Card className="flex-row align-items-center card-container">
        {/* Left-aligned image */}
        <Card.Img
          variant="left"
          style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          src={user.avatar_url}
          className="avatar-img"
        />

        {/* User info: name and details */}
        <div
          className="user-info"
        >
          {/* User name */}
          <h5 className="userName">{user.login}</h5>
          <h6>Profile URL:{user.url}</h6>
          {/* Details under the user name */}
          <Card.Body style={{ padding: "0" }}>
            <div
              style={{
                overflowY: showDetails ? "scroll" : "hidden",
                height:showDetails? "150px":"0px",
              }}
            >
              {showDetails ? (
                <table className="repo-table">
                  <tbody>
                    {repos.map((repo) => (
                      <tr key={repo.id}>
                        {/* Repo name */}
                        <td>{repo.name}</td>

                        {/* Repo language */}
                        <td>{repo.language || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : undefined}
            </div>
          </Card.Body>
        </div>

        {/* Button to toggle details */}
        <Button
          className="useBtn"
          variant="primary"
          onClick={handleDetailsClick}
          style={{ backgroundColor: "white",color: "#1283a9", marginLeft: "auto" }}          >
          {showDetails ? "Collapse" : "Details"}
        </Button>
      </Card>
    </div>
  );
};

export default UserCard;
