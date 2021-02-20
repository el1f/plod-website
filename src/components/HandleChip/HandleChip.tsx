import React from 'react'
import { Chip, Avatar } from './styles'
import { Text } from "@geist-ui/react"

interface HandleChipProps {
    icon: JSX.Element;
    value: string;
    href: string;
}

const HandleChip: React.FC<HandleChipProps> = ({ icon, value, href }: HandleChipProps) => {
    return (
        <Chip href={href} target="_blank">
            <Avatar>
                {icon}
            </Avatar>
            <Text span>
                {value}
            </Text>
        </Chip>
    )
}

export default HandleChip
