import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import marvelLogo from "../images/marvelLogo.jpeg";
import ComicSection from "./ComicSection";
import { useQuery } from "@tanstack/react-query";
import { fetchComics } from "../utils/helpers";

const Header = () => {
  const [searchFilteredData, setSearchFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); //used for pagination
  const [pageData, setPageData] = useState([]); //used for displaying comics on initial render and when no filter is there
  const [selectedHeroesList, setSelectedHeroesList] = useState([]); //used for selecting heroes from carousel for filtering
  const [totalPages, setTotalpages] = useState(0);

  const { data: pageComicData, isLoading: isPageLoading } = useQuery({
    queryKey: ["heroes", {searchTerm, selectedHeroesList, page }],
    queryFn: () => fetchComics(searchTerm, selectedHeroesList, page),
  });

  useEffect(() => {
    setSearchFilteredData(pageComicData?.data?.results);
    const numberOfPages = Math.ceil(
      pageComicData?.data?.total / pageComicData?.data?.count
    );
    setTotalpages(numberOfPages);
  }, [pageComicData]);

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
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.content}>
        <ComicSection
          searchFilteredData={searchFilteredData}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          pageComicData={pageComicData}
          isPageLoading={isPageLoading}
          selectedHeroesList={selectedHeroesList}
          setSelectedHeroesList={setSelectedHeroesList}
          page={page}
          setPage={setPage}
          pageData={pageData}
          setPageData={setPageData}
          totalPages={totalPages}
          setTotalpages={setTotalpages}
        />
      </div>
    </>
  );
};

export default Header;
