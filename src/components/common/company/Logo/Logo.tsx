import { Text } from './Logo.styled'
import { LogoProps } from './Logo.types'

export const Logo: React.FC<LogoProps> = (props) => {

    return (
        <Text {...props}>
            RTC<br/>Chat
        </Text>
    )
}