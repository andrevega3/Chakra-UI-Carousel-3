import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import type { Preview } from "@storybook/react"
import React from "react"




const preview: Preview = {
  decorators: [
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <Story />
      </ChakraProvider>
    ),
  ],
}

export default preview