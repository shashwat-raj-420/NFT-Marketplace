import React, { useEffect, useState } from "react";
import { useBlockchainContext } from "../context/BlockchainContext";
import { Container, Row, Col } from "reactstrap";
import RealNFTCard from "../components/ui/Nft-card/RealNFTCard";
import CommonSection from "../components/ui/Common-section/CommonSection";

const MyNFTs = () => {

  const { contract, currentAccount } = useBlockchainContext();

  const [myNFTs, setMyNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadMyNFTs = async () => {

      if (!contract || !currentAccount) {
        setLoading(false);
        return;
      }

      try {
        console.log("Contract:", contract);
        console.log("Account:", currentAccount);

        const nfts = await contract.getMyNFTs(currentAccount);

        console.log("RAW NFTs:", nfts);

        const formattedNFTs = nfts.map(nft => ({
          tokenId: Number(nft.tokenId),
          owner: nft.owner
        }));

        console.log("Formatted NFTs:", formattedNFTs);

        setMyNFTs(formattedNFTs);

      } catch (error) {
        console.error(error);
      }

      setLoading(false);

    };

    loadMyNFTs();

  }, [contract, currentAccount]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <CommonSection title={"Your NFTs"} />

      <section>
        <Container>
          {currentAccount ? (
            <Row>
              {myNFTs.length === 0 ? (
                <Col lg="12" className="text-center">
                  <p>You don't have any NFTs yet. Create one!</p>
                </Col>
              ) : (
                myNFTs.map(nft => (
                  <Col lg="3" md="4" sm="6" className="mb-4" key={nft.tokenId}>
                    <RealNFTCard tokenId={nft.tokenId} contract={contract} />
                  </Col>
                ))
              )}
            </Row>
          ) : (
            // Display a message if user is not connected
            <Col lg="12" className="text-center">
              <p>Please connect your wallet to view your NFTs.</p>
            </Col>

          )}

        </Container>
      </section>
    </>
  );

};

export default MyNFTs;


// loading ? ( // Display loading message while fetching data
//                 <Col lg="12" className="text-center">
//                   <p>Loading...</p>
//                 </Col>
//               ) :

// import React, { useState, useEffect } from "react";
// import { Container, Row, Col } from "reactstrap";
// import CommonSection from "../components/ui/Common-section/CommonSection";
// import RealNFTCard from "../components/ui/Nft-card/RealNFTCard";
// import { useBlockchainContext } from "../context/BlockchainContext";

// const MyNFTs = () => {
//   const { contract, currentAccount } = useBlockchainContext();
//   const [myNFTIds, setMyNFTIds] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadMyNFTs = async () => {
//       if (contract && currentAccount) {
//         try {
//           // console.log(currentAccount);
//           // console.log("start");
//             const nfts = await contract.getMyNFTs(currentAccount);
//             const nftIds = nfts.map(nft => nft.tokenId.toNumber());
//             setMyNFTIds(nftIds);
//             // This is important to understand why console.log(myNFTIds) is giving empty.
//             // Probably because it gives the previous state.
//             // console.log(myNFTIds);
//           // console.log("done");
//           setLoading(false); // Data fetching completed
//         } catch (error) {
//           console.error("Error fetching NFTs:", error);
//           setLoading(false); // Data fetching completed even in case of error
//         }
//       } else {
//         // console.log("no contract or currentaccount");
//         setLoading(false); // Data fetching completed even if contract or account is not available
//       }
//     };
//     loadMyNFTs();

//     const handleNFTMinted = (tokenId, owner) => {
//       // When NFTMinted event is emitted, call loadMyNFTs with the new tokenId
//       loadMyNFTs();
//       // setMyNFTIds([...myNFTIds, tokenId]);
//       // console.log("event called");
//     };

//     if (contract) {
//       contract.on("NFTMinted", handleNFTMinted);

//       // Cleanup the event listener when the component unmounts
//       return () => {
//         contract.off("NFTMinted", handleNFTMinted);
//       };
//     }

//   }, [contract, currentAccount]);

//   return (
//     <>
//       <CommonSection title={"Your NFTs"} />

//       <section>
//         <Container>
//           {currentAccount ? (
//           <Row>
//               {loading ? ( // Display loading message while fetching data
//                       <Col lg="12" className="text-center">
//                         <p>Loading...</p>
//                       </Col>
//                 ) : myNFTIds.length === 0 ? (
//                   <Col lg="12" className="text-center">
//                     <p>You don't have any NFTs yet. Create one!</p>
//                   </Col>
//               ) : (
//                 myNFTIds.map(tokenId => (
//                   <Col lg="3" md="4" sm="6" className="mb-4" key={tokenId}>
//                     <RealNFTCard tokenId={tokenId} contract={contract} />
//                   </Col>
//                 ))
//               )}
//         </Row>
//         ) : (
//           // Display a message if user is not connected
//           <Col lg="12" className="text-center">
//                     <p>Please connect your wallet to view your NFTs.</p>
//           </Col>

//         )}

//         </Container>
//       </section>
//     </>
//   );
// };

// export default MyNFTs;



// import React, { useState, useEffect } from "react";
// import { Container, Row, Col } from "reactstrap";
// import CommonSection from "../components/ui/Common-section/CommonSection";
// import RealNFTCard from "../components/ui/Nft-card/RealNFTCard";
// import { useBlockchainContext } from "../context/BlockchainContext";

// const MyNFTs = () => {
//   const {contract, currentAccount}= useBlockchainContext();
//   const [myNFTIds, setMyNFTIds] = useState([]);

//   useEffect(()=>{
//     const loadMyNFTs = async () => {
//       if (contract && currentAccount) {
//         // console.log("start");
//         const nfts = await contract.getMyNFTs(currentAccount);
//         const nftIds = nfts.map(nft => nft.tokenId.toNumber());
//         setMyNFTIds(nftIds);
//         // console.log("done");
//         // This is important to understand why console.log(myNFTIds) is giving empty.
//         // Probably because it gives the previous state.
//         // console.log(myNFTIds);
//       }
//       else {
//         console.log("no contract or currentaccount");
//       }
//     };
//     loadMyNFTs();
//   }, [contract, currentAccount]);

//   return (
//     <>
//       <CommonSection title={"Your NFTs"} />

//       <section>
//         <Container>
//         <Row>
//             {myNFTIds.length === 0 ? (
//               <Col lg="12" className="text-center">
//                 <p>You don't have any NFTs yet. Create one!</p>
//               </Col>
//             ) : (
//               myNFTIds.map(tokenId => (
//                 <Col lg="3" md="4" sm="6" className="mb-4" key={tokenId}>
//                   <RealNFTCard tokenId={tokenId} contract={contract} />
//                 </Col>
//               ))
//             )}
//           </Row>
//         </Container>
//       </section>

//     </>
//   );
// };

// export default MyNFTs;
