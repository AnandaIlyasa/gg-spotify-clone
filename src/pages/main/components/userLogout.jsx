import Button from "../../../components/button";
import {
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuDivider,
  } from '@chakra-ui/react'

export default function UserLogout({ profile }) {
    console.log("profile: ", profile)
    return (
        <>
            <div id="user-logout-full">
                {profile?.images?.length > 0 ? <img className="profile-picture" src={profile?.images[0]?.url} alt="#"/> : <span className="profile-picture fa fa-user"></span>}
                <Text noOfLines={1} className="display-name" width="10rem" fontWeight="bold">{profile ? profile.display_name : ""}</Text>
                <Button 
                    handleClick={() => {
                        window.location.replace("/");
                    }}
                    className="logout"
                    label="Logout"
                    bg="red"
                />
            </div>

            <div id="user-logout-hidden">
                <Menu colorScheme="white">
                    <MenuButton
                        px={4}
                        py={2}
                        transition='all 0.2s'
                        _hover={{ bg: 'rgb(30, 30, 30)' }}
                        _expanded={{ bg: 'rgb(30, 30, 30)' }}
                        _focus={{ boxShadow: 'outline' }}
                    >
                        {profile?.images?.length > 0 ? <img className="profile-picture" src={profile.images[0].url} alt="#"/> : <span className="profile-picture fa fa-user"></span>} 
                    </MenuButton>
                    <MenuList display="flex" flexDirection="column" alignItems="center" backgroundColor="rgb(30, 30, 30)">
                        <Text noOfLines={1} fontWeight="bold">{profile ? profile.display_name : ""}</Text>
                        <MenuDivider/>
                        <Button
                            handleClick={() => {
                                window.location.replace("/");
                            }}
                            className="logout"
                            label="Logout"
                            bg="red"
                        />
                    </MenuList>
                </Menu>
            </div>
        </>
    )
}