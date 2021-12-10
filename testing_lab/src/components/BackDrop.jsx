import React from 'react'
import { Flex, } from "@chakra-ui/react";

const BackDrop = (props) => {
  return (
    <Flex
      pos="sticky"
      mt={6}
      h="95vh"
      w={props.navSize === "small" ? "84vw" : "78vw"}
      justify="center"
      alignItems="center"
      borderRadius={"30px"}
      background="blue.500"
      boxShadow="0 4px 12px rgba(0,0,0,1)"
    >
      {props.children}
    </Flex>
  )
}

export default BackDrop
