import React from "react";
import Contact from "./Contact";
import { useSelector } from "react-redux";

const SearchResult = ({ searchResult, setSearchResults }) => {
  const {user} = useSelector(state=>state.user)
  return (
    <div className="w-full convos scrollbar ">
      <div className="flex flex-col px-8 pt-8">
        {/* Heading */}
        <h1 className="font-extralight text-md text-green_2">Contacts</h1>
        <span className="w-full mt-4 ml-10 border-b dark:border-b-dark_border_1"></span>
      </div>
      {/* Results */}
      <ul>
        {searchResult &&
          searchResult
          .filter(c=>c._id!==user._id)
          .map((contact, id) => (
            <Contact
              contact={contact}
              key={contact._id}
              lastItem={id + 1 === searchResult.length ? true : false}
              setSearchResults={setSearchResults}
            />
          ))}
      </ul>
    </div>
  );
};

export default SearchResult;
