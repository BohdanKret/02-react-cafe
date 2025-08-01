import CafeInfo from "../CafeInfo/CafeInfo";
import Notification from "../Notification/Notification";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import css from "./App.module.css";
import { useState } from "react";
import { type Votes, type VoteType } from "../../types/votes";

function App() {
 const [votes, setVotes] = useState<Votes>({
   good: 0,
   neutral: 0,
   bad: 0,
 });
  
  function handleVote(type: VoteType) {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  };

  function resetVotes() {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes ? Math.round((votes.good / totalVotes) * 100) : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={totalVotes >= 1} />
      {totalVotes >= 1 && <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} />}
      {totalVotes === 0 && <Notification/>}
    </div>
  );
}

export default App;
