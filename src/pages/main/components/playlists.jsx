import { Text } from "@chakra-ui/react";

export default function Playlists({ playlists }) {
    return (
        <ul>
            {playlists?.items?.map(playlistItem => (
                <li key={playlistItem.id} className="playlist-item">
                    <img src={playlistItem.images[0]?.url} alt="" />
                    <Text noOfLines={1} fontWeight="bold">{playlistItem.name}</Text>
                </li>
            ))}
        </ul>
    )
}