import { EditIcon } from "@chakra-ui/icons"
import { ButtonGroup, FocusLock, FormControl, Button, FormLabel, IconButton, Input, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack, useDisclosure } from "@chakra-ui/react"
import { forwardRef, useRef } from "react"

const TextInput = forwardRef((props, ref) => {
    return (
      <FormControl>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <Input ref={ref} id={props.id} {...props} isRequired={true} />
      </FormControl>
    )}
)
  
const Form = ({ firstFieldRef, onCancel, playlist }) => {
    return (
        <Stack spacing={4}>
            <TextInput
                label='Playlist name'
                id='playlist-name'
                ref={firstFieldRef}
                defaultValue={playlist.name}
            />
            <ButtonGroup display='flex' justifyContent='flex-end'>
                <Button variant='outline' onClick={onCancel}>
                    Cancel
                </Button>
                <Button isDisabled colorScheme='teal'>
                    Save
                </Button>
            </ButtonGroup>
        </Stack>
    )
}
  
const PlaylistEditPopoverForm = ({ children, playlist }) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const firstFieldRef = useRef(null);

    return (
        <>
            {children}
            <Popover
                isOpen={isOpen}
                initialFocusRef={firstFieldRef}
                onOpen={onOpen}
                onClose={onClose}
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
                    <FocusLock returnFocus persistentFocus={false}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <Form firstFieldRef={firstFieldRef} onCancel={onClose} playlist={playlist} />
                    </FocusLock>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default PlaylistEditPopoverForm;