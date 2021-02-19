import { Button } from '@geist-ui/react'
import React from 'react'
import ProfileCard from '../../components/ProfileCard'
import { Actions, Body, Layout } from './styles'
import { FiDownload, FiShare2 } from "react-icons/fi"

const Profile = () => {
    return (
        <Layout>
            <div />
            <Body>
                <ProfileCard />
            </Body>
            <Actions>
                <Button size="large" type="secondary" icon={<FiShare2 />}>Share</Button>
                <Button size="large" icon={<FiDownload />}>Download</Button>
            </Actions>
            <div />
        </Layout>
    )
}

export default Profile
