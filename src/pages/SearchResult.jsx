import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { fetchDataFromApi } from "../utils/Api";
import { DataContext } from "../context/ContextApi";
import LeftNav from "../components/LeftNav";
import SearchResultVideoCard from "../components/SearchResultVideoCard";
import UseOnline from "../utils/UseOnline";
import OfflineComponent from "../shared/OfflineComponent";
import ShimmerSearchResultVideoCard from "../shared/ShimmerSearchResultVideoCard";

const SearchResult = () => {
  const [result, setResult] = useState("");
  const { searchQuery } = useParams();
  const { setLoading } = useContext(DataContext);

  const isOnline = UseOnline();

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    setLoading(true);
    const data = await fetchDataFromApi(`search/?q=${searchQuery}`);
    // console.log(data);
    setResult(data?.contents);
    setLoading(false);
  };

  return (
    <div className="flex h-[calc(100%-56px)]">
      <LeftNav />

      {!isOnline && (
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
          <OfflineComponent />
        </div>
      )}
      {isOnline && (
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-white dark:bg-black">
          <div className="grid grid-cols-1 gap-2 p-5">
            {result === ""
              ? Array(20)
                  .fill("")
                  .map((e, index) => {
                    return <ShimmerSearchResultVideoCard key={index} />;
                  })
              : result?.map((item, index) => {
                  if (item?.type !== "video") return false;
                  return (
                    <SearchResultVideoCard key={index} video={item?.video} />
                  );
                })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
