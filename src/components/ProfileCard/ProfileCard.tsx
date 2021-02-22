import React from 'react'
import { Avatar, Card, Content, CrewPic, Decoration, Groups, Handles, Header, PhotoBox, TiltWrapper } from './styles'
import WhiteLogo from "../../assets/logos/white.svg"
import { Text } from "@geist-ui/react"
import { FaInstagram, FaDiscord, FaTelegramPlane } from "react-icons/fa" 
import HandleChip from '../HandleChip'

interface ProfileCardProps {
    name: string;
    photo: string;
    groups?: string[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, photo, groups }: ProfileCardProps) => {
    return (
        <TiltWrapper gyroscope={true} scale={1.05} perspective={1000} tiltReverse>
            <Card>
                <Content>
                    <Decoration>
                        <img src={WhiteLogo} alt="" />
                    </Decoration>
                    <Header>
                        <PhotoBox>
                            <Avatar src={photo} alt="Profile picture" />
                            <CrewPic>
                                <Avatar src="https://picsum.photos/80" alt="Profile picture" />
                            </CrewPic>
                        </PhotoBox>
                        <hgroup>
                            <Text h1 size="1.5rem">{name}</Text>
                            <Groups>
                                {groups?.map((group) => <Text key={group} small>{group}</Text>)}
                            </Groups>
                        </hgroup>
                    </Header>
                    <Handles>
                        <HandleChip icon={<FaTelegramPlane />} value="@el1fudon" href="" />
                        <HandleChip icon={<FaInstagram />} value="@aabassayoub" href="" />
                        <HandleChip icon={<FaDiscord />} value="@el1flem#9577" href="" />
                    </Handles>
                </Content>
            </Card>
        </TiltWrapper>
    )
}

export default ProfileCard
