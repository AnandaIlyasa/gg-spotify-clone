import "./style.css";
import { useContext } from "react";
import { AuthContext } from "../../App";
import useFetch from "../../hooks/useFetch";
import UserLogout from "./components/userLogout";
import Contents from "./components/contents";
import SideNavDrawer from "./components/sideNavDrawer";
import { useState } from "react";
import { useEffect } from "react";
import SideNavMenuList from "./components/sideNavMenuList";
import { createContext } from "react";

export const SideNavContext = createContext();

export default function Main() {
    const {accessToken} = useContext(AuthContext);
    const [profile] = useFetch(
        `${process.env.REACT_APP_API_URL}/v1/me`, 
        { method: "GET", headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const [playlists, setPlaylists] = useFetch(
        `${process.env.REACT_APP_API_URL}/v1/me/playlists`, 
        { method: "GET", headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const [selectedNav, setSelectedNav] = useState("HOME");
    const [showedTracks, setShowedTracks] = useState([]);

    useEffect(() => {
        if(selectedNav === "HOME") {
            fetch(
                `${process.env.REACT_APP_API_URL}/v1/me/top/tracks`,
                { method: "GET", headers: { Authorization: `Bearer ${accessToken}` } }
            ).then((response) => response.json())
            .then(data => {
                setShowedTracks(data);
            })
            .catch(e => {
                console.error(e);
            })
        } else {
            fetch(
                `${process.env.REACT_APP_API_URL}/v1/playlists/${selectedNav}/tracks`,
                { method: "GET", headers: { Authorization: `Bearer ${accessToken}` } }
            ).then((response) => response.json())
            .then(data => {
                data.items = data.items.map(items => items.track);
                setShowedTracks(data);
            })
            .catch(e => {
                console.error(e);
            })
        }
    }, [selectedNav, accessToken]);

    return (
        <div className="main-page">
            <SideNavContext.Provider value={{playlists, setPlaylists, selectedNav, setSelectedNav}}>
                <SideNavDrawer/>
                <div id="side-nav">
                    <SideNavMenuList/>
                </div>
            </SideNavContext.Provider>
            <div className="main-content">
                <div className="content-header">
                    <input className="search" placeholder="Search Song"/>
                    <UserLogout profile={profile} />
                </div>
                <Contents contents={showedTracks} />
            </div>
        </div>
    );
}