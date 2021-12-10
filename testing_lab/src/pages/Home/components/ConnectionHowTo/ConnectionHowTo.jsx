import React from 'react'
import {
  Flex,
  Text,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import ConnectionAccordion from './components/ConnectionAccordion'

const ConnectionHowTo = (props) => {
  return (
    <Flex
      h="100%"
      w="100%"
      flexDir="column"
      alignItems="center"
    >
      {props.title}
      <Flex
        p={1}
        pr={2}
        ml={2}
      >
        <UnorderedList>
          <ListItem pb={3}>
            Install {props.installLink}
          </ListItem>
          <Text pb={3}>To add a new Testnet to Metamask:</Text>
          <ListItem pb={3}>
            Click your account icon inside the MetaMask extension (top-right corner)
          </ListItem>
          <ListItem pb={3}>
            Then navigate to:
            <br />
            Settings &rarr; Networks &rarr; Add A Network
          </ListItem>
        </UnorderedList>
        <br />
      </Flex>
      <Flex w="100%">
        <ConnectionAccordion />
      </Flex>
    </Flex >
  )
}

export default ConnectionHowTo
