import React from 'react'
import {
  Link,
  Badge,
  Spacer,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'

const ConnectionAccordionPanel = (props) => {
  return (
    <>
      <AccordionButton>
        <Heading
          as="h4"
          fontSize="lg"
        >
          Connect To <Badge backgroundColor={props.color} color={props.buttonTextColor} m={0, 1}>{props.buttonTitle}</Badge> Testnet
        </Heading>
        <Spacer />
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <Heading
          pb={2}
          as="h5"
          fontSize="lg"
          color={props.color}
        >
          Fill out the form as follows:
        </Heading>
        <b>Network Name:</b>  {props.networkName}
        <br />
        <b>New RPC URL:</b> {props.rpcUrl}
        <br />
        <b>Chain ID:</b> {props.chainId}
        <br />
        <b>Currency Symbol:</b> {props.currencySymbol}
        <br />
        <b>Explorer URL:</b> {props.explorerUrl}
      </AccordionPanel>
    </>
  )
}

const ConnectionAccordion = () => {
  return (
    <Accordion
      h="100%"
      w="100%"
      defaultIndex={2}
    >
      <AccordionItem w="100%">
        <ConnectionAccordionPanel
          color="#02f2d5"
          buttonTitle="Harmony"
          buttonTextColor="#2535a0"
          networkName="Harmony Testnet"
          rpcUrl="https://api.s0.b.hmny.io"
          chainId="1666700000"
          currencySymbol="ONE"
          explorerUrl="https://explorer.testnet.harmony.one/"
        />
      </AccordionItem>
      <AccordionItem w="100%">
        <ConnectionAccordionPanel
          color="#fcd535"
          buttonTitle="Binance"
          networkName="BSC Testnet"
          rpcUrl="https://data-seed-prebsc-2-s2.binance.org:8545/"
          chainId="97"
          currencySymbol="BNB"
          explorerUrl="https://testnet.bscscan.com/"
        />
      </AccordionItem>
      <AccordionItem w="100%" borderBottom="none">
        <AccordionButton>
          <Heading
            as="h4"
            fontSize="md"
          >
            <Badge backgroundColor="#0f52ba" color="#fcae21" m={0, 1}>Legendary</Badge> Links
          </Heading>
          <Spacer />
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <UnorderedList>
            <ListItem pb={3}>
              Report Issues To:
              <br />
              <Link
                isExternal
                href='mailto:development@legendarylabs.net'
                style={{ textDecoration: 'none' }
                }
                color="blue.500"
              >
                development@legendarylabs.net
              </Link>
            </ListItem>
            <ListItem pb={3}>
              <Link
                isExternal
                href="https://github.com/LegendaryLabsBSC/LegendaryLabs"
                style={{ textDecoration: 'none' }
                }
                color="blue.500"
              >
                Main Repo
              </Link>
            </ListItem>
            <ListItem pb={3}>
              <Link
                isExternal
                href="https://github.com/LegendaryLabsBSC/Testing-Lab"
                style={{ textDecoration: 'none' }
                }
                color="blue.500"
              >
                Testing Lab Repo (this)
              </Link>
            </ListItem>
            <ListItem pb={3}>
              <Link
                isExternal
                href="https://docs.legendarylabs.net"
                style={{ textDecoration: 'none' }
                }
                color="blue.500"
              >
                Docs Site
              </Link>
            </ListItem>
            <ListItem pb={3}>
              <Link
                isExternal
                href="http://legendarylabs.net"
                style={{ textDecoration: 'none' }
                }
                color="blue.500"
              >
                DApp
              </Link>
            </ListItem>
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default ConnectionAccordion
