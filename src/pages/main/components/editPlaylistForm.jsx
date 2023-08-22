import { EditIcon } from "@chakra-ui/icons"
import { ButtonGroup, FocusLock, FormControl, Button, FormLabel, IconButton, Input, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack, useDisclosure, useToast } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { forwardRef, useRef } from "react"
import { SideNavContext } from ".."
import { AuthContext } from "../../../App"

const TextInput = forwardRef((props, ref) => {

    return (
      <FormControl>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <Input ref={ref} id={props.id} {...props} isRequired errorBorderColor='red.300' isInvalid={props.isInvalid}  />
      </FormControl>
    )}
)
  
const Form = ({ onSubmit, firstFieldRef, onCancel, inputValue, setInputValue, isInvalid }) => {
    return (
        <Stack spacing={4}>
            <TextInput
                label='Playlist name'
                id='playlist-name'
                ref={firstFieldRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <ButtonGroup display='flex' justifyContent='flex-end'>
                <Button variant='outline' onClick={onCancel}>
                    Cancel
                </Button>
                <Button isDisabled={isInvalid} onClick={onSubmit} colorScheme='teal'>
                    Save
                </Button>
            </ButtonGroup>
        </Stack>
    )
}
  
const PlaylistEditPopoverForm = ({ children, playlist, index }) => {
    const {accessToken} = useContext(AuthContext);
    const {playlists, setPlaylists} = useContext(SideNavContext);
    const { onOpen, onClose, isOpen } = useDisclosure();
    const firstFieldRef = useRef(null);
    const [playlistName, setPlaylistName] = useState(playlist.name);
    const toast = useToast();

    const cancelHandler = () => {
        setPlaylistName(playlist.name);
        onClose();
    }
    
    const isInvalid = playlistName === "" || playlistName === playlist.name;

    const onSubmit = () => {
        console.log("onSubmit")
        if(isInvalid) {
            onClose();
            toast({
                title: 'Invalid Input',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else {
            console.log("update fetch called: ", accessToken)
            fetch(`${process.env.REACT_APP_API_URL}/v1/playlists/${playlist.id}`,
            { method: "PUT", headers: { Authorization: `Bearer ${accessToken}` }, body: JSON.stringify({name: playlistName}) }
            )
                .then((response) => {
                    if(response.ok) {
                        toast({
                            title: 'Playlist updated successfully',
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                        });
                        const newPlaylistItems = playlists.items;
                        newPlaylistItems[index].name = playlistName;
                        setPlaylists({
                            ...playlists,
                            items: newPlaylistItems
                        })
                    } else {
                        toast({
                            title: `Error updating playlist with code: ${response.status}`,
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                        });
                    }
                    onClose();
                })
                .catch(e => {
                    console.error(e);
                    toast({
                        title: `Error updating playlist`,
                        description: `${e}`,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                    onClose();
                });
        }
    }

    return (
        <>
            {children}
            <Popover
                isOpen={isOpen}
                initialFocusRef={firstFieldRef}
                onOpen={onOpen}
                onClose={onClose}
                closeOnBlur={false}
                placement='right'
            >
                <PopoverTrigger>
                    <IconButton
                        backgroundColor="rgb(30, 30, 30)"
                        color="white"
                        _hover={{backgroundColor: "rgb(30, 30, 30)"}}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        size='sm'
                        marginLeft={1}
                        icon={<EditIcon />}
                    />
                </PopoverTrigger>
                <PopoverContent 
                    p={5} 
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    backgroundColor="rgb(50, 50, 50)"
                >
                    <FocusLock returnFocus persistentFocus={true}>
                        <PopoverArrow />
                        <PopoverCloseButton onClick={cancelHandler}/>
                        <Form onSubmit={onSubmit} isInvalid={isInvalid} firstFieldRef={firstFieldRef} onCancel={cancelHandler} inputValue={playlistName} setInputValue={setPlaylistName} />
                    </FocusLock>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default PlaylistEditPopoverForm;