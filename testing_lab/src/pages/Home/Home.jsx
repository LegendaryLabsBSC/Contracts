import React from 'react'
import homeConfig from './config/home-config'
import WelcomePanel from './components/WelcomePanel'
import ConnectionHowTo from './components/ConnectionHowTo/ConnectionHowTo'
import SimpleSubpanel from './components/SimpleSubpanel'
import { Flex, Heading, } from '@chakra-ui/react'


const Home = (props) => {

  const MainTitle = () => (
    <Flex
      flexDir="column"
      alignItems="center"
    >
      <Heading
        p={4}
        pb={2}
        mb={2}
        as='h1'
        w="75%"
        color="white"
        fontSize="400%"
        fontFamily="Georgia"
        letterSpacing={- 1}
        background="blue.500"
        borderBottomRadius={22}
        textAlign="center"
      >
        {homeConfig.mainTitle}
      </Heading>
    </Flex>
  )

  return (
    <Flex
      h="90vh"
      w={props.navSize === "small" ? "80vw" : "74vw"}
      background="white"
      borderRadius={30}
      boxShadow="0 4px 12px rgba(0,0,0,0.75)"
      flexDirection="column"
      overflowY="scroll"
      overflowX="hidden"
      pos="absolute"
    >
      <MainTitle />
      <Flex
        id="body"
        mt={1}
        w="100%"
        h="100%"
        fontSize="115%"
      >
        <Flex
          id="mainPanel"
          h="100%"
          w="65%"
          flexDir="column"
          borderRightWidth={2}
          borderRightColor="blue.500"
        >
          <WelcomePanel
            title={homeConfig.subtitle({ title: "Welcome To The Testing Lab!" })}
            blurb={homeConfig.welcomePanel.blurb}
          />
          <Flex
            h="100%"
            alignItems="center"
          >
            <Flex
              ml={5}
              pr={3}
              w="100%"
              flexDir="column"
              borderRightWidth={1}
              borderRightColor="blue.500"
            >
              <SimpleSubpanel
                id="certs"
                title={homeConfig.subtitle({ title: "Testing Certs" })}
                body={homeConfig.subpanel.certs}
              />
            </Flex>
            <Flex
              ml={5}
              pr={3}
              w="100%"
              flexDir="column"
            >
              <SimpleSubpanel
                id="logs"
                title={homeConfig.subtitle({ title: "Testing Logs" })}
                body={homeConfig.subpanel.logs}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          id="auxPanel"
          h="100%"
          w="35%"
        >
          <Flex

            flexDir="column"
          >
            <ConnectionHowTo
              title={homeConfig.subtitle({ title: "Connecting With MetaMask" })}
              installLink={homeConfig.softwareLink.metamask}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home
