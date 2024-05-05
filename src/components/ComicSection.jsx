import React, { useState, useEffect } from "react";
import styles from "./FilterCarousel.module.css";
import ComicCard from "./ComicCard";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCarouselHeroes,
  fetchComicsByCharacter,
  fetchComics,
} from "../utils/helpers";
import Pagination from "./Pagination";
import Carousel from "./Carousel";

const ComicSection = ({ searchFilteredData, searchTerm, setSearchTerm }) => {
  const [page, setPage] = useState(1); //used for pagination
  const [totalPages, setTotalpages] = useState(0);
  const [pageData, setPageData] = useState([]); //used for displaying comics on initial render and when no filter is there
  const [heroesForCarousel, setHeroesForCarousel] = useState([]); //used for displaying heroes on carousel
  const [selectedHeroesList, setSelectedHeroesList] = useState([]); //used for selecting heroes from carousel for filtering
  const [dataFilteredByCarousel, setDataFilteredByCarousel] = useState([]); //to display filtered data , filtered by carousel heroes selection

  const removeFilters = () => {
    setSearchTerm("");
    setDataFilteredByCarousel([]);
    setSelectedHeroesList([]);
    setPageData(pageComicData?.data?.results);
    const numberOfPages = Math.ceil(
      pageComicData?.data?.total / pageComicData?.data?.count
    );
    setTotalpages(numberOfPages);
    console.log(totalPages, "bcdi");
  };

  //useQueries for data fetching========================================================================
  const { data: carouselData } = useQuery({
    queryKey: ["heroesOnCarousel"],
    queryFn: fetchCarouselHeroes,
  });

  const { data: pageComicData, isLoading: isPageLoading } = useQuery({
    queryKey: ["heroes", { page }],
    queryFn: () => fetchComics(page),
  });

  const { data: selectedHeroesData, isLoading: selectedHeroesDataIsLoading } = useQuery({
      queryKey: ["selectedHeroes", { selectedHeroesList, setPageData, page }],
      queryFn: () => fetchComicsByCharacter(selectedHeroesList, setPageData, pageComicData, page),
    });

  useEffect(() => {
    setPageData(pageComicData?.data?.results);
    const numberOfPages = Math.ceil(
      pageComicData?.data?.total / pageComicData?.data?.count
    );
    setTotalpages(numberOfPages);
  }, [pageComicData]);

  useEffect(() => {
    setHeroesForCarousel(carouselData?.data?.results);
  }, [carouselData]);

  useEffect(() => {
    setDataFilteredByCarousel(selectedHeroesData?.data?.results);
    const numberOfPages = Math.ceil(
      selectedHeroesData?.data?.total / selectedHeroesData?.data?.count
    );
    setTotalpages(numberOfPages);
  }, [selectedHeroesData]);

  console.log(totalPages, "kokokok");

  return (
    <>
      <Carousel
        searchTerm={searchTerm}
        heroesForCarousel={heroesForCarousel}
        selectedHeroesList={selectedHeroesList}
        setSelectedHeroesList={setSelectedHeroesList}
      />

      <div className={styles.container}>
        {isPageLoading || selectedHeroesDataIsLoading ? (
          <div style={{ height: "100vh", color: "white" }}>
            Loading please wait....
            <div className={styles.loader}></div>
          </div>
        ) : (
          <>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            <div style={{ textAlign: "right", padding: "25px 100px" }}>
              <button className={styles.removeFilter} onClick={removeFilters}>
                remove all filters
              </button>
            </div>
            <div className={styles.subContainer}>
              {searchFilteredData
                ? searchFilteredData?.map((data, index) => (
                    <ComicCard data={data} key={index} />
                  ))
                : dataFilteredByCarousel
                ? dataFilteredByCarousel?.map((data, index) => (
                    <ComicCard data={data} key={index} />
                  ))
                : pageData?.map((data, index) => (
                    <ComicCard data={data} key={index} />
                  ))}
            </div>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </>
        )}
      </div>
    </>
  );
};

export default ComicSection;
