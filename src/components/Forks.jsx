import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import axios from "axios";

const Forks = ({ fullRepo }) => {
  const [forks, setForks] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const currRepo = useSelector((state) => state.repo.currRepo);

  let userName = [];
  let repo = [];

  if (currRepo) {
    const repoParts = currRepo.split("/");
    userName = repoParts[0];
    repo = repoParts[1];
  }

  useEffect(() => {
    async function getForks() {
      try {
        if (typeof currRepo !== "string") {
          console.error("fullRepo should be a string");
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/forks/${userName}/${repo}/personalized`
        );
        const forksResponse = response.data.forks;
        setForks(forksResponse);
      } catch (error) {
        console.log(error);
      }
    }
    getForks();
  }, [currRepo]);

  return (
    <div
    className="flex flex-col w-full h-full items-center justify-center justify-content-center"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {isHovered && forks!==null && currRepo!==null && forks.length>0? (
      <>
        <div className="text-xl">Forks</div>
        {<div className="overflow-scroll h-52">
            {forks.map(fork => (
               <div className="border-b p-2"> 
                <img className="rounded-3xl m-2 inline-block" src={fork.forkerAvatar} alt="forker avatar" height="40px" width="40px"/>
                <span className="text-sm m-2 inline-block">{fork.forkedTimeAgo}</span>
                <div className="text-base text-sm">{fork.forkedFullRepoName}</div>
               </div> 
            ))
            }
        </div>}
      </>
    ) : (
      <>
        <div>Forks</div>
        {forks!==null && currRepo!==null ? <div className="text-xl">{forks.length}</div> : <div className="text-xl">N/A</div>}
      </>
    )}
  </div>
  
  );
};

export default Forks;