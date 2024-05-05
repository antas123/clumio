import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import marvelLogo from "../images/marvelLogo.jpeg";
import ComicSection from "./ComicSection";
import { useQuery } from "@tanstack/react-query";
import { fetchComicsUsingSerachbar } from "../utils/helpers";

const Header = () => {
  const [searchFilteredData, setSearchFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: searchBarData } = useQuery({
    queryKey: ["searchData", {searchTerm}],
    queryFn: ()=>fetchComicsUsingSerachbar(searchTerm),
  });

  useEffect(() => {
    setSearchFilteredData(searchBarData?.data?.results)
  }, [searchBarData]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={marvelLogo} alt="Marvel Logo" width={100} height={35} />
        </div>
        <div className={styles.searchBar}>
          <input
            value={searchTerm}
            type="text"
            placeholder="Search your comic..."
            className={styles.searchInput}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchBtn} type="submit">
            Search
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <ComicSection searchFilteredData={searchFilteredData} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </>
  );
};

export default Header;
