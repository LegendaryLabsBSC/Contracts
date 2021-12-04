import React from 'react'
import {
  Flex,
  Popover,
  PopoverTrigger,
  Heading,
  Button,
  PopoverContent,
  PopoverBody
} from '@chakra-ui/react'

const PopoverDocsHeading = (props) => {

  const handleURL = () => {
    const baseURL = "https://docs.legendarylabs.net/docs/"
    const slug = props.contractData.sourceName.split('.')[0]
    const subSlug = `${props.title}`.toLowerCase()

    return `${baseURL}${slug}#${subSlug}`
  }

  return (
    <Flex
      flexDirection="row"
      justify="center"
      w="100%"
      mt={4}
    >
      <Popover placement='bottom-start'>
        <PopoverTrigger>
          <Button
            background="none"
            _hover={{ background: `${props.colorScheme} .100` }}
            onClick={() => handleURL()}
          >
            <Heading as="h4" size="md">{props.title}</Heading>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          w="30vw"
          h="60vh"
        >
          <PopoverBody>
            <iframe
              src={`${handleURL()} `}
              width="100%"
              height="500px"
            >
            </iframe>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>

  )
}

export default PopoverDocsHeading
