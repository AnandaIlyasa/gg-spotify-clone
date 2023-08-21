import { Text } from "@chakra-ui/react";

export default function Contents({ contents }) {
    return (
        <div className="content-container">
            {contents?.items?.map(track => (
                <li key={track.id} className="song-item">
                    <img src={track.album.images[0]?.url} alt=""/>
                    {
                        track.preview_url ?
                        <audio className="song-preview" controls>
                            <source src={track.preview_url}></source>
                        </audio> :
                        <Text className="song-preview" textAlign="center" fontWeight="bold" backgroundColor="black">
                            Audio Not Available
                        </Text>
                    }
                    <Text noOfLines={1} fontWeight="bold">{track.name}</Text>
                    <Text noOfLines={1}>{track.artists?.map(artist => artist.name).join(", ")}</Text>
                </li>
            ))}
        </div>
    )
}