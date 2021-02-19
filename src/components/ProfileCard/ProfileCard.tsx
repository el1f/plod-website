import React from 'react'
import { Avatar, Card, Content, CrewPic, Decoration, Groups, HandleChip, HandleChipAvatar, Handles, Header, PhotoBox } from './styles'
import WhiteLogo from "../../assets/logos/white.svg"
import { Text } from "@geist-ui/react"
import { FaInstagram, FaDiscord, FaTelegramPlane } from "react-icons/fa" 

const ProfileCard = () => {
    return (
        <Card>
            <Content>
                <Decoration>
                    <img src={WhiteLogo} alt="" />
                </Decoration>
                <Header>
                    <PhotoBox>
                        <Avatar src="https://picsum.photos/320" alt="Profile picture" />
                        <CrewPic>
                            <Avatar src="https://picsum.photos/80" alt="Profile picture" />
                        </CrewPic>
                    </PhotoBox>
                    <hgroup>
                        <Text h1 size="1.5rem">Ayoub Aabass</Text>
                        <Groups>
                            <Text small>@padova_longboarding</Text>
                            <Text small>@pure_longboarding</Text>
                            <Text small>@PLOD</Text>
                        </Groups>
                    </hgroup>
                </Header>
                <Handles>
                    <HandleChip>
                        <HandleChipAvatar>
                        <FaTelegramPlane />
                        </HandleChipAvatar>
                        <Text span>
                            @el1fudon
                        </Text>
                    </HandleChip>
                    <HandleChip>
                        <HandleChipAvatar>
                            <FaInstagram />
                        </HandleChipAvatar>
                        <Text span>
                            @aabassayoub
                        </Text>
                    </HandleChip>
                    <HandleChip>
                        <HandleChipAvatar>
                        <FaDiscord />
                        </HandleChipAvatar>
                        <Text span>
                            @el1flem#9577
                        </Text>
                    </HandleChip>
                </Handles>
            </Content>
        </Card>
    )
}

export default ProfileCard
