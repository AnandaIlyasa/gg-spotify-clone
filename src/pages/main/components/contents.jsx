import { Text } from "@chakra-ui/react";

export default function Contents({ contents }) {
    return (
        <div className="content-container">
            {contents?.items?.map(track => (
                <li key={track.id} className="song-item">
                    <div className="song-image">
                        <img src={track.album.images[0]?.url} alt=""/>
                        {
                            track.preview_url ?
                            <iframe 
                                className="song-preview" 
                                title={track.name} 
                                src={track.preview_url}
                                frameBorder="0" 
                                allowtransparency="true"
                                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe> :
                            <Text className="song-preview" textAlign="center" paddingTop="15%" fontWeight="bold" backgroundColor="black">
                                Preview Not Available
                            </Text>
                        }
                    </div>
                    <Text noOfLines={1} fontWeight="bold">{track.name}</Text>
                    <Text noOfLines={1}>{track.artists?.map(artist => artist.name).join(", ")}</Text>
                </li>
            ))}
        </div>
    )
}