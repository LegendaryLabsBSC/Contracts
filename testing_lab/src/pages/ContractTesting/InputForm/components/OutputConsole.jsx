import React from 'react'
import { FiSlash, FiDownload } from 'react-icons/fi'
import downloadFile from '../../../../utils/downloadFile';
import TooltipButton from '../../../../components/TooltipButton';
import {
  Container,
  Flex,
  Text,
  Heading,
  Center
} from "@chakra-ui/react";


const OutputConsole = (props) => {

  const ConsoleHeader = () => (
    <Heading
      mt={2}
      as='h5'
      size='sm'
    >
      {props.consoleHeader}
    </Heading>
  )

  const LogContent = () => (
    props.outputContent.length > 1 ?
      props.outputContent.map((line, key) =>
      (
        <Text
          p={2}
          ml={2}
          key={key}
          fontSize="sm"
        >
          {line}
        </Text>
      ))
      : null
  )

  const clearLog = () => {
    props.clearOutputContent([""])
  }

  return (
    <Center>
      <Flex
        mb="2%"
        h="25vh"
        w={props.navSize === "small" ? "30vw" : "24vw"}
        borderRadius={15}
        boxShadow="0 4px 12px rgba(49,130,206,0.75) inset"
        overflowX="hidden"
        overflowY="scroll"
      >
        <Container >
          <ConsoleHeader />
          <Flex
            position="absolute"
            bottom="5%"
            right="3%"
          >
            <TooltipButton
              icon={<FiSlash />}
              color="red"
              label="Clear Log"
              placement="top-start"
              size="sm"
              onClick={clearLog}
            />
            <TooltipButton
              icon={<FiDownload />}
              color="green.400"
              label="Download Log"
              placement="top-end"
              size="sm"
              onClick={() => downloadFile(
                props.outputContent,
                ">--",
                "contract-testing-log",
                "text/plain",
                "txt")}
            />
          </Flex>
          <LogContent />
        </Container >
      </Flex >
    </Center>
  )
}

export default OutputConsole
