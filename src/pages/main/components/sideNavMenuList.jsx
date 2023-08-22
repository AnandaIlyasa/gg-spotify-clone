import { Text } from "@chakra-ui/react";
import { useContext } from "react";
import { SideNavContext } from "..";
import PlaylistEditPopoverForm from "./editPlaylistForm";

export default function SideNavMenuList({ onClose }) {
    const {playlists, selectedNav, setSelectedNav} = useContext(SideNavContext);
    return (
        <>
            <div
                style={{backgroundColor: selectedNav === "HOME" ? "rgb(50, 50, 50)" : ""}}
                className="nav-home" onClick={() => {
                setSelectedNav("HOME");
                if(onClose) {
                    onClose();
                }
            }}>
                <span className="fa fa-home"/>
                <Text fontWeight="bold">Home</Text>
            </div>
            <ul>
                {playlists?.items?.map((playlistItem, idx) => (
                    <li
                        key={playlistItem.id}
                        style={{backgroundColor: selectedNav === playlistItem.id ? "rgb(50, 50, 50)" : ""}}
                        onClick={() => {
                            setSelectedNav(playlistItem.id);
                            if(onClose) {
                                onClose();
                            }
                        }}
                        className="playlist-item"
                    >
                        <img src={playlistItem.images[0]?.url} alt="" />
                        <PlaylistEditPopoverForm playlist={playlistItem} index={idx}>
                            <Text noOfLines={1} fontWeight="bold">{playlistItem.name}</Text>
                        </PlaylistEditPopoverForm>
                    </li>
                ))}
            </ul>
        </>
    )
}