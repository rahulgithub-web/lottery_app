import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Login from "../components/Login";
import {ethers} from "ethers";
import {currency} from "../constants"

export default function Home() {
  const address = useAddress();
  const [quantity, setQuantity] = useState(1);
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTACT_ADDRESS
  );
  const { data: expiration } = useContractRead(contract, "expiration")  

  const {data: remainingTickets } = useContractRead(contract, "RemainingTickets");
   
  const {data: currentWinningReward} = useContractRead(contract, "CurrentWinningReward");

  const {data: ticketPrice} = useContractRead(contract, "ticketPrice");

  const {data: ticketCommission} = useContractRead(contract, "ticketCommission");

  if (isLoading) return <Loading />;
  if (!address) return <Login />;

  return (
    <div className="bg-[#091818] min-h-screen flex flex-col">
      <Head>
        <title>Gyani Baba!</title>
      </Head>
      <div className="flex-1">
        <Header />

        {/* The next draw box */}
        <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
          <div className="stats-container">
            <h1 className="text-5xl text-white font-semibold text-center">
              The Next Draw
            </h1>
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <h2 className="text-sm">Total Pool</h2>
                <p className="text-xl">{currentWinningReward && ethers.utils.formatEther(currentWinningReward.toString())}{" "}{currency}</p>
              </div>
              <div className="stats">
                <h2 className="text-sm">Tickets Remaining</h2>
                <p className="text-xl">{remainingTickets?.toNumber()}</p>
              </div>
            </div>

            {/* CountDown Timer */}
          </div>

          <div className="stats-container space-y-2">
            <div className="stats-container">
              <div className="flex justify-between items-center text-white pb-2">
                <h2 className="">Price per ticket </h2>
                <p>{ticketPrice && ethers.utils.formatEther(ticketPrice.toString())}{" "}{currency}</p>
              </div>
              <div className="flex text-white items-center space-x-2 bg-[#091818] border-[#004337] border p-4">
                <p>TICKETS</p>
                <input
                  className="flex w-full bg-transparent text-right outline-none"
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2 mt-5">
                <div className="text-sm second-container font-extrabold">
                  <p>Total cost of tickets</p>
                  <p>{ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString()))*quantity}{" "}{currency}</p>
                </div>

                <div className="second-container">
                  <p>Service fees</p>
                  <p>{ticketCommission && ethers.utils.formatEther(ticketCommission.toString())}{" "}{currency}</p>
                </div>

                <div className="second-container">
                  <p>Network fees</p>
                  <p>T&C</p>
                </div>
              </div>

              <button 
              disabled={expiration?.toString()< Date.now().toString || remainingTickets?.toNumber() === 0}
              className="mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-500 disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed">
                Buy Tickets
              </button>
            </div>
          </div>
        </div>

        {/* The price per ticket box */}
        <div></div>
      </div>
    </div>
  );
}
