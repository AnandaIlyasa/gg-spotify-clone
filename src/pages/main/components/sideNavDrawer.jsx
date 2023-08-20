import {
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { ArrowLeftIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useRef } from 'react';
import Playlists from './playlists';
  
export default function SideNavDrawer({ playlists }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
  
    return (
      <div id="nav-drawer">
        <Button padding="2rem 1rem" borderRadius={0} _hover={{filter: "brightness(150%)"}} ref={btnRef} colorScheme="rgb(30, 30, 30);" onClick={onOpen}>
          <HamburgerIcon boxSize={8}/>
        </Button>
        <Drawer
          isOpen={isOpen}
          finalFocusRef={btnRef}
          onClose={onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent backgroundColor="rgb(30, 30, 30)" color="whitesmoke">
            <DrawerHeader>
                <DrawerCloseButton _hover={{filter: "brightness(50%)"}}>
                    <ArrowLeftIcon boxSize={5}/>
                </DrawerCloseButton>
            </DrawerHeader>
  
            <DrawerBody>
                <div className="nav-home" onClick={onClose}>
                    <span className="fa fa-home"/>
                    <Text fontWeight="bold">Home</Text>
                </div>
                <Playlists playlists={playlists} />
            </DrawerBody>
  
          </DrawerContent>
        </Drawer>
      </div>
    )
  }