import React from 'react'
import homeConfig from './config/home-config'
import WelcomePanel from './components/WelcomePanel'
import ConnectionHowTo from './components/ConnectionHowTo/ConnectionHowTo'
import SimpleSubpanel from './components/SimpleSubpanel'
import { Flex, Heading, Spacer, } from '@chakra-ui/react'


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
        color="white"
        fontSize="300%"
        fontFamily="Georgia"
        letterSpacing={- 1}
        background="blue.500"
        borderBottomRadius={22}
      >
        {homeConfig.mainTitle}
      </Heading>
    </Flex>
  )

  return (
    <Flex
      ml={10}
      mt={5}
      h="90vh"
      w={props.navSize === "small" ? "82vw" : "74vw"}
      background="white"
      borderRadius={30}
      boxShadow="0 4px 12px rgba(0,0,0,0.75)"
      flexDirection="column"
      overflowY="scroll"
      overflowX="hidden"
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
              borderRightColor="black"
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
            borderLeftWidth={1}
            borderLeftColor="black"
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
