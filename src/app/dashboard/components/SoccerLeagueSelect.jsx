import { useRef } from "react"
import { soccerLeagueData } from "../../../dataObjects/leagueData";

export default function SoccerLeagueSelect({country, handleSelect}) {
    const [league, setLeague] = useRef('None');

    return (
        <select value={league} onChange={function(e) {
            setLeague(e.target.value)
        }}>
            {soccerLeagueData.country.toLowerCase().map(l => 
                <option value={l.toLowerCase()}>
                    {l}
                </option>
                )}
        </select>
    )
}